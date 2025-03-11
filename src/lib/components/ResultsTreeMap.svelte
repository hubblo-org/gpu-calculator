<script lang="ts">
  import type { FunctionalUnitResultsRowWithLifeCycle, ImpactFactors } from "$lib/types/pcr-cloud";
  import * as d3 from "d3";

  interface Props {
    results: FunctionalUnitResultsRowWithLifeCycle[];
  }

  interface ImpactFactorWithCategory {
    name: string;
    value: ImpactFactors;
  }

  interface ImpactFactorsWithLC {
    name: string;
    value?: number;
    children: ImpactFactorWithCategory[];
  }

  interface DataCenterImpactFactors {
    name: string;
    value?: number;
    children: ImpactFactorsWithLC[];
  }

  const { results }: Props = $props();

  const lifeCycleSteps = ["manufacturing", "transport", "use", "end-of-life"];

  const selectedCriteria = $state("AP");

  const totalImpactValue = $derived.by(() => {
    return results.filter((result) => result.life_cycle_step === "full_life_cycle")[0].impacts[
      selectedCriteria
    ].value;
  });

  const dcData: DataCenterImpactFactors = $derived.by(() => {
    return {
      name: "dc_data",
      value: totalImpactValue,
      children: lifeCycleSteps.map((lifeCycle) => {
        const resultsByLifeCycle = results.filter((result) => result.life_cycle_step === lifeCycle);
        const resultsImpacts = resultsByLifeCycle.map((result) => {
          const resultImpacts = {
            name: result.category,
            value: result.impacts[selectedCriteria].value
          };
          return resultImpacts;
        });
        const allCategoriesTotalValue = resultsImpacts.filter(
          (impactFactors) => impactFactors.name === "all_categories"
        )[0].value;
        return {
          name: lifeCycle,
          value: allCategoriesTotalValue,
          children: resultsImpacts.filter((impactFactors) => impactFactors.name != "all_categories")
        };
      })
    };
  });

  $inspect(dcData);

  const width = 1154;
  const height = 1154;

  const color = $derived(
    d3.scaleOrdinal(
      dcData.children.map((d) => d.name),
      d3.schemeTableau10
    )
  );
  const format = d3.format(",d");
  const tile = d3.treemapBinary;
  const root = $derived.by(() => {
    const r = d3
      .treemap<DataCenterImpactFactors>()
      .tile(tile)
      .size([width, height])
      .padding(1)
      .round(true)(
      d3
        .hierarchy(dcData)
        .sum((d) => d.value)
        .sort((a, b) => b.data.value - a.data.value)
    );
    return r;
  });

  $inspect(root);

  function getFirstDepthParent(leaf: any): any {
    return leaf.depth > 1 ? getFirstDepthParent(leaf.parent) : leaf;
  }
</script>

<div id="treemap">
  <svg {width} {height} viewBox="0 0 {width} {height}">
    {#each root.leaves() as leaf, leafIndex}
      {@const nodes = leaf.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(leaf.data.value))}
      <g transform="translate({leaf.x0}, {leaf.x1})">
        <title>
          {`${leaf
            .ancestors()
            .reverse()
            .map((leaf) => leaf.data.name)
            .join(".")}\n${format(leaf.data.value)}`}</title
        >
        <rect
          id="rect-{leafIndex}"
          fill={color(getFirstDepthParent(leaf).data.name)}
          fill-opacity={0.8}
          width={leaf.x1 - leaf.x0}
          height={leaf.y1 - leaf.y0}
        />
        <clipPath id="clip-{leafIndex}">
          <use href="#rect-{leafIndex}" />
        </clipPath>
        <text clip-path="url(#clip-{leafIndex})">
          {#each nodes as node, nodeIndex}
            <tspan
              x="3"
              y="{(nodes.length - 1) * 0.3 + 1.1 + nodeIndex * 0.9}em"
              fill-opacity={nodeIndex === nodes.length - 1 ? 0.7 : null}
            >
              {node}
            </tspan>
          {/each}
        </text>
      </g>
    {/each}
  </svg>
</div>
