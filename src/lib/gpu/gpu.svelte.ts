import type {
  GraphicsCardLifeCycle,
  GraphicsCard,
  GraphicsCardImpactFactors,
  ImpactFactors,
  TidyImpactFactor,
  TidyRatio
} from "$lib/types/gpu.d.ts";

import { LifeCycleSteps } from "$lib/types/enums";
import GraphicsCards from "../../data/gpu/gpus.json";
import GraphicsCardsImpactFactors from "../../data/gpu/gpus_impact_factors.json";

import { renderHorizontalBarPlot, renderStackedBarPlot } from "$lib/plots";
import { isNotMipsOrDeee } from "$lib/utils";
import {
  computeImpacts,
  computeTotalsPerCriteria,
  computeTotalsPerLifeCycleStep,
  tidy,
  tidyTotals,
  tidyPlanetBoundaries
} from "./calculations";

export class Card {
  name = $state<string>();
  impactFactors = $state<GraphicsCardImpactFactors>();
  totalsPerLifeCycleStep = $state<GraphicsCardLifeCycle>();
  totalsPerCriteria = $state<ImpactFactors>();
  resultsPerPlanetBoundary = $state<ImpactFactors>();
  tidyImpactFactors = $state<TidyImpactFactor[]>();
  tidyTotals = $state<TidyImpactFactor[]>();
  tidyRatiosPerPlanetBoundary = $state<TidyRatio[]>();
  parameters = $state<GraphicsCard>();

  constructor(card: GraphicsCard, cardImpactFactors: GraphicsCardImpactFactors) {
    this.parameters = card;
    this.name = this.parameters.name;
    this.impactFactors = cardImpactFactors;
    this.tidyImpactFactors = tidy(this.impactFactors);
    this.totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(this.impactFactors);
    this.totalsPerCriteria = computeTotalsPerCriteria(this.totalsPerLifeCycleStep);
    this.tidyTotals = tidyTotals(this.totalsPerLifeCycleStep);
    this.tidyRatiosPerPlanetBoundary = tidyPlanetBoundaries(this.totalsPerCriteria);
  }

  selectDocumentedCard(cardName: string) {
    const selectedCard = GraphicsCards.filter((gc) => gc.name === cardName)[0];
    this.parameters = selectedCard;
  }

  new() {
    const customCard: GraphicsCard = {
      name: "Custom",
      totalWeight: 0,
      casingWeight: 0,
      heatsinkWeight: 0,
      cardSurface: 0,
      videoRamCapacity: 0,
      videoRamDies: 0,
      videoRamDieSurface: 0,
      gpuSurface: 0
    };
    this.parameters = customCard;
  }

  updateImpactFactors(cardName: string) {
    if (cardName === "Custom") {
      const customCardImpactFactors = computeImpacts(this.parameters!);
      this.name = cardName;
      this.impactFactors = customCardImpactFactors;
      this.tidyImpactFactors = tidy(customCardImpactFactors);
      this.totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(this.impactFactors);
      this.totalsPerCriteria = computeTotalsPerCriteria(this.totalsPerLifeCycleStep);
      this.tidyTotals = tidyTotals(this.totalsPerLifeCycleStep);
      this.tidyRatiosPerPlanetBoundary = tidyPlanetBoundaries(this.totalsPerCriteria);
    } else {
      this.name = cardName;
      const selectedCardImpactFactors = GraphicsCardsImpactFactors.filter(
        (impacts) => impacts.graphics_card === cardName
      )[0];

      this.impactFactors = selectedCardImpactFactors;
      this.tidyImpactFactors = tidy(this.impactFactors);
      this.totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(this.impactFactors);
      this.totalsPerCriteria = computeTotalsPerCriteria(this.totalsPerLifeCycleStep);
      this.tidyTotals = tidyTotals(this.totalsPerLifeCycleStep);
      this.tidyRatiosPerPlanetBoundary = tidyPlanetBoundaries(this.totalsPerCriteria);
    }
  }

  updatePlotPerLifeCycleStep() {
    const lcSteps = Object.values(LifeCycleSteps).filter((lcstep) => typeof lcstep === "string");
    const source = "criteria";

    const filteredImpactFactors = this.tidyTotals!.filter(isNotMipsOrDeee);

    renderStackedBarPlot(
      source,
      1000,
      600,
      filteredImpactFactors!,
      lcSteps,
      "impactCriterion",
      "value",
      "lifeCycleStep"
    );
  }

  updatePlotPerComponent() {
    const source = "perlcstep";

    const components = Object.keys(this.impactFactors!.components).filter(
      (component) => component != "transport_boat" || "transport_truck"
    );
    const filteredImpactFactors = this.tidyImpactFactors
      ?.filter((impact) => impact.lifeCycleStep === "manufacturing")
      .filter(isNotMipsOrDeee);

    renderStackedBarPlot(
      source,
      1000,
      600,
      filteredImpactFactors!,
      components,
      "impactCriterion",
      "value",
      "component"
    );
  }

  updatePlotPerPlanetBoundary() {
    const source = "planetboundary";
    renderHorizontalBarPlot(
      source,
      1000,
      600,
      this.tidyRatiosPerPlanetBoundary!,
      "ratioPercentage",
      "impactCriterion",
      false
    );
  }
}
