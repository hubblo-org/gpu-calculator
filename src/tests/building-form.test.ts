import BuildingForm from "$lib/components/BuildingForm.svelte";
import { formatBuildingCharacteristicName } from "$lib/inventory";
import { CoolingSystems, ElectricalTechnicalResilienceTiers } from "$lib/types/enums";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import buildingInventory from "../mocks/building_inventory.json";

describe("building form test suite", () => {
  beforeEach(() => {
    render(BuildingForm);
  });
  afterEach(() => cleanup());

  it("displays a form to input the data center building characteristics", () => {
    const buildingCharacteristicsForm = screen.getByRole("form", {
      name: "Building characteristics form"
    });

    const labels = [
      "Building lifespan",
      "Building total surface",
      "Technical rooms surface area",
      "Maximum usable electrical power",
      "Total energy for one year",
      "Load factor",
      "Power Usage Effectiveness",
      "Water Usage Effectiveness",
      "Energy Reuse Factor",
      "Renewable Energy Factor",
      "Electrical Technical Resilience",
      "Cooling system type",
      "Location",
      "Study duration",
      "Concrete volume",
      "Steel mass",
      "Designed floor assembly surface",
      "Suspended ceiling surface",
      "Number of lifts",
      "Number of freight lifts",
      "Partition surface"
    ];

    labels.forEach((label) => {
      const characteristicInput = within(buildingCharacteristicsForm).getByLabelText(label, {
        exact: false
      });
      expect(characteristicInput).toBeVisible();
    });
  });
  it("displays each electrical technical resilience tiers as options to select from", () => {
    const buildingCharacteristicsForm = screen.getByRole("form", {
      name: "Building characteristics form"
    });
    const electricalTechnicalResilienceSelection = within(
      buildingCharacteristicsForm
    ).getByLabelText("Electrical Technical Resilience", { exact: false });
    const tiers = Object.values(ElectricalTechnicalResilienceTiers);
    tiers.forEach((tier) => {
      const tierOption = within(electricalTechnicalResilienceSelection).getByRole("option", {
        name: tier
      });
      expect(tierOption).toBeVisible();
    });
  });
  it("displays each cooling system as options to select from", () => {
    const buildingCharacteristicsForm = screen.getByRole("form", {
      name: "Building characteristics form"
    });
    const coolingSystemSelection = within(buildingCharacteristicsForm).getByLabelText(
      "Cooling system type",
      { exact: false }
    );
    const coolingSystems = Object.values(CoolingSystems);
    coolingSystems.forEach((coolingSystem) => {
      const coolingSystemOption = within(coolingSystemSelection).getByRole("option", {
        name: coolingSystem
      });
      expect(coolingSystemOption).toBeVisible();
    });
  });
  it("displays a button for submitting the form and validating input building details", () => {
    const buildingCharacteristicsForm = screen.getByRole("form", {
      name: "Building characteristics form"
    });
    const buildingFormSubmitButton = within(buildingCharacteristicsForm).getByRole("button", {
      name: "Submit building details"
    });
    expect(buildingFormSubmitButton).toBeVisible();
  });
  it("displays a summary of the validated building details after clicking on the submit button", async () => {
    const user = userEvent.setup();
    const buildingCharacteristicsForm = screen.getByRole("form", {
      name: "Building characteristics form"
    });

    const buildingFormSubmitButton = within(buildingCharacteristicsForm).getByRole("button", {
      name: "Submit building details"
    });
    const buildingLifespan = within(buildingCharacteristicsForm).getByLabelText(
      "Building lifespan",
      { exact: false }
    );
    const buildingTotalSurface = within(buildingCharacteristicsForm).getByLabelText(
      "Building total surface",
      { exact: false }
    );
    const buildingTechnicalRooms = within(buildingCharacteristicsForm).getByLabelText(
      "Technical rooms",
      { exact: false }
    );
    const buildingMaximumElectricalPower = within(buildingCharacteristicsForm).getByLabelText(
      "Maximum usable electrical",
      { exact: false }
    );
    const buildingTotalEnergy = within(buildingCharacteristicsForm).getByLabelText("Total energy", {
      exact: false
    });
    const buildingLoadFactor = within(buildingCharacteristicsForm).getByLabelText("Load factor");
    const buildingPUE = within(buildingCharacteristicsForm).getByLabelText("Power Usage", {
      exact: false
    });
    const buildingWUE = within(buildingCharacteristicsForm).getByLabelText("Water Usage", {
      exact: false
    });
    const buildingERF = within(buildingCharacteristicsForm).getByLabelText("Energy Reuse", {
      exact: false
    });
    const buildingREF = within(buildingCharacteristicsForm).getByLabelText("Renewable Energy", {
      exact: false
    });
    const buildingResilience = within(buildingCharacteristicsForm).getByLabelText(
      "Electrical Technical Resilience",
      { exact: false }
    );
    const buildingCoolingSystem = within(buildingCharacteristicsForm).getByLabelText(
      "Cooling system",
      { exact: false }
    );
    const buildingLocation = within(buildingCharacteristicsForm).getByLabelText("Location", {
      exact: false
    });
    const buildingStudyDuration = within(buildingCharacteristicsForm).getByLabelText(
      "Study duration",
      { exact: false }
    );
    const buildingConcreteVolume = within(buildingCharacteristicsForm).getByLabelText(
      "Concrete volume",
      { exact: false }
    );
    const buildingSteelMass = within(buildingCharacteristicsForm).getByLabelText("Steel mass", {
      exact: false
    });
    const buildingDesignedFloorSurface = within(buildingCharacteristicsForm).getByLabelText(
      "Designed floor assembly",
      { exact: false }
    );
    const buildingSuspendedCeilingSurface = within(buildingCharacteristicsForm).getByLabelText(
      "Suspended ceiling",
      { exact: false }
    );
    const buildingLifts = within(buildingCharacteristicsForm).getByLabelText("Number of lifts");
    const buildingFreightLifts = within(buildingCharacteristicsForm).getByLabelText(
      "Number of freight lifts",
      { exact: false }
    );
    const buildingPartitionSurface = within(buildingCharacteristicsForm).getByLabelText(
      "Partition surface",
      { exact: false }
    );

    await user.type(buildingLifespan, buildingInventory.lifespan.toString());
    await user.type(buildingTotalSurface, buildingInventory.totalSurface.toString());
    await user.type(buildingTechnicalRooms, buildingInventory.technicalRoomSurface.toString());
    await user.type(
      buildingMaximumElectricalPower,
      buildingInventory.maximumUsableElectricalPower.toString()
    );
    await user.type(buildingTotalEnergy, buildingInventory.yearlyTotalEnergy.toString());
    await user.type(buildingLoadFactor, buildingInventory.dataCenterLoadFactor.toString());
    await user.type(buildingPUE, buildingInventory.powerUsageEffectiveness.toString());
    await user.type(buildingWUE, buildingInventory.waterUsageEffectiveness.toString());
    await user.type(buildingERF, buildingInventory.energyReuseFactor.toString());
    await user.type(buildingREF, buildingInventory.renewableEnergyFactor.toString());
    await user.selectOptions(buildingResilience, buildingInventory.electricalTechnicalResilience);
    await user.selectOptions(buildingCoolingSystem, buildingInventory.coolingSystemType);
    await user.type(buildingLocation, buildingInventory.location);
    await user.type(buildingStudyDuration, buildingInventory.studyDuration.toString());
    await user.type(buildingConcreteVolume, buildingInventory.concreteVolume.toString());
    await user.type(buildingSteelMass, buildingInventory.steelMass.toString());
    await user.type(
      buildingDesignedFloorSurface,
      buildingInventory.designedFloorAssemblySurface.toString()
    );
    await user.type(
      buildingSuspendedCeilingSurface,
      buildingInventory.suspendedCeilingSurface.toString()
    );
    await user.type(buildingLifts, buildingInventory.lifts.toString());
    await user.type(buildingFreightLifts, buildingInventory.freightLifts.toString());
    await user.type(buildingPartitionSurface, buildingInventory.partitionSurface.toString());
    await user.click(buildingFormSubmitButton);

    const buildingKeys = Object.keys(buildingInventory);
    console.log(buildingKeys);
    const formattedBuildingKeys = buildingKeys.map((key) => {
      const formattedKey = formatBuildingCharacteristicName(key);
      return formattedKey;
    });
    console.log(formattedBuildingKeys);
    const buildingInventoryCharacteristics = Object.values(buildingInventory);
    buildingInventoryCharacteristics.forEach((characteristic, index) => {
      const stringValue = `Building ${formattedBuildingKeys[index]} : ${characteristic}`;
      const characteristics = screen.getAllByText(stringValue);
      characteristics.forEach((htmlElement) => expect(htmlElement).toBeVisible());
    });
    expect(buildingCharacteristicsForm).not.toBeVisible();
  });
  it("displays the form if any of the building characteristics has not been input", async () => {
    const user = userEvent.setup();
    const buildingCharacteristicsForm = screen.getByRole("form", {
      name: "Building characteristics form"
    });

    const buildingFormSubmitButton = within(buildingCharacteristicsForm).getByRole("button", {
      name: "Submit building details"
    });
    await user.click(buildingFormSubmitButton);
    expect(buildingCharacteristicsForm).toBeVisible();
  });
});
