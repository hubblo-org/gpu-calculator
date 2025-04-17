<script lang="ts">
  import ImpactFactorsSection from "./ImpactFactorsSection.svelte";
  import { getFunctionalUnitParameters, FunctionalUnits } from "$lib/types/enums";
  import type { FunctionalUnitResultsRowWithLifeCycle } from "$lib/types/pcr-cloud";

  import { computeUnitOneResults, computeResults } from "$lib/calculations";

  interface Props {
    datacenterResults: FunctionalUnitResultsRowWithLifeCycle[];
  }
  const { datacenterResults }: Props = $props();

  let results: null | any = $state();
  let resultsForTreemap: null | any = $state();
  let selectedFunctionalUnit = $state(FunctionalUnits.First);

  const parameters = $derived(getFunctionalUnitParameters(selectedFunctionalUnit));
  console.error(datacenterResults);

  resultsForTreemap = computeUnitOneResults(datacenterResults);
  results = computeResults(resultsForTreemap);

  function updateResults() {
    resultsForTreemap = computeUnitOneResults(datacenterResults);
    results = computeResults(resultsForTreemap);
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

<ImpactFactorsSection source="functional-unit" {results} resultsTreemap={resultsForTreemap} />

<style>
  #server-rack {
    width: 80px;
    height: 80px;
  }
</style>
