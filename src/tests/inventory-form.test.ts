import InventoryForm from "$lib/components/InventoryForm.svelte";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("inventory form test suite", () => {
  beforeEach(() => {
    render(InventoryForm);
  });
  afterEach(() => cleanup());

  const inventoryElementFormName = "Inventory element form";

  it("displays a form to input a data center inventory elements", () => {
    const inventoryElementForm = screen.getByRole("form", { name: inventoryElementFormName });
    const inventoryElementName = within(inventoryElementForm).getByLabelText(
      "Name of inventory element"
    );
    const inventoryElementCategory = within(inventoryElementForm).getByLabelText(
      "Category of inventory element"
    );
    const inventoryElementQuantity = within(inventoryElementForm).getByLabelText(
      "Quantity of inventory element"
    );
    const inventoryElementLifespan = within(inventoryElementForm).getByLabelText(
      "Lifespan of inventory element"
    );

    expect(inventoryElementForm).toBeVisible();
    expect(inventoryElementName).toBeVisible();
    expect(inventoryElementCategory).toBeVisible();
    expect(inventoryElementQuantity).toBeVisible();
    expect(inventoryElementLifespan).toBeVisible();
  });
  it("displays a selection of categories to select from for the inventory element", () => {
    const inventoryElementCategorySelection = screen.getByLabelText(
      "Category of inventory element"
    );
    const categories = ["Building", "Cooling", "Energy", "Energy backup", "Maintenance", "Water"];
    categories.forEach((category) => {
      const inventoryElementCategory = within(inventoryElementCategorySelection).getByRole(
        "option",
        { name: category }
      );
      expect(inventoryElementCategory).toBeVisible();
    });
  });
});
