import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import GpuPlotsSection from "$lib/components/GpuPlotsSection.svelte";

const gpuPlotsSectionName = "Graphics card impact factors";
const gpuSelectionLabel = "Display impact factors by:";
const gpuSelectionOptions = ["Criteria", "Life cycle step"];
describe("graphics card data visualization static elements test suite", () => {
  beforeEach(() => render(GpuPlotsSection));
  afterEach(() => cleanup());
  it("displays a selection between a bar plot showing every criteria, and a bar plot for a specific life cycle step", () => {
    const gpuPlotsSection = screen.getByRole("region", { name: gpuPlotsSectionName });
    const graphSelection = within(gpuPlotsSection).getByLabelText(gpuSelectionLabel);

    gpuSelectionOptions.forEach((option) => {
      const displayedOption = within(graphSelection).getByRole("option", { name: option });
      expect(displayedOption).toBeVisible();
    });
  });
});

describe("graphics card data visualization dynamic elements test suite", () => {
  beforeEach(() => render(GpuPlotsSection));
  afterEach(() => cleanup());
  it("displays a selection between the different life cycle steps when the user has selected a display by life cycle step", async () => {
    const user = userEvent.setup();
    const gpuPlotsSection = screen.getByRole("region", { name: gpuPlotsSectionName });
    const graphSelection = within(gpuPlotsSection).getByLabelText(gpuSelectionLabel);

    const defaultTitle = within(gpuPlotsSection).getByRole("heading", { name: /Manufacturing/i });
    expect(defaultTitle).toBeVisible();

    await user.selectOptions(graphSelection, "End of life");

    const updatedTitle = within(gpuPlotsSection).getByRole("heading", { name: /End of life/i });
    expect(updatedTitle).toBeVisible();
  });
});
