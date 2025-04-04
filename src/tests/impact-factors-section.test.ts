import ImpactFactorsSection from "$lib/components/ImpactFactorsSection.svelte";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getAllImpactCriterias } from "$lib/types/enums";
import { functionalUnitOneResultsWithLc } from "../mocks/dc-data";
import userEvent from "@testing-library/user-event";

const resultsAbsoluteValuesCaption =
  "Totals for the functional unit per impact criteria, as absolute values";

const dataCenterImpactFactorsCaption =
  "Data center impact factors absolute values, per impact criteria";

const downloadDataToCsvLabel = "Download data in CSV format";

const mainImpactCriterias = getAllImpactCriterias().filter(
  (impactCriteria) =>
    impactCriteria.acronym === "GWP" ||
    impactCriteria.acronym === "TPE" ||
    impactCriteria.acronym === "WU"
);

const filteredResults = functionalUnitOneResultsWithLc.filter(
  (result) =>
    result.life_cycle_step != "full_life_cycle" &&
    (result.source === "datacenter_building_fn_except_usage" ||
      result.source === "datacenter_building_fn_usage")
);

const lifeCycleSteps = filteredResults.map((result) => result.life_cycle_step);

describe("impact factors section table test suite", () => {
  beforeEach(() =>
    render(ImpactFactorsSection, {
      props: {
        source: "data-center",
        results: { per_lifecycle: filteredResults, steps: lifeCycleSteps }
      }
    })
  );

  afterEach(() => cleanup());

  it("should display a button to show and hide the absolute values", async () => {
    const user = userEvent.setup();
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });

    const displayAbsoluteValuesButton = within(dataCenterImpactFactorsSection).getByRole("button", {
      name: "Display absolute values"
    });
    await user.click(displayAbsoluteValuesButton);

    expect(
      within(dataCenterImpactFactorsSection).getByRole("table", {
        name: dataCenterImpactFactorsCaption
      })
    ).toBeVisible();

    const hideAbsoluteValuesButton = within(dataCenterImpactFactorsSection).getByRole("button", {
      name: "Hide absolute values"
    });
    await user.click(hideAbsoluteValuesButton);

    expect(
      within(dataCenterImpactFactorsSection).queryByRole("table", {
        name: dataCenterImpactFactorsCaption
      })
    ).not.toBeInTheDocument();
  });
});
describe("impact factors section graphs test suite", () => {
  beforeEach(() =>
    render(ImpactFactorsSection, {
      props: {
        source: "data-center",
        results: { per_lifecycle: filteredResults, steps: lifeCycleSteps }
      }
    })
  );
  afterEach(() => cleanup());

  it("should display a button allowing to switch the display of the impact factors graphical representation", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    const switchDisplayButton = within(dataCenterImpactFactorsSection).getByRole("button", {
      name: "Switch graph display"
    });
    expect(switchDisplayButton).toBeVisible();
  });
  it("should display a selection of impact criterias to choose from for the treemap representation of data after selecting the treemap view", async () => {
    const user = userEvent.setup();
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });

    const switchDisplayButton = within(dataCenterImpactFactorsSection).getByRole("button", {
      name: "Switch graph display"
    });
    expect(
      within(dataCenterImpactFactorsSection).queryByLabelText("Select an impact criteria")
    ).not.toBeInTheDocument();

    await user.click(switchDisplayButton);

    const impactCriteriasSelection = within(dataCenterImpactFactorsSection).getByLabelText(
      "Select an impact criteria"
    );
    expect(impactCriteriasSelection).toBeVisible();
    mainImpactCriterias.forEach((impactCriteria) => {
      const option = within(impactCriteriasSelection).getByRole("option", {
        name: impactCriteria.acronym
      });
      expect(option).toBeVisible();
    });
  });
});

describe("absolute values for data center impact factors table component test suite", () => {
  beforeEach(async () => {
    const user = userEvent.setup();
    render(ImpactFactorsSection, {
      props: {
        source: "data-center",
        results: { per_lifecycle: filteredResults, steps: lifeCycleSteps }
      }
    });
    const displayAbsoluteValues = screen.getByRole("button", { name: "Display absolute values" });
    await user.click(displayAbsoluteValues);
  });
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
  it("should display impact criteria and life cycle steps as columns for the data center impact factors table", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    const dataCenterImpactFactorsTable = within(dataCenterImpactFactorsSection).getByRole("table", {
      name: dataCenterImpactFactorsCaption
    });
    const impactCriteriaColumn = within(dataCenterImpactFactorsTable).getByRole("columnheader", {
      name: "Impact criteria"
    });
    expect(impactCriteriaColumn).toBeVisible();
    lifeCycleSteps.forEach((lifeCycleStep) => {
      const column = within(dataCenterImpactFactorsTable).getByRole("columnheader", {
        name: lifeCycleStep
      });
      expect(column).toBeVisible();
    });
  });

  it("should display a button to download the raw data to a file in CSV format", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });

    const downloadDataToCSV = within(dataCenterImpactFactorsSection).getByRole("button", {
      name: downloadDataToCsvLabel 
    });
    expect(downloadDataToCSV).toBeVisible();
  });
});

describe("absolute values table component for functional unit test suite", () => {
  beforeEach(async () => {
    const user = userEvent.setup();
    render(ImpactFactorsSection, {
      props: {
        source: "functional-unit",
        results: { per_lifecycle: filteredResults, steps: lifeCycleSteps }
      }
    });
    const displayAbsoluteValues = screen.getByRole("button", { name: "Display absolute values" });
    await user.click(displayAbsoluteValues);
  });

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
  it("should display impact criteria and life cycle steps as columns for the functional unit impact factors table", () => {
    const functionalUnitResultsGraphSection = screen.getByRole("region", {
      name: /Functional unit results/
    });
    const resultsImpactFactorsSection = within(functionalUnitResultsGraphSection).getByRole(
      "table",
      { name: resultsAbsoluteValuesCaption }
    );
    const impactCriteriaColumn = within(resultsImpactFactorsSection).getByRole("columnheader", {
      name: "Impact criteria"
    });
    expect(impactCriteriaColumn).toBeVisible();
    lifeCycleSteps.forEach((lifeCycleStep) => {
      const column = within(resultsImpactFactorsSection).getByRole("columnheader", {
        name: lifeCycleStep
      });
      expect(column).toBeVisible();
    });
  });
  it("should display the functional unit results absolute values for the main impact criterias", () => {
    const functionalUnitResultsGraphSection = screen.getByRole("region", {
      name: /Functional unit results/
    });
    const resultsImpactFactorsTable = within(functionalUnitResultsGraphSection).getByRole("table", {
      name: resultsAbsoluteValuesCaption
    });

    filteredResults.forEach((result) => {
      mainImpactCriterias.forEach((impactCriteria) => {
        const valueCell = within(resultsImpactFactorsTable).getByRole("cell", {
          name: result.impacts[impactCriteria.acronym].value
        });
        expect(valueCell).toBeVisible();
      });
    });
  });
});
