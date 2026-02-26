import { beforeEach, afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import Introduction from "$lib/components/Introduction.svelte";

describe("introduction component test suite", () => {
  beforeEach(() => render(Introduction));
  afterEach(() => cleanup());

  const introductionTitle = "GPU embedded impacts calculator";

  it("displays a section for presenting the calculator project", () => {
    const introductionSection = screen.getByRole("region", { name: introductionTitle });
    expect(introductionSection).toBeVisible();
  });

  it("should display links to the full report and the research article", () => {
    const ademeReport = "Read the full report";
    const researchPaper = "research published in 2025 (Falk et al., 2025)";
    const introductionSection = screen.getByRole("region", { name: introductionTitle });
    const linkToReport = within(introductionSection).getByRole("link", { name: ademeReport });
    const linkToPaper = within(introductionSection).getByRole("link", { name: researchPaper });

    expect(linkToReport).toBeVisible();
    expect(linkToPaper).toBeVisible();
  });
});
