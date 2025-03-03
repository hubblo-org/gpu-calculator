import { validateString } from "$lib/inventory";
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
