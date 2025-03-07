import * as Plot from "@observablehq/plot";
import type { FunctionalUnitResultsRow } from "./types/pcr-cloud";

interface ImpactFactor {
  impact_criteria: string;
  amount: number;
}

export function renderBarPlot(impactFactors: ImpactFactor[]) {
  let div = document.querySelector("#impactFactorsPlot");
  div?.firstChild?.remove();
  if (div) {
    const resultsBarPlot = Plot.plot({
      width: 1600,
      height: 800,
      marginLeft: 200,
      y: { grid: true },
      marks: [
        Plot.ruleX([0]),
        Plot.axisX({ tickSpacing: 100 }),
        Plot.barX(impactFactors, {
          x: "amount",
          y: "impact_criteria",
          fill: "amount",
          sort: { y: "x", order: "descending" }
        })
      ]
    });
    div.append(resultsBarPlot);
  }
}

export function updateBarPlot(
  resultsIndex: number,
  functionalUnitResults: FunctionalUnitResultsRow[],
  impactFactors: ImpactFactor[]
) {
  if (resultsIndex === functionalUnitResults.length - 1) {
    resultsIndex = 0;
  } else {
    resultsIndex++;
  }
  renderBarPlot(impactFactors);
}

