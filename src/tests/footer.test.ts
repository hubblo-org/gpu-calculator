import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Footer from "$lib/components/Footer.svelte";

describe("footer component test suite", () => {
  beforeEach(() => render(Footer));
  afterEach(() => cleanup());
  const date = new Date();
  const currentYear = date.getFullYear();

  it("should display a section for the page footer", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeVisible();
  });
  it("should display a Hubblo copyright and the current year", () => {
    const footer = screen.getByRole("contentinfo");
    const hubbloCopyright = within(footer).getByText("© Hubblo", { exact: false });
    const dateDisplayed = within(footer).getByText(currentYear);
    expect(hubbloCopyright).toBeVisible();
    expect(dateDisplayed).toBeVisible();
  });
  it("should display links to the various Hubblo repositories and social network accounts", () => {
    const gitlabLink = screen.getByRole("link", { name: "Navigate to Hubblo Gitlab repository" });
    const githubLink = screen.getByRole("link", { name: "Navigate to Hubblo Github repository" });
    const linkedinLink = screen.getByRole("link", { name: "Navigate to Hubblo LinkedIn page" });
    const elementLink = screen.getByRole("link", { name: "Navigate to Hubblo Element page" });
    const gitterLink = screen.getByRole("link", { name: "Navigate to Hubblo Gitter page" });

    expect(gitlabLink).toBeVisible();
    expect(githubLink).toBeVisible();
    expect(linkedinLink).toBeVisible();
    expect(elementLink).toBeVisible();
    expect(gitterLink).toBeVisible();
  });
});
