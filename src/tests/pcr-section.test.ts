import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import PCRSection from "$lib/components/PCRSection.svelte";

describe("pcr introduction section test suite", () => {
  beforeEach(() => render(PCRSection));
  afterEach(() => cleanup());

  it("should display a section introducing the product category rules for cloud services", () => {
    const pcrSection = screen.getByRole("region", {
      name: "Product Category Rules for Cloud services"
    });
    expect(pcrSection).toBeVisible();
  });
});
