import type { GraphicsCard, GraphicsCardImpactFactors, TidyImpactFactor } from "$lib/types/gpu";
import GraphicsCards from "../../data/gpu/gpus.json";
import GraphicsCardsImpactFactors from "../../data/gpu/gpus_impact_factors.json";
import { computeImpacts, tidy } from "./calculations";

export class Card {
  name = $state<string>();
  totalWeight = $state<number>();
  casingWeight = $state<number>();
  heatsinkWeight = $state<number>();
  cardSurface = $state<number>();
  videoRamSize = $state<number>();
  videoRamDies = $state<number>();
  videoRamDieSurface? = $state<number>();
  gpuSurface = $state<number>();
  impactFactors = $state<GraphicsCardImpactFactors>();
  tidyImpactFactors = $state<TidyImpactFactor[]>();

  constructor(card: GraphicsCard, cardImpactFactors: GraphicsCardImpactFactors) {
    this.name = card.name;
    this.totalWeight = card.totalWeight;
    this.casingWeight = card.casingWeight;
    this.heatsinkWeight = card.heatsinkWeight;
    this.cardSurface = card.cardSurface;
    this.videoRamDies = card.videoRamDies;
    this.videoRamSize = card.videoRamSize;
    this.videoRamDieSurface = card.videoRamDieSurface ? card.videoRamDieSurface : 0;
    this.gpuSurface = card.gpuSurface;
    this.impactFactors = cardImpactFactors;
    this.tidyImpactFactors = tidy(this.impactFactors);
  }

  selectDocumentedCard(cardName: string) {
    const selectedCard = GraphicsCards.filter((gc) => gc.name === cardName)[0];
    const selectedCardImpactFactors = GraphicsCardsImpactFactors.filter(
      (impacts) => impacts.graphics_card === cardName
    )[0];

    this.name = selectedCard.name;
    this.totalWeight = selectedCard.totalWeight;
    this.casingWeight = selectedCard.casingWeight;
    this.heatsinkWeight = selectedCard.heatsinkWeight;
    this.cardSurface = selectedCard.cardSurface;
    this.videoRamDies = selectedCard.videoRamDies;
    this.videoRamSize = selectedCard.videoRamSize;
    this.videoRamDieSurface = selectedCard.videoRamDieSurface ? selectedCard.videoRamDieSurface : 0;
    this.gpuSurface = selectedCard.gpuSurface;
    this.impactFactors = selectedCardImpactFactors;
    this.tidyImpactFactors = tidy(this.impactFactors);
  }

  new() {
    this.name = "Custom";
    this.totalWeight = 0;
    this.casingWeight = 0;
    this.heatsinkWeight = 0;
    this.cardSurface = 0;
    this.videoRamDies = 0;
    this.videoRamSize = 0;
    this.videoRamDieSurface = 0;
    this.gpuSurface = 0;
  }
}
