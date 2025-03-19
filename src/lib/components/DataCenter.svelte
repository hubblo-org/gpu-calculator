<script lang="ts">
  import { Countries, ElectricalTechnicalResilienceTiers } from "$lib/types/enums";

  const electricalTechnicalResilienceTiers = Object.values(ElectricalTechnicalResilienceTiers);
  const countriesNames = Object.values(Countries);
</script>

<section aria-labelledby="data-center-characteristics">
  <h2 id="data-center-characteristics">Data center characteristics</h2>
  <label for="building-total-surface">Building total surface (square meters):</label><input
    type="number"
    id="building-total-surface"
  />
  <label for="concrete-volume">Concrete volume (cubic meters):</label><input
    type="number"
    id="concrete-volume"
  />
  <label for="steel-mass">Steel mass (kilograms):</label><input type="number" id="steel-mass" />
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
  <label for="electrical-technical-resilience">Electrical Technical Resilience tier:</label><select
    id="electrical-technical-resilience"
  >
    {#each electricalTechnicalResilienceTiers as tier}<option>{tier}</option>{/each}
  </select>
  <label for="location">Location:</label><select id="location"
    >{#each countriesNames as country}<option>{country}</option>{/each}</select
  >
</section>

<section aria-labelledby="data-center-impact-factors">
  <h2 id="data-center-impact-factors">Data center impact factors</h2>
  <button>Switch display</button>
  <table><caption>Data center impact factors absolute values, per impact criteria</caption></table>
</section>
