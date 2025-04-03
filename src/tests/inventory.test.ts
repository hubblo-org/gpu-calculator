import { sortByLifeCycle, validateString } from "$lib/inventory";
import { LifeCycleSteps } from "$lib/types/enums";
import { describe, expect, it } from "vitest";

describe("string validation test suite", () => {
  it("validates that the input string is a string", () => {
    const value = "test_string";
    const validatedString = validateString(value);
    expect(validatedString).toEqual(value);
  });
  it("validates that the input element is not a string if a number is input", () => {
    const value = "0";
    expect(() => validateString(value)).toThrowError("Contains invalid character");
  });
  it("validates that the input element is not a string if an empty string is input", () => {
    const value = "";
    expect(() => validateString(value)).toThrowError("Must not be an empty string");
  });
});

describe("ordering by life cycle step test suite", () => {
  it("sorts array of objects according to life cycle steps", () => {
    interface Result {
      lifeCycleStep: string;
    }
    const lifeCycleOrder = Object.values(LifeCycleSteps);

    const unorderedResults: Result[] = [
      { lifeCycleStep: "end-of-life" },
      { lifeCycleStep: "use" },
      { lifeCycleStep: "manufacturing" },
      { lifeCycleStep: "transport" }
    ];

    const orderedResults: Result[] = sortByLifeCycle<Result>(
      unorderedResults,
      "lifeCycleStep" as keyof Result 
    );
    expect(orderedResults[0].lifeCycleStep).toEqual(lifeCycleOrder[0].toLowerCase());
    expect(orderedResults[1].lifeCycleStep).toEqual(lifeCycleOrder[1].toLowerCase());
    expect(orderedResults[2].lifeCycleStep).toEqual(lifeCycleOrder[2].toLowerCase());
    expect(orderedResults[3].lifeCycleStep).toEqual(lifeCycleOrder[3].toLowerCase());
  });
});
