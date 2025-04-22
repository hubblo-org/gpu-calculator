import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import PCRSection from "$lib/components/PCRSection.svelte";

const pcrSectionLabel = "Product Category Rules for Data center IT hosting and Cloud services";
describe("pcr introduction section test suite", () => {
  beforeEach(() => render(PCRSection));
  afterEach(() => cleanup());

  it("should display a section introducing the product category rules for cloud services", () => {
    const pcrSection = screen.getByRole("region", {
      name: pcrSectionLabel 
    });
    expect(pcrSection).toBeVisible();
  });
});
