import GpuSection from "$lib/components/GpuSection.svelte";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import Gpus from "../../data/gpu/gpus.json";
import GpusImpactFactors from "../../data/gpu/gpus_impact_factors.json";
import { Card } from "$lib/gpu/gpu.svelte";

const defaultCard = Gpus.filter((gpu) => gpu.name === "NVIDIA H100 PCIe 80GB")[0];
const defaultCardImpactFactors = GpusImpactFactors.filter(
  (impacts) => impacts.graphics_card === "NVIDIA H100 PCIe 80GB"
)[0];

const card = new Card(defaultCard, defaultCardImpactFactors);

const gpuSectionName = "Graphics card parameters";
const graphicsCardParameters = [
  "Casing weight",
  "Heatsink weight",
  "Graphics card surface",
  "Video RAM size",
  "Video RAM dies",
  "Video RAM die surface",
  "GPU surface"
];

const documentedGraphicsCardsNames = Gpus.map((gpu) => gpu.name);

const h100 = Gpus.filter((card) => card.name.includes("H100"))[0];

describe("gpu section static elements suite", () => {
  beforeEach(() => render(GpuSection, { props: { card } }));
  afterEach(() => cleanup());

  it("should have a section for displaying the graphical card parameters", () => {
    const gpuParametersSection = screen.getByRole("region", { name: gpuSectionName });
    expect(gpuParametersSection).toBeVisible();
  });

  it("should display the graphics card parameters, that cannot be modified by the user for documented graphics card", () => {
    const gpuParametersSection = screen.getByRole("region", {
      name: gpuSectionName
    });
    graphicsCardParameters.forEach((parameterLabel) => {
      const parameterInput = within(gpuParametersSection).getByLabelText(parameterLabel);
      expect(parameterInput).toBeVisible();
      expect(parameterInput).toHaveAttribute("readonly");
    });
  });

  it("should display a selection to allow the user to choose among the documented graphics cards", () => {
    const gpuParametersSection = screen.getByRole("region", {
      name: gpuSectionName
    });
    const graphicsCardsSelection =
      within(gpuParametersSection).getByLabelText("Select a graphics card:");

    documentedGraphicsCardsNames.forEach((graphicsCard) => {
      const cardOption = within(graphicsCardsSelection).getByRole("option", {
        name: graphicsCard
      });
      expect(cardOption).toBeVisible();
    });
  });

  it("should display a custom option among the graphics card selection, to allow the user to enter new graphics card parameters", () => {
    const gpuParametersSection = screen.getByRole("region", {
      name: gpuSectionName
    });
    const graphicsCardsSelection =
      within(gpuParametersSection).getByLabelText("Select a graphics card:");

    const customOption = within(graphicsCardsSelection).getByRole("option", { name: "Custom" });
    expect(customOption).toBeVisible();
  });

  it("should display placeholder values for the default selected graphics card", () => {
    const gpuParametersSection = screen.getByRole("region", {
      name: gpuSectionName
    });

    Object.entries(h100).forEach(([key, value]) => {
      if (key == "name" || key == "totalWeight") {
        return;
      }
      const formattedKey = key.split(/(?=[A-Z])/).join(" ");
      const parameterInput = within(gpuParametersSection).getByLabelText(formattedKey, {
        exact: false
      });

      expect(parameterInput).toHaveValue(value);
    });
  });

  it("should display a button allowing the user to recalculate the graphics card impacts", () => {
    const gpuParametersSection = screen.getByRole("region", {
      name: gpuSectionName
    });
    const cardImpactsCalculationButton = within(gpuParametersSection).getByRole("button", {
      name: "Recalculate"
    });
    expect(cardImpactsCalculationButton).toBeVisible();
  });
});

describe("gpu section dynamic elements test suite", () => {
  beforeEach(() => render(GpuSection, { props: { card } }));
  afterEach(() => cleanup());

  it("should display the selected graphics card values after the user selected it", async () => {
    const user = userEvent.setup();
    const l4 = Gpus.filter((card) => card.name.includes("L4"))[0];
    const gpuParametersSection = screen.getByRole("region", {
      name: gpuSectionName
    });

    const graphicsCardsSelection =
      within(gpuParametersSection).getByLabelText("Select a graphics card:");

    await user.selectOptions(graphicsCardsSelection, l4.name);

    Object.entries(l4).forEach(async ([key, value]) => {
      if (key == "name" || key == "totalWeight") {
        return;
      }
      const formattedKey = key.split(/(?=[A-Z])/).join(" ");
      const parameterInput = await within(gpuParametersSection).findByLabelText(formattedKey, {
        exact: false
      });

      expect(parameterInput).toHaveValue(value);
    });
  });
  it("should allow the user to enter new parameters if the user selected the custom graphics card option", async () => {
    const user = userEvent.setup();

    const gpuParametersSection = screen.getByRole("region", {
      name: gpuSectionName
    });

    const graphicsCardsSelection =
      within(gpuParametersSection).getByLabelText("Select a graphics card:");

    await user.selectOptions(graphicsCardsSelection, "Custom");

    graphicsCardParameters.forEach((parameterLabel) => {
      const parameterInput = within(gpuParametersSection).getByLabelText(parameterLabel);
      expect(parameterInput).toBeVisible();
      expect(parameterInput).not.toHaveAttribute("readonly");
    });
  });

  it("should not allow the user to modify parameters after selecting again a documented graphics card", async () => {
    const user = userEvent.setup();
    const l4 = Gpus.filter((card) => card.name.includes("L4"))[0];

    const gpuParametersSection = screen.getByRole("region", {
      name: gpuSectionName
    });

    const graphicsCardsSelection =
      within(gpuParametersSection).getByLabelText("Select a graphics card:");

    await user.selectOptions(graphicsCardsSelection, "Custom");
    await user.selectOptions(graphicsCardsSelection, l4.name);

    graphicsCardParameters.forEach((parameterLabel) => {
      const parameterInput = within(gpuParametersSection).getByLabelText(parameterLabel);
      expect(parameterInput).toBeVisible();
      expect(parameterInput).toHaveAttribute("readonly");
    });
  });
});
