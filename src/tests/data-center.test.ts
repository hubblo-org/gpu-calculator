import DataCenter from "$lib/components/DataCenter.svelte";
import {
  Countries,
  ElectricalTechnicalResilienceTiers,
  getAllImpactCriterias,
  LifeCycleSteps
} from "$lib/types/enums";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

const dataCenterDescription = "A data center";
const dataCenterImpactFactorsCaption =
  "Data center impact factors absolute values, per impact criteria";
const displayDataCenterCharacteristicsButtonDescription =
  "Display the data center secondary characteristics";
const hideDataCenterCharacteristicsButtonDescription =
  "Hide the data center secondary characteristics";

const dataCenterMainCharacteristicsLabels = [
  "Building total surface",
  "Total energy for one year",
  "Power Usage Effectiveness",
  "Water Usage Effectiveness",
  "Concrete volume",
  "Electrical Technical Resilience",
  "Location",
  "Steel mass"
];

const dataCenterSecondaryCharacteristicsLabels = [
  "Building lifespan",
  "Technical rooms surface area",
  "Maximum usable electrical power",
  "Load factor",
  "Energy Reuse Factor",
  "Renewable Energy Factor",
  "Cooling system type",
  "Study duration",
  "Designed floor assembly surface",
  "Suspended ceiling surface",
  "Number of lifts",
  "Number of freight lifts",
  "Partition surface"
];

const mainImpactCriterias = getAllImpactCriterias().filter(
  (impactCriteria) =>
    impactCriteria.acronym === "GWP" ||
    impactCriteria.acronym === "MIPS" ||
    impactCriteria.acronym === "WU"
);

const lifeCycleSteps = Object.values(LifeCycleSteps);

describe("data center component static elements test suite", () => {
  beforeEach(() => render(DataCenter));
  afterEach(() => cleanup());
  it("should have a section for displaying the data center characteristics", () => {
    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center characteristics/
    });
    expect(dataCenterCharacteristicsSection).toBeVisible();
  });
  it("should display the main data center characteristics, that can be modified by the user", () => {
    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center characteristics/
    });
    dataCenterMainCharacteristicsLabels.forEach((characteristicLabel) => {
      const characteristicInput = within(dataCenterCharacteristicsSection).getByLabelText(
        characteristicLabel,
        { exact: false }
      );
      expect(characteristicInput).toBeVisible();
    });
  });

  it("should display or hide the secondary data center characteristics after the user interacted with an element for that purpose", async () => {
    const user = userEvent.setup();

    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center characteristics/
    });
    dataCenterSecondaryCharacteristicsLabels.forEach((characteristicLabel) => {
      const characteristicInput = within(dataCenterCharacteristicsSection).queryByLabelText(
        characteristicLabel,
        { exact: false }
      );
      expect(characteristicInput).not.toBeInTheDocument();
    });

    const displaySecondaryCharacteristicsButton = within(
      dataCenterCharacteristicsSection
    ).getByRole("button", { name: displayDataCenterCharacteristicsButtonDescription });
    await user.click(displaySecondaryCharacteristicsButton);

    dataCenterSecondaryCharacteristicsLabels.forEach((characteristicLabel) => {
      const characteristicInput = within(dataCenterCharacteristicsSection).getByLabelText(
        characteristicLabel,
        { exact: false }
      );
      expect(characteristicInput).toBeVisible();
    });

    const hideSecondaryCharacteristicsButton = within(dataCenterCharacteristicsSection).getByRole(
      "button",
      { name: hideDataCenterCharacteristicsButtonDescription }
    );
    await user.click(hideSecondaryCharacteristicsButton);

    dataCenterSecondaryCharacteristicsLabels.forEach((characteristicLabel) => {
      const characteristicInput = within(dataCenterCharacteristicsSection).queryByLabelText(
        characteristicLabel,
        { exact: false }
      );
      expect(characteristicInput).not.toBeInTheDocument();
    });
  });

  it("should display an image that gives an idea of the data center scope", () => {
    const dataCenterImage = screen.getByRole("img", { name: dataCenterDescription });
    expect(dataCenterImage).toBeVisible();
  });
  it("should allow to select between the different electrical technical resilience tiers", () => {
    const resilienceTiers = Object.values(ElectricalTechnicalResilienceTiers);

    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center characteristics/
    });
    const resilienceTiersSelection = within(dataCenterCharacteristicsSection).getByLabelText(
      "Electrical Technical Resilience",
      { exact: false }
    );
    resilienceTiers.forEach((tier) => {
      const tierOption = within(resilienceTiersSelection).getByRole("option", { name: tier });
      expect(tierOption).toBeVisible();
    });
  });
  it("should allow to select a location for the data center", () => {
    const countriesNames = Object.values(Countries);

    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center characteristics/
    });
    const countriesSelection = within(dataCenterCharacteristicsSection).getByLabelText("Location", {
      exact: false
    });
    countriesNames.forEach((country) => {
      const countryOption = within(countriesSelection).getByRole("option", { name: country });
      expect(countryOption).toBeVisible();
    });
  });
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
  it("should display a button allowing to switch the display of the impact factors graphical representation", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    const switchDisplayButton = within(dataCenterImpactFactorsSection).getByRole("button", {
      name: "Switch display"
    });
    expect(switchDisplayButton).toBeVisible();
  });
});
