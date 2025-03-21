import * as d3 from "d3";

interface ImpactFactorWithCategory {
  name: string;
  value: Leaf;
}

interface ImpactFactorsWithLifeCycle {
  name: string;
  children: ImpactFactorWithCategory[];
}

interface DataCenterImpactFactors {
  name: string;
  children: ImpactFactorsWithLifeCycle[];
}

interface Leaf {
  name: string;
  value: number;
}

function getFirstDepthParent(leaf: any): any {
  return leaf.depth > 1 ? getFirstDepthParent(leaf.parent) : leaf;
}

export function renderTreemap(
  impactFactors: DataCenterImpactFactors,
  width: number,
  height: number
) {
  const color = d3.scaleOrdinal(
    impactFactors.children.map((d) => d.name),
    d3.schemeTableau10
  );

  const numberFormat = d3.format(",r");
  const tile = d3.treemapSquarify;
  const root = d3
    .treemap<DataCenterImpactFactors>()
    .tile(tile)
    .size([width, height])
    .padding(1)
    .round(true)(
    d3
      .hierarchy(impactFactors)
      .sum((d) => d.value)
      .sort((a, b) => b.data.value - a.data.value)
  );

  const treemapLegend = document.getElementById("treemap-legend");
  if (treemapLegend) {
    treemapLegend.innerHTML = "";
    color.domain().forEach((domain) => {
      const paragraph = document.createElement("p");
      paragraph.setAttribute("id", "treemap-legend");
      paragraph.setAttribute("style", `--color: ${color(domain)}`);
      paragraph.innerHTML = domain;
      treemapLegend.append(paragraph);
    });
  }

  const treemap = document.getElementById("treemap");
  if (treemap) {
    treemap.firstChild?.remove();
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "svg-treemap");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", `${width}`);
    svg.setAttribute("height", `${height}`);

    root.leaves().forEach((leaf, leafIndex) => {
      const nodes = leaf.data.name
        .split(/(?=[A-Z][a-z])|\s+/g)
        .concat(numberFormat(leaf.data.value));

      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("id", `g-${leafIndex}`);
      g.setAttribute("transform", `translate(${leaf.x0}, ${leaf.y0})`);

      const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      title.innerHTML = `${leaf
        .ancestors()
        .reverse()
        .map((leaf) => leaf.data.name)
        .join(".")}\n${numberFormat(leaf.value!)}`;

      const rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rectangle.setAttribute("id", `rect-${leafIndex}`);
      rectangle.setAttribute("fill", `${color(getFirstDepthParent(leaf).data.name)}`);
      rectangle.setAttribute("fill-opacity", "0.6");
      rectangle.setAttribute("width", `${leaf.x1 - leaf.x0}`);
      rectangle.setAttribute("height", `${leaf.y1 - leaf.y0}`);

      const clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
      clipPath.setAttribute("id", `clip-${leafIndex}`);
      clipPath.innerHTML = `<use href='#rect-${leafIndex}' />`;

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("id", `text-${leafIndex}`);
      text.setAttribute("clip-path", `url(#clip-${leafIndex})`);

      nodes.forEach((node, nodeIndex) => {
        const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspan.setAttribute("x", "3");
        tspan.setAttribute("y", `${(nodes.length - 1) * 0.3 + 1.1 + nodeIndex * 0.9}em`);
        tspan.setAttribute("fill-opacity", `${nodeIndex === nodes.length - 1 ? 0.7 : null}`);
        tspan.innerHTML = node;
        text.append(tspan);
      });

      g.append(title);
      g.append(rectangle);
      g.append(clipPath);
      g.append(text);
      svg.append(g);
    });
    treemap.append(svg);
  }
}
