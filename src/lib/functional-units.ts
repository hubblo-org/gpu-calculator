import { ImpactCriterias } from "./types/enums";
import type {
  DataCenterInventoryElement,
  DataCenterInventoryElementWithImpactFactors
} from "./types/pcr-cloud";

export function computeElementImpactFactorForLifespan(
  elementImpactFactors: DataCenterInventoryElementWithImpactFactors,
  elementQuantity: number,
  elementLifespan: number,
  studyDuration: number,
  impactCriteria: ImpactCriterias
) {
  const elementImpactValue = elementImpactFactors[impactCriteria];
  const elementImpactFactorForLifespan = elementImpactValue * elementQuantity * (studyDuration / elementLifespan);
  return elementImpactFactorForLifespan;
}

export function computeCategoryTotalImpactFactor(
  elements: DataCenterInventoryElement[],
  elementsImpactFactors: DataCenterInventoryElementWithImpactFactors[],
  studyDuration: number,
  impactCriteria: ImpactCriterias
) {
  const totalElementsImpacts = elements.map((element) => {
    const elementQuantity = element.quantity;
    const elementLifespan = element.lifespan;
    const filteredImpacts = elementsImpactFactors.filter(
      (elementWithImpacts) => element.name === elementWithImpacts.name
    );
    const totalElementImpacts = filteredImpacts.map((filteredImpact) => {
      return computeElementImpactFactorForLifespan(
        filteredImpact,
        elementQuantity,
        elementLifespan,
        studyDuration,
        impactCriteria
      );
    });
    return totalElementImpacts;
  });

  const total = totalElementsImpacts
    .map((elementImpacts) => {
      return elementImpacts.reduce((total, current) => {
        return total + current;
      }, 0);
    })
    .reduce((total, current) => {
      return total + current;
    }, 0);
  return total;
}
