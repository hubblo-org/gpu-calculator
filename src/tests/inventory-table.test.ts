import InventoryTable from "$lib/components/InventoryTable.svelte";
import { InventoryCategories, getInventoryCategorySpelling } from "$lib/types/enums";
import type { DataCenterInventoryElement } from "$lib/types/pcr-cloud";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const coolingCategory = getInventoryCategorySpelling(InventoryCategories.Cooling).lowercase;
const energyBackupCategory = getInventoryCategorySpelling(InventoryCategories.EnergyBackup).lowercase;
describe("inventory table test suite", () => {
  const inventoryElements: DataCenterInventoryElement[] = [
    { name: "Drycoolers", category: coolingCategory, quantity: 50, lifespan: 35 },
    {
      name: "Backup diesel generator",
      category: energyBackupCategory,
      quantity: 3,
      lifespan: 45
    }
  ];
  beforeEach(() => {
    render(InventoryTable, { props: { inventoryElements: inventoryElements } });
  });
  afterEach(() => cleanup());

  it("displays a table with each column named for a data center inventory element characteristic", () => {
    const inventoryElementsTable = screen.getByRole("table", {
      name: "Data center inventory elements"
    });
    const columnsNames = ["Name", "Category", "Quantity", "Lifespan"];
    columnsNames.forEach((columnName) => {
      const column = within(inventoryElementsTable).getByRole("columnheader", { name: columnName });
      expect(column).toBeVisible();
    });
  });
  it("displays each data center inventory element as a table row", () => {
    const inventoryElementsTable = screen.getByRole("table", {
      name: "Data center inventory elements"
    });
    inventoryElements.forEach((inventoryElement) => {
      const inventoryElementRowHeader = within(inventoryElementsTable).getByRole("rowheader", {
        name: inventoryElement.name
      });
      const inventoryElementCategory = within(inventoryElementsTable).getByRole("cell", {
        name: inventoryElement.category
      });
      const inventoryElementQuantity = within(inventoryElementsTable).getByRole("cell", {
        name: inventoryElement.quantity.toString()
      });
      const inventoryElementLifespan = within(inventoryElementsTable).getByRole("cell", {
        name: inventoryElement.lifespan.toString()
      });
      expect(inventoryElementRowHeader).toBeVisible();
      expect(inventoryElementCategory).toBeVisible();
      expect(inventoryElementQuantity).toBeVisible();
      expect(inventoryElementLifespan).toBeVisible();
    });
  });
});
