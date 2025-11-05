import { describe, expect, it } from "vitest";
import { computeAverageModel } from "$lib/gpu/calculations";
import type { GraphicsCard, GraphicsCardImpactFactors } from "$lib/types/gpu";
import GpusImpactFactors from "../../data/gpu/gpus_impact_factors.json";
import Gpus from "../../data/gpu/gpus.json";

describe("graphics card calculator utilitary methods test suite", () => {
  it("computes an average model of a graphics card with impact factors", () => {
    const impactFactors: GraphicsCardImpactFactors[] = GpusImpactFactors;
    const graphicsCards: GraphicsCard[] = Gpus;
    const averageModel = computeAverageModel(graphicsCards, impactFactors);
    expect(averageModel.graphics_card).toEqual("average");
    expect(averageModel.components.casing.manufacturing_GWP).toEqual(4.08e-4);
    expect(averageModel.components.heatsink.manufacturing_GWP).toEqual(1.87e-3);
    expect(averageModel.components.printed_wiring_board.manufacturing_GWP).toEqual(1.27e-5);
  });
});
