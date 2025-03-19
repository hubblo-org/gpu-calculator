import DataCenter from "$lib/components/DataCenter.svelte";
import { Countries, ElectricalTechnicalResilienceTiers } from "$lib/types/enums";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const dataCenterImpactFactorsCaption =
  "Data center impact factors absolute values, per impact criteria";

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
  it("should display a table with the data center impact factors absolute values, per impact criteria", () => {
    const dataCenterImpactFactorsSection = screen.getByRole("region", {
      name: /Data center impact factors/
    });
    const dataCenterImpactFactorsTable = within(dataCenterImpactFactorsSection).getByRole("table", {
      name: dataCenterImpactFactorsCaption
    });
    expect(dataCenterImpactFactorsTable).toBeVisible();
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
