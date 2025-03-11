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
          tip: true,
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
/* export function renderTreemap(dc_data: DataCenterImpactFactors) {
  let div = document.querySelector("#impactFactorsPlotTreemap");
  div?.firstChild?.remove();
  if (div) {
    const width = 1154;
    const height = 1154;
    const color = d3.scaleOrdinal(
      dc_data.life_cycles.map((impactFactor) => impactFactor.life_cycle_step),
      d3.schemeTableau10
    );

    const root = d3.treemap().tile(d3.treemapSquarify).size([width, height]).padding(1).round(true)(
      d3
        .hierarchy(dc_data)
        .sum((d) => d.value)
        .sort((a, b) => b.data.value - a.data.value)
    );
    const svg = d3
      .create("svg")
      .attr("viewBow", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    const leaf = svg
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", (d) => ` translate(${d.x0}, ${d.y0}`);

    const format = d3.format(",d");
    leaf.append("title").text(
      (d) =>
        `${d
          .ancestors()
          .reverse()
          .map((d) => d.data.life_cycle_step)
          .join(".")}\n${format(d.value)}`
    );
    /*
    leaf
      .append("rect")
      .attr("id", (d) => (d.leafUid = DOM.uid("leaf")).id)
      .attr("fill", (d) => {
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .attr("fill-opacity", 0.6)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0);

    leaf
      .append("clipPath")
      .attr("id", (d) => (d.clipUid = DOM.uid("clip")).id)
      .append("use")
      .attr("xlink:href", (d) => d.leafUid.href);
    leaf
      .append("text")
      .attr("clip-path", (d) => d.clipUid)
      .selectAll("tspan")
      .data((d) => d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(d.value)))
      .join("tspan")
      .attr("x", 3)
      .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
      .attr("fill-opacity", (d, i, nodes) => (i === nodes.length - 1 ? 0.7 : null))
      .text((d) => d);

    return Object.assign(svg.node(), { scales: { color } }); 
  }
}
*/
