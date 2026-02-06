import { it, describe, expect, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import Equivalents from "$lib/components/Equivalents.svelte";
import Gpus from "../../data/gpu/gpus.json";
import { Card } from "$lib/gpu/gpu.svelte";

const defaultCard = Gpus.filter((gpu) => gpu.name === "NVIDIA A100 PCIe 40GB")[0];

const card = new Card(defaultCard);

const equivalentsSectionName = "Equivalents";

describe("equivalents component test suite", () => {
  beforeEach(() => render(Equivalents, { props: { card } }));
  afterEach(() => cleanup());

  it("displays equivalents in other products for the selected graphics card", async () => {
    const equivalentsSection = screen.getByRole("region", { name: equivalentsSectionName });
    const adpf = "adpf";
    const gwp = "gwp";
    const adpe = "adpe";

    const equivalentList = within(equivalentsSection).getByRole("list", {
      name: "Equivalents"
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

    expect(shownEquivalentInOil).toHaveTextContent(
      "Depletion of fossil resources 🛢 193 liters of crude oil"
    );
    expect(shownEquivalentInKilometers).toHaveTextContent(
      "Global warming potential 🚗 2166 kilometers traveled by car"
    );
    expect(shownEquivalentInCopper).toHaveTextContent(
      "Depletion of mineral resources Cu 3 kilograms of copper"
    );
  });
});
