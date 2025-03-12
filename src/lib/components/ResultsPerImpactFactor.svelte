<script lang="ts">
  import type {
    FunctionalUnitResultsRow,
    ImpactCriteria,
    ImpactFactors
  } from "$lib/types/pcr-cloud";
  import {
    ImpactCriterias,
    getImpactCriteria,
    getAllImpactCriterias,
  } from "$lib/types/enums";
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

  let selectedImpactCriteria: ImpactCriteria = $state(
    getImpactCriteria(ImpactCriterias.AcidificationPotential)
  );

  const impactCriterias = getAllImpactCriterias();
  const scopes = results.map((result) => result.scope);
  const resultsImpacts = results.map((result) => result.impacts);
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
    renderHorizontalBarPlot(selectedImpactFactors, axes.x, axes.y);
  });

  $effect(() => {
    renderHorizontalBarPlot(selectedImpactFactors, axes.x, axes.y);
  });
</script>

<div id="impactFactorsPlot"></div>
<p>
  Selected impact criteria: {selectedImpactCriteria.name}. Impact unit: {selectedImpactCriteria.unit}
</p>
<select
  bind:value={selectedImpactCriteria.name}
  onchange={() =>
    (selectedImpactCriteria = getImpactCriteria(
      ImpactCriterias[selectedImpactCriteria.name.replaceAll(" ", "")]
    ))}
  >{#each impactCriterias as impactCriteria}<option value={impactCriteria.name}
      >{impactCriteria.acronym}</option
    >{/each}</select
>
