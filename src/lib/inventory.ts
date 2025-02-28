import type { DataCenterInventoryElement } from "./types/pcr-cloud";
import { InventoryCategories } from "./types/enums";

export function validateNumber(element: HTMLInputElement) {
  const maybeValidNumber = Number(element.value);

  if (isNaN(maybeValidNumber)) {
    console.log("Not a Number");
    return false;
  } else {
    return Number(element.value);
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

  const validatedQuantity = validateNumber(inventoryElementQuantity);
  const validatedLifespan = validateNumber(inventoryElementLifespan);

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
