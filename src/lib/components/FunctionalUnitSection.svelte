<script lang="ts">
  import ImpactFactorsSection from "./ImpactFactorsSection.svelte";
  import { getFunctionalUnitParameters, FunctionalUnits } from "$lib/types/enums";
  import { DataCenter } from "$lib/data-center.svelte";

  interface Props {
    dc: InstanceType<typeof DataCenter>;
  }
  const { dc }: Props = $props();

  let selectedFunctionalUnit = $state(FunctionalUnits.First);

  const parameters = $derived(getFunctionalUnitParameters(selectedFunctionalUnit));
</script>

<div>
  <section aria-labelledby="functional-unit-parameters">
    <header>
      <img src="/media/server-rack.svg" id="server-rack" alt="A server rack" />
      <div id="functional-unit-description">
        <h2 id="functional-unit-parameters">Functional unit parameters</h2>
        <p>
          These are the parameters of the selected functional unit, from which the functional unit
          results are calculated.
        </p>
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

<ImpactFactorsSection
  source="functional-unit"
  impactFactors={dc.firstUnitResults}
  impactFactorsPercentages={dc.firstUnitPercentages}
/>

<style>
  #server-rack {
    width: 80px;
    height: 80px;
  }
</style>
