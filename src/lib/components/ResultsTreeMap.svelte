<script lang="ts">
  import type { FunctionalUnitResultsRowWithLifeCycle, ImpactFactors } from "$lib/types/pcr-cloud";
  import type { IC } from "$lib/types/enums";
  import { ImpactCriterias, getAllImpactCriterias, getImpactCriteria } from "$lib/types/enums";
  import * as d3 from "d3";

  interface Props {
    results: FunctionalUnitResultsRowWithLifeCycle[];
  }

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

  const { results }: Props = $props();

  const lifeCycleSteps = ["manufacturing", "transport", "use", "end-of-life"];

  let selectedImpactCriteria = $state(getImpactCriteria(ImpactCriterias.AcidificationPotential));

  const impactCriterias = getAllImpactCriterias();

  const dcData: DataCenterImpactFactors = $derived.by(() => {
    const selectedCriteriaAcronym = selectedImpactCriteria.acronym as keyof ImpactFactors;
    return {
      name: "dc_data",
      children: lifeCycleSteps.map((lifeCycle) => {
        const resultsByLifeCycle = results.filter((result) => result.life_cycle_step === lifeCycle);
        const resultsImpacts = resultsByLifeCycle.map((result) => {
          const leaf: Leaf = {
            name: result.category!,
            value: result.impacts[selectedCriteriaAcronym].value
          };
          return leaf;
        });
        return {
          name: lifeCycle,
          children: resultsImpacts.filter((impactFactors) => impactFactors.name != "all_categories")
        };
      })
    };
  });

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

  function getFirstDepthParent(leaf: any): any {
    return leaf.depth > 1 ? getFirstDepthParent(leaf.parent) : leaf;
  }
</script>

<p>
  {selectedImpactCriteria.name} ({selectedImpactCriteria.acronym}), in {selectedImpactCriteria.unit}
</p>

<div id="treemap-legend">
  {#each color.domain() as lifeCycleStep}
    <p style="--color: {color(lifeCycleStep)}">{lifeCycleStep}</p>
  {/each}
</div>

<div id="treemap">
  <svg {width} {height} viewBox="0 0 {width} {height}">
    {#each root.leaves() as leaf, leafIndex}
      {@const nodes = leaf.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(leaf.data.value))}
      <g transform="translate({leaf.x0}, {leaf.y0})">
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

<select
  bind:value={selectedImpactCriteria.name}
  onchange={() =>
    (selectedImpactCriteria = getImpactCriteria(
      ImpactCriterias[selectedImpactCriteria.name.replaceAll(" ", "") as IC]
    ))}
>
  >{#each impactCriterias as impactCriteria}
    <option value={impactCriteria.name}>{impactCriteria.acronym}</option>{/each}</select
>

<style>
  #treemap-legend {
    display: flex;
    align-items: center;
    min-height: 33px;
    margin-left: 15px;
    font: 10px sans-serif;
  }
  #treemap-legend p {
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
    height: 15px;
  }
  #treemap-legend p::before {
    content: "";
    width: 15px;
    height: 15px;
    margin-right: 5px;
    background: var(--color);
  }
</style>
