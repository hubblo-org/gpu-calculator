import { describe, expect, it } from "vitest";
import { convertTableToCSV, formatString } from "$lib/utils";

describe("data conversion and downloading test suite", () => {
  function createTableInDOM() {
    const table = document.createElement("table");
    table.innerHTML = `<caption >Data center impact factors absolute values, per impact criteria</caption><thead ><tr ><th >Impact criteria</th><th >Manufacturing</th><th >Use</th><th >Transport</th><th >End-of-life</th></tr></thead><tbody ><tr ><th scope="row" >GWP</th><td >59683.40933637017</td><td >123456798</td><td >1975.4193576321777</td><td >-563.364968556188</td></tr><tr ><th scope="row" >TPE</th><td >322598.65117834596</td><td >123456798</td><td >27593.159281211374</td><td >29436.830821505857</td></tr><tr ><th scope="row" >WU</th><td >2191.2559147788666</td><td >123456798</td><td >7.486212248169563</td><td >0</td></tr></tbody>`;
    return table;
  }
  it("converts a rendered html table to csv format", () => {
    const renderedTable = createTableInDOM();

    const expectedColumns = [
      "Impact criteria",
      "Manufacturing",
      "Use",
      "Transport",
      "End-of-life"
    ].join(",");
    const expectedRowsLength = renderedTable.getElementsByTagName("tr").length;

    const convertedTableToCSV = convertTableToCSV(renderedTable);
    const csvToArray = convertedTableToCSV.split("\n");
    const columns = csvToArray[0];
    const rowsLength = csvToArray.length;

    expect(columns).toEqual(expectedColumns);
    expect(rowsLength).toEqual(expectedRowsLength);
  });
});

describe("string formatting test suite", () => {
  it("formats a given string to the expected word group", () => {
    const string = "lifeCycleStep";

    const expectedResult = "Life cycle step";

    const result = formatString(string);

    expect(result).toEqual(expectedResult);

    const lcStep = "Manufacturing";

    const expectedLcStep = "Manufacturing";
    const resultLcStep = formatString(lcStep);
    expect(resultLcStep).toEqual(expectedLcStep);
  });
});
