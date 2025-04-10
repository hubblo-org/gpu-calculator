import ToggleTip from "$lib/components/ToggleTip.svelte";
import { dataCenterCharacteristics } from "../mocks/dc-data";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

describe("toggle tip component test suite", () => {
  const description = dataCenterCharacteristics.totalSurface.description;
  beforeEach(() => render(ToggleTip, { props: { info: description } }));
  afterEach(() => cleanup());
  it("should display a description of the data center characteristic after the user interacted with a button next to the characteristic", async () => {
    const user = userEvent.setup();
    const informationButton = screen.getByRole("button", {
      name: "More information"
    });

    await user.click(informationButton);

    expect(await screen.findByText(`${description}`)).toBeVisible();
  });
  it("should remove the description of the data center characteristic after the user clicked again on the button next to the characteristic", async () => {
    const user = userEvent.setup();
    const informationButton = screen.getByRole("button", {
      name: "More information"
    });

    await user.click(informationButton);
    await user.click(informationButton);

    expect(screen.queryByText(`${description}`)).not.toBeInTheDocument();
  });
  it("should remove the description of the data center characteristic after the user clicked on the description", async () => {
    const user = userEvent.setup();
    const informationButton = screen.getByRole("button", {
      name: "More information"
    });

    await user.click(informationButton);
    const toggleTip = await screen.findByText(`${description}`);
    await user.click(toggleTip);

    expect(screen.queryByText(`${description}`)).not.toBeInTheDocument();
  });
  it("should remove the description of the data center characteristic after the user pressed the escape key", async () => {
    const user = userEvent.setup();
    const informationButton = screen.getByRole("button", {
      name: "More information"
    });

    await user.click(informationButton);
    await user.keyboard("[Escape]");
    expect(screen.queryByText(`${description}`)).not.toBeInTheDocument();
  });
});
