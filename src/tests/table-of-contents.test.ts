import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import TableOfContents from "$lib/components/TableOfContents.svelte";

describe("table of contents component test suite", () => {
  beforeEach(() => render(TableOfContents));
  afterEach(() => cleanup());

  it("should display a heading indicating the table of contents", () => {
    const tableOfContents = screen.getByRole("region", { name: "Table of contents" });
    const heading = within(tableOfContents).getByRole("heading", { name: "Table of contents" });
    expect(heading).toBeVisible();
  });
  it("should display a list of links allowing to navigate across the page", () => {
    const contentsLabels = [
      "Data center characteristics",
      "Data center impact factors",
      "Functional unit parameters",
      "Functional unit results"
    ];

    const tableOfContents = screen.getByRole("region", { name: "Table of contents" });
    contentsLabels.forEach((label) => {
      const contentLink = within(tableOfContents).getByRole("link", { name: label });
      expect(contentLink).toBeVisible();
    });
  });
});
