import InventoryTableWithImpacts from "$lib/components/InventoryTableWithImpacts.svelte";
import { ImpactCriterias } from "$lib/types/enums";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import MaterialImpacts from "../mocks/materials_impacts.json";
import type { DataCenterInventoryElementWithImpactFactors } from "$lib/types/pcr-cloud";

const firstElement = MaterialImpacts[0];

const inventoryElement: DataCenterInventoryElementWithImpactFactors = {
  name: firstElement.material_name,
  category: firstElement.category,
  mass: firstElement.mass,
  source: firstElement.source,
  lifeCycleStep: firstElement.lc_step,
  ADPe: firstElement.ADPe,
  ADPf: firstElement.ADPf,
  AP: firstElement.AP,
  CTUe: firstElement.CTUe,
  CTUh: firstElement.CTUh_c,
  CTUh_c: firstElement.CTUh_c,
  CTUh_nc: firstElement.CTUh_nc,
  EPF: firstElement.Epf,
  EPM: firstElement.Epm,
  EPT: firstElement.Ept,
  GWP: firstElement.GWP,
  GWPb: firstElement.GWPb,
  GWPf: firstElement.GWPf,
  GWPlu: firstElement.GWPlu,
  IR: firstElement.IR,
  LU: firstElement.LU,
  MIPS: firstElement.MIPS,
  ODP: firstElement.ODP,
  PM: firstElement.PM,
  POCP: firstElement.POCP,
  TPE: firstElement.TPE,
  WU: firstElement.WU
};
describe("inventory with impacts test suite", () => {
  beforeEach(() => {
    render(InventoryTableWithImpacts, {
      props: { inventoryElementsWithImpacts: [inventoryElement] }
    });
  });
  afterEach(() => {
    cleanup();
  });

  it("displays a table with columns to list each inventory element with its impact factors", () => {
    const inventoryElementsWithImpactsTable = screen.getByRole("table", {
      name: "Data center elements inventory with impact factors"
    });
    const inventoryColumns = ["Name", "Category", "Mass", "Source", "Life-cycle step"];
    const impactCriterias = Object.values(ImpactCriterias);
    impactCriterias.forEach((criteria) => inventoryColumns.push(criteria.toString()));
    inventoryColumns.forEach((inventoryColumn) => {
      const column = within(inventoryElementsWithImpactsTable).getByRole("columnheader", {
        name: inventoryColumn.toString()
      });
      expect(column).toBeVisible();
    });
  });
  it("displays a table with one inventory element and its associated impact factors as a row", () => {
    const inventoryElementsWithImpactsTable = screen.getByRole("table", {
      name: "Data center elements inventory with impact factors"
    });
    const inventoryElementRowHeader = within(inventoryElementsWithImpactsTable).getByRole(
      "rowheader",
      { name: inventoryElement.name }
    );
    expect(inventoryElementRowHeader).toBeVisible();
    screen.debug();

    // Do not want to query element name as a cell
    const inventoryElementValues = Object.values(inventoryElement).filter(
      (value) => value != inventoryElement.name
    );
    inventoryElementValues.forEach((value) => {
      const inventoryElementValues = within(inventoryElementsWithImpactsTable).getAllByRole(
        "cell",
        {
          name: value.toString()
        }
      );
      inventoryElementValues.forEach((value) => expect(value).toBeVisible());
    });
  });
});
