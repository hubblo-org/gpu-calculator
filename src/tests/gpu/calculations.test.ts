import { describe, expect, it } from "vitest";
import {
  computeAverageModel,
  computeDieSurface,
  computeImpacts,
  computeTotalsPerLifeCycleStep,
  computeTotalsPerCriteria,
  tidy,
  tidyPlanetBoundaries,
  tidyTotals,
  computePlanetBoundaries,
  computeYieldPercentage,
  computeEquivalent
} from "$lib/gpu/calculations";
import type { GraphicsCard, GraphicsCardImpactFactors } from "$lib/types/gpu";
import GpusImpactFactors from "../../data/gpu/gpus_impact_factors.json";
import Gpus from "../../data/gpu/gpus.json";
import { ImpactCriterionAcronym, PlanetBoundaries } from "$lib/types/enums";

describe("average model calculation test suite", () => {
  it("computes an average model of a graphics card with impact factors", () => {
    const impactFactors: GraphicsCardImpactFactors[] = GpusImpactFactors.slice().filter(
      (card) => card.graphics_card != "NVIDIA H100 PCIe 80GB"
    );
    const graphicsCards: GraphicsCard[] = Gpus.slice().filter(
      (card) => card.name != "NVIDIA H100 PCIe 80GB"
    );
    const averageModel = computeAverageModel(graphicsCards, impactFactors);

    expect(averageModel.graphics_card).toEqual("average");
    expect(averageModel.components.casing.manufacturing_ADPe!).toBeCloseTo(4.08e-4);
    expect(averageModel.components.heatsink.manufacturing_ADPe!).toBeCloseTo(1.87e-3);
    expect(averageModel.components.printed_wiring_board.manufacturing_ADPe!).toBeCloseTo(1.27e-5);
    expect(averageModel.components.graphics_processing_unit.manufacturing_ADPe!).toBeCloseTo(
      1.55e-8
    );
    expect(averageModel.components.video_ram.manufacturing_ADPe!).toBeCloseTo(5.07e-9);
    expect(averageModel.components.upstream_transport.manufacturing_ADPe!).toBeCloseTo(1.02e-8);
    expect(averageModel.components.end_of_life.manufacturing_ADPe!).toBeCloseTo(0);
    expect(averageModel.components.casing.manufacturing_GWP!).toBeCloseTo(8.25, 1);
    expect(averageModel.components.heatsink.manufacturing_GWP!).toBeCloseTo(5.74, 1);
    expect(averageModel.components.printed_wiring_board.manufacturing_GWP!).toBeCloseTo(3.25e-2, 1);

    // Getting different results from those in the spreadsheet for average GPU component impact factors, adding assertions
    // for each criterion
    expect(averageModel.components.graphics_processing_unit.manufacturing_ADPe!).toBeCloseTo(
      1.55e-8
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_ADPf!).toBeCloseTo(
      5.56e-1
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_AP!).toBeCloseTo(2.35e-4);
    expect(averageModel.components.graphics_processing_unit.manufacturing_CTUe!).toBeCloseTo(
      5.44e-1
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_CTUh_c!).toBeCloseTo(
      9.72e-12
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_CTUh_nc!).toBeCloseTo(
      2.32e-10
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_Epf!).toBeCloseTo(
      1.33e-7
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_Epm!).toBeCloseTo(
      2.83e-5
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_Ept!).toBeCloseTo(
      2.94e-4
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_GWP!).toBeCloseTo(
      4.26e-2
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_GWPb!).toBeCloseTo(
      2.53e-5
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_GWPf!).toBeCloseTo(
      4.26e-2
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_GWPlu!).toBeCloseTo(0);
    expect(averageModel.components.graphics_processing_unit.manufacturing_IR!).toBeCloseTo(4.6e-4);
    expect(averageModel.components.graphics_processing_unit.manufacturing_LU!).toBeCloseTo(1.7e-4);
    expect(averageModel.components.graphics_processing_unit.manufacturing_ODP!).toBeCloseTo(
      1.86e-8
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_PM!).toBeCloseTo(1.3e-9);
    expect(averageModel.components.graphics_processing_unit.manufacturing_POCP!).toBeCloseTo(
      9.25e-5
    );
    expect(averageModel.components.graphics_processing_unit.manufacturing_WU!).toBeCloseTo(1.48e-2);

    expect(averageModel.components.video_ram.manufacturing_GWP!).toBeCloseTo(1.84e-1);
    expect(averageModel.components.upstream_transport.manufacturing_GWP!).toBeCloseTo(2.6e-1);
    expect(averageModel.components.end_of_life.manufacturing_GWP!).toBeCloseTo(0);
  });
});

describe("equivalency calculation test suite", () => {
  const impactFactors: GraphicsCardImpactFactors[] = GpusImpactFactors.slice().filter(
    (card) => card.graphics_card != "NVIDIA H100 PCIe 80GB"
  );
  const graphicsCards: GraphicsCard[] = Gpus.slice().filter(
    (card) => card.name != "NVIDIA H100 PCIe 80GB"
  );
  const averageModel = computeAverageModel(graphicsCards, impactFactors);
  const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(averageModel);
  const totals = computeTotalsPerCriteria(totalsPerLifeCycleStep);
  it("computes an equivalent in liters of crude oil for an average graphics card", () => {
    const averageTotalDepletionOfFossilResources = totals.ADPf!;
    const equivalentToLitersOfCrudeOil = computeEquivalent(
      ImpactCriterionAcronym.ADPf,
      averageTotalDepletionOfFossilResources
    );
    expect(Math.round(equivalentToLitersOfCrudeOil)).toEqual(10);
  });
  it("computes an equivalent in distance travelled by car for an average graphics card", () => {
    const averageTotalGlobalWarmingPotential = totals.GWP!;
    const equivalentInDistanceByCar = computeEquivalent(
      ImpactCriterionAcronym.GWP,
      averageTotalGlobalWarmingPotential
    );
    expect(Math.round(equivalentInDistanceByCar)).toEqual(64);
  });
  it("computes an equivalent in kilograms of copper for an average graphics card", () => {
    const averageTotalDepletionOfMinerals = totals.ADPe!;
    const equivalentInCopper = computeEquivalent(
      ImpactCriterionAcronym.ADPe,
      averageTotalDepletionOfMinerals
    );
    expect(Math.round(equivalentInCopper)).toEqual(2);
  });
});

describe("yield percentage computing methods test suite", () => {
  it("computes the yield percentage for a given die, with a given area before losses", () => {
    const a100VramDieSurfaceBeforeLosses = 86.25;
    const yieldPercentage = computeYieldPercentage(a100VramDieSurfaceBeforeLosses);
    expect(yieldPercentage).toBeCloseTo(0.91, 1);
  });
  it("computes the die surface with losses, with a given area before losses", () => {
    const a100VramDieSurfaceBeforeLosses = 86.25;
    const yieldPercentage = computeYieldPercentage(a100VramDieSurfaceBeforeLosses);
    const a100VramDieSurfaceWithLosses = a100VramDieSurfaceBeforeLosses / yieldPercentage;
    expect(a100VramDieSurfaceWithLosses).toBeCloseTo(93.9, 1);
  });
});

describe("die surface computing methods test suite", () => {
  const h100 = Gpus.filter((card) => card.name === "NVIDIA H100 PCIe 80GB");
  it("computes the GPU die surface, including losses, for a given graphics card", () => {
    const h100GpuSurface = h100[0].gpuSurface;
    const dieSurface = computeDieSurface(h100GpuSurface);
    expect(dieSurface).toBeCloseTo(2.81e3, 0);
  });
  it("computes the VRAM die surface, including losses, for a given graphics card", () => {
    const graphicsCardsWithVramDieSurface = [
      {
        name: "A100 PCIe 40GB",
        videoRamDieSurfaceWithoutLosses: 86.25,
        videoRamDies: 6,
        videoRamCapacity: 40
      },
      {
        name: "A100 SXM4 40GB",
        videoRamDieSurfaceWithoutLosses: 86.25,
        videoRamDies: 6,
        videoRamCapacity: 40
      },
      { name: "P100", videoRamDieSurfaceWithoutLosses: 82.5, videoRamDies: 4, videoRamCapacity: 16 }
    ];

    const averageValues = graphicsCardsWithVramDieSurface.map((card) => {
      return (card.videoRamDieSurfaceWithoutLosses * card.videoRamDies) / card.videoRamCapacity;
    });
    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    const h100VramDieSurfaceWithoutLosses =
      (average(averageValues) * h100[0].videoRamCapacity) / h100[0].videoRamDies;
    const h100VramDieSurfaceWithLosses = computeDieSurface(h100VramDieSurfaceWithoutLosses);
    expect(h100VramDieSurfaceWithLosses).toBeCloseTo(3.88e2, 0);
  });
});
describe("graphics card calculator utilitary methods test suite", () => {
  const testCard: GraphicsCard = Gpus.filter((card) => card.name == "NVIDIA H100 PCIe 80GB")[0];

  it("computes a graphics card impact factors according to the provided parameters", () => {
    const testCardImpacts = computeImpacts(testCard);
    expect(testCardImpacts.graphics_card).toEqual(testCard.name);
    expect(testCardImpacts.components.heatsink.manufacturing_ADPe!).toBeCloseTo(1.68e-3);
    expect(testCardImpacts.components.casing.manufacturing_ADPe!).toBeCloseTo(3.22e-4);
    expect(testCardImpacts.components.video_ram.manufacturing_ADPe!).toBeCloseTo(1.19e-5);
    expect(testCardImpacts.components.printed_wiring_board.manufacturing_ADPe!).toBeCloseTo(
      3.77e-3
    );
    expect(testCardImpacts.components.graphics_processing_unit.manufacturing_ADPe!).toBeCloseTo(
      4.37e-5
    );
    expect(testCardImpacts.components.heatsink.manufacturing_GWP!).toBeCloseTo(5.17);
    expect(testCardImpacts.components.casing.manufacturing_GWP!).toBeCloseTo(6.51, 1);
    expect(Math.round(testCardImpacts.components.video_ram.manufacturing_GWP!)).toBeCloseTo(4.29e2);
    expect(testCardImpacts.components.printed_wiring_board.manufacturing_GWP!).toBeCloseTo(9.65);
    expect(
      Math.round(testCardImpacts.components.graphics_processing_unit.manufacturing_GWP!)
    ).toBeCloseTo(1.2e2);
    expect(testCardImpacts.components.upstream_transport.manufacturing_GWP!).toBeCloseTo(4.39e-1);
    expect(testCardImpacts.components.end_of_life.manufacturing_GWP!).toBeCloseTo(0.0);
    expect(testCardImpacts.components.heatsink.manufacturing_Epm!).toBeCloseTo(4.7e-3);
    expect(testCardImpacts.components.casing.manufacturing_Epm!).toBeCloseTo(5.23e-3);
    expect(testCardImpacts.components.video_ram.manufacturing_Epm!).toBeCloseTo(2.85e-1);
    expect(testCardImpacts.components.printed_wiring_board.manufacturing_Epm!).toBeCloseTo(7.27e-3);
    expect(testCardImpacts.components.graphics_processing_unit.manufacturing_Epm!).toBeCloseTo(
      7.94e-2
    );
    expect(testCardImpacts.components.upstream_transport.manufacturing_Epm!).toBeCloseTo(1.38e-3);
    expect(testCardImpacts.components.end_of_life.manufacturing_Epm!).toBeCloseTo(0.0);
  });

  it("computes the total for each life cycle step for each impact criteria", () => {
    const testCardImpacts = computeImpacts(testCard);

    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(testCardImpacts);

    expect(totalsPerLifeCycleStep.manufacturing.ADPe).toBeCloseTo(5.83e-3);
    expect(totalsPerLifeCycleStep.transport.ADPe).toBeCloseTo(1.82e-8);
    expect(totalsPerLifeCycleStep.use.ADPe).toEqual(0);
    expect(totalsPerLifeCycleStep.manufacturing.ADPf).toBeGreaterThanOrEqual(7.6e3);
    expect(totalsPerLifeCycleStep.transport.ADPf).toBeCloseTo(6.42);
    expect(totalsPerLifeCycleStep.use.ADPf).toEqual(0);
    expect(Math.round(totalsPerLifeCycleStep.endOfLife.ADPf)).toEqual(33);
    expect(totalsPerLifeCycleStep.manufacturing.CTUh_c).toBeCloseTo(2.07e-5);
    expect(totalsPerLifeCycleStep.transport.CTUh_c).toBeCloseTo(7.56e-12);
    expect(totalsPerLifeCycleStep.use.CTUh_c).toBeCloseTo(0);
    expect(totalsPerLifeCycleStep.endOfLife.CTUh_c).toBeCloseTo(9.96e-9);
    expect(totalsPerLifeCycleStep.manufacturing.CTUh_nc).toBeCloseTo(8.53e-6);
    expect(totalsPerLifeCycleStep.transport.CTUh_nc).toBeCloseTo(1.54e-9);
    expect(totalsPerLifeCycleStep.use.CTUh_nc).toBeCloseTo(0);
    expect(totalsPerLifeCycleStep.endOfLife.CTUh_nc).toBeCloseTo(3.93e-7);
    expect(totalsPerLifeCycleStep.manufacturing.Epm).toBeCloseTo(3.83e-1);
    expect(totalsPerLifeCycleStep.transport.Epm).toBeCloseTo(4.17e-3);
    expect(totalsPerLifeCycleStep.use.Epm).toBeCloseTo(0);
    expect(totalsPerLifeCycleStep.endOfLife.Epm).toBeCloseTo(3.57e-2);
  });

  it("computes the total for each impact criteria", () => {
    const testCardImpacts = computeImpacts(testCard);

    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(testCardImpacts);
    const totalsPerCriteria = computeTotalsPerCriteria(totalsPerLifeCycleStep);

    expect(totalsPerCriteria.ADPe).toBeCloseTo(5.83e-3);
  });

  it("returns a tidy data format for impact factors with columns for life cycle step and graphics card component", () => {
    const testCardImpacts = computeImpacts(testCard);
    const tidyImpactFactors = tidy(testCardImpacts);

    const lastIndex = tidyImpactFactors.length - 1;
    expect(tidyImpactFactors.length).toEqual(880);
    expect(tidyImpactFactors[0].component).toEqual("casing");
    expect(tidyImpactFactors[0].lifeCycleStep).toEqual("manufacturing");
    expect(tidyImpactFactors[0].impactCriterion).toEqual("ADPe");
    expect(tidyImpactFactors[0].value).toBeCloseTo(1.68e-3);
    expect(tidyImpactFactors[lastIndex].component).toEqual("end_of_life");
    expect(tidyImpactFactors[lastIndex].lifeCycleStep).toEqual("endoflife");
    expect(tidyImpactFactors[lastIndex].impactCriterion).toEqual("TPE");
    expect(tidyImpactFactors[lastIndex].value).toBeCloseTo(3.78e1, 1);
  });

  it("returns a tidy data format for impact factors totals with columns for life cycle step and impact criterion", () => {
    const testCardImpacts = computeImpacts(testCard);
    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(testCardImpacts);
    const tidiedTotals = tidyTotals(totalsPerLifeCycleStep);
    expect(tidiedTotals.length).toEqual(88);

    expect(tidiedTotals[0].lifeCycleStep).toEqual("Manufacturing");
    expect(tidiedTotals[0].impactCriterion).toEqual("ADPe");
    expect(tidiedTotals[0].value).toBeCloseTo(5.83e-3);
  });

  it("computes the planet boundaries factors related to human population for the provided graphics card impact factors", () => {
    const h100Parameters = Gpus.filter((card) => card.name.includes("H100"))[0];
    const h100Impacts = computeImpacts(h100Parameters);
    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(h100Impacts);
    const totalsPerCriteria = computeTotalsPerCriteria(totalsPerLifeCycleStep);

    const planetBoundariesFactors = computePlanetBoundaries(totalsPerCriteria);

    expect(planetBoundariesFactors.ADPe).toBeCloseTo(2.13e-1);
    expect(planetBoundariesFactors.ADPf).toBeCloseTo(2.73e-1);
    expect(planetBoundariesFactors.AP).toBeCloseTo(2.75e-2);
    expect(planetBoundariesFactors.CTUe).toBeCloseTo(5.59e-1);
    expect(planetBoundariesFactors.CTUh_c).toBeCloseTo(1.72e-1);
    expect(planetBoundariesFactors.CTUh_nc).toBeCloseTo(1.74e-2);
    expect(planetBoundariesFactors.Epf).toBeCloseTo(4.37e-3);
    expect(planetBoundariesFactors.Epm).toBeCloseTo(1.68e-2);
    expect(planetBoundariesFactors.Ept).toBeCloseTo(5.31e-3, 1);
    expect(planetBoundariesFactors.GWP).toBeCloseTo(6.74e-1);
    expect(planetBoundariesFactors.IR).toBeCloseTo(5.01e-3);
    expect(planetBoundariesFactors.ODP).toBeCloseTo(3.61e-3);
    expect(planetBoundariesFactors.PM).toBeCloseTo(2.95e-1);
    expect(planetBoundariesFactors.POCP).toBeCloseTo(2.54e-2);
    expect(planetBoundariesFactors.WU).toBeCloseTo(6.41e-2);
  });

  it("returns a tidy data format for the ratios of graphics cards impact factors to planet boundaries", () => {
    const h100Parameters = Gpus.filter((card) => card.name.includes("H100"))[0];
    const h100Impacts = computeImpacts(h100Parameters);
    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(h100Impacts);
    const totalsPerCriteria = computeTotalsPerCriteria(totalsPerLifeCycleStep);

    const tidiedFactors = tidyPlanetBoundaries(totalsPerCriteria);

    expect(tidiedFactors.length).toEqual(15);
    expect(tidiedFactors[0].impactCriterion).toEqual("ADPe");
    expect(tidiedFactors[0].ratioNumber).toBeCloseTo(0.21);
    expect(tidiedFactors[0].ratioPercentage).toBeCloseTo(9, 0);
    expect(tidiedFactors[0].totalImpactFactor).toBeCloseTo(5.81e-3);
    expect(tidiedFactors[0].planetBoundaryValue).toBeCloseTo(
      PlanetBoundaries.AbioticDepletionPotentialElements
    );
  });
});
