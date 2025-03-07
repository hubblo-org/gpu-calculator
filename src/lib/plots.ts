import * as Plot from "@observablehq/plot";

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
  const axes: Axes = {x: keys[1], y: keys[0]};  
  return axes
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
          tip: true,
          sort: { y: "x", order: "descending" }
        })
      ]
    });
    div.append(resultsBarPlot);
  }
}
