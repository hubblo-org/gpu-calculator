import * as d3 from "d3";
import type { Node } from "$lib/types/pcr-cloud";

function getFirstDepthParent(
  node: d3.HierarchyRectangularNode<Node>
): d3.HierarchyRectangularNode<Node> {
  return node.depth > 1 ? getFirstDepthParent(node.parent!) : node;
}

export function renderTreemap(tree: Node, width: number, height: number) {
  const color = d3.scaleOrdinal(
    tree.children!.map((d) => d.name),
    d3.schemeTableau10
  );

  const numberFormat = d3.format(",r");
  const tile = d3.treemapSquarify;
  const root = d3.treemap<Node>().tile(tile).size([width, height]).padding(1).round(true)(
    d3
      .hierarchy(tree)
      .sum((d) => (d as d3.HierarchyNode<Node>).value!)
      .sort(
        (a, b) =>
          (b.data as d3.HierarchyPointNode<Node>).value! -
          (a.data as d3.HierarchyPointNode<Node>).value!
      )
  );

  const treemapLegend = d3
    .select("#treemap-legend")
    .attr(
      "style",
      "display: flex; align-items: center; min-height: 32px; margin-left: 15px; font: 10px sans-serif;"
    );
  if (!treemapLegend.empty()) {
    treemapLegend.selectChildren("span").remove();
    color.domain().forEach((domain) => {
      treemapLegend
        .append("span")
        .attr("style", `--color: ${color(domain)};`)
        .text(domain);
    });
  } else {
    console.error("No element to attach the treemap legend to!");
  }

  d3.select("#treemap-legend-wrapper").attr("style", `width: ${width}px`);

  const treemapLogo = d3.select("#treemap-legend-wrapper").select("#legend-logo");
  if (treemapLogo.empty()) {
    const hubbloLogo = d3
      .select("#treemap-legend-wrapper")
      .append("div")
      .attr("class", "logo")
      .attr("id", "legend-logo");
    hubbloLogo.append("img").attr("src", "/media/logo.svg");
    hubbloLogo.append("span").text("Hubblo");
  }

  const treemap = d3.select("#treemap");
  if (!treemap.empty()) {
    treemap.selectChild("svg").remove();
    const svg = d3
      .select("#treemap")
      .append("svg")
      .attr("id", "svg-treemap")
      .attr("viewbox", `0 0 ${width} ${height}`)
      .attr("width", `${width}`)
      .attr("height", `${height}`)
      .attr("style", "font: 10px sans-serif;");

    root.leaves().forEach((leaf, leafIndex) => {
      const nodes = leaf.data.name
        .split(/(?=[A-Z][a-z])|\s+/g)
        .concat(numberFormat((leaf.data as d3.HierarchyPointNode<Node>).value!));

      svg
        .append("g")
        .attr("id", `g-${leafIndex}`)
        .attr("transform", `translate(${leaf.x0}, ${leaf.y0})`)
        .append("title")
        .text(
          `${leaf
            .ancestors()
            .reverse()
            .map((leaf) => leaf.data.name)
            .join(".")}\n${numberFormat(leaf.value!)}`
        );

      const g = d3.select(`#g-${leafIndex}`);

      g.append("rect")
        .attr("id", `rect-${leafIndex}`)
        .attr("fill", `${color(getFirstDepthParent(leaf).data.name)}`)
        .attr("fill-opacity", 0.6)
        .attr("width", leaf.x1 - leaf.x0)
        .attr("height", leaf.y1 - leaf.y0);

      g.append("clipPath")
        .attr("id", `clip-${leafIndex}`)
        .append("use")
        .attr("href", `#rect-${leafIndex}`);

      g.append("text").attr("id", `text-${leafIndex}`).attr("clip-path", `url(#clip-${leafIndex}`);
      const text = d3.select(`#text-${leafIndex}`);

      nodes.forEach((node, nodeIndex) => {
        text
          .append("tspan")
          .attr("x", 3)
          .attr("y", `${(nodes.length - 1) * 0.3 + 1.1 + nodeIndex * 0.9}em`)
          .text(node);
      });
    });
  } else {
    console.error("No element to attach the treemap to!");
  }
}
