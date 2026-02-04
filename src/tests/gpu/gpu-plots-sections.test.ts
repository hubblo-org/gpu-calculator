import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import GpuPlotsSection from "$lib/components/GpuPlotsSection.svelte";
import { Scopes } from "$lib/types/enums";
import Gpus from "../../data/gpu/gpus.json";
import GpusImpactFactors from "../../data/gpu/gpus_impact_factors.json";
import { Card } from "$lib/gpu/gpu.svelte";

const defaultCard = Gpus.filter((gpu) => gpu.name === "NVIDIA A100 PCIe 40GB")[0];
const defaultCardImpactFactors = GpusImpactFactors.filter(
  (impacts) => impacts.graphics_card === "NVIDIA A100 PCIe 40GB"
)[0];

const card = new Card(defaultCard, defaultCardImpactFactors);

const gpuPlotsSectionName = "Graphics card impact factors";
const gpuSelectionLabel = "Display impact factors by:";
const gpuSelectionOptions = Object.values(Scopes).filter((scope) => typeof scope === "string");

describe("graphics card data visualization static elements test suite", () => {
  beforeEach(() => render(GpuPlotsSection, { props: { card } }));
  afterEach(() => cleanup());

  it("displays a selection between a bar plot for each criteria by life cycle step, a bar plot for each criteria by component, and a bar plot for each criteria related to planet boundaries", () => {
    const gpuPlotsSection = screen.getByRole("region", { name: gpuPlotsSectionName });
    const graphSelection = within(gpuPlotsSection).getByLabelText(gpuSelectionLabel);

    gpuSelectionOptions.forEach((option) => {
      const displayedOption = within(graphSelection).getByRole("option", { name: option });
      expect(displayedOption).toBeVisible();
    });
  });

  it("displays the name of the graphics card", () => {
    const graphicsCardHeading = `${card.name} (${card.parameters?.impactFactorsSource})`;
    const gpuPlotsSection = screen.getByRole("region", { name: gpuPlotsSectionName });
    const graphicsCardName = within(gpuPlotsSection).getByRole("heading", {
      name: graphicsCardHeading
    });
    expect(graphicsCardName).toBeVisible();
  });

  it("displays equivalents in other products for the selected graphics card", async () => {
    const gpuPlotsSection = screen.getByRole("region", { name: gpuPlotsSectionName });
    const adpf = "adpf";
    const gwp = "gwp";
    const adpe = "adpe";

    const equivalentList = within(gpuPlotsSection).getByRole("list", {
      name: "Other products equivalents:"
    });

    const shownEquivalentInOil = within(equivalentList).getByRole("listitem", {
      name: adpf
    });
    const shownEquivalentInKilometers = within(equivalentList).getByRole("listitem", {
      name: gwp
    });
    const shownEquivalentInCopper = within(equivalentList).getByRole("listitem", {
      name: adpe
    });

    expect(shownEquivalentInOil).toBeVisible();
    expect(shownEquivalentInKilometers).toBeVisible();
    expect(shownEquivalentInCopper).toBeVisible();


    expect(shownEquivalentInOil).toHaveTextContent("Depletion of fossil resources: 44 liters of crude oil");
    expect(shownEquivalentInKilometers).toHaveTextContent("Global warming potential: 488 kilometers traveled by car");
    expect(shownEquivalentInCopper).toHaveTextContent("Depletion of mineral resources: 3 kilograms of copper");
  });
});

describe("graphics card data visualization dynamic elements test suite", () => {
  beforeEach(() => render(GpuPlotsSection, { props: { card } }));
  afterEach(() => cleanup());

  it("displays a title for the plot showing manufacturing impact factors by component", async () => {
    const user = userEvent.setup();
    const gpuPlotsSection = screen.getByRole("region", { name: gpuPlotsSectionName });

    const graphSelection = within(gpuPlotsSection).getByLabelText(gpuSelectionLabel);
    await user.selectOptions(graphSelection, Scopes.Component);
    const title = within(gpuPlotsSection).getByRole("heading", {
      name: "Manufacturing impact factors by component"
    });
    expect(title).toBeVisible();
  });

  it("displays a title for the plot showing impact factors related to planet boundaries", async () => {
    const user = userEvent.setup();
    const gpuPlotsSection = screen.getByRole("region", { name: gpuPlotsSectionName });

    const graphSelection = within(gpuPlotsSection).getByLabelText(gpuSelectionLabel);
    await user.selectOptions(graphSelection, Scopes.PlanetBoundary);

    const title = within(gpuPlotsSection).getByRole("heading", {
      name: "Graphics card impact factors related to planet boundaries"
    });
    expect(title).toBeVisible();
  });
});
