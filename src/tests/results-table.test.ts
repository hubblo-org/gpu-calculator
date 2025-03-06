import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { functionalUnitOneResults } from "../mocks/dc-data";
import ResultsTable from "$lib/components/ResultsTable.svelte";
import { ImpactCriterias } from "$lib/types/enums";

describe("results table test suite", () => {
  beforeEach(() => {
    render(ResultsTable, { props: { results: functionalUnitOneResults } });
  });
  afterEach(() => cleanup());
  it("displays a table presenting the computed results for a functional unit", () => {
    const functionalUnitResultsTable = screen.getByRole("table", {
      name: "Functional unit results"
    });
    const amountColumn = within(functionalUnitResultsTable).getByRole("columnheader", {
      name: /Amount/
    });
    const unitColumn = within(functionalUnitResultsTable).getByRole("columnheader", {
      name: /Unit/
    });
    const scopeColumn = within(functionalUnitResultsTable).getByRole("columnheader", {
      name: /Scope/
    });
    expect(amountColumn).toBeVisible();
    expect(unitColumn).toBeVisible();
    expect(scopeColumn).toBeVisible();
    const impactCriterias = Object.values(ImpactCriterias);
    impactCriterias.forEach((criteria) => {
      const criteriaColumn = within(functionalUnitResultsTable).getByRole("columnheader", {
        name: criteria
      });
      expect(criteriaColumn).toBeVisible();
    });
    expect(functionalUnitResultsTable).toBeVisible();
  });
  it("displays a row with the data associated to the computed result", () => {
    const expectedDisplayedRow = functionalUnitOneResults[0];
    const functionalUnitResultsTable = screen.getByRole("table", {
      name: "Functional unit results"
    });
    const impactsValues = Object.values(expectedDisplayedRow.impacts);
    const impacts = impactsValues.join(" ");
    const displayedResults = `${expectedDisplayedRow.scope} ${expectedDisplayedRow.amount} ${expectedDisplayedRow.unit} ${impacts}`;
    const resultRow = within(functionalUnitResultsTable).getByRole("row", {
      name: displayedResults
    });
    expect(resultRow).toBeVisible();
  });
});
