import { describe, expect, it } from "vitest";
import { formatCategory, formatToLifeCycle } from "../mocks/dc-data";
import Fu1Results from "../mocks/uf1-results.json";

const lifeCycleSteps = ["manufacturing", "transport", "use", "end-of-life"];
const categories = ["building", "cooling", "electricity", "energy", "energy backup", "maintenance"];
describe("functional unit one data structure test suite", () => {
  it("gets the life cycle step and inventory category from a given column", () => {
    const firstRow = Fu1Results[0];
    const totalRow = {
      lc_step: formatToLifeCycle(firstRow.c),
      category: formatCategory(firstRow.c)
    };

    expect(totalRow.lc_step).toEqual("full_life_cycle");
    expect(totalRow.category).toEqual("all_categories");
    const selectedRow = Fu1Results[5];
    const useElectricityRow = {
      lc_step: formatToLifeCycle(selectedRow.c),
      category: formatCategory(selectedRow.c)
    };
    expect(useElectricityRow.lc_step).toEqual("Use");
    expect(useElectricityRow.category).toEqual("electricity");

    const anotherRow = Fu1Results[23];
    const materialBuildingEndOfLiveRow = {
      lc_step: formatToLifeCycle(anotherRow.c),
      category: formatCategory(anotherRow.c)
    };
    expect(materialBuildingEndOfLiveRow.lc_step).toEqual("End-of-life");
    expect(materialBuildingEndOfLiveRow.category).toEqual("building");
  });
});
