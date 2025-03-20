import FunctionalUnit from "$lib/components/FunctionalUnit.svelte";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const serverRackDescription = "A server rack";

describe("functional unit component static elements test suite", () => {
  beforeEach(() => {
    render(FunctionalUnit);
  });
  afterEach(() => {
    cleanup();
  });
  it("should display a section that presents the parameters used in calculating the functional unit", () => {
    const functionalUnitParametersSection = screen.getByRole("region", {
      name: /Functional unit parameters/
    });
    expect(functionalUnitParametersSection).toBeVisible();
  });
  it("should display an image that gives an idea of functional unit scope", () => {
    const serverRackImage = screen.getByRole("img", { name: serverRackDescription });
    expect(serverRackImage).toBeVisible();
  });
});
