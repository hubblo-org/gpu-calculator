import { Card } from "$lib/gpu/gpu.svelte";
import { describe, expect, it } from "vitest";
import GraphicsCards from "../../../src/data/gpu/gpus.json";
import GraphicsCardsImpactFactors from "../../../src/data/gpu/gpus_impact_factors.json";

const defaultCardName = "NVIDIA A100 PCIe 40GB";

let defaultCard = GraphicsCards.filter((gc) => gc.name === defaultCardName)[0];
let defaultCardImpactsFactors = GraphicsCardsImpactFactors.filter(
  (gc) => gc.graphics_card === defaultCardName
)[0];

describe("card class test suite", () => {
  it("updates the card impact factors according to custom input parameters", () => {
    const card = new Card(defaultCard);
    const newDocumentedCardName = "Custom";

    card.new();

    card.updateImpactFactors(newDocumentedCardName);

    const components = Object.keys(defaultCardImpactsFactors.components);
    const impactCriteria = Object.keys(defaultCardImpactsFactors.components.video_ram).filter(
      (key) => key != "graphics_card" && key != "component"
    );

    components.forEach((component) => {
      impactCriteria.forEach((impactCriterion) => {
        expect(card.impactFactors?.components[component][impactCriterion]).toBeCloseTo(0);
      });
    });
  });
});
