<script lang="ts">
  import ImpactFactorsSection from "./ImpactFactorsSection.svelte";
  import { getFunctionalUnitParameters, FunctionalUnits } from "$lib/types/enums";

  let selectedFunctionalUnit = $state(FunctionalUnits.First);
  const parameters = $derived(getFunctionalUnitParameters(selectedFunctionalUnit));
</script>

<div>
  <section aria-labelledby="functional-unit-parameters">
    <header>
      <img src="/media/server-rack.svg" id="server-rack" alt="A server rack" />
      <h2 id="functional-unit-parameters">Functional unit parameters</h2>
      <a href="#table-of-contents" aria-label="Scroll back to table of contents">▲</a>
    </header>
    <h3>{parameters.title}</h3>
    <p>
      Service: {parameters.service}
    </p>
    <p>Product: {parameters.product}</p>
    <p>Study duration: {parameters.studyDuration}</p>
  </section>
</div>

<ImpactFactorsSection source="functional-unit" />

<style>
  #server-rack {
    width: 80px;
    height: 80px;
  }
</style>
