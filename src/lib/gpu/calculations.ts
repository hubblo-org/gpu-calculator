import type {
  TidyImpactFactor,
  TidyRatio,
  GraphicsCard,
  GraphicsCardComponents,
  GraphicsCardImpactFactors,
  GraphicsCardLifeCycle,
  IF,
  ImpactFactors,
  ImpactFactorsKeys,
  UnorderedImpactFactors,
  GCLC
} from "../../lib/types/gpu";
import { isNotExcludedCriterion } from "../utils.ts";
import Average from "../../data/gpu/average_model.json" with { type: "json" };
import Gpus from "../../data/gpu/gpus.json" with { type: "json" };
import TransportImpacts from "../../data/gpu/transport_impacts.json" with { type: "json" };
import { getPlanetBoundary, ImpactCriterionAcronym, PlanetBoundaries } from "../types/enums.ts";

const microjoulesPerLiterOfCrudeOil = 37;
const carbonDioxydeEquivalentPerKilometerTravelledByCar = 0.25;
const antimonyEquivalentPerKilogramOfCopper = 0.00137;

export function computeEquivalent(criterion: ImpactCriterionAcronym, value: number): number {
  if (criterion === ImpactCriterionAcronym.ADPf) {
    const equivalent = value / microjoulesPerLiterOfCrudeOil;
    return Math.round(equivalent);
  } else if (criterion === ImpactCriterionAcronym.GWP) {
    const equivalent = value / carbonDioxydeEquivalentPerKilometerTravelledByCar;
    return Math.round(equivalent);
  } else if (criterion === ImpactCriterionAcronym.ADPe) {
    const equivalent = value / antimonyEquivalentPerKilogramOfCopper;
    return Math.round(equivalent);
  }
}

// Useful for computing die surface with losses
export function computeYieldPercentage(chipSurfaceBeforeLosses: number) {
  // Defects per square centimeter
  const defectDensity = 0.1;

  const defects = (chipSurfaceBeforeLosses * defectDensity) / 100;

  // Murphy's model used by SemiAnalysis Die Yield Calculator
  const yieldPercentage = Math.pow((1 - Math.exp(-defects)) / defects, 2);
  return yieldPercentage;
}

export function computeDieSurface(chipSurface: number) {
  // Division by zero incoming otherwise
  if (chipSurface < 1) {
    return 0;
  } else {
    const kerfWidth = 0.2;
    const siliciumSurfaceBeforeLoss = (Math.sqrt(chipSurface) + kerfWidth) ** 2;
    const numberOfChipsOnWafer = Math.round(
      (Math.PI * (300 / 2) * (300 / 2)) / siliciumSurfaceBeforeLoss -
        (Math.PI * 300) / Math.sqrt(2 * siliciumSurfaceBeforeLoss)
    );

    const waferSurfaceCoveredByChips = chipSurface * numberOfChipsOnWafer;
    const waferSurface = (((300 / 2) * 300) / 2) * Math.PI;
    const totalYieldBeforeLosses = waferSurfaceCoveredByChips / waferSurface;
    const usableChipsPercentage = Math.E ** -Math.sqrt((chipSurface / 100) * 0.1) * 100;
    const totalYieldAfterLosses = totalYieldBeforeLosses * usableChipsPercentage;
    const dieSurfaceBeforeLosses = (chipSurface / totalYieldAfterLosses) * 100;
    return dieSurfaceBeforeLosses;
  }
}

function averageVramDieSurface() {
  // Documented VRAM die surfaces in the JSON source file do not include losses 
  // and the source parametric model does not take GH200 into account
  const cardsWithDocumentedVramDieSurface = Gpus.filter(
    (card) => card.name != "NVIDIA GH200" && card.videoRamDieSurface
  );
  const dieSurfaces = cardsWithDocumentedVramDieSurface.map((card) => {
    return (card.videoRamDieSurface! * card.videoRamDies) / card.videoRamCapacity;
  });

  const average = (array: Array<number>) => array.reduce((a, b) => a + b) / array.length;
  const result = average(dieSurfaces);
  return result;
}

export function computeAverageModel(
  graphicsCards: GraphicsCard[],
  impactFactors: GraphicsCardImpactFactors[]
): GraphicsCardImpactFactors {
  const computableProperties = Object.keys(impactFactors[0].components.casing).filter(
    (property) => property != "graphics_card" && property != "component"
  );

  let averageModel = {} as GraphicsCardImpactFactors;
  averageModel.graphics_card = "average";
  averageModel.components = {
    casing: { graphics_card: "average", component: "casing" },
    heatsink: { graphics_card: "average", component: "heatsink" },
    video_ram: { graphics_card: "average", component: "video_ram" },
    printed_wiring_board: {
      graphics_card: "average",
      component: "printed_wiring_board"
    },
    graphics_processing_unit: {
      graphics_card: "average",
      component: "graphics_processing_unit"
    },
    upstream_transport: {
      graphics_card: "average",
      component: "upstream_transport"
    },
    end_of_life: { graphics_card: "average", component: "end_of_life" }
  };

  const intermediateValues: GraphicsCardComponents[] = impactFactors.map((componentFactors) => {
    const card = graphicsCards.filter((card) => card.name == componentFactors.graphics_card)[0];
    const casing = Object.assign({}, componentFactors.components.casing);
    const heatsink = Object.assign({}, componentFactors.components.heatsink);
    const pwb = Object.assign({}, componentFactors.components.printed_wiring_board);
    const gpu = Object.assign({}, componentFactors.components.graphics_processing_unit);
    const vram = Object.assign({}, componentFactors.components.video_ram);
    const transport = Object.assign({}, componentFactors.components.upstream_transport);
    const eol = Object.assign({}, componentFactors.components.end_of_life);

    const gpuSurfaceWithLosses = card.gpuSurface / computeYieldPercentage(card.gpuSurface);
    computableProperties.forEach((property) => {
      let newCasingValue = casing[property as ImpactFactorsKeys] as number;
      let newHeatsinkValue = heatsink[property as ImpactFactorsKeys] as number;
      let newPwbValue = pwb[property as ImpactFactorsKeys] as number;
      let newVramValue = vram[property as ImpactFactorsKeys] as number;
      let newGpuValue = gpu[property as ImpactFactorsKeys] as number;
      let newTransportValue = transport[property as ImpactFactorsKeys] as number;
      let newEolValue = eol[property as ImpactFactorsKeys] as number;

      newCasingValue =
        typeof newCasingValue === "number" && newCasingValue != 0
          ? newCasingValue / (card.casingWeight * 0.001)
          : 0;
      newHeatsinkValue =
        typeof newHeatsinkValue === "number" && newHeatsinkValue != 0
          ? newHeatsinkValue / (card.heatsinkWeight * 0.001)
          : 0;
      newPwbValue =
        typeof newPwbValue === "number" && newPwbValue != 0 ? newPwbValue / card.cardSurface : 0;
      newGpuValue =
        typeof newGpuValue === "number" && newGpuValue != 0
          ? newGpuValue / gpuSurfaceWithLosses
          : 0;
      newVramValue =
        card.videoRamDieSurface && typeof newVramValue === "number" && newVramValue != 0
          ? newVramValue /
            ((card.videoRamDieSurface / computeYieldPercentage(card.videoRamDieSurface)) *
              card.videoRamDies)
          : 0;
      newTransportValue =
        typeof newTransportValue === "number" && newTransportValue != 0
          ? newTransportValue / (card.totalWeight * 0.001)
          : 0;
      newEolValue =
        typeof newEolValue === "number" && newEolValue != 0
          ? newEolValue / (card.totalWeight * 0.001)
          : 0;

      (casing[property as ImpactFactorsKeys] as number) = newCasingValue;
      (heatsink[property as ImpactFactorsKeys] as number) = newHeatsinkValue;
      (pwb[property as ImpactFactorsKeys] as number) = newPwbValue;
      (gpu[property as ImpactFactorsKeys] as number) = newGpuValue;
      (vram[property as ImpactFactorsKeys] as number) = newVramValue;
      (transport[property as ImpactFactorsKeys] as number) = newTransportValue;
      (eol[property as ImpactFactorsKeys] as number) = newEolValue;
    });

    return {
      name: card.name,
      casing: casing,
      heatsink: heatsink,
      printed_wiring_board: pwb,
      graphics_processing_unit: gpu,
      video_ram: vram,
      upstream_transport: transport,
      end_of_life: eol
    };
  });

  const components = Object.keys(intermediateValues[0]).filter((property) => property != "name");

  const cardsComponentsValues = components.map((component) =>
    intermediateValues.map((card) => card[component as keyof GraphicsCardComponents])
  );
  computableProperties.forEach((property) => {
    cardsComponentsValues.forEach((component) => {
      const componentName = component[0]!.component;
      const filteredValues = component
        .map((card) => {
          const value = card![property as ImpactFactorsKeys];
          return value;
        })
        .filter((value) => value != 0);
      const divisionOperand = filteredValues.length;
      const sum = filteredValues.reduce((total, current) => {
        return (total as number) + (current as number);
      }, 0);
      const average = sum != 0 ? (sum as number) / divisionOperand : 0;
      (averageModel.components[componentName as keyof GraphicsCardComponents]![
        property as ImpactFactorsKeys
      ] as number) = average;
    });
  });
  return averageModel;
}

export function computeImpacts(card: GraphicsCard): GraphicsCardImpactFactors {
  const cardImpacts = {} as GraphicsCardImpactFactors;

  cardImpacts.graphics_card = card.name;
  cardImpacts.components = {
    casing: { graphics_card: card.name, component: "casing" },
    heatsink: { graphics_card: card.name, component: "heatsink" },
    video_ram: { graphics_card: card.name, component: "video_ram" },
    printed_wiring_board: {
      graphics_card: card.name,
      component: "printed_wiring_board"
    },
    graphics_processing_unit: {
      graphics_card: card.name,
      component: "graphics_processing_unit"
    },
    transport_boat: {},
    transport_plane: {},
    transport_truck: {},
    upstream_transport: {
      graphics_card: card.name,
      component: "upstream_transport"
    },
    end_of_life: { graphics_card: card.name, component: "end_of_life" }
  };
  const computableProperties = Object.keys(Average.components.casing).filter(
    (property) => property != "graphics_card" && property != "component"
  );

  const avgVramDieSurface = averageVramDieSurface();
  const vramDieSurfaceWithLosses =
    card.videoRamDies != 0 && card.videoRamCapacity != 0
      ? computeDieSurface(
          Math.round((avgVramDieSurface * card.videoRamCapacity) / card.videoRamDies)
        )
      : 0;

  computableProperties.forEach((property) => {
    const p = property as ImpactFactorsKeys;
    (cardImpacts.components.casing[p] as number) =
      (Average.components.casing[p] as number) * (card.casingWeight * 0.001);
    (cardImpacts.components.heatsink[p] as number) =
      (Average.components.heatsink[p] as number) * (card.heatsinkWeight * 0.001);
    // If the VRAM die surface without losses is documented, add the losses ; otherwise, use an average VRAM die surface from the available data
    (cardImpacts.components.video_ram[p] as number) = card.videoRamDieSurface
      ? (Average.components.video_ram[p] as number) * computeDieSurface(card.videoRamDieSurface!)
      : (Average.components.video_ram[p] as number) * vramDieSurfaceWithLosses * card.videoRamDies;
    (cardImpacts.components.printed_wiring_board[p] as number) =
      (Average.components.printed_wiring_board[p] as number) * card.cardSurface;
    // Same as VRAM die surface: we need to add the losses to the documented GPU surface
    (cardImpacts.components.graphics_processing_unit[p] as number) =
      (Average.components.graphics_processing_unit[p] as number) *
      computeDieSurface(card.gpuSurface);
    (cardImpacts.components.upstream_transport[p] as number) =
      (Average.components.upstream_transport[p] as number) * (card.totalWeight * 0.001);
    (cardImpacts.components.end_of_life[p] as number) =
      (Average.components.end_of_life[p] as number) * (card.totalWeight * 0.001);
  });

  const criteria = Object.values(ImpactCriterionAcronym).filter((criterion) => criterion != "CTUh");
  const distanceByBoat = 0;
  const distanceByTruck = 1000;
  const distanceByPlane = 9908;

  criteria.forEach((criteria) => {
    const c = criteria as keyof ImpactFactors;
    (cardImpacts.components.transport_boat![c] as number) =
      (TransportImpacts.transport_boat![c] as number) * (card.totalWeight * 0.001) * distanceByBoat;
    (cardImpacts.components.transport_plane![c] as number) =
      (TransportImpacts.transport_plane![c] as number) *
      (card.totalWeight * 0.001) *
      distanceByPlane;
    (cardImpacts.components.transport_truck![c] as number) =
      (TransportImpacts.transport_truck![c] as number) *
      (card.totalWeight * 0.001) *
      distanceByTruck;
  });

  cardImpacts.graphics_card = card.name;
  return cardImpacts;
}

export function computeTotalsPerLifeCycleStep(
  card: GraphicsCardImpactFactors
): GraphicsCardLifeCycle {
  const totalsPerLifeCycleStep: GraphicsCardLifeCycle = {
    manufacturing: {},
    transport: {},
    use: {},
    endOfLife: {}
  };

  const computableProperties = Object.keys(card.components.casing).filter(
    (property) => property != "graphics_card" && property != "component"
  );

  const componentsWithoutTransport = Object.keys(card.components).filter(
    (component) => component.includes("transport_") === false
  );

  computableProperties.forEach((property) => {
    const sum = componentsWithoutTransport
      .map((component) => {
        const value =
          card.components[component as keyof GraphicsCardComponents]![
            property as ImpactFactorsKeys
          ];
        return value;
      })
      .reduce((total, current) => (total as number)! + (current as number)!, 0);

    if (property.includes("end_of_life")) {
      const splitProperty = property.split("_");
      const endOfLife = "endOfLife" as keyof GraphicsCardLifeCycle;
      const lastIndex = splitProperty.length - 1;
      const criteria =
        splitProperty[lastIndex] === "c" || splitProperty[lastIndex] === "nc"
          ? "CTUh_".concat(splitProperty[lastIndex])
          : (splitProperty[lastIndex] as IF);
      totalsPerLifeCycleStep[endOfLife][criteria as IF]! = sum as number;
    } else {
      const splitProperty = property.split("_");
      const lifeCycleStep = splitProperty[0] as keyof GraphicsCardLifeCycle;
      const criteria =
        splitProperty[2] === "c" || splitProperty[2] === "nc"
          ? "CTUh_".concat(splitProperty[2])
          : (splitProperty[1] as IF);
      totalsPerLifeCycleStep[lifeCycleStep][criteria as IF]! = sum as number;
    }
  });

  const criteriaForTransport = Object.values(ImpactCriterionAcronym).filter(
    (criterion) => criterion != "CTUh"
  );
  const transportModes = Object.keys(card.components).filter((component) =>
    component.includes("transport_")
  );

  transportModes.forEach((transportMode) => {
    criteriaForTransport.forEach((criteria) => {
      totalsPerLifeCycleStep.transport[criteria] += card.components[transportMode][criteria];
    });
  });

  return totalsPerLifeCycleStep;
}

export function computeTotalsPerCriteria(
  totalsPerLifeCycleStep: GraphicsCardLifeCycle
): ImpactFactors {
  const totalsPerCriteria = {} as ImpactFactors;
  const criterias = Object.keys(totalsPerLifeCycleStep.manufacturing);
  const lifeCycleSteps = Object.keys(totalsPerLifeCycleStep);

  criterias.forEach((criteria) => {
    const c = criteria as IF;
    const sum = lifeCycleSteps
      .map((lcStep) => totalsPerLifeCycleStep[lcStep as keyof GraphicsCardLifeCycle][c])
      .reduce((total, current) => total! + current!, 0);
    totalsPerCriteria[c]! = sum as number;
  });
  return totalsPerCriteria;
}

export function tidy(card: GraphicsCardImpactFactors): TidyImpactFactor[] {
  const computableProperties = Object.keys(card.components.casing).filter(
    (property) => property != "graphics_card" && property != "component"
  );
  const components = Object.keys(card.components);

  const componentImpactFactors = computableProperties.flatMap((property) => {
    const impactFactors = components.map((component) => {
      const splitProperty = property.split("_");
      if (property.includes("end_of_life")) {
        const lifeCycleStep = "endoflife";

        const lastIndex = splitProperty.length - 1;
        const impactCriterion =
          splitProperty[lastIndex] === "c" || splitProperty[lastIndex] === "nc"
            ? "CTUh_".concat(splitProperty[lastIndex])
            : (splitProperty[lastIndex] as IF);
        const componentImpactFactor = {
          component,
          impactCriterion,
          lifeCycleStep,
          value: card.components[component as keyof GraphicsCardComponents]![
            property as keyof UnorderedImpactFactors
          ] as number
        };
        return componentImpactFactor;
      } else {
        const lifeCycleStep = splitProperty[0].toLowerCase();
        const impactCriterion =
          splitProperty[2] === "c" || splitProperty[2] === "nc"
            ? "CTUh_".concat(splitProperty[2])
            : (splitProperty[1] as IF);
        const componentImpactFactor = {
          component,
          impactCriterion,
          lifeCycleStep,
          value: card.components[component as keyof GraphicsCardComponents]![
            property as keyof UnorderedImpactFactors
          ] as number
        };
        return componentImpactFactor;
      }
    });
    return impactFactors;
  });

  return componentImpactFactors;
}

export function tidyTotals(impactFactors: GraphicsCardLifeCycle): TidyImpactFactor[] {
  const lifeCycleSteps = Object.keys(impactFactors).filter((key) => typeof key === "string");
  const tidiedImpactFactors = lifeCycleSteps.flatMap((lifeCycleStep) => {
    const criterias = Object.keys(impactFactors[lifeCycleStep as GCLC]).filter(
      (key) => typeof key === "string"
    );
    return criterias.map((criteria) => {
      return {
        impactCriterion: criteria,
        lifeCycleStep: lifeCycleStep
          .replace("endOfLife", "End-of-life")
          .replace(/^./, (char) => char.toUpperCase()),
        value: impactFactors[lifeCycleStep as GCLC][criteria as IF]!
      };
    });
  });
  return tidiedImpactFactors;
}

export function computePlanetBoundaries(impactFactors: ImpactFactors): ImpactFactors {
  const ignoredCriteria = ["GWPb", "GWPf", "GWPlu", "LU", "MIPS", "DEEE", "TPE"];
  const planetBoundaries = Object.assign({}, impactFactors);
  ignoredCriteria.forEach((criterion) => delete planetBoundaries[criterion as IF]);

  const criteria = Object.keys(impactFactors).filter(isNotExcludedCriterion);

  criteria.forEach((criterion) => {
    switch (criterion) {
      case "ADPe":
        planetBoundaries.ADPe! =
          impactFactors.ADPe! / PlanetBoundaries.AbioticDepletionPotentialElements;
      case "ADPf":
        planetBoundaries.ADPf! =
          impactFactors.ADPf! / PlanetBoundaries.AbioticDepletionPotentialFossilFuels;
      case "AP":
        planetBoundaries.AP! = impactFactors.AP! / PlanetBoundaries.AcidificationPotential;
      case "CTUe":
        planetBoundaries.CTUe! =
          impactFactors.CTUe! / PlanetBoundaries.ComparativeToxicityUnitsForEcosystems;
      case "CTUh_c":
        planetBoundaries.CTUh_c! =
          impactFactors.CTUh_c! / PlanetBoundaries.ComparativeToxicityUnitsForHumansCarcinogenic;
      case "CTUh_nc":
        planetBoundaries.CTUh_nc! =
          impactFactors.CTUh_nc! /
          PlanetBoundaries.ComparativeToxicityUnitsForHumansNonCarcinogenic;
      case "Epf":
        planetBoundaries.Epf! =
          impactFactors.Epf! / PlanetBoundaries.EutrophicationPotentialFreshWater;
      case "Epm":
        planetBoundaries.Epm! = impactFactors.Epm! / PlanetBoundaries.EutrophicationPotentialMarine;
      case "Ept":
        planetBoundaries.Ept! =
          impactFactors.Ept! / PlanetBoundaries.EutrophicationPotentialTerrestrial;
      case "GWP":
        planetBoundaries.GWP! = impactFactors.GWP! / PlanetBoundaries.GlobalWarmingPotential;
      case "IR":
        planetBoundaries.IR! = impactFactors.IR! / PlanetBoundaries.IonisingRadiation;
      case "ODP":
        planetBoundaries.ODP! = impactFactors.ODP! / PlanetBoundaries.OzoneDepletionPotential;
      case "PM":
        planetBoundaries.PM! = impactFactors.PM! / PlanetBoundaries.ParticulateMatter;
      case "POCP":
        planetBoundaries.POCP! =
          impactFactors.POCP! / PlanetBoundaries.PhotochemicalOzoneFormationPotential;
      case "WU":
        planetBoundaries.WU! = impactFactors.WU! / PlanetBoundaries.WaterUse;
    }
  });

  return planetBoundaries;
}

export function tidyPlanetBoundaries(impactFactors: ImpactFactors): TidyRatio[] {
  const planetBoundariesValues = computePlanetBoundaries(impactFactors);
  const criteria = Object.keys(planetBoundariesValues).filter(isNotExcludedCriterion);
  const totalPerInhabitant = Object.values(planetBoundariesValues).reduce(
    (total, current) => total + current,
    0
  );
  const tidiedFactors = criteria.flatMap((criterion) => {
    const planetBoundaryTotal = getPlanetBoundary(criterion as ImpactCriterionAcronym);
    const ratio: TidyRatio = {
      totalImpactFactor: impactFactors[criterion as IF]!,
      impactCriterion: criterion,
      ratioNumber: planetBoundariesValues[criterion as IF]!,
      ratioPercentage: (planetBoundariesValues[criterion as IF]! / totalPerInhabitant) * 100,
      planetBoundaryValue: planetBoundaryTotal
    };
    return ratio;
  });

  return tidiedFactors;
}
