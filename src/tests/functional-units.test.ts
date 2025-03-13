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
import { getImpactCriteria, ImpactCriterias } from "$lib/types/enums";
import type {  ImpactFactors } from "$lib/types/pcr-cloud";

const gwpAcronym = getImpactCriteria(ImpactCriterias.GlobalWarmingPotential).acronym as keyof ImpactFactors;
describe("impact factors computation test suite", () => {
  it("computes the total global warming potential impact factor for an inventory element, for each life cycle step", () => {
    const firstInventoryElementQuantity = firstInventoryElement.quantity;
    const firstInventoryElementLifespan = firstInventoryElement.lifespan;
    const studyDuration = 1;

    inventoryElementLifeCycleSteps.forEach((lifeCycleStep) => {
      inventoryElementImpactFactors.forEach((elementImpact) => {
        if (elementImpact.lifeCycleStep === lifeCycleStep) {
          const gwpValue = elementImpact.impacts.GWP.value;
          const expectedTotalGwp =
            gwpValue *
            firstInventoryElementQuantity *
            (studyDuration / firstInventoryElementLifespan);
          const totalGwp = computeElementImpactFactorForLifespan(
            elementImpact,
            firstInventoryElementQuantity,
            firstInventoryElementLifespan,
            studyDuration,
            gwpAcronym
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
      gwpAcronym
    );
    expect(totalCoolingGwp).toEqual(expectedTotalCoolingGwp);
  });
});
