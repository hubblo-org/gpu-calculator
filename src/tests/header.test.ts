import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Header from "$lib/components/Header.svelte";

describe("header component test suite", () => {
  beforeEach(() => render(Header));
  afterEach(() => cleanup());
  it("should display the Hubblo logo", () => {
    const hubbloLogo = screen.getByRole("img", { name: "Hubblo logo" });
    const hubbloName = screen.getByText("Hubblo");
    expect(hubbloLogo).toBeVisible();
    expect(hubbloName).toBeVisible();
  });
});
