import { describe, expect, it } from "vitest";
import { computeAverageModel, computeImpacts } from "$lib/gpu/calculations";
import type { GraphicsCard, GraphicsCardImpactFactors } from "$lib/types/gpu";
import GpusImpactFactors from "../../data/gpu/gpus_impact_factors.json";
import Gpus from "../../data/gpu/gpus.json";

describe("graphics card calculator utilitary methods test suite", () => {
  it("computes an average model of a graphics card with impact factors", () => {
    const impactFactors: GraphicsCardImpactFactors[] = GpusImpactFactors;
    const graphicsCards: GraphicsCard[] = Gpus;
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

  it("computes a graphics card impact factors according to the provided parameters", () => {
    const testCard: GraphicsCard = {
      name: "A test graphics card",
      totalWeight: 1234,
      gpuSurface: 234,
      casingWeight: 412,
      heatsinkWeight: 312,
      cardSurface: 123.45,
      videoRamSize: 12,
      videoRamDies: 4,
      videoRamDieSurface: 12.34
    };

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
    console.log(testCardImpacts);
  });
});
