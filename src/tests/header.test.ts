import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Header from "$lib/components/Header.svelte";

describe("header component test suite", () => {
  beforeEach(() => render(Header));
  afterEach(() => cleanup());
  it("should display the Hubblo logo", () => {
    const hubbloName = screen.getByText("Hubblo");
    expect(hubbloName).toBeVisible();
  });
  it("should have a link to the Hubblo website", () => {
    const hubbloLink = screen.getByRole("link", { name: "Navigate to the Hubblo website" });
    expect(hubbloLink).toBeVisible();
  });

  it("should display a contact button", () => {
    const contactButton = screen.getByRole("link", { name: "Contact" });
    expect(contactButton).toBeVisible();
  });
});
