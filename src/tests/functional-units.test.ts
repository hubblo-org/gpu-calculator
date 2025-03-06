import { describe, expect, it } from "vitest";
import {
  firstInventoryElement,
  inventoryElementImpactFactors,
  coolingInventoryElements,
  coolingInventoryElementsImpactsFactors,
  inventoryElementLifeCycleSteps
} from "../mocks/dc-data";
import {
  computeElementImpactFactorForLifespan,
  computeCategoryTotalImpactFactor
} from "$lib/functional-units";
import { ImpactCriterias } from "$lib/types/enums";

describe("impact factors computation test suite", () => {
  it("computes the total global warming potential impact factor for an inventory element, for each life cycle step", () => {
    const firstInventoryElementQuantity = firstInventoryElement.quantity;
    const firstInventoryElementLifespan = firstInventoryElement.lifespan;
    const studyDuration = 1;

    inventoryElementLifeCycleSteps.forEach((lifeCycleStep) => {
      inventoryElementImpactFactors.forEach((elementImpact) => {
        if (elementImpact.lifeCycleStep === lifeCycleStep) {
          const gwpValue = elementImpact.GWP;
          const expectedTotalGwp =
            gwpValue *
            firstInventoryElementQuantity *
            (studyDuration / firstInventoryElementLifespan);
          const totalGwp = computeElementImpactFactorForLifespan(
            elementImpact,
            firstInventoryElementQuantity,
            firstInventoryElementLifespan,
            studyDuration,
            ImpactCriterias.GlobalWarmingPotential
          );
          expect(totalGwp).toEqual(expectedTotalGwp);
        }
      });
    });
  });
  it("computes the data center cooling inventory elements impact factors, for each life cycle step", () => {
    const studyDuration = 1;
    const expectedTotalCoolingGwp = 410314.246776544;
    const totalCoolingGwp = computeCategoryTotalImpactFactor(
      coolingInventoryElements,
      coolingInventoryElementsImpactsFactors,
      studyDuration,
      ImpactCriterias.GlobalWarmingPotential
    );
    expect(totalCoolingGwp).toEqual(expectedTotalCoolingGwp);
  });
});
