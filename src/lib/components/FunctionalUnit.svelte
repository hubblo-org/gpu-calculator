<script lang="ts">
  import { getAllImpactCriterias } from "$lib/types/enums";
  import { LifeCycleSteps } from "$lib/types/enums";

  const mainImpactCriterias = getAllImpactCriterias().filter(
    (impactCriteria) =>
      impactCriteria.acronym === "GWP" ||
      impactCriteria.acronym === "MIPS" ||
      impactCriteria.acronym === "WU"
  );
  const lifeCycleSteps = Object.values(LifeCycleSteps);
</script>

<div id="wrapper">
  <div id="functional-unit-parameters-wrapper">
    <img src="/server-rack.svg" id="server-rack" alt="A server rack" />
    <section aria-labelledby="functional-unit-parameters">
      <h2 id="functional-unit-parameters">Functional unit parameters</h2>
    </section>
  </div>

  <div id="functional-unit-results-wrapper">
    <section aria-labelledby="functional-unit-results">
      <h2 id="functional-unit-results">Functional unit results</h2>
      <button>Switch graph display</button>
      <table>
        <caption>Totals for the functional unit per impact criteria, as absolute values</caption>
        <thead
          ><tr
            ><th>Life cycle step</th>{#each mainImpactCriterias as impactCriteria}<th
                >{impactCriteria.acronym}</th
              >{/each}</tr
          ></thead
        >
        <tbody>
          {#each lifeCycleSteps as lifeCycleStep}<tr><th scope="row">{lifeCycleStep}</th></tr
            >{/each}</tbody
        >
      </table>
    </section>
  </div>
</div>

<style>
  section {
    display: flex;
  }
  section button {
    width: 120px;
    height: 40px;
  }
  #functional-unit-parameters-wrapper {
    display: flex;
  }
  #functional-unit-results-wrapper {
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
