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

    expect(Math.floor(averageModel.components.casing.manufacturing_ADPe!)).toEqual(
      Math.floor(4.08e-4)
    );
    expect(Math.floor(averageModel.components.heatsink.manufacturing_ADPe!)).toEqual(
      Math.floor(1.87e-3)
    );
    expect(Math.floor(averageModel.components.printed_wiring_board.manufacturing_ADPe!)).toEqual(
      Math.floor(1.27e-5)
    );
    expect(Math.floor(averageModel.components.graphics_processing_unit.manufacturing_ADPe!)).toEqual(
      Math.floor(1.55e-8)
    );
    expect(Math.floor(averageModel.components.video_ram.manufacturing_ADPe!)).toEqual(
      Math.floor(5.07e-9)
    );
    expect(Math.floor(averageModel.components.upstream_transport.manufacturing_ADPe!)).toEqual(
      Math.floor(1.02e-8)
    );
    expect(Math.floor(averageModel.components.end_of_life.manufacturing_ADPe!)).toEqual(
      Math.floor(0)
    );
    expect(Math.floor(averageModel.components.casing.manufacturing_GWP!)).toEqual(
      Math.floor(8.25e2)
    );
    expect(Math.floor(averageModel.components.heatsink.manufacturing_GWP!)).toEqual(
      Math.floor(5.74e2)
    );
    expect(Math.floor(averageModel.components.printed_wiring_board.manufacturing_GWP!)).toEqual(
      Math.floor(325e-2)
    );
    expect(Math.floor(averageModel.components.graphics_processing_unit.manufacturing_GWP!)).toEqual(
      Math.floor(426e-2)
    );
    expect(Math.floor(averageModel.components.video_ram.manufacturing_GWP!)).toEqual(
      Math.floor(184e-1)
    );
    expect(Math.floor(averageModel.components.upstream_transport.manufacturing_GWP!)).toEqual(
      Math.floor(2.60e-1)
    );
    expect(Math.floor(averageModel.components.end_of_life.manufacturing_GWP!)).toEqual(
      Math.floor(0)
    );
  });
});
