import type {
  DataCenterInventoryElement,
  ResultWithLifeCycle,
  IF,
  ImpactCriteria,
  ImpactFactorShare,
  Node,
  Leaf,
  OrderedImpactFactors
} from "./types/pcr-cloud";
import { ImpactCriterionAcronym, InventoryCategories, LifeCycleSteps } from "./types/enums";

export function removeRow(inventory: DataCenterInventoryElement[], inventoryName: string) {
  const isElementWithInventoryName = (element: DataCenterInventoryElement) =>
    element.name === inventoryName;
  const rowIndex = inventory.findIndex(isElementWithInventoryName);
  inventory.splice(rowIndex, 1);
}

export function formatBuildingCharacteristicName(buildingCharacteristicName: string) {
  return buildingCharacteristicName.replace(/([A-Z])/g, " $1").trim();
}

export function validateString(elementValue: string): string {
  const numberRegEx = /[0-9]/g;
  if (elementValue.match(numberRegEx)) {
    throw new Error("Contains invalid character");
  } else if (elementValue === "") {
    throw new Error("Must not be an empty string");
  } else {
    return elementValue;
  }
}
export function validateNumber(elementValue: string) {
  const maybeValidNumber = Number(elementValue);

  if (isNaN(maybeValidNumber)) {
    console.log("Not a Number");
    return false;
  } else {
    return Number(elementValue);
  }
}

export function validateFloat(elementValue: string): number {
  const validatedNumber = validateNumber(elementValue);
  if (validatedNumber === 0) {
    return 0;
  } else if (validatedNumber) {
    const convertedToFloat = parseFloat(elementValue);
    return convertedToFloat;
  } else {
    throw new Error("Not convertible to float");
  }
}

export function validateInt(elementValue: string): number {
  const validatedNumber = validateNumber(elementValue);
  if (validatedNumber) {
    const convertedToInteger = parseInt(elementValue);
    return convertedToInteger;
  } else {
    throw new Error("Not convertible to integer");
  }
}

export function addInventoryElement(inventory: DataCenterInventoryElement[]) {
  const inventoryElementName = document.getElementById(
    "inventory-element-name"
  ) as HTMLInputElement;
  const inventoryElementCategory = document.getElementById(
    "inventory-element-category"
  ) as HTMLInputElement;
  const inventoryElementQuantity = document.getElementById(
    "inventory-element-quantity"
  ) as HTMLInputElement;
  const inventoryElementLifespan = document.getElementById(
    "inventory-element-lifespan"
  ) as HTMLInputElement;

  const validatedQuantity = validateInt(inventoryElementQuantity.value);
  const validatedLifespan = validateInt(inventoryElementLifespan.value);

  if (!validatedQuantity || !validatedLifespan) {
    return;
  }

  const inventoryElement: DataCenterInventoryElement = {
    name: inventoryElementName.value,
    category: inventoryElementCategory.value as InventoryCategories,
    quantity: validatedQuantity,

    lifespan: validatedLifespan
  };
  inventory.push(inventoryElement);
  return inventory;
}

export function sortByLifeCycle<Type>(array: Type[], key: keyof Type): Type[] {
  const lifeCycle = Object.values(LifeCycleSteps).map((step) => step.toLowerCase());
  const sortedArray = array.sort((a: Type, b: Type) => {
    return (
      lifeCycle.indexOf((a[key] as string).toLowerCase()) -
      lifeCycle.indexOf((b[key] as string).toLowerCase())
    );
  });
  return sortedArray;
}

export function groupByImpactCriterion(
  impactCriteria: ImpactCriterionAcronym[],
  shares: OrderedImpactFactors
): ImpactFactorShare[][] {
  const groupedResults = impactCriteria.map((impactCriterion) => {
    const group = shares.perLifeCycle.filter(
      (result) => result.impactCriterion === impactCriterion
    );
    const sortedGroup = sortByLifeCycle<ImpactFactorShare>(
      group,
      "lifeCycleStep" as keyof ImpactFactorShare
    );
    return sortedGroup;
  });
  return groupedResults;
}

export function formatForTreemap(impactCriterion: IF, impactFactors: ResultWithLifeCycle[]): Node {
  const lifeCycleSteps = Object.values(LifeCycleSteps);
  return {
    name: "dc_data",
    children: lifeCycleSteps.map((lifeCycle) => {
      const impactsByLifeCycle = impactFactors.filter(
        (result) => result.lifeCycleStep === lifeCycle.toLowerCase()
      );
      const leaves = impactsByLifeCycle.map((result) => {
        const leaf: Leaf = {
          name: result.name,
          category: result.category,
          value: result.impacts[impactCriterion].value
        };
        return leaf;
      });
      return {
        name: lifeCycle,
        children: leaves?.filter((impactFactors) => impactFactors.name != "all_categories")
      };
    })
  };
}

export function isMainCriterion<Type>(value: Type, key: keyof Type): boolean {
  if (
    value[key] === ImpactCriterionAcronym.GWP ||
    value[key] === ImpactCriterionAcronym.TPE ||
    value[key] === ImpactCriterionAcronym.ADPe
  ) {
    return true;
  }
  return false;
}
