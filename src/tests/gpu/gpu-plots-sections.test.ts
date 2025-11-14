import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import GpuPlotsSection from "$lib/components/GpuPlotsSection.svelte";
import { LifeCycleSteps, Scopes } from "$lib/types/enums";
import Gpus from "../../data/gpu/gpus.json";
import GpusImpactFactors from "../../data/gpu/gpus_impact_factors.json";
import { Card } from "$lib/gpu/gpu.svelte";

const defaultCard = Gpus.filter((gpu) => gpu.name === "NVIDIA H100 PCIe 80GB")[0];
const defaultCardImpactFactors = GpusImpactFactors.filter(
  (impacts) => impacts.graphics_card === "NVIDIA H100 PCIe 80GB"
)[0];

const card = new Card(defaultCard, defaultCardImpactFactors);

const gpuPlotsSectionName = "Graphics card impact factors";
const gpuSelectionLabel = "Display impact factors by:";
const gpuSelectionOptions = Object.values(Scopes).filter((scope) => typeof scope === "string");
const lifeCycleSelectionLabel = "Select life cycle step:";
const lifeCycleSteps = Object.values(LifeCycleSteps).filter((step) => typeof step === "string");

describe("graphics card data visualization static elements test suite", () => {
  beforeEach(() => render(GpuPlotsSection, { props: { card } }));
  afterEach(() => cleanup());
  it("displays a selection between a bar plot showing every criteria, and a bar plot for a specific life cycle step", () => {
    const gpuPlotsSection = screen.getByRole("region", { name: gpuPlotsSectionName });
    const graphSelection = within(gpuPlotsSection).getByLabelText(gpuSelectionLabel);

    gpuSelectionOptions.forEach((option) => {
      const displayedOption = within(graphSelection).getByRole("option", { name: option });
      expect(displayedOption).toBeVisible();
    });
  });

  it("displays the name of the graphics card", () => {
    const gpuPlotsSection = screen.getByRole("region", { name: gpuPlotsSectionName });
    const graphicsCardName = within(gpuPlotsSection).getByRole("heading", { name: card.name });
    expect(graphicsCardName).toBeVisible();
  });
});

describe("graphics card data visualization dynamic elements test suite", () => {
  beforeEach(() => render(GpuPlotsSection, { props: { card } }));
  afterEach(() => cleanup());
  it("displays a selection between the different life cycle steps when the user has selected a display by life cycle step", async () => {
    const user = userEvent.setup();
    const gpuPlotsSection = screen.getByRole("region", { name: gpuPlotsSectionName });
    const graphSelection = within(gpuPlotsSection).getByLabelText(gpuSelectionLabel);

    await user.selectOptions(graphSelection, Scopes.LifeCycleStep);

    const defaultTitle = within(gpuPlotsSection).getByRole("heading", { name: /Manufacturing/i });
    expect(defaultTitle).toBeVisible();

    const lifeCycleStepsSelection = within(gpuPlotsSection).getByLabelText(lifeCycleSelectionLabel);

    lifeCycleSteps.forEach(async (lcstep) => {
      await user.selectOptions(lifeCycleStepsSelection, lcstep);

      const updatedTitle = await within(gpuPlotsSection).findByRole("heading", {
        name: (content) => content.includes(lcstep)
      });
      expect(updatedTitle).toBeVisible();
    });
  });
});
