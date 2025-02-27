import BuildingForm from "$lib/components/BuildingForm.svelte";
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
});
