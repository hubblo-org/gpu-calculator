import FunctionalUnit from "$lib/components/FunctionalUnit.svelte";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getAllImpactCriterias } from "$lib/types/enums";
import { LifeCycleSteps } from "$lib/types/enums";

const serverRackDescription = "A server rack";
const resultsAbsoluteValuesCaption =
  "Totals for the functional unit per impact criteria, as absolute values";

const mainImpactCriterias = getAllImpactCriterias().filter(
  (impactCriteria) =>
    impactCriteria.acronym === "GWP" ||
    impactCriteria.acronym === "MIPS" ||
    impactCriteria.acronym === "WU"
);
const lifeCycleSteps = Object.values(LifeCycleSteps);

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
  it("should display impact criterias and life cycle steps as columns for the data center impact factors table", () => {
    const functionalUnitResultsGraphSection = screen.getByRole("region", {
      name: /Functional unit results/
    });
    const resultsAbsoluteValuesTable = within(functionalUnitResultsGraphSection).getByRole(
      "table",
      { name: resultsAbsoluteValuesCaption }
    );
    const lifeCycleColumn = within(resultsAbsoluteValuesTable).getByRole("columnheader", {
      name: "Life cycle step"
    });
    expect(lifeCycleColumn).toBeVisible();
    mainImpactCriterias.forEach((impactCriteria) => {
      const column = within(resultsAbsoluteValuesTable).getByRole("columnheader", {
        name: impactCriteria.acronym
      });
      expect(column).toBeVisible();
    });
    lifeCycleSteps.forEach((lifeCycleStep) => {
      const rowColumn = within(resultsAbsoluteValuesTable).getByRole("rowheader", {
        name: lifeCycleStep
      });
      expect(rowColumn).toBeVisible();
    });
  });
});
