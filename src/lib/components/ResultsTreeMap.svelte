<script lang="ts">
  import type { FunctionalUnitResultsRowWithLifeCycle, ImpactFactors } from "$lib/types/pcr-cloud";
  import type { IC } from "$lib/types/enums";
  import { ImpactCriterias, getAllImpactCriterias, getImpactCriteria } from "$lib/types/enums";
  import { renderTreemap } from "$lib/treemap";
  import Results from "./Results.svelte";

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
  console.log("from treemap:");
  console.log(results);

  const lifeCycleSteps = ["manufacturing", "transport", "use", "end-of-life"];

  let selectedImpactCriteria = $state(getImpactCriteria(ImpactCriterias.GlobalWarmingPotential));

  const impactCriterias = getAllImpactCriterias();

  const dcData: DataCenterImpactFactors = $derived.by(() => {
    const selectedCriteriaAcronym = selectedImpactCriteria.acronym as keyof ImpactFactors;
    return {
      name: "dc_data",
      children: lifeCycleSteps.map((lifeCycle) => {
        const resultsByLifeCycle = results.filter((result) => result.life_cycle_step === lifeCycle);
        const resultsImpacts = resultsByLifeCycle.map((result) => {
          const leaf: Leaf = {
            name: result.name!,
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

  const width = 1200;
  const height = 700;

  $effect(() => {
    renderTreemap(dcData, width, height);
  });

  const productResults = results[0];
  const product = `${productResults.amount} ${productResults.unit}`;
</script>

<p>Product : {product}.</p>
<p>
  {selectedImpactCriteria.name} ({selectedImpactCriteria.acronym}), in {selectedImpactCriteria.unit}
</p>

<div id="treemap-legend"></div>

<div id="treemap"></div>

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
