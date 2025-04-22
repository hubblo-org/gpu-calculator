import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { dataCenterCharacteristics } from "../mocks/dc-data";
import { inventoryWithImpact } from "../mocks/dc-data";
import { DataCenter } from "$lib/data-center.svelte";
import FunctionalUnitSection from "$lib/components/FunctionalUnitSection.svelte";
import { FunctionalUnits, getFunctionalUnitParameters } from "$lib/types/enums";

const serverRackDescription = "A server rack";
const firstFunctionalUnit = "Functional Unit 1";
const firstFunctionalUnitRenderedService =
  "Provide hosting services for operation of the IT equipment.";
const firstFunctionalUnitScope = "For one kilowatt of commercialised IT power.";
const firstFunctionalUnitStudyDuration = "One year.";
const firstFunctionalUnitParameters = [
  firstFunctionalUnitRenderedService,
  firstFunctionalUnitScope,
  firstFunctionalUnitStudyDuration
];

const dataCenter = new DataCenter(dataCenterCharacteristics, inventoryWithImpact);

describe("functional unit component static elements test suite", () => {
  beforeEach(() => {
    render(FunctionalUnitSection, { props: { dc: dataCenter } });
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
  it("should display an image that gives an idea of the functional unit scope", () => {
    const serverRackImage = screen.getByRole("img", { name: serverRackDescription });
    expect(serverRackImage).toBeVisible();
  });

  it("should display a link to go back to the table of contents section", () => {
    const functionalUnitParametersSection = screen.getByRole("region", {
      name: /Functional unit parameters/
    });
    const scrollBackLink = within(functionalUnitParametersSection).getByRole("link", {
      name: "Scroll back to table of contents"
    });
    expect(scrollBackLink).toBeVisible();
  });
  it("should display the first functional unit main parameters", () => {
    const functionalUnitParametersSection = screen.getByRole("region", {
      name: /Functional unit parameters/
    });
    firstFunctionalUnitParameters.forEach((parameter) =>
      expect(
        within(functionalUnitParametersSection).getByText(parameter, { exact: false })
      ).toBeVisible()
    );
  });
});

describe("functional unit enum test suite", () => {
  it("should return the first functional unit parameters", () => {
    const parameters = getFunctionalUnitParameters(FunctionalUnits.First);
    expect(parameters.title).toEqual(firstFunctionalUnit);
    expect(parameters.service).toEqual(firstFunctionalUnitRenderedService);
    expect(parameters.product).toEqual(firstFunctionalUnitScope);
    expect(parameters.studyDuration).toEqual(firstFunctionalUnitStudyDuration);
  });
});
