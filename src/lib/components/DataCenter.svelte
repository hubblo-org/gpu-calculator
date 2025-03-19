<script lang="ts">
  import {
    Countries,
    ElectricalTechnicalResilienceTiers,
    getAllImpactCriterias,
    LifeCycleSteps
  } from "$lib/types/enums";

  const electricalTechnicalResilienceTiers = Object.values(ElectricalTechnicalResilienceTiers);
  const countriesNames = Object.values(Countries);
  const mainImpactCriterias = getAllImpactCriterias().filter(
    (impactCriteria) =>
      impactCriteria.acronym === "GWP" ||
      impactCriteria.acronym === "MIPS" ||
      impactCriteria.acronym === "WU"
  );
  const lifeCycleSteps = Object.values(LifeCycleSteps);
</script>

<div id="data-center-characteristics-wrapper">
  <img id="data-center" src="/data-center.svg" alt="A data center" />
  <section aria-labelledby="data-center-characteristics">
    <h2 id="data-center-characteristics">Data center characteristics</h2>
    <div id="characteristics">
      <div>
        <label for="building-total-surface">Building total surface (square meters):</label><input
          type="number"
          id="building-total-surface"
        />
        <label for="concrete-volume">Concrete volume (cubic meters):</label><input
          type="number"
          id="concrete-volume"
        />
        <label for="steel-mass">Steel mass (kilograms):</label><input
          type="number"
          id="steel-mass"
        />
      </div>
      <div>
        <label for="yearly-total-energy">Total energy for one year (kilowatts):</label><input
          type="number"
          id="yearly-total-energy"
        />
        <label for="power-usage-effectiveness">Power Usage Effectiveness (PUE):</label><input
          type="number"
          id="power-usage-effectiveness"
        />
        <label for="water-usage-effectiveness">Water Usage Effectiveness (WUE):</label><input
          type="number"
          id="water-usage-effectiveness"
        />
      </div>
      <div>
        <label for="electrical-technical-resilience">Electrical Technical Resilience tier:</label
        ><select id="electrical-technical-resilience">
          {#each electricalTechnicalResilienceTiers as tier}<option>{tier}</option>{/each}
        </select>
        <label for="location">Location:</label><select id="location"
          >{#each countriesNames as country}<option>{country}</option>{/each}</select
        >
      </div>
    </div>
  </section>
</div>

<section aria-labelledby="data-center-impact-factors">
  <h2 id="data-center-impact-factors">Data center impact factors</h2>
  <button>Switch display</button>
  <table>
    <caption>Data center impact factors absolute values, per impact criteria</caption><thead
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

<style>
  #data-center {
    width: 80px;
    height: 80px;
  }
  #data-center-characteristics-wrapper {
    display: flex;
  }
  #characteristics {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 480px) {
    #characteristics {
      flex-direction: row;
    }
    #characteristics div {
      display: flex;
      flex-direction: column;
      padding-left: 12px;
    }
  }
</style>
