<script lang="ts">
  import { Countries, ElectricalTechnicalResilienceTiers } from "$lib/types/enums";
  import type { DataCenterBuilding } from "$lib/types/pcr-cloud";
  import ImpactFactorsSection from "./ImpactFactorsSection.svelte";

  interface Props {
    dataCenter: DataCenterBuilding;
  }

  const { dataCenter }: Props = $props();

  let secondaryCharacteristicsAreVisible = $state(false);
  let secondaryCharacteristicsButtonLabel = $state(
    "Display the data center secondary characteristics"
  );

  const electricalTechnicalResilienceTiers = Object.values(ElectricalTechnicalResilienceTiers);
  const countriesNames = Object.values(Countries);

  function handleSecondaryCharacteristicsVisibility() {
    if (secondaryCharacteristicsAreVisible) {
      secondaryCharacteristicsAreVisible = false;
      secondaryCharacteristicsButtonLabel = "Display the data center secondary characteristics";
    } else {
      secondaryCharacteristicsAreVisible = true;
      secondaryCharacteristicsButtonLabel = "Hide the data center secondary characteristics";
    }
  }
</script>

<div id="data-center-characteristics-wrapper">
  <img id="data-center" src="/data-center.svg" alt="A data center" />
  <section aria-labelledby="data-center-characteristics">
    <h2 id="data-center-characteristics">Data center characteristics</h2>
    <div id="characteristics">
      <div>
        <label for="building-total-surface">{dataCenter.totalSurface.label} (square meters):</label
        ><input
          type="number"
          id="building-total-surface"
          placeholder={dataCenter.totalSurface.value}
        />
        <label for="concrete-volume">{dataCenter.concreteVolume.label} (cubic meters):</label><input
          type="number"
          id="concrete-volume"
          placeholder={dataCenter.concreteVolume.value}
        />
        <label for="steel-mass">Steel mass (kilograms):</label><input
          type="number"
          id="steel-mass"
          placeholder={dataCenter.steelMass.value}
        />
      </div>
      <div>
        <label for="yearly-total-energy">Total energy for one year (kilowatts):</label><input
          type="number"
          id="yearly-total-energy"
          placeholder={dataCenter.yearlyTotalEnergy.value}
        />
        <label for="power-usage-effectiveness">Power Usage Effectiveness (PUE):</label><input
          type="number"
          id="power-usage-effectiveness"
          placeholder={dataCenter.powerUsageEffectiveness.value}
        />
        <label for="water-usage-effectiveness">Water Usage Effectiveness (WUE):</label><input
          type="number"
          id="water-usage-effectiveness"
          placeholder={dataCenter.waterUsageEffectiveness.value}
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

      <button
        aria-label={secondaryCharacteristicsButtonLabel}
        onclick={handleSecondaryCharacteristicsVisibility}>-></button
      >
      {#if secondaryCharacteristicsAreVisible}
        <div id="data-center-secondary-characteristics">
          <label for="building-lifespan">Building lifespan, in years</label>
          <input type="number" id="building-lifespan" placeholder={dataCenter.lifespan.value} />

          <label for="building-technical-rooms-surface"
            >Technical rooms surface area, in square meters</label
          >
          <input
            type="number"
            id="building-technical-rooms-surface"
            step="0.01"
            placeholder={dataCenter.technicalRoomSurface.value}
          />
          <label for="building-maximum-usable-electrical-power"
            >Maximum usable electrical power, in kilowatts</label
          >
          <input type="number" id="building-maximum-usable-electrical-power" />

          <label for="building-load-factor" placeholder={dataCenter.dataCenterLoadFactor.value}>
            Load factor
          </label>
          <input type="number" id="building-load-factor" step="0.1" />

          <label for="building-energy-reuse-factor"> Energy Reuse Factor (ERF) </label>
          <input
            type="number"
            id="building-energy-reuse-factor"
            min="0"
            max="3"
            step="0.01"
            placeholder={dataCenter.energyReuseFactor.value}
          />

          <label for="building-renewable-energy-factor"> Renewable Energy Factor (REF) </label>
          <input
            type="number"
            id="building-renewable-energy-factor"
            min="0"
            max="3"
            step="0.01"
            placeholder={dataCenter.renewableEnergyFactor.value}
          />

          <label for="building-cooling-system"> Cooling system type </label>
          <select id="building-cooling-system"> </select>

          <label for="building-designed-floor-assembly-surface">
            Designed floor assembly surface, in square meters
          </label>
          <input
            type="number"
            id="building-designed-floor-assembly-surface"
            step="0.01"
            placeholder={dataCenter.designedFloorAssemblySurface.value}
          />

          <label for="building-suspended-ceiling-surface">
            Suspended ceiling surface, in square meters
          </label>
          <input
            type="number"
            id="building-suspended-ceiling-surface"
            step="0.01"
            placeholder={dataCenter.suspendedCeilingSurface.value}
          />

          <label for="building-lifts"> Number of lifts </label>
          <input type="number" id="building-lifts" placeholder={dataCenter.lifts.value} />

          <label for="building-freight-lifts"> Number of freight lifts </label>
          <input
            type="number"
            id="building-freight-lifts"
            placeholder={dataCenter.freightLifts.value}
          />

          <label for="building-partition-surface"> Partition surface, in square meters </label>
          <input
            type="number"
            id="building-partition-surface"
            step="0.01"
            placeholder={dataCenter.partitionSurface.value}
          />
        </div>
      {/if}
    </div>
  </section>
</div>

<ImpactFactorsSection source="data-center" />

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
