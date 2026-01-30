import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import AbsoluteValuesTables from "$lib/components/AbsoluteValuesTable.svelte";
import Gpus from "../data/gpu/gpus.json";
import GpusImpactFactors from "../data/gpu/gpus_impact_factors.json";
import { Card } from "$lib/gpu/gpu.svelte";
import type { TidyImpactFactor, TidyRatio } from "$lib/types/gpu";
import userEvent from "@testing-library/user-event";

const defaultCardName = "NVIDIA A100 PCIe 40GB";
const defaultCard = Gpus.filter((gpu) => gpu.name === defaultCardName)[0];
const defaultCardImpactFactors = GpusImpactFactors.filter(
  (impacts) => impacts.graphics_card === defaultCardName
)[0];
const card = new Card(defaultCard, defaultCardImpactFactors);

describe("absolute values table test suite", () => {
  const criteria = [...new Set(card.tidyTotals!.map((total) => total.impactCriterion))];
  const lifeCycleSteps = [...new Set(card.tidyTotals!.map((total) => total.lifeCycleStep))];

  const defaultCaption = `${card.name} impact factors per life cycle step, absolute values`;

  beforeEach(async () => {
    render(AbsoluteValuesTables, {
      props: {
        caption: defaultCaption,
        keyColumn: "impactCriterion",
        keyRow: "lifeCycleStep",
        columns: criteria,
        rows: lifeCycleSteps,
        data: card.tidyTotals
      }
    });

    const user = userEvent.setup();
    const summary = screen.getByText("Show absolute values table");
    await user.click(summary);
  });
  afterEach(() => cleanup());

  it("displays a title for the rendered table", async () => {
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

      cells.forEach((cell, index) => {
        expect(cell.innerText).toBeCloseTo(filteredTotals[index].value.toExponential(2).toString());
      });
    });
  });
  it("displays a clickable element allowing the user to show or hide the absolute values table", () => {
    const details = screen.getByRole("group");
    const summary = within(details).getByText("Show absolute values table");
    expect(summary).toBeVisible();
  });
});

describe("absolute values table for planet boundaries test suite", () => {
  const planetBoundariesCaption = `${card.name} impact factors related to planet boundaries, absolute values`;
  const firstColumnName = "Values";
  const rows = Object.keys(card.tidyRatiosPerPlanetBoundary![0]).filter(
    (key) => key != "impactCriterion" && key != "ratioPercentage"
  );

  const criteria = [
    ...new Set(card.tidyRatiosPerPlanetBoundary!.map((ratio) => ratio.impactCriterion))
  ];

  beforeEach(() =>
    render(AbsoluteValuesTables, {
      props: {
        caption: planetBoundariesCaption,
        keyColumn: "impactCriterion",
        firstColumnName,
        columns: criteria,
        rows,
        data: card.tidyRatiosPerPlanetBoundary
      }
    })
  );
  afterEach(() => cleanup());

  it("displays a title for the first column of the table related to each row", () => {
    const table = screen.getByRole("table", { name: planetBoundariesCaption });
    const columnTitles = within(table).getAllByRole("columnheader");
    expect(columnTitles[0]).toHaveTextContent(firstColumnName);
  });

  it("displays each value as cells of the table related to relevant column and row", () => {
    const table = screen.getByRole("table", { name: planetBoundariesCaption });
    rows.forEach((row) => {
      const rowElement = within(table).getByRole("row", { name: row });
      const cells = within(rowElement).getAllByRole("cell");
      criteria.forEach((criterion, index) => {
        const value = card.tidyRatiosPerPlanetBoundary!.filter(
          (ratio) => ratio.impactCriterion === criterion
        )[0][row as keyof TidyRatio];
        expect(cells[index].innerText).toBeCloseTo((value as number).toExponential(2));
      });
    });
  });
});
