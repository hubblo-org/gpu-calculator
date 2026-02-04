import { beforeEach, afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import Introduction from "$lib/components/Introduction.svelte";

describe("introduction component test suite", () => {
  beforeEach(() => render(Introduction));
  afterEach(() => cleanup());

  const introductionTitle = "Introduction";

  it("displays a section for presenting the calculator project", () => {
    const introductionSection = screen.getByRole("region", { name: introductionTitle });
    expect(introductionSection).toBeVisible();
  });

  it("displays links to documentation and articles related to the research project", () => {
    const documentation = "Calculator documentation";
    const ademeReport = "GPU life-cycle analysis ADEME report";
    const researchPaper = "Generative AI training impacts on Nvidia A100 GPU research paper";
    const introductionSection = screen.getByRole("region", { name: introductionTitle });
    const linkToDoc = within(introductionSection).getByRole("link", { name: documentation });
    const linkToReport = within(introductionSection).getByRole("link", { name: ademeReport });
    const linkToPaper = within(introductionSection).getByRole("link", { name: researchPaper });

    expect(linkToDoc).toBeVisible();
    expect(linkToReport).toBeVisible();
    expect(linkToPaper).toBeVisible();
  });
});
