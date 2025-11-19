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
import {
  computeImpacts,
  computeTotalsPerCriteria,
  computeTotalsPerLifeCycleStep,
  tidy,
  tidyTotals,
  tidyPlanetBoundaries
} from "./calculations";

export class Card {
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
    this.impactFactors = cardImpactFactors;
    this.tidyImpactFactors = tidy(this.impactFactors);
    this.totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(this.impactFactors);
    this.totalsPerCriteria = computeTotalsPerCriteria(this.totalsPerLifeCycleStep);
    this.tidyTotals = tidyTotals(this.totalsPerLifeCycleStep);
    this.tidyRatiosPerPlanetBoundary = tidyPlanetBoundaries(this.totalsPerCriteria);
  }

  selectDocumentedCard(cardName: string) {
    const selectedCard = GraphicsCards.filter((gc) => gc.name === cardName)[0];
    const selectedCardImpactFactors = GraphicsCardsImpactFactors.filter(
      (impacts) => impacts.graphics_card === cardName
    )[0];

    this.parameters = selectedCard;
    this.impactFactors = selectedCardImpactFactors;
    this.tidyImpactFactors = tidy(this.impactFactors);
    this.totalsPerLifeCycleStep = computeTotalsPerLifeCycleStep(this.impactFactors);
    this.totalsPerCriteria = computeTotalsPerCriteria(this.totalsPerLifeCycleStep);
    this.tidyTotals = tidyTotals(this.totalsPerLifeCycleStep);
    this.tidyRatiosPerPlanetBoundary = tidyPlanetBoundaries(this.totalsPerCriteria);
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
    this.totalsPerCriteria = computeTotalsPerCriteria(this.totalsPerLifeCycleStep);
    this.tidyTotals = tidyTotals(this.totalsPerLifeCycleStep);
    this.tidyRatiosPerPlanetBoundary = tidyPlanetBoundaries(this.totalsPerCriteria);
  }

  updatePlotPerCriteria() {
    const lcSteps = Object.values(LifeCycleSteps).filter((lcstep) => typeof lcstep === "string");
    const source = "criteria";
    renderStackedBarPlot(
      source,
      1000,
      600,
      this.tidyTotals!,
      lcSteps,
      "impactCriterion",
      "value",
      "lifeCycleStep"
    );
  }
  updatePlotPerLifeCycleStep(selectedLifeCycleStep: string) {
    const source = "perlcstep";
    const components = Object.keys(this.impactFactors!.components).filter(
      (component) => component != "transport_boat" || "transport_truck"
    );
    const filteredImpactFactors = this.tidyImpactFactors?.filter((impact) => {
      const lcStep =
        selectedLifeCycleStep === LifeCycleSteps.EndOfLife
          ? "endoflife"
          : selectedLifeCycleStep.toLowerCase();
      return impact.lifeCycleStep === lcStep;
    });
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
  updatePlotPerPlanetBoundary(selectedFormat: string) {
    const source = "planetboundary";
    if (selectedFormat === "By number of inhabitants") {
      renderHorizontalBarPlot(
        source,
        1000,
        600,
        this.tidyRatiosPerPlanetBoundary!,
        "ratioNumber",
        "impactCriterion",
        false
      );
    } else if (selectedFormat === "By percentage") {
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
}
