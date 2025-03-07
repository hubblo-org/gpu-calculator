<script lang="ts">
  import { functionalUnitOneResults } from "../../mocks/dc-data";
  import { renderBarPlot, updateBarPlot } from "$lib/plots";
  import { onMount } from "svelte";

  interface ImpactFactor  {
    impact_criteria: string;
    amount: number;
  }

  let resultsIndex: number = $state(0);
  const results = $derived(functionalUnitOneResults[resultsIndex]);

  const impactFactors: ImpactFactor[] = $derived.by(() => {
    const impactCriteriasNames = Object.keys(results.impacts);
    const impactFactorsValues = Object.values(results.impacts);
    const impactFactors = impactCriteriasNames.map((key, index) => {
      const impactFactor: ImpactFactor = {
        impact_criteria: `${key}\n (${impactFactorsValues[index].unit})`,
        amount: Math.round(impactFactorsValues[index].value)
      };
      return impactFactor;
    });
    return impactFactors;
  });

  onMount(() => {
    renderBarPlot(impactFactors);
  });
</script>

<div id="impactFactorsPlot"></div>
<p>Selected scope: {results.scope}. Product : {results.amount} {results.unit}.</p>
<button onclick={() => updateBarPlot(resultsIndex, functionalUnitOneResults, impactFactors)}
  >Next scope</button
>
