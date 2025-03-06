<script lang="ts">
  import * as Plot from "@observablehq/plot";
  import { functionalUnitOneResults } from "../../mocks/dc-data";
  import { onMount } from "svelte";

  interface Bar {
    impact_criteria: string;
    amount: number;
  }

  let resultsIndex: number = $state(0);

  const results = $derived(functionalUnitOneResults[resultsIndex]);
  const keys = $derived(Object.keys(results.impacts));
  const values = $derived(Object.values(results.impacts));
  const impactFactors: Bar[] = $derived(
    keys.map((key, index) => {
      const value: Bar = { impact_criteria: key, amount: Math.round(values[index]) };
      return value;
    })
  );

  function updatePlot() {
    if (resultsIndex === functionalUnitOneResults.length - 1) {
      resultsIndex = 0;
    } else {
      resultsIndex++;
    }
    renderPlot(impactFactors);
  }

  function renderPlot(impactFactors: Bar[]) {
    let div = document.querySelector("#impactFactorsPlot");
    div?.firstChild?.remove();
    if (div) {
      const resultsBarPlot = Plot.plot({
        width: 1600,
        height: 800,
        marginLeft: 200,
        y: { grid: true },
        marks: [
          Plot.ruleY([0]),
          Plot.barY(impactFactors, {
            x: "impact_criteria",
            y: "amount",
            fill: "amount",
            sort: { x: "y" }
          })
        ]
      });
      div.append(resultsBarPlot);
    }
  }

  onMount(() => {
    renderPlot(impactFactors);
  });
</script>

<p>{resultsIndex}</p>
<div id="impactFactorsPlot"></div>
<p>{results.scope} {results.amount} {results.unit}</p>
<button onclick={() => updatePlot()}>Next scope</button>
