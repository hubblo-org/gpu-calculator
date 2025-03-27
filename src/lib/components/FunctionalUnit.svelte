<script lang="ts">
  import ImpactFactorsSection from "./ImpactFactorsSection.svelte";
  import { getFunctionalUnitParameters, FunctionalUnits } from "$lib/types/enums";

  let selectedFunctionalUnit = $state(FunctionalUnits.First);
  const parameters = $derived(getFunctionalUnitParameters(selectedFunctionalUnit));
</script>

<div id="wrapper">
  <div id="functional-unit-parameters-wrapper">
    <img src="/server-rack.svg" id="server-rack" alt="A server rack" />
    <section aria-labelledby="functional-unit-parameters">
      <h2 id="functional-unit-parameters">Functional unit parameters</h2>
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
  section {
    display: flex;
  }
  #functional-unit-parameters-wrapper {
    display: flex;
  }
  #server-rack {
    width: 80px;
    height: 80px;
  }
  #wrapper {
    display: flex;
    flex-direction: column;
  }
</style>
