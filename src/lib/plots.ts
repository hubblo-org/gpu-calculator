import type { Data } from "@observablehq/plot";
import type { TidyImpactFactor, TidyRatio } from "./types/gpu";
import { select } from "d3";
import { axisX, axisY, barX, dot, plot, pointerY, ruleX, ruleY, tip } from "@observablehq/plot";

interface Axes {
  x: string;
  y: string;
}

export function assignAxes(impactFactor: TidyImpactFactor) {
  const keys = Object.keys(impactFactor);
  const axes: Axes = { x: keys[1], y: keys[0] };
  return axes;
}

export function renderHorizontalBarPlot(
  source: string,
  width: number,
  height: number,
  impactFactors: TidyImpactFactor[] | TidyRatio[],
  xLabel: string,
  yLabel: string,
  lollipop: boolean
) {
  let div = document.querySelector(`#impact-factors-plot-${source}`);
  div?.firstChild?.remove();
  if (div) {
    const lollipopMarks = [
      ruleX([0]),
      axisX({ tickSpacing: 100 }),
      ruleY(impactFactors, {
        x: xLabel,
        y: yLabel,
        stroke: xLabel,
        tip: { format: { y: (d) => `${d.replace("\n", " ")}` }, lineWidth: 100 },
        strokeWidth: 5,
        sort: { y: "x", order: "descending" }
      }),
      dot(impactFactors, { x: xLabel, y: yLabel, fill: xLabel, r: 10 })
    ];

    const barMarks = [
      ruleX([0]),
      axisX({ tickSpacing: 100 }),
      axisY({ labelAnchor: "top" }),
      barX(impactFactors, {
        x: xLabel,
        y: yLabel,
        fill: xLabel,
        sort: { y: "x", order: "descending" }
      }),
      tip(impactFactors, pointerY({ x: xLabel, y: yLabel, channels: { Ratio: "ratioNumber" } }))
    ];
    const barPlot = plot({
      width: width,
      height: height,
      className: "plot",
      style: { overflow: "visible" },
      y: { grid: true, label: "Criterion" },
      x: { label: "Percentage (%)" },
      marks: lollipop ? lollipopMarks : barMarks
    });

    addLogo(`#impact-factors-plot-${source}`);
    div.append(barPlot);
  }
}

function addLogo(nodeId: string) {
  // When a legend is created with the generated plot, a figure element is added to the selected div.
  // The first child is then the div with the legend elements.
  const figure = select(nodeId).select("figure");
  if (!figure.empty()) {
    const logoDiv = select(nodeId)
      .select("figure")
      .select("div")
      .append("div")
      .attr("class", "logo");

    logoDiv.append("img").attr("src", "/media/logo.svg");
    logoDiv.append("span").text("Hubblo");
  } else {
    const logoDiv = select(nodeId).append("div").attr("class", "logo");
    logoDiv.append("img").attr("src", "/media/logo.svg");
    logoDiv.append("span").text("Hubblo");
  }
}

export function renderStackedBarPlot(
  source: string,
  width: number,
  height: number,
  impactFactors: TidyImpactFactor[] | TidyRatio[],
  domains: string[],
  yLabel: string,
  xLabel: string,
  domainColor: string
) {
  let div = document.querySelector(`#impact-factors-plot-${source}`);
  div?.firstChild?.remove();

  if (div) {
    const barPlot = plot({
      width: width,
      height: height,
      className: "plot",
      color: { legend: "swatches", domain: domains },
      x: { percent: true },
      marks: [
        axisY({ fontSize: 12, label: null, marginLeft: 60 }),
        axisX({ marginBottom: 48, label: "Value (%)" }),
        barX(impactFactors as Data, {
          y: yLabel,
          x: xLabel,
          fill: domainColor,
          order: domains,
          offset: "normalize",
          tip: true
        })
      ]
    });

    div.append(barPlot);

    addLogo(`#impact-factors-plot-${source}`);
  }
}
