import { describe, expect, it } from "vitest";
import {
  computeAverageModel,
  computeImpacts,
  computeTotalsPerLifeCycleStep,
  computeTotalsPerCriteria,
  tidy,
  tidyPlanetBoundaries,
  tidyTotals,
  computePlanetBoundaries
} from "$lib/gpu/calculations";
import type { GraphicsCard, GraphicsCardImpactFactors } from "$lib/types/gpu";
import GpusImpactFactors from "../../data/gpu/gpus_impact_factors.json";
import Gpus from "../../data/gpu/gpus.json";
import { PlanetBoundaries } from "$lib/types/enums";

describe("average model calculation test suite", () => {
  it("computes an average model of a graphics card with impact factors", () => {
    const impactFactors: GraphicsCardImpactFactors[] = GpusImpactFactors.slice();
    const graphicsCards: GraphicsCard[] = Gpus.slice();
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
    expect(averageModel.components.casing.manufacturing_GWP!).toBeCloseTo(8.25);
    expect(averageModel.components.heatsink.manufacturing_GWP!).toBeCloseTo(5.74);
    expect(averageModel.components.printed_wiring_board.manufacturing_GWP!).toBeCloseTo(3.25e-2);
    expect(averageModel.components.graphics_processing_unit.manufacturing_GWP!).toBeCloseTo(
      4.26e-2
    );
    expect(averageModel.components.video_ram.manufacturing_GWP!).toBeCloseTo(1.84e-1);
    expect(averageModel.components.upstream_transport.manufacturing_GWP!).toBeCloseTo(2.6e-1);
    expect(averageModel.components.end_of_life.manufacturing_GWP!).toBeCloseTo(0);
  });
});
describe("graphics card calculator utilitary methods test suite", () => {
  const testCard: GraphicsCard = {
    name: "A test graphics card",
    totalWeight: 1234,
    gpuSurface: 234,
    casingWeight: 412,
    heatsinkWeight: 312,
    cardSurface: 123.45,
    videoRamCapacity: 12,
    videoRamDies: 4,
    videoRamDieSurface: 12.34
  };

  it("computes a graphics card impact factors according to the provided parameters", () => {
    const testCardImpacts = computeImpacts(testCard);
    expect(testCardImpacts.graphics_card).toEqual(testCard.name);
    expect(testCardImpacts.components.heatsink.manufacturing_ADPe!).toBeCloseTo(5.83e-4);
    expect(testCardImpacts.components.casing.manufacturing_ADPe!).toBeCloseTo(1.68e-4);
    expect(testCardImpacts.components.video_ram.manufacturing_ADPe!).toBeCloseTo(6.25638e-8);
    expect(testCardImpacts.components.printed_wiring_board.manufacturing_ADPe!).toBeCloseTo(
      1.56e-3
    );
    expect(testCardImpacts.components.graphics_processing_unit.manufacturing_ADPe!).toBeCloseTo(
      3.627e-6
    );
    expect(testCardImpacts.components.upstream_transport.manufacturing_ADPe!).toBeCloseTo(
      1.25868e-8
    );
    expect(testCardImpacts.components.end_of_life.manufacturing_ADPe!).toBeCloseTo(0.0);
  });

  it("computes the total for each life cycle step for each impact criteria", () => {
    const testCardImpacts = computeImpacts(testCard);

    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(testCardImpacts);

    expect(totalsPerLifeCycleStep.manufacturing.ADPe).toBeCloseTo(2.31e-3);
    expect(totalsPerLifeCycleStep.transport.ADPe).toEqual(0);
    expect(totalsPerLifeCycleStep.use.ADPe).toEqual(0);
    expect(totalsPerLifeCycleStep.endOfLife.ADPe).toBeCloseTo(5.66e-6);
    expect(totalsPerLifeCycleStep.manufacturing.CTUh_c).not.toBe(undefined);
    expect(totalsPerLifeCycleStep.manufacturing.CTUh_nc).not.toBe(undefined);
  });

  it("computes the total for each impact criteria", () => {
    const testCardImpacts = computeImpacts(testCard);

    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(testCardImpacts);
    const totalsPerCriteria = computeTotalsPerCriteria(totalsPerLifeCycleStep);

    expect(totalsPerCriteria.ADPe).toBeCloseTo(2.31e-3);
  });

  it("returns a tidy data format for impact factors with columns for life cycle step and graphics card component", () => {
    const testCardImpacts = computeImpacts(testCard);
    const tidyImpactFactors = tidy(testCardImpacts);

    const lastIndex = tidyImpactFactors.length - 1;
    expect(tidyImpactFactors.length).toEqual(616);
    expect(tidyImpactFactors[0].component).toEqual("casing");
    expect(tidyImpactFactors[0].lifeCycleStep).toEqual("manufacturing");
    expect(tidyImpactFactors[0].impactCriterion).toEqual("ADPe");
    expect(tidyImpactFactors[0].value).toBeCloseTo(1.68e-4);
    expect(tidyImpactFactors[lastIndex].component).toEqual("end_of_life");
    expect(tidyImpactFactors[lastIndex].lifeCycleStep).toEqual("endoflife");
    expect(tidyImpactFactors[lastIndex].impactCriterion).toEqual("TPE");
    expect(tidyImpactFactors[lastIndex].value).toBeCloseTo(27.58);
  });

  it("returns a tidy data format for impact factors totals with columns for life cycle step and impact criterion", () => {
    const testCardImpacts = computeImpacts(testCard);
    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(testCardImpacts);
    const tidiedTotals = tidyTotals(totalsPerLifeCycleStep);
    expect(tidiedTotals.length).toEqual(88);

    expect(tidiedTotals[0].lifeCycleStep).toEqual("Manufacturing");
    expect(tidiedTotals[0].impactCriterion).toEqual("ADPe");
    expect(tidiedTotals[0].value).toBeCloseTo(2.31e-3);
  });

  it("computes the planet boundaries factors related to human population for the provided graphics card impact factors", () => {
    const h100Impacts = GpusImpactFactors.filter((card) => card.graphics_card.includes("H100"))[0];
    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(h100Impacts);
    const totalsPerCriteria = computeTotalsPerCriteria(totalsPerLifeCycleStep);

    const planetBoundariesFactors = computePlanetBoundaries(totalsPerCriteria);

    expect(planetBoundariesFactors.ADPe).toBeCloseTo(0.21);
    expect(planetBoundariesFactors.ADPf).toBeCloseTo(0.08);
    expect(planetBoundariesFactors.AP).toBeCloseTo(0.01);
    expect(planetBoundariesFactors.CTUe).toBeCloseTo(0.24);
    expect(planetBoundariesFactors.CTUh_c).toBeCloseTo(0.17);
    expect(planetBoundariesFactors.CTUh_nc).toBeCloseTo(0.01);
    expect(planetBoundariesFactors.Epf).toBeCloseTo(0.0);
    expect(planetBoundariesFactors.Epm).toBeCloseTo(0.01);
    expect(planetBoundariesFactors.Ept).toBeCloseTo(0.0);
    expect(planetBoundariesFactors.GWP).toBeCloseTo(0.2);
    expect(planetBoundariesFactors.IR).toBeCloseTo(0.0);
    expect(planetBoundariesFactors.ODP).toBeCloseTo(0.0);
    expect(planetBoundariesFactors.PM).toBeCloseTo(0.1);
    expect(planetBoundariesFactors.POCP).toBeCloseTo(0.01);
    expect(planetBoundariesFactors.WU).toBeCloseTo(0.06);
  });

  it("returns a tidy data format for the ratios of graphics cards impact factors to planet boundaries", () => {
    const h100Impacts = GpusImpactFactors.filter((card) => card.graphics_card.includes("H100"))[0];
    const totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(h100Impacts);
    const totalsPerCriteria = computeTotalsPerCriteria(totalsPerLifeCycleStep);

    const tidiedFactors = tidyPlanetBoundaries(totalsPerCriteria);

    expect(tidiedFactors.length).toEqual(15);
    expect(tidiedFactors[0].impactCriterion).toEqual("ADPe");
    expect(tidiedFactors[0].ratioNumber).toBeCloseTo(0.21);
    expect(tidiedFactors[0].ratioPercentage).toBeCloseTo(18.9, 1);
    expect(tidiedFactors[0].totalImpactFactor).toBeCloseTo(5.81e-3);
    expect(tidiedFactors[0].planetBoundaryValue).toBeCloseTo(
      PlanetBoundaries.AbioticDepletionPotentialElements
    );
  });
});
