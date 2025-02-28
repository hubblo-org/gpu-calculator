import BuildingForm from "$lib/components/BuildingForm.svelte";
import { CoolingSystems, ElectricalTechnicalResilienceTiers } from "$lib/types/enums";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

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
});
