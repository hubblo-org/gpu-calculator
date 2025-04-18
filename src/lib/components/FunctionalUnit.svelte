<script lang="ts">
  import ImpactFactorsSection from "./ImpactFactorsSection.svelte";
  import { getFunctionalUnitParameters, FunctionalUnits } from "$lib/types/enums";
  import type { FunctionalUnitResultsRowWithLifeCycle } from "$lib/types/pcr-cloud";

  import { computeUnitOneResults, formatForBarPlot } from "$lib/calculations";
  import type { DataCenter } from "$lib/data-center.svelte";

  interface Props {
    uf1Results: FunctionalUnitResultsRowWithLifeCycle[];
    uf1BarPlotResults: any;
  }
  const { uf1Results, uf1BarPlotResults }: Props = $props();

  let ufResults: null | any = $state();
  let results: null | any = $state();
  let selectedFunctionalUnit = $state(FunctionalUnits.First);

  console.error("uf 1 results:");
  console.error(uf1Results);

  const parameters = $derived(getFunctionalUnitParameters(selectedFunctionalUnit));

  function updateResults() {
    ufResults = uf1Results;
    results = uf1BarPlotResults; //formatForBarPlot(uf1Results);
  }
  $effect(() => {
    updateResults();
  });
</script>

<div>
  <section aria-labelledby="functional-unit-parameters">
    <header>
      <img src="/media/server-rack.svg" id="server-rack" alt="A server rack" />
      <div id="functional-unit-description">
        <h2 id="functional-unit-parameters">
          {parameters.title}
        </h2>
        <p>{parameters.service}.</p>
      </div>
      <a href="#table-of-contents" aria-label="Scroll back to table of contents">▲</a>
    </header>
    <h3>{parameters.title}</h3>
    <p>
      What ? <b>{parameters.service}</b>
    </p>
    <p>How much/how many ? <b>{parameters.product}</b></p>
    <p>How long ? <b>{parameters.studyDuration}</b></p>
  </section>
</div>

<ImpactFactorsSection source="functional-unit" {results} resultsTreemap={ufResults} />

<style>
  #server-rack {
    width: 80px;
    height: 80px;
  }
</style>
