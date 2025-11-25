import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import AbsoluteValuesTables from "$lib/components/AbsoluteValuesTable.svelte";
import { LifeCycleSteps } from "$lib/types/enums";
import Gpus from "../data/gpu/gpus.json";
import GpusImpactFactors from "../data/gpu/gpus_impact_factors.json";
import { Card } from "$lib/gpu/gpu.svelte";
import { tidyTotals } from "$lib/gpu/calculations";

const defaultCard = Gpus.filter((gpu) => gpu.name === "NVIDIA H100 PCIe 80GB")[0];
const defaultCardImpactFactors = GpusImpactFactors.filter(
  (impacts) => impacts.graphics_card === "NVIDIA H100 PCIe 80GB"
)[0];
const card = new Card(defaultCard, defaultCardImpactFactors);
const criteria = [...new Set(card.tidyTotals!.map((total) => total.impactCriterion))];
const lifeCycleSteps = [...new Set(card.tidyTotals!.map((total) => total.lifeCycleStep))];

const defaultCaption = "Impact factors per life cycle step, absolute values";

describe("absolute values table test suite", () => {
  beforeEach(() =>
    render(AbsoluteValuesTables, {
      props: {
        caption: defaultCaption,
        keyColumn: "impactCriterion",
        keyRow: "lifeCycleStep",
        columns: criteria,
        rows: lifeCycleSteps,
        data: card.tidyTotals
      }
    })
  );
  afterEach(() => cleanup());

  it("displays a title for the rendered table", () => {
    const table = screen.getByRole("table", { name: defaultCaption });
    expect(table).toBeVisible();
  });

  it("displays each impact criteria as table columns", () => {
    const table = screen.getByRole("table", { name: defaultCaption });
    criteria.forEach((criterion) => {
      const column = within(table).getByRole("columnheader", { name: criterion });
      expect(column).toBeVisible();
    });
  });

  it("displays each life cycle step as row headers", () => {
    const table = screen.getByRole("table", { name: defaultCaption });
    lifeCycleSteps.forEach((step) => {
      const row = within(table).getByRole("rowheader", { name: step });
      expect(row).toBeVisible();
    });
  });

  it("displays the absolute value for each criteria and each life cycle step", () => {
    const table = screen.getByRole("table", { name: defaultCaption });
    lifeCycleSteps.forEach((lcStep) => {
      const row = within(table).getByRole("row", { name: lcStep });
      const cells = within(row).getAllByRole("cell");
      const filteredTotals = card.tidyTotals!.filter((total) => total.lifeCycleStep === lcStep);
      cells.forEach((cell) => {
        filteredTotals.forEach((total) => {
          screen.debug();
          expect(cell).toHaveTextContent(total.value.toString());
        });
      });
    });
  });
});
