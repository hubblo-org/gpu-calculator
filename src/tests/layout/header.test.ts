import { cleanup, render, screen } from "@testing-library/svelte";
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

  it("should display links to the documentation, the repository and to the contact form", () => {
    const documentationLink = screen.getByRole("link", {
      name: "Navigate to the calculator documentation page"
    });

    const repositoryLink = screen.getByRole("link", {
      name: "Navigate to the calculator code repository"
    });

    const contactLink = screen.getByRole("link", { name: "Navigate to the Hubblo contact form" });

    expect(documentationLink).toBeVisible();
    expect(repositoryLink).toBeVisible();
    expect(contactLink).toBeVisible();
  });
});
