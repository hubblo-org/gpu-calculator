import FunctionalUnit from "$lib/components/FunctionalUnit.svelte";
import { FunctionalUnits, getFunctionalUnitParameters } from "$lib/types/enums";
import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const serverRackDescription = "A server rack";
const firstFunctionalUnitRenderedService =
  "Provide the Information Technology (IT) hosting services for operation of the IT equipment";
const firstFunctionalUnitScope = "IT equipment with a rated electrical power of 1 kilowatt";
const firstFunctionalUnitStudyDuration = "One month";
const firstFunctionalUnitParameters = [
  firstFunctionalUnitRenderedService,
  firstFunctionalUnitScope,
  firstFunctionalUnitStudyDuration
];

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
  it("should display an image that gives an idea of the functional unit scope", () => {
    const serverRackImage = screen.getByRole("img", { name: serverRackDescription });
    expect(serverRackImage).toBeVisible();
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
    expect(parameters.service).toEqual(firstFunctionalUnitRenderedService);
    expect(parameters.product).toEqual(firstFunctionalUnitScope);
    expect(parameters.studyDuration).toEqual(firstFunctionalUnitStudyDuration);
  });
});
