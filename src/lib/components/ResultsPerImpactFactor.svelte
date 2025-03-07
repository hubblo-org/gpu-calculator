<script lang="ts">
  import type { FunctionalUnitResultsRow } from "$lib/types/pcr-cloud";
  import { ImpactCriterias } from "$lib/types/enums";
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

  let selectedImpactCriteria: ImpactCriterias = $state(ImpactCriterias.AcidificationPotential);

  const impactCriterias = Object.values(ImpactCriterias);
  const scopes = results.map((result) => result.scope);
  const resultsImpacts = results.map((result) => result.impacts);
  const selectedImpactFactors = $derived(
    resultsImpacts.map((impactFactor) => impactFactor[selectedImpactCriteria])
  );
  const selectedImpactFactorUnit = $derived(selectedImpactFactors[0].unit);
  const impactFactors = $derived(
    selectedImpactFactors.map((impactFactor, index) => {
      const result: ImpactFactorWithScope = { scope: scopes[index], amount: impactFactor.value };
      return result;
    })
  );

  const axes = $derived.by(() => {
    return assignAxes(impactFactors[0]);
  });

  onMount(() => {
    renderHorizontalBarPlot(impactFactors, axes.x, axes.y);
  });

  function updateImpactFactorsPlot() {
    renderHorizontalBarPlot(impactFactors, axes.x, axes.y);
  }
</script>

<div id="impactFactorsPlot"></div>
<p>Selected impact criteria: {selectedImpactCriteria}. Impact unit: {selectedImpactFactorUnit}</p>
<select bind:value={selectedImpactCriteria} onchange={() => updateImpactFactorsPlot()}
  >{#each impactCriterias as impactCriteria}<option>{impactCriteria}</option>{/each}</select
>
