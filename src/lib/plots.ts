import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import type { ImpactFactors } from "./types/pcr-cloud";

interface ImpactFactor {
  impact_criteria: string;
  amount: number;
}

interface ImpactFactorWithScope {
  scope: string;
  amount: number;
}

interface ImpactFactorWithLifeCycle {
  impact_criteria: string;
  life_cycle_step: string;
  share: number;
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
  yLabel: string,
  lollipop: boolean
) {
  let div = document.querySelector("#impact-factors-plot");
  div?.firstChild?.remove();
  if (div) {
    const lollipopMarks = [
      Plot.ruleX([0]),
      Plot.axisX({ tickSpacing: 100 }),
      Plot.ruleY(impactFactors, {
        x: xLabel,
        y: yLabel,
        stroke: xLabel,
        tip: { format: { y: (d) => `${d.replace("\n", " ")}` }, lineWidth: 100 },
        strokeWidth: 5,
        sort: { y: "x", order: "descending" }
      }),
      Plot.dot(impactFactors, { x: xLabel, y: yLabel, fill: xLabel, r: 10 })
    ];

    const barMarks = [
      Plot.ruleX([0]),
      Plot.axisX({ tickSpacing: 100 }),
      Plot.barX(impactFactors, {
        x: xLabel,
        y: yLabel,
        fill: xLabel,
        tip: { format: { y: (d) => `${d.replace("\n", " ")}` }, lineWidth: 100 },
        sort: { y: "x", order: "descending" }
      })
    ];
    const resultsBarPlot = Plot.plot({
      width: 1600,
      height: 800,
      marginLeft: 400,
      y: { grid: true },
      marks: lollipop ? lollipopMarks : barMarks
    });
    div.append(resultsBarPlot);
  }
}

function addLogo(nodeId: string) {
    const logoDiv = d3
      .select(nodeId)
      .select("figure")
      .select("div")
      .append("div")
      .attr("class", "logo");

    logoDiv.append("img").attr("src", "/media/logo.svg");
    logoDiv.append("span").text("Hubblo");
}

export function renderStackedBarPlot(
  source: string,
  width: number,
  height: number,
  impactFactors: ImpactFactorWithLifeCycle[],
  domains: string[],
  yLabel: string,
  xLabel: string,
  domainColor: string
) {
  let div = document.querySelector(`#impact-factors-plot-${source}`);
  div?.firstChild?.remove();
  if (div) {
    const resultsBarPlot = Plot.plot({
      width: width,
      height: height,
      marginLeft: 100,
      color: { legend: true, domain: domains },
      y: { percent: true },
      marks: [
        Plot.barY(impactFactors, {
          y: yLabel,
          x: xLabel,
          fill: domainColor,
          order: domains,
          offset: "normalize",
          tip: true
        })
      ]
    });

    div.append(resultsBarPlot);

    addLogo(`#impact-factors-plot-${source}`);
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
