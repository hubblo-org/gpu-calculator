<script lang="ts">
  import type { FunctionalUnitResultsRowWithLifeCycle } from "$lib/types/pcr-cloud";
  import { onMount } from "svelte";
  import * as Plot from "@observablehq/plot";

  interface Props {
    results: FunctionalUnitResultsRowWithLifeCycle[];
  }

  const { results }: Props = $props();

  const filteredResults = results; //.filter((result) => result.life_cycle_step != "full_life_cycle");
  console.log("filteredResults = " + filteredResults);

  const resultsCriteriasPerLifeCycle = $derived.by(() => {
    return filteredResults
      .filter((result) => result.life_cycle_step != "full_life_cycle")
      .flatMap((result) => {
        const impactCriteriasNames = Object.keys(result.impacts);
        const sortedImpactCriterias = impactCriteriasNames.map((impactCriteria) => {
          const object = {
            impact_criteria: impactCriteria,
            lc_step: result.life_cycle_step,
            share: result.impacts[impactCriteria].value
          };
          return object;
        });

        return sortedImpactCriterias;
      });
  });

  const lifeCycleSteps = ["manufacturing", "transport", "use", "end-of-life"];

  function renderStackedBarPlot() {
    let div = document.querySelector("#impact-factors-plot");
    div?.firstChild?.remove();
    if (div) {
      const resultsBarPlot = Plot.plot({
        width: 1600,
        height: 800,
        marginLeft: 100,
        color: { legend: true, domain: lifeCycleSteps },
        y: { percent: true },
        marks: [
          Plot.barY(resultsCriteriasPerLifeCycle, {
            y: "share",
            x: "impact_criteria",
            fill: "lc_step",
            order: lifeCycleSteps,
            offset: "normalize",
            tip: true
          })
        ]
      });
      div.append(resultsBarPlot);
    }
  }

  onMount(() => renderStackedBarPlot());
</script>

<div id="impact-factors-plot"></div>
