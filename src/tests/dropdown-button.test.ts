import { cleanup, render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import DropdownButton from "$lib/components/DropdownButton.svelte";

const displayDataCenterCharacteristicsLabel = "Display the data center secondary characteristics";
const hideDataCenterCharacteristicsLabel = "Hide the data center secondary characteristics";

describe("dropdown button component test suite", () => {
  afterEach(() => cleanup());

  it("should display a button indicating a dropdown action", () => {
    render(DropdownButton, {
      props: { direction: "down", label: displayDataCenterCharacteristicsLabel }
    });

    const dropDownButton = screen.getByRole("button", {
      name: displayDataCenterCharacteristicsLabel
    });
    expect(dropDownButton).toBeVisible();
  });

  it("should display a button indicating a dropup action", () => {
    render(DropdownButton, {
      props: { direction: "up", label: hideDataCenterCharacteristicsLabel }
    });
    const dropUpButton = screen.getByRole("button", { name: hideDataCenterCharacteristicsLabel });
    expect(dropUpButton).toBeVisible();
  });
});
