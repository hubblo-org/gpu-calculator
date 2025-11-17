import type {
  GraphicsCardLifeCycle,
  GraphicsCard,
  GraphicsCardImpactFactors,
  TidyImpactFactor
} from "$lib/types/gpu.d.ts";
import GraphicsCards from "../../data/gpu/gpus.json";
import GraphicsCardsImpactFactors from "../../data/gpu/gpus_impact_factors.json";
import { computeImpacts, computeTotalsPerLifeCycleStep, tidy, tidyTotals } from "./calculations";

export class Card {
  impactFactors = $state<GraphicsCardImpactFactors>();
  totalsPerLifeCycleStep = $state<GraphicsCardLifeCycle>();
  tidyImpactFactors = $state<TidyImpactFactor[]>();
  tidyTotals = $state<TidyImpactFactor[]>();
  parameters = $state<GraphicsCard>();

  constructor(card: GraphicsCard, cardImpactFactors: GraphicsCardImpactFactors) {
    this.parameters = card;
    this.impactFactors = cardImpactFactors;
    this.tidyImpactFactors = tidy(this.impactFactors);
    this.totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(this.impactFactors);
    this.tidyTotals = tidyTotals(this.totalsPerLifeCycleStep);
  }

  selectDocumentedCard(cardName: string) {
    const selectedCard = GraphicsCards.filter((gc) => gc.name === cardName)[0];
    const selectedCardImpactFactors = GraphicsCardsImpactFactors.filter(
      (impacts) => impacts.graphics_card === cardName
    )[0];

    this.parameters = selectedCard;
    this.impactFactors = selectedCardImpactFactors;
    this.tidyImpactFactors = tidy(this.impactFactors);
  }

  new() {
    const customCard: GraphicsCard = {
      name: "Custom",
      totalWeight: 0,
      casingWeight: 0,
      heatsinkWeight: 0,
      cardSurface: 0,
      videoRamSize: 0,
      videoRamDies: 0,
      videoRamDieSurface: 0,
      gpuSurface: 0
    };
    this.parameters = customCard;
  }

  updateImpactFactors() {
    const customCardImpactFactors = computeImpacts(this.parameters!);
    this.impactFactors = customCardImpactFactors;
    this.tidyImpactFactors = tidy(customCardImpactFactors);
    this.totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(this.impactFactors);
    this.tidyTotals = tidyTotals(this.totalsPerLifeCycleStep);
  }
}
