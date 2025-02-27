import type { DataCenterInventoryElement } from "./types/pcr-cloud";
import { InventoryCategories } from "./types/enums";

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
    const inventoryElement: DataCenterInventoryElement = {
      name: inventoryElementName?.value,
      category: inventoryElementCategory?.value as InventoryCategories,
      quantity: parseInt(inventoryElementQuantity?.value),

      lifespan: parseInt(inventoryElementLifespan?.value)
    };
    inventory.push(inventoryElement);
    return inventory;
}
