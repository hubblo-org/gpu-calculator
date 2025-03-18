<script lang="ts">
  import type {
    FunctionalUnitResultsRow,
    ImpactCriteria,
    ImpactFactors
  } from "$lib/types/pcr-cloud";
  import type { IC } from "$lib/types/enums";
  import { ImpactCriterias, getImpactCriteria, getAllImpactCriterias } from "$lib/types/enums";
  import { renderHorizontalBarPlot, assignAxes } from "$lib/plots";
  import { onMount } from "svelte";

  interface ImpactFactorWithScope {
    scope: string;
    amount: number;
  }
  interface Props {
    results: FunctionalUnitResultsRow[];
  }

  const { results }: Props = $props();

  let lollipop = $state(false);

  let selectedImpactCriteria: ImpactCriteria = $state(
    getImpactCriteria(ImpactCriterias.AcidificationPotential)
  );

  const impactCriterias = getAllImpactCriterias();
  const scopes = results
    .filter((result) => result.name != "material")
    .map((result) => result.scope);
  const resultsImpacts = results
    .filter((result) => result.name != "material")
    .map((result) => result.impacts);
  const selectedImpactFactors = $derived.by(() => {
    const selectedCriteriaImpactFactors = resultsImpacts.map(
      (impactFactor) => impactFactor[selectedImpactCriteria.acronym as keyof ImpactFactors]
    );

    const selection = selectedCriteriaImpactFactors.map((impactFactor, index) => {
      const result: ImpactFactorWithScope = { scope: scopes[index], amount: impactFactor.value };
      return result;
    });
    return selection;
  });

  const axes = $derived(assignAxes(selectedImpactFactors[0]));

  onMount(() => {
    renderHorizontalBarPlot(selectedImpactFactors, axes.x, axes.y, lollipop);
  });

  $effect(() => {
    renderHorizontalBarPlot(selectedImpactFactors, axes.x, axes.y, lollipop);
  });
</script>

<div id="impact-factors-plot"></div>
<p>
  Selected impact criteria: {selectedImpactCriteria.name}. Impact unit: {selectedImpactCriteria.unit}
</p>
<div id="wrapper">
  <div id="plot-display">
    <input type="checkbox" bind:checked={lollipop} id="lollipop" /><label for="lollipop"
      >Lollipop</label
    >
  </div>
</div>
<select
  bind:value={selectedImpactCriteria.name}
  onchange={() =>
    (selectedImpactCriteria = getImpactCriteria(
      ImpactCriterias[selectedImpactCriteria.name.replaceAll(" ", "") as IC]
    ))}
  >{#each impactCriterias as impactCriteria}<option value={impactCriteria.name}
      >{impactCriteria.acronym}</option
    >{/each}</select
>

<style>
  #wrapper {
    display: flex;
  }
</style>
