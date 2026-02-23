import { it, describe, expect, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import Results from "$lib/components/Results.svelte";
import Gpus from "../../data/gpu/gpus.json";
import { Card } from "$lib/gpu/gpu.svelte";

const defaultCard = Gpus.filter((gpu) => gpu.name === "NVIDIA A100 PCIe 40GB")[0];

const card = new Card(defaultCard);

const resultsSectionName = "Results";

describe("equivalents component test suite", () => {
  beforeEach(() => render(Results, { props: { card } }));
  afterEach(() => cleanup());

  it("displays the results for a selection of impacts criteria", async () => {
    const resultsSection = screen.getByRole("region", { name: resultsSectionName });
    const adpf = "adpf";
    const gwp = "gwp";
    const adpe = "adpe";

    const resultsList = within(resultsSection).getByRole("list", {
      name: "Results"
    });

    const totalAdpf = within(resultsList).getByRole("listitem", {
      name: adpf
    });
    const totalGwp = within(resultsList).getByRole("listitem", {
      name: gwp
    });
    const totalAdpe = within(resultsList).getByRole("listitem", {
      name: adpe
    });

    expect(totalAdpe).toBeVisible();
    expect(totalGwp).toBeVisible();
    expect(totalAdpf).toBeVisible();

    expect(totalAdpf).toHaveTextContent(`Depletion of fossil resources ${card.totalsPerCriteria?.ADPf?.toFixed(2)} microjoules`);
    expect(totalGwp).toHaveTextContent(
      `Global warming potential ${card.totalsPerCriteria?.GWP?.toFixed(2)} kilograms CO² equivalent`
    );
    expect(totalAdpe).toHaveTextContent(
      `Depletion of mineral resources ${card.totalsPerCriteria?.ADPe?.toFixed(5)} kilograms antimony equivalent`
    );
  });
});
