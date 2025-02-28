import type { InventoryCategorySpellings } from "./pcr-cloud";

export enum InventoryCategories {
  Building,
  Cooling,
  Energy,
  EnergyBackup,
  Maintenance,
  Water
}

export function getInventoryCategorySpelling(
  inventoryCategories: InventoryCategories
): InventoryCategorySpellings {
  switch (inventoryCategories) {
    case InventoryCategories.Building:
      return { lowercase: "building", uppercase: "Building" };
    case InventoryCategories.Cooling:
      return { lowercase: "cooling", uppercase: "Cooling" };
    case InventoryCategories.Energy:
      return { lowercase: "energy", uppercase: "Energy" };
    case InventoryCategories.EnergyBackup:
      return { lowercase: "energy_backup", uppercase: "Energy backup" };
    case InventoryCategories.Maintenance:
      return { lowercase: "maintenance", uppercase: "Maintenance" };
    case InventoryCategories.Water:
      return { lowercase: "water", uppercase: "Water" };
  }
}
