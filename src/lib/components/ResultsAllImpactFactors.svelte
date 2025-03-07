<script lang="ts">
  import type { FunctionalUnitResultsRow } from "$lib/types/pcr-cloud";
  import { renderHorizontalBarPlot, assignAxes } from "$lib/plots";
  import { onMount } from "svelte";
  import { functionalUnitOneResults } from "../../mocks/dc-data";

  interface ImpactFactor {
    impact_criteria: string;
    amount: number;
  }
  interface Props {
    results: FunctionalUnitResultsRow[];
  }

  const { results }: Props = $props();
  let resultsIndex: number = $state(0);
  const displayedResults = $derived(results[resultsIndex]);

  const impactFactors: ImpactFactor[] = $derived.by(() => {
    const impactCriteriasNames = Object.keys(displayedResults.impacts);
    const impactFactorsValues = Object.values(displayedResults.impacts);
    const impactFactors = impactCriteriasNames.map((key, index) => {
      const impactFactor: ImpactFactor = {
        impact_criteria: `${key}\n (${impactFactorsValues[index].unit})`,
        amount: Math.round(impactFactorsValues[index].value)
      };
      return impactFactor;
    });
    return impactFactors;
  });

  const axes = $derived.by(() => {
    return assignAxes(impactFactors[0]);
  });

  onMount(() => {
    renderHorizontalBarPlot(impactFactors, axes.x, axes.y);
  });

  function updateBarPlot(
    results: FunctionalUnitResultsRow[],
    impactFactors: ImpactFactor[],
    xLabel: string,
    yLabel: string
  ) {
    if (resultsIndex === results.length - 1) {
      resultsIndex = 0;
    } else {
      resultsIndex++;
    }
    renderHorizontalBarPlot(impactFactors, xLabel, yLabel);
  }
</script>

<div id="impactFactorsPlot"></div>
<p>
  Selected scope: {displayedResults.scope}. Product : {displayedResults.amount}
  {displayedResults.unit}.
</p>
<button onclick={() => updateBarPlot(functionalUnitOneResults, impactFactors, axes.x, axes.y)}
  >Next scope</button
>
