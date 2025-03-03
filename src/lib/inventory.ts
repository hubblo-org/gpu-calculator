import type { DataCenterInventoryElement } from "./types/pcr-cloud";
import { InventoryCategories } from "./types/enums";

export function validateString(elementValue: string) {
  const numberRegEx = /[0-9]/g;
  if (elementValue.match(numberRegEx)) {
    throw new Error("Contains invalid character");
  } else if (elementValue === "") {
    throw new Error("Must not be an empty string");
  } else {
    return elementValue;
  }
}
export function validateNumber(element: HTMLInputElement) {
  const maybeValidNumber = Number(element.value);

  if (isNaN(maybeValidNumber)) {
    console.log("Not a Number");
    return false;
  } else {
    return Number(element.value);
  }
}

export function validateFloat(element: HTMLInputElement) {
  const validatedNumber = validateNumber(element);
  if (validatedNumber === 0) {
    return 0;
  }
  if (validatedNumber) {
    const convertedToFloat = parseFloat(element.value);
    return convertedToFloat;
  }
}

export function validateInt(element: HTMLInputElement) {
  console.log(element.value);
  const validatedNumber = validateNumber(element);
  if (validatedNumber) {
    const convertedToInteger = parseInt(element.value);
    return convertedToInteger;
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

  const validatedQuantity = validateInt(inventoryElementQuantity);
  const validatedLifespan = validateInt(inventoryElementLifespan);

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
