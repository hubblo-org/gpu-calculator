import type { DataCenterInventoryElement } from "./types/pcr-cloud";
import { InventoryCategories } from "./types/enums";

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
