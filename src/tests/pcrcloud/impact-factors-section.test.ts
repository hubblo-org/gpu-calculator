import ImpactFactorsSection from "$lib/components/ImpactFactorsSection.svelte";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  getAllImpactCriteria,
  getImpactCriterionValues,
  ImpactCriterion,
  InventoryCategories,
  LifeCycleSteps
} from "$lib/types/enums";
import { dataCenterCharacteristics, inventoryWithImpact } from "$mocks/dc-data";
import userEvent from "@testing-library/user-event";
import { DataCenter } from "$lib/data-center.svelte";
import type { IF, Leaf, Node } from "$lib/types/pcr-cloud";
import { formatForTreemap, isMainCriterion } from "$lib/inventory";

const resultsAbsoluteValuesCaption =
  "Totals for the functional unit per impact criterion, as absolute values";

const dataCenterImpactFactorsCaption =
  "Data center impact factors per impact criterion, as absolute values";

const dataCenterCategoriesCaption =
  "Data center impact factors per inventory category, as absolute values";

const downloadDataToCsvLabel = "Download data in CSV format";

const downloadGraphToPngLabel = "Download graph in PNG format";

const allImpactCriteria = getAllImpactCriteria();
const mainImpactCriteria = getAllImpactCriteria().filter((impactCriterion) =>
  isMainCriterion(impactCriterion, "acronym")
);

const inventoryCategories = Object.values(InventoryCategories).filter(
  (category) => category != "Energy backup"
);
const lifeCycleSteps = Object.values(LifeCycleSteps);
const dataCenter = new DataCenter(dataCenterCharacteristics, inventoryWithImpact);

const gwp = getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotential);
const tpe = getImpactCriterionValues(ImpactCriterion.TotalPrimaryEnergy);
const wu = getImpactCriterionValues(ImpactCriterion.WaterUse);

const formattedGwpImpactFactors: Node = formatForTreemap(
  gwp.acronym as IF,
  dataCenter.impactFactors!
);

describe("impact factors section table test suite", () => {
  beforeEach(() =>
    render(ImpactFactorsSection, {
      props: {
        source: "data-center",
        impactFactors: dataCenter.impactFactors,
        impactFactorsShares: dataCenter.impactFactorsShares
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
    expect(hideAbsoluteValuesButton).toBeVisible();
  });

  it("should display a link to go back to the table of contents section", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    const scrollBackLink = within(dataCenterImpactFactorsSection).getByRole("link", {
      name: "Scroll back to table of contents"
    });
    expect(scrollBackLink).toBeVisible();
  });
});

describe("impact factors section graphs test suite", () => {
  beforeEach(() =>
    render(ImpactFactorsSection, {
      props: {
        source: "data-center",
        impactFactors: dataCenter.impactFactors!,
        impactFactorsShares: dataCenter.impactFactorsShares!
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

  it("should display a selection of impact criteria to choose from for the treemap representation of data after selecting the treemap view", async () => {
    const user = userEvent.setup();
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });

    const switchDisplayButton = within(dataCenterImpactFactorsSection).getByRole("button", {
      name: "Switch graph display"
    });
    expect(
      within(dataCenterImpactFactorsSection).queryByLabelText("Select an impact criterion")
    ).not.toBeInTheDocument();

    await user.click(switchDisplayButton);

    const impactCriterionSelection = within(dataCenterImpactFactorsSection).getByLabelText(
      "Select an impact criterion"
    );
    expect(impactCriterionSelection).toBeVisible();
    mainImpactCriteria.forEach((impactCriteria) => {
      const option = within(impactCriterionSelection).getByRole("option", {
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
        impactFactors: dataCenter.impactFactors!,
        impactFactorsShares: dataCenter.impactFactorsShares!
      }
    });

    const displayAbsoluteValues = screen.getByRole("button", {
      name: "Display absolute values"
    });
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
    const impactCriterionColumn = within(dataCenterImpactFactorsTable).getByRole("columnheader", {
      name: "Impact criterion"
    });
    expect(impactCriterionColumn).toBeVisible();
    lifeCycleSteps.forEach((lifeCycleStep) => {
      const column = within(dataCenterImpactFactorsTable).getByRole("columnheader", {
        name: lifeCycleStep
      });
      expect(column).toBeVisible();
    });
  });

  it("should display the appropriate units for each of the main impact criterion in the absolute values table", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    const dataCenterImpactFactorsTable = within(dataCenterImpactFactorsSection).getByRole("table", {
      name: dataCenterImpactFactorsCaption
    });
    const mainImpactCriteria = [gwp, tpe, wu];
    mainImpactCriteria.forEach((criterion) => {
      const criterionUnit = within(dataCenterImpactFactorsTable).getByRole("cell", {
        name: criterion.unit
      });
      expect(criterionUnit).toBeVisible();
    });
  });

  it("should display a selection to have a graph display either main impact criteria or all impact criteria", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });

    const resultsOptions = ["Main criteria", "All criteria"];
    const resultsSelection = within(dataCenterImpactFactorsSection).getByLabelText(
      "Select displayed criterion"
    );
    resultsOptions.forEach((option) => {
      const selectableOption = within(resultsSelection).getByRole("option", { name: option });
      expect(selectableOption).toBeVisible();
    });
  });

  it("should display either the main impact criteria as column names or all impact criteria depending on selection for the barplot view", async () => {
    const user = userEvent.setup();
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    const criteriaSelection = within(dataCenterImpactFactorsSection).getByLabelText(
      "Select displayed criterion"
    );
    const dataCenterImpactFactorsTable = within(dataCenterImpactFactorsSection).getByRole("table", {
      name: dataCenterImpactFactorsCaption
    });

    mainImpactCriteria.forEach((impactCriterion) => {
      const criterionColumn = within(dataCenterImpactFactorsTable).getByRole("rowheader", {
        name: impactCriterion.acronym
      });
      expect(criterionColumn).toBeVisible();
    });

    await user.selectOptions(criteriaSelection, "All criteria");

    allImpactCriteria.forEach(async (impactCriterion) => {
      const criterionColumn = await within(dataCenterImpactFactorsTable).findByRole("rowheader", {
        name: impactCriterion.acronym
      });
      expect(criterionColumn).toBeVisible();
    });
  });

  it("should display a table with inventory categories and life cycle steps as columns for the treemap view", async () => {
    const user = userEvent.setup();
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    const switchDisplayButton = within(dataCenterImpactFactorsSection).getByRole("button", {
      name: "Switch graph display"
    });
    await user.click(switchDisplayButton);

    const dataCenterImpactFactorsTable = await within(dataCenterImpactFactorsSection).findByRole(
      "table",
      {
        name: dataCenterCategoriesCaption
      }
    );

    const equipmentColumn = within(dataCenterImpactFactorsTable).getByRole("columnheader", {
      name: "Inventory category"
    });
    expect(equipmentColumn).toBeVisible();

    const measuringUnitColumn = within(dataCenterImpactFactorsTable).getByRole("columnheader", {
      name: "Unit"
    });
    expect(measuringUnitColumn).toBeVisible();

    lifeCycleSteps.forEach((lifeCycleStep) => {
      const lifeCycleColumn = within(dataCenterImpactFactorsTable).getByRole("columnheader", {
        name: lifeCycleStep
      });
      expect(lifeCycleColumn).toBeVisible();
    });

    inventoryCategories.forEach((category) => {
      const categoryColumn = within(dataCenterImpactFactorsTable).getByRole("rowheader", {
        name: category
      });
      expect(categoryColumn).toBeVisible();
    });

    formattedGwpImpactFactors.children?.forEach((child: Node) => {
      child.children?.forEach((impact) => {
        const valueCells = within(dataCenterImpactFactorsTable).getAllByRole("cell", {
          name: (impact as Leaf).value.toString()
        });
        valueCells.forEach((cell) => {
          expect(cell).toBeVisible();
        });
      });
    });
  });

  it("should display the appropriate unit for the selected impact criteria in the unit column of the absolute values table depending on the user selection", async () => {
    const user = userEvent.setup();
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    const switchDisplayButton = within(dataCenterImpactFactorsSection).getByRole("button", {
      name: "Switch graph display"
    });
    await user.click(switchDisplayButton);

    const dataCenterImpactFactorsTable = await within(dataCenterImpactFactorsSection).findByRole(
      "table",
      {
        name: dataCenterCategoriesCaption
      }
    );
    const gwpUnitValues = within(dataCenterImpactFactorsTable).getAllByRole("cell", {
      name: gwp.unit
    });
    gwpUnitValues.forEach((value) => expect(value).toBeVisible());

    const impactCriterionSelection = within(dataCenterImpactFactorsSection).getByLabelText(
      "Select an impact criterion"
    );
    await user.selectOptions(impactCriterionSelection, tpe.acronym);

    const tpeUnitValues = within(dataCenterImpactFactorsTable).getAllByRole("cell", {
      name: tpe.unit
    });
    tpeUnitValues.forEach((value) => expect(value).toBeVisible());
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

  it("should display a button to download the graph as a PNG image", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });

    const downloadGraphToPNG = within(dataCenterImpactFactorsSection).getByRole("button", {
      name: downloadGraphToPngLabel
    });
    expect(downloadGraphToPNG).toBeVisible();
  });
});

describe("absolute values table component for functional unit test suite", () => {
  beforeEach(async () => {
    const user = userEvent.setup();
    render(ImpactFactorsSection, {
      props: {
        source: "functional-unit",
        impactFactors: dataCenter.impactFactors,
        impactFactorsShares: {
          perLifeCycle: dataCenter.impactFactorsShares?.perLifeCycle,
          steps: dataCenter.impactFactorsShares?.steps
        }
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
      name: "Impact criterion"
    });
    expect(impactCriteriaColumn).toBeVisible();
    lifeCycleSteps.forEach((lifeCycleStep) => {
      const column = within(resultsImpactFactorsSection).getByRole("columnheader", {
        name: lifeCycleStep
      });
      expect(column).toBeVisible();
    });
  });

  it("should display the functional unit results absolute values for the main impact criteria", () => {
    const functionalUnitResultsGraphSection = screen.getByRole("region", {
      name: /Functional unit results/
    });
    const resultsImpactFactorsTable = within(functionalUnitResultsGraphSection).getByRole("table", {
      name: resultsAbsoluteValuesCaption
    });

    dataCenter.impactFactors!.forEach((result) => {
      mainImpactCriteria.forEach(async (impactCriterion) => {
        const valueCell = await within(resultsImpactFactorsTable).findByRole("cell", {
          name: result.impacts[impactCriterion.acronym as IF].value.toString()
        });
        expect(valueCell).toBeVisible();
      });
    });
  });
});
