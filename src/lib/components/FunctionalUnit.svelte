<script lang="ts">
  import ImpactFactorsSection from "./ImpactFactorsSection.svelte";
</script>

<div id="wrapper">
  <div id="functional-unit-parameters-wrapper">
    <img src="/server-rack.svg" id="server-rack" alt="A server rack" />
    <section aria-labelledby="functional-unit-parameters">
      <h2 id="functional-unit-parameters">Functional unit parameters</h2>
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
