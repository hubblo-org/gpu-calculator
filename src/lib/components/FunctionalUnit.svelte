<script lang="ts">
  import ImpactFactorsSection from "./ImpactFactorsSection.svelte";
  import { getFunctionalUnitParameters, FunctionalUnits } from "$lib/types/enums";

  let selectedFunctionalUnit = $state(FunctionalUnits.First);
  const parameters = $derived(getFunctionalUnitParameters(selectedFunctionalUnit));
</script>

<div class="wrapper">
  <div>
    <section aria-labelledby="functional-unit-parameters">
      <div class="section-header">
        <img src="/server-rack.svg" id="server-rack" alt="A server rack" />
        <h2 id="functional-unit-parameters">Functional unit parameters</h2>
      </div>
      <h3>{parameters.title}</h3>
      <p>
        Service: {parameters.service}
      </p>
      <p>Product: {parameters.product}</p>
      <p>Study duration: {parameters.studyDuration}</p>
    </section>
  </div>

  <ImpactFactorsSection source="functional-unit" />
</div>

<style>
  #server-rack {
    width: 80px;
    height: 80px;
  }
</style>
