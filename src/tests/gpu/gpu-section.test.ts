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
  "Video RAM capacity",
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

  it("should display the graphics card parameters", () => {
    const gpuParametersSection = screen.getByRole("region", {
      name: gpuSectionName
    });
    graphicsCardParameters.forEach((parameterLabel) => {
      const parameterInput = within(gpuParametersSection).getByLabelText(parameterLabel, {
        exact: false
      });
      expect(parameterInput).toBeVisible();
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
      if (key == "name" || key == "totalWeight" || key == "impactFactorsSource") {
        return;
      }
      const formattedKey = key.split(/(?=[A-Z])/).join(" ");
      const parameterInput = within(gpuParametersSection).getByLabelText(formattedKey, {
        exact: false
      });

      expect(parameterInput).toHaveValue(value);
    });
  });
});

describe("gpu section dynamic elements test suite", () => {
  beforeEach(() => render(GpuSection, { props: { card } }));
  afterEach(() => cleanup());

  it("should display the selected graphics card values after the user clicked on the calculation button", async () => {
    const user = userEvent.setup();
    const l4 = Gpus.filter((card) => card.name.includes("L4"))[0];
    const gpuParametersSection = screen.getByRole("region", {
      name: gpuSectionName
    });

    const graphicsCardsSelection =
      within(gpuParametersSection).getByLabelText("Select a graphics card:");

    const recalculateButton = within(gpuParametersSection).getByRole("button", {
      name: "Recalculate"
    });

    await user.selectOptions(graphicsCardsSelection, l4.name);
    await user.click(recalculateButton);

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
      const parameterInput = within(gpuParametersSection).getByLabelText(parameterLabel, {
        exact: false
      });
      expect(parameterInput).toBeVisible();
      expect(parameterInput).toHaveValue(0);
    });
  });

  it("should display again a documented card parameters when the user selects a card after selecting the custom option", async () => {
    const user = userEvent.setup();

    const h100 = Gpus.filter((card) => card.name.includes("H100"))[0];

    const gpuParametersSection = screen.getByRole("region", {
      name: gpuSectionName
    });

    const graphicsCardsSelection =
      within(gpuParametersSection).getByLabelText("Select a graphics card:");

    await user.selectOptions(graphicsCardsSelection, "Custom");
    await user.selectOptions(graphicsCardsSelection, h100.name);

    graphicsCardParameters.forEach((parameterLabel) => {
      const parameterInput = within(gpuParametersSection).getByLabelText(parameterLabel, {
        exact: false
      });
      expect(parameterInput).toBeVisible();
    });
  });
});
