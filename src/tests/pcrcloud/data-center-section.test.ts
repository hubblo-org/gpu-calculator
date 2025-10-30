import { dataCenterCharacteristics } from "$mocks/dc-data";
import { inventoryWithImpact } from "$mocks/dc-data";
import { DataCenter } from "$lib/data-center.svelte";
import DataCenterSection from "$lib/components/DataCenterSection.svelte";
import type { DataCenterCharacteristic } from "$lib/types/pcr-cloud";
import { CoolingSystems, Countries, ElectricalTechnicalResilienceTiers } from "$lib/types/enums";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

const dataCenter = new DataCenter(dataCenterCharacteristics, inventoryWithImpact);
const dataCenterDescription = "A data center";
const displayDataCenterCharacteristicsButtonDescription =
  "Display the data center secondary parameters";
const hideDataCenterCharacteristicsButtonDescription =
  "Hide the data center secondary parameters";

const dataCenterMainCharacteristicsLabels = [
  "Building total surface",
  "Total IT energy for one year",
  "Power Usage Effectiveness",
  "Water Usage Effectiveness",
  "Concrete volume",
  "Building lifespan",
  "Location",
  "Steel mass"
];

function filterByLabel(value: DataCenterCharacteristic) {
  if (
    value.label === "Electrical Technical Resilience" ||
    value.label === "Maximum usable electrical power" ||
    value.label === "Location" ||
    value.label === "Load factor" ||
    value.label === "Cooling system type" ||
    value.label === "Energy Reuse Factor" ||
    value.label === "Renewable Energy Factor" ||
    value.label === "Cooling system type" ||
    value.label === "Designed floor assembly surface"
  ) {
    return false;
  }
  return true;
}

describe("data center component static elements test suite", () => {
  beforeEach(() => render(DataCenterSection, { props: { dc: dataCenter } }));
  afterEach(() => cleanup());

  it("should have a section for displaying the data center parameters", () => {
    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center parameters/
    });
    expect(dataCenterCharacteristicsSection).toBeVisible();
  });

  it("should display a link to go back to the table of contents section", () => {
    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center parameters/
    });
    const scrollBackLink = within(dataCenterCharacteristicsSection).getByRole("link", {
      name: "Scroll back to table of contents"
    });
    expect(scrollBackLink).toBeVisible();
  });

  it("should display the main data center parameters, that can be modified by the user", () => {
    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center parameters/
    });
    dataCenterMainCharacteristicsLabels.forEach((characteristicLabel) => {
      const characteristicInput = within(dataCenterCharacteristicsSection).getByLabelText(
        characteristicLabel,
        { exact: false }
      );
      expect(characteristicInput).toBeVisible();
    });
  });

  it("should display placeholder values for all data center characteristic inputs", async () => {
    const user = userEvent.setup();

    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center parameters/
    });
    const displaySecondaryCharacteristicsButton = within(
      dataCenterCharacteristicsSection
    ).getByRole("button", { name: displayDataCenterCharacteristicsButtonDescription });
    await user.click(displaySecondaryCharacteristicsButton);

    Object.values(dataCenterCharacteristics)
      .filter(filterByLabel)
      .forEach(async (characteristic) => {
        const characteristicInput = within(dataCenterCharacteristicsSection).getByLabelText(
          characteristic.label,
          { exact: false }
        );
        const content = await within(characteristicInput).findByText(characteristic.value);
        expect(content).toBeVisible();
      });
  });

  it("should display the secondary data center parameters after the user interacted with an element for that purpose", async () => {
    const user = userEvent.setup();

    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center parameters/
    });
    const displaySecondaryCharacteristicsButton = within(
      dataCenterCharacteristicsSection
    ).getByRole("button", { name: displayDataCenterCharacteristicsButtonDescription });
    await user.click(displaySecondaryCharacteristicsButton);

    Object.values(dataCenterCharacteristics)
      .filter(filterByLabel)
      .forEach((characteristic) => {
        const characteristicInput = within(dataCenterCharacteristicsSection).getByLabelText(
          characteristic.label,
          { exact: false }
        );
        expect(characteristicInput).toBeVisible();
      });
  });

  it("should display a button to hide the data center secondary parameters if they are visible to the user", async () => {
    const user = userEvent.setup();

    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center parameters/
    });
    const displaySecondaryCharacteristicsButton = within(
      dataCenterCharacteristicsSection
    ).getByRole("button", { name: displayDataCenterCharacteristicsButtonDescription });
    await user.click(displaySecondaryCharacteristicsButton);
    const hideSecondaryCharacteristicsButton = within(dataCenterCharacteristicsSection).getByRole(
      "button",
      { name: hideDataCenterCharacteristicsButtonDescription }
    );
    expect(hideSecondaryCharacteristicsButton).toBeVisible();
  });

  it("should display an image that gives an idea of the data center scope", () => {
    const dataCenterImage = screen.getByRole("img", { name: dataCenterDescription });
    expect(dataCenterImage).toBeVisible();
  });
  it("should allow to select between the different electrical technical resilience tiers", async () => {
    const user = userEvent.setup();

    const resilienceTiers = Object.values(ElectricalTechnicalResilienceTiers);

    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center parameters/
    });
    const displaySecondaryCharacteristicsButton = within(
      dataCenterCharacteristicsSection
    ).getByRole("button", { name: displayDataCenterCharacteristicsButtonDescription });
    await user.click(displaySecondaryCharacteristicsButton);
    const resilienceTiersSelection = within(dataCenterCharacteristicsSection).getByLabelText(
      "Electrical Technical Resilience tier",
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
      name: /Data center parameters/
    });
    const countriesSelection = within(dataCenterCharacteristicsSection).getByLabelText("Location", {
      exact: false
    });
    countriesNames.forEach((country) => {
      const countryOption = within(countriesSelection).getByRole("option", { name: country });
      expect(countryOption).toBeVisible();
    });
  });

  it("should display a button to recalculate results after the user modified the data center parameters", () => {
    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center parameters/
    });
    const recalculateButton = within(dataCenterCharacteristicsSection).getByRole("button", {
      name: "Recalculate"
    });
    expect(recalculateButton).toBeVisible();
  });

  // Skipping this test for the moment while waiting to implement values for each cooling system type
  it.skip("should allow to select a cooling system", async () => {
    const coolingSystemTypes = Object.values(CoolingSystems);

    const user = userEvent.setup();

    const dataCenterCharacteristicsSection = screen.getByRole("region", {
      name: /Data center parameters/
    });
    const displaySecondaryCharacteristicsButton = within(
      dataCenterCharacteristicsSection
    ).getByRole("button", { name: displayDataCenterCharacteristicsButtonDescription });
    await user.click(displaySecondaryCharacteristicsButton);
    const coolingSystemsSelection = within(dataCenterCharacteristicsSection).getByLabelText(
      "Cooling system type",
      {
        exact: false
      }
    );
    coolingSystemTypes.forEach((coolingSystem) => {
      const coolingSystemOption = within(coolingSystemsSelection).getByRole("option", {
        name: coolingSystem
      });
      expect(coolingSystemOption).toBeVisible();
    });
  });
});
