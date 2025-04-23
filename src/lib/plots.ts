import type { Data } from "@observablehq/plot";
import type { ImpactFactorShare, OrderedImpactFactors } from "./types/pcr-cloud";
import { select } from "d3";
import { axisX, axisY, barX, dot, plot, ruleX, ruleY } from "@observablehq/plot";

interface ImpactFactor {
  impactCriterion: string;
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
  yLabel: string,
  lollipop: boolean
) {
  let div = document.querySelector("#impact-factors-plot");
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
      barX(impactFactors, {
        x: xLabel,
        y: yLabel,
        fill: xLabel,
        tip: { format: { y: (d) => `${d.replace("\n", " ")}` }, lineWidth: 100 },
        sort: { y: "x", order: "descending" }
      })
    ];
    const barPlot = plot({
      width: 1600,
      height: 800,
      y: { grid: true },
      marks: lollipop ? lollipopMarks : barMarks
    });
    div.append(barPlot);
  }
}

function addLogo(nodeId: string) {
  // When a legend is created with the generated plot, a figure element is added to the selected div.
  // The first child is then the div with the legend elements.
  const logoDiv = select(nodeId).select("figure").select("div").append("div").attr("class", "logo");

  logoDiv.append("img").attr("src", "/media/logo.svg");
  logoDiv.append("span").text("Hubblo").attr("class", "logo");
}

export function renderStackedBarPlot(
  source: string,
  width: number,
  height: number,
  impactFactors: ImpactFactorShare[] | OrderedImpactFactors,
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
      color: { legend: true, domain: domains },
      x: { percent: true },
      marks: [
        axisY({ fontSize: 12, label: null, marginLeft: 60 }),
        axisX({ marginBottom: 48 }),
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
