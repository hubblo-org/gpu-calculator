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
  it("updates the card impact factors according to the documented impact factors", () => {
    const card = new Card(defaultCard, defaultCardImpactsFactors);
    const newDocumentedCardName = "NVIDIA L4";
    const toBeComputed = false;

    const documentedCardImpactFactors = GraphicsCardsImpactFactors.filter(
      (gc) => gc.graphics_card === newDocumentedCardName
    )[0];

    card.updateImpactFactors(newDocumentedCardName, toBeComputed);

    const components = Object.keys(documentedCardImpactFactors.components);
    const impactCriteria = Object.keys(documentedCardImpactFactors.components.video_ram);
    components.forEach((component) => {
      impactCriteria.forEach((impactCriterion) => {
        expect(card.impactFactors?.components[component][impactCriterion]).toEqual(
          documentedCardImpactFactors.components[component][impactCriterion]
        );
      });
    });
  });
  it("updates the card impact factors according to custom input parameters", () => {
    const card = new Card(defaultCard, defaultCardImpactsFactors);
    const newDocumentedCardName = "Custom";
    const toBeComputed = true;

    card.new();

    card.updateImpactFactors(newDocumentedCardName, toBeComputed);

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
