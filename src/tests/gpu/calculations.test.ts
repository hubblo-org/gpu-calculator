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
  computeEquivalent,
  tidyTotalsPerComponent
} from "$lib/gpu/calculations";
import type {
  GraphicsCard,
  GraphicsCardImpactFactors,
  ImpactFactors,
  UnorderedImpactFactors
} from "$lib/types/gpu";
import GpusImpactFactors from "../../data/gpu/gpus_impact_factors.json";
import Gpus from "../../data/gpu/gpus.json";
import AverageModelFixture from "../fixtures/average_model.json";
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
    expect(averageModel.components.casing.manufacturing_ADPe!.toExponential(2)).toEqual(
      AverageModelFixture.components.casing.manufacturing_ADPe.toExponential()
    );
    expect(averageModel.components.heatsink.manufacturing_ADPe!.toExponential(2)).toEqual(
      AverageModelFixture.components.heatsink.manufacturing_ADPe.toExponential()
    );
    expect(
      averageModel.components.printed_wiring_board.manufacturing_ADPe!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.printed_wiring_board.manufacturing_ADPe.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_ADPe!.toExponential(2)
    ).toEqual(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_ADPe.toExponential()
    );
    expect(averageModel.components.video_ram.manufacturing_ADPe!.toExponential(2)).toEqual(
      AverageModelFixture.components.video_ram.manufacturing_ADPe.toExponential()
    );
    expect(averageModel.components.upstream_transport.manufacturing_ADPe!.toExponential(2)).toEqual(
      AverageModelFixture.components.upstream_transport.manufacturing_ADPe.toExponential()
    );
    expect(averageModel.components.end_of_life.manufacturing_ADPe!.toExponential(2)).toBeCloseTo(
      AverageModelFixture.components.end_of_life.manufacturing_ADPe.toExponential()
    );
    expect(averageModel.components.casing.manufacturing_GWP!.toExponential(2)).toEqual(
      AverageModelFixture.components.casing.manufacturing_GWP.toExponential()
    );
    expect(averageModel.components.heatsink.manufacturing_GWP!.toExponential(2)).toEqual(
      AverageModelFixture.components.heatsink.manufacturing_GWP.toExponential()
    );
    expect(
      averageModel.components.printed_wiring_board.manufacturing_GWP!.toExponential(2)
    ).toEqual(
      AverageModelFixture.components.printed_wiring_board.manufacturing_GWP.toExponential(2)
    );

    // Getting different results from those in the spreadsheet for average GPU component impact factors, adding assertions
    // for each criterion
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_ADPf!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_ADPf.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_AP!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_AP.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_CTUe!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_CTUe.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_CTUh_c!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_CTUh_c.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_CTUh_nc!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_CTUh_nc.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_Epf!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_Epf.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_Epm!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_Epm.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_Ept!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_Ept.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_GWP!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_GWP.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_GWPb!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_GWPb.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_GWPf!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_GWPf.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_GWPlu!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_GWPlu.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_IR!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_IR.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_LU!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_LU.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_ODP!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_ODP.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_PM!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_PM.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_POCP!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_POCP.toExponential()
    );
    expect(
      averageModel.components.graphics_processing_unit.manufacturing_WU!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.graphics_processing_unit.manufacturing_WU.toExponential()
    );
    expect(averageModel.components.video_ram.manufacturing_GWP!.toExponential(2)).toBeCloseTo(
      AverageModelFixture.components.video_ram.manufacturing_GWP.toExponential()
    );
    expect(
      averageModel.components.upstream_transport.manufacturing_GWP!.toExponential(2)
    ).toBeCloseTo(
      AverageModelFixture.components.upstream_transport.manufacturing_GWP.toExponential()
    );
    expect(averageModel.components.end_of_life.manufacturing_GWP!.toExponential(2)).toBeCloseTo(
      AverageModelFixture.components.end_of_life.manufacturing_GWP.toExponential()
    );
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
    expect(Math.round(equivalentToLitersOfCrudeOil)).toEqual(9);
  });
  it("computes an equivalent in distance travelled by car for an average graphics card", () => {
    const averageTotalGlobalWarmingPotential = totals.GWP!;
    const equivalentInDistanceByCar = computeEquivalent(
      ImpactCriterionAcronym.GWP,
      averageTotalGlobalWarmingPotential
    );
    expect(Math.round(equivalentInDistanceByCar)).toEqual(62);
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
    expect(a100VramDieSurfaceWithLosses).toBeCloseTo(93.9, 0);

    const gh200VramDieSurfaceBeforeLosses = 100;
    const gh200VramDieSurfaceYield = computeYieldPercentage(gh200VramDieSurfaceBeforeLosses);
    const gh200VramDieSurfaceWithLosses =
      gh200VramDieSurfaceBeforeLosses / gh200VramDieSurfaceYield;
    expect(gh200VramDieSurfaceWithLosses).toBeCloseTo(110.425);
  });
});

describe("die surface computing methods test suite", () => {
  const h100 = Gpus.filter((card) => card.name === "NVIDIA H100 PCIe 80GB");
  it("computes the GPU die surface, including losses, for a given graphics card", () => {
    const h100GpuSurface = h100[0].gpuSurface;
    const dieSurface = computeDieSurface(h100GpuSurface);
    expect(dieSurface).toBeCloseTo(2.81e3, 0);
  });

  it("returns zero if the given GPU surface is zero", () => {
    const dieSurface = computeDieSurface(0);
    expect(dieSurface).not.toBeNaN();
    const newDieSurface = computeDieSurface(0.5);
    expect(newDieSurface).not.toBeNaN();
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
    expect(testCardImpacts.components.casing.manufacturing_ADPe!).toBeCloseTo(3.91e-4);
    expect(testCardImpacts.components.video_ram.manufacturing_ADPe!).toBeCloseTo(5.45e-4);
    expect(testCardImpacts.components.printed_wiring_board.manufacturing_ADPe!).toBeCloseTo(
      6.33e-3
    );
    expect(testCardImpacts.components.graphics_processing_unit.manufacturing_ADPe!).toBeCloseTo(
      5.45e-4
    );
    expect(testCardImpacts.components.heatsink.manufacturing_GWP!).toBeCloseTo(5.17);
    expect(testCardImpacts.components.casing.manufacturing_GWP!.toFixed(3)).toBeCloseTo(6.17, 1);
    expect(testCardImpacts.components.video_ram.manufacturing_GWP!).toBeCloseTo(8.04e1, 1);
    expect(testCardImpacts.components.printed_wiring_board.manufacturing_GWP!).toBeCloseTo(
      2.16e1,
      1
    );
    expect(
      Math.round(testCardImpacts.components.graphics_processing_unit.manufacturing_GWP!)
    ).toBeCloseTo(1.22e2);
    expect(testCardImpacts.components.upstream_transport.manufacturing_GWP!).toBeCloseTo(4.41e-1);
    expect(testCardImpacts.components.end_of_life.end_of_life_GWP!).toBeCloseTo(2.5);
    expect(testCardImpacts.components.end_of_life.manufacturing_GWP!).toBeCloseTo(0.0);
    expect(testCardImpacts.components.heatsink.manufacturing_Epm!).toBeCloseTo(4.7e-3);
    expect(testCardImpacts.components.casing.manufacturing_Epm!).toBeCloseTo(4.99e-3);
    expect(testCardImpacts.components.video_ram.manufacturing_Epm!).toBeCloseTo(5.34e-2);
    expect(testCardImpacts.components.printed_wiring_board.manufacturing_Epm!).toBeCloseTo(1.53e-2);
    expect(testCardImpacts.components.graphics_processing_unit.manufacturing_Epm!).toBeCloseTo(
      8.07e-2
    );
    expect(testCardImpacts.components.upstream_transport.manufacturing_Epm!).toBeCloseTo(1.39e-3);
    expect(testCardImpacts.components.end_of_life.manufacturing_Epm!).toBeCloseTo(0.0);
    expect(testCardImpacts.components.end_of_life.end_of_life_Epm!).toBeCloseTo(3.57e-2);

    expect((testCardImpacts.components.transport_boat! as ImpactFactors).ADPe).toBeCloseTo(0);
    expect((testCardImpacts.components.transport_truck! as ImpactFactors).ADPe).toBeCloseTo(
      3.35e-9
    );
    expect((testCardImpacts.components.transport_plane! as ImpactFactors).ADPe).toBeCloseTo(
      1.39e-6
    );
    expect((testCardImpacts.components.transport_boat! as ImpactFactors).ADPf).toBeCloseTo(0);
    expect((testCardImpacts.components.transport_truck! as ImpactFactors).ADPf).toBeCloseTo(1.19);
    expect(
      Math.round((testCardImpacts.components.transport_plane! as ImpactFactors).ADPf)
    ).toBeCloseTo(4.94e2);
  });

  it("computes the total for each life cycle step for each impact criteria", () => {
    const testCardImpacts = computeImpacts(testCard);

    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(testCardImpacts);

    expect(totalsPerLifeCycleStep.manufacturing.ADPe).toBeCloseTo(8.94e-3);
    expect(totalsPerLifeCycleStep.transport.ADPe).toBeCloseTo(1.39e-6);
    expect(totalsPerLifeCycleStep.use.ADPe).toEqual(0);
    expect(totalsPerLifeCycleStep.manufacturing.ADPf).toBeGreaterThanOrEqual(3.19e3);
    expect(Math.round(totalsPerLifeCycleStep.transport.ADPf)).toBeCloseTo(4.95e2);
    expect(totalsPerLifeCycleStep.use.ADPf).toEqual(0);
    expect(Math.round(totalsPerLifeCycleStep.endOfLife.ADPf)).toEqual(3.2e1);
    expect(totalsPerLifeCycleStep.manufacturing.CTUh_c).toBeCloseTo(2.28e-5);
    expect(totalsPerLifeCycleStep.transport.CTUh_c).toBeCloseTo(5.36e-10);
    expect(totalsPerLifeCycleStep.use.CTUh_c).toBeCloseTo(0);
    expect(totalsPerLifeCycleStep.endOfLife.CTUh_c).toBeCloseTo(9.43e-9);
    expect(totalsPerLifeCycleStep.manufacturing.CTUh_nc).toBeCloseTo(6.94e-6);
    expect(totalsPerLifeCycleStep.transport.CTUh_nc).toBeCloseTo(2.81e-8);
    expect(totalsPerLifeCycleStep.use.CTUh_nc).toBeCloseTo(0);
    expect(totalsPerLifeCycleStep.endOfLife.CTUh_nc).toBeCloseTo(9.43e-9);
    expect(totalsPerLifeCycleStep.manufacturing.Epm).toBeCloseTo(1.6e-1);
    expect(totalsPerLifeCycleStep.transport.Epm).toBeCloseTo(6.64e-2);
    expect(totalsPerLifeCycleStep.use.Epm).toBeCloseTo(0);
    expect(totalsPerLifeCycleStep.endOfLife.Epm).toBeCloseTo(3.57e-2);
  });

  it("computes the total for each impact criteria", () => {
    const testCardImpacts = computeImpacts(testCard);

    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(testCardImpacts);
    const totalsPerCriteria = computeTotalsPerCriteria(totalsPerLifeCycleStep);

    expect(totalsPerCriteria.ADPe).toBeCloseTo(8.95e-3);
    expect(Math.round(totalsPerCriteria.ADPf)).toBeCloseTo(3.721e3);
    expect(totalsPerCriteria.AP).toBeCloseTo(1.75);
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
    expect(tidyImpactFactors[lastIndex].value).toBeCloseTo(3.67e1, 1);
  });

  it("returns a tidy data format for impact factors with columns for impact criteria total and graphics card component", () => {
    const testCardImpacts = computeImpacts(testCard);
    const tidyImpactFactors = tidy(testCardImpacts);
    const tidyImpactFactorsPerComponent = tidyTotalsPerComponent(tidyImpactFactors);

    const lastIndex = tidyImpactFactorsPerComponent.length - 1;

    console.log(tidyImpactFactorsPerComponent);
    expect(tidyImpactFactorsPerComponent[0].component).toEqual("casing");
    expect(tidyImpactFactorsPerComponent[0].impactCriterion).toEqual("ADPe");
    expect(tidyImpactFactorsPerComponent[0].value).toBeCloseTo(3.91e-4);
    expect(tidyImpactFactorsPerComponent[lastIndex].component).toEqual("end_of_life");
    expect(tidyImpactFactorsPerComponent[lastIndex].impactCriterion).toEqual("WU");
    expect(Math.round(tidyImpactFactorsPerComponent[lastIndex].value)).toBeCloseTo(1.187e3, 1);
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

    expect(planetBoundariesFactors.ADPe).toBeCloseTo(3.27e-1);
    expect(planetBoundariesFactors.ADPf).toBeCloseTo(1.33e-1);
    expect(planetBoundariesFactors.AP).toBeCloseTo(1.4e-2);
    expect(planetBoundariesFactors.CTUe).toBeCloseTo(2.99e-1);
    expect(planetBoundariesFactors.CTUh_c).toBeCloseTo(1.9e-1);
    expect(planetBoundariesFactors.CTUh_nc).toBeCloseTo(1.44e-2);
    expect(planetBoundariesFactors.Epf).toBeCloseTo(3.1e-3);
    expect(planetBoundariesFactors.Epm).toBeCloseTo(1.05e-2);
    expect(planetBoundariesFactors.Ept).toBeCloseTo(3.18e-3, 1);
    expect(planetBoundariesFactors.GWP).toBeCloseTo(3.21e-1);
    expect(planetBoundariesFactors.IR).toBeCloseTo(5.46e-3);
    expect(planetBoundariesFactors.ODP).toBeCloseTo(1.41e-3);
    expect(planetBoundariesFactors.PM).toBeCloseTo(1.52e-1);
    expect(planetBoundariesFactors.POCP).toBeCloseTo(1.44e-2);
    expect(planetBoundariesFactors.WU).toBeCloseTo(5.64e-2);
  });

  it("returns a tidy data format for the ratios of graphics cards impact factors to planet boundaries", () => {
    const h100Parameters = Gpus.filter((card) => card.name.includes("H100"))[0];
    const h100Impacts = computeImpacts(h100Parameters);
    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(h100Impacts);
    const totalsPerCriteria = computeTotalsPerCriteria(totalsPerLifeCycleStep);

    const tidiedFactors = tidyPlanetBoundaries(totalsPerCriteria);

    expect(tidiedFactors.length).toEqual(15);
    expect(tidiedFactors[0].impactCriterion).toEqual("ADPe");
    expect(tidiedFactors[0].ratioNumber.toFixed(2)).toBeCloseTo(0.33);
    expect(tidiedFactors[0].ratioPercentage).toBeCloseTo(21, 0);
    expect(tidiedFactors[0].totalImpactFactor).toBeCloseTo(5.81e-3);
    expect(tidiedFactors[0].planetBoundaryValue).toBeCloseTo(
      PlanetBoundaries.AbioticDepletionPotentialElements
    );
  });
});
