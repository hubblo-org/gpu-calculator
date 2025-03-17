import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import type { ImpactFactors } from "./types/pcr-cloud";
import type { ImpactCriterias } from "./types/enums";

interface ImpactFactor {
  impact_criteria: string;
  amount: number;
}

interface ImpactFactorWithScope {
  scope: string;
  amount: number;
}

interface Axes {
  x: string;
  y: string;
}

export function assignAxes(impactFactor: ImpactFactor | ImpactFactorWithScope) {
  const keys = Object.keys(impactFactor);
  const axes: Axes = { x: keys[1], y: keys[0] };
  return axes;
}

export function renderHorizontalBarPlot(
  impactFactors: ImpactFactor[] | ImpactFactorWithScope[],
  xLabel: string,
  yLabel: string
) {
  let div = document.querySelector("#impactFactorsPlot");
  div?.firstChild?.remove();
  if (div) {
    const resultsBarPlot = Plot.plot({
      width: 1600,
      height: 800,
      marginLeft: 400,
      y: { grid: true },
      marks: [
        Plot.ruleX([0]),
        Plot.axisX({ tickSpacing: 100 }),
        Plot.barX(impactFactors, {
          x: xLabel,
          y: yLabel,
          fill: xLabel,
          tip: { format: { y: (d) => `${d.replace("\n", " ")}` }, lineWidth: 100 },
          sort: { y: "x", order: "descending" }
        })
      ]
    });
    div.append(resultsBarPlot);
  }
}

interface ImpactFactorWithCategory {
  category: string;
  values: ImpactFactors;
}
interface ImpactFactorsWithLC {
  life_cycle_step: string;
  value: number;
  impact_factors: ImpactFactorWithCategory[];
}

interface DataCenterImpactFactors {
  name: string;
  life_cycles: ImpactFactorsWithLC[];
  value: number;
}
