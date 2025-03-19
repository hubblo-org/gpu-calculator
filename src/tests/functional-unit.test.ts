import FunctionalUnit from "$lib/components/FunctionalUnit.svelte";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const serverRackDescription = "A server rack";
const resultsAbsoluteValuesCaption =
  "Totals for the functional unit per impact criteria, as absolute values";

describe("functional unit component static elements test suite", () => {
  beforeEach(() => {
    render(FunctionalUnit);
  });
  afterEach(() => {
    cleanup();
  });
  it("should display a section that presents the parameters used in calculating the functional unit", () => {
    const functionalUnitParametersSection = screen.getByRole("region", {
      name: /Functional unit parameters/
    });
    expect(functionalUnitParametersSection).toBeVisible();
  });
  it("should display an image that gives an idea of functional unit scope", () => {
    const serverRackImage = screen.getByRole("img", { name: serverRackDescription });
    expect(serverRackImage).toBeVisible();
  });
  it("should display a section with a graphical representation of the functional unit results", () => {
    const functionalUnitResultsGraphSection = screen.getByRole("region", {
      name: /Functional unit results/
    });
    expect(functionalUnitResultsGraphSection).toBeVisible();
  });
  it("should display a button allowing to change the graph display from barplot to treemap", () => {
    const functionalUnitResultsGraphSection = screen.getByRole("region", {
      name: /Functional unit results/
    });
    const switchGraphDisplayButton = within(functionalUnitResultsGraphSection).getByRole("button", {
      name: /Switch graph display/
    });
    expect(switchGraphDisplayButton).toBeVisible();
  });
  it("should display a table with the absolute values of the results", () => {
    const functionalUnitResultsGraphSection = screen.getByRole("region", {
      name: /Functional unit results/
    });
    const resultsAbsoluteValuesTable = within(functionalUnitResultsGraphSection).getByRole(
      "table",
      { name: resultsAbsoluteValuesCaption }
    );
    expect(resultsAbsoluteValuesTable).toBeVisible();
  });
});
