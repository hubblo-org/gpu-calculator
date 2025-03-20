import ImpactFactorsSection from "$lib/components/ImpactFactorsSection.svelte";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getAllImpactCriterias, LifeCycleSteps } from "$lib/types/enums";

const resultsAbsoluteValuesCaption =
  "Totals for the functional unit per impact criteria, as absolute values";

const dataCenterImpactFactorsCaption =
  "Data center impact factors absolute values, per impact criteria";

const mainImpactCriterias = getAllImpactCriterias().filter(
  (impactCriteria) =>
    impactCriteria.acronym === "GWP" ||
    impactCriteria.acronym === "MIPS" ||
    impactCriteria.acronym === "WU"
);

const lifeCycleSteps = Object.values(LifeCycleSteps);

describe("absolute values table component test suite", () => {
  beforeEach(() => render(ImpactFactorsSection, { props: { source: "data-center" } }));

  it("should display a button allowing to switch the display of the impact factors graphical representation", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    const switchDisplayButton = within(dataCenterImpactFactorsSection).getByRole("button", {
      name: "Switch graph display"
    });
    expect(switchDisplayButton).toBeVisible();
  });
});
describe("absolute values for data center impact factors table component test suite", () => {
  beforeEach(() => render(ImpactFactorsSection, { props: { source: "data-center" } }));
  afterEach(() => cleanup());

  it("should have a section for displaying a graphical representation of the data center impact factors", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    expect(dataCenterImpactFactorsSection).toBeVisible();
  });
  it("should display a table with the data center impact factors absolute values", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    const dataCenterImpactFactorsTable = within(dataCenterImpactFactorsSection).getByRole("table", {
      name: dataCenterImpactFactorsCaption
    });
    expect(dataCenterImpactFactorsTable).toBeVisible();
  });
  it("should display impact criterias and life cycle steps as columns for the data center impact factors table", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    const dataCenterImpactFactorsTable = within(dataCenterImpactFactorsSection).getByRole("table", {
      name: dataCenterImpactFactorsCaption
    });
    const lifeCycleColumn = within(dataCenterImpactFactorsTable).getByRole("columnheader", {
      name: "Life cycle step"
    });
    expect(lifeCycleColumn).toBeVisible();
    mainImpactCriterias.forEach((impactCriteria) => {
      const column = within(dataCenterImpactFactorsTable).getByRole("columnheader", {
        name: impactCriteria.acronym
      });
      expect(column).toBeVisible();
    });
    lifeCycleSteps.forEach((lifeCycleStep) => {
      const rowColumn = within(dataCenterImpactFactorsTable).getByRole("rowheader", {
        name: lifeCycleStep
      });
      expect(rowColumn).toBeVisible();
    });
  });
});

describe("absolute values table component for functional unit test suite", () => {
  beforeEach(() => render(ImpactFactorsSection, { props: { source: "functional-unit" } }));
  afterEach(() => cleanup());

  it("should display a section with a graphical representation of the functional unit results", () => {
    const functionalUnitResultsGraphSection = screen.getByRole("region", {
      name: /Functional unit results/
    });
    expect(functionalUnitResultsGraphSection).toBeVisible();
  });
  it("should display a table with the absolute values of the results", () => {
    const functionalUnitResultsGraphSection = screen.getByRole("region", {
      name: /Functional unit results/
    });
    const resultsImpactFactorsSection = within(functionalUnitResultsGraphSection).getByRole(
      "table",
      { name: resultsAbsoluteValuesCaption }
    );
    expect(resultsImpactFactorsSection).toBeVisible();
  });
  it("should display impact criterias and life cycle steps as columns for the data center impact factors table", () => {
    const functionalUnitResultsGraphSection = screen.getByRole("region", {
      name: /Functional unit results/
    });
    const resultsImpactFactorsSection = within(functionalUnitResultsGraphSection).getByRole(
      "table",
      { name: resultsAbsoluteValuesCaption }
    );
    const lifeCycleColumn = within(resultsImpactFactorsSection).getByRole("columnheader", {
      name: "Life cycle step"
    });
    expect(lifeCycleColumn).toBeVisible();
    mainImpactCriterias.forEach((impactCriteria) => {
      const column = within(resultsImpactFactorsSection).getByRole("columnheader", {
        name: impactCriteria.acronym
      });
      expect(column).toBeVisible();
    });
    lifeCycleSteps.forEach((lifeCycleStep) => {
      const rowColumn = within(resultsImpactFactorsSection).getByRole("rowheader", {
        name: lifeCycleStep
      });
      expect(rowColumn).toBeVisible();
    });
  });
});
