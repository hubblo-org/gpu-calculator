<script lang="ts">
  import { fail } from "@sveltejs/kit";
  import { ElectricalTechnicalResilienceTiers, CoolingSystems } from "$lib/types/enums";
  import {
    formatBuildingCharacteristicName,
    validateInt,
    validateFloat,
    validateString
  } from "$lib/inventory";
  import type { DataCenterBuilding } from "$lib/types/pcr-cloud";

  const resilienceTiers = Object.values(ElectricalTechnicalResilienceTiers);
  const coolingSystems = Object.values(CoolingSystems);

  let submittedBuildingInventory: null | DataCenterBuilding = $state(null);

  function submitBuildingInventory() {
    try {
      const buildingLifespan = 
        document.getElementById("building-lifespan") as HTMLInputElement
      ;
      const buildingTotalSurface = 
        document.getElementById("building-total-surface") as HTMLInputElement
      ;
      const buildingTechnicalRoomsSurface = 
        document.getElementById("building-technical-rooms-surface") as HTMLInputElement
      ;
      const buildingMaximumUsableElectricalPower = 
        document.getElementById("building-maximum-usable-electrical-power") as HTMLInputElement
      ;
      const buildingYearlyTotalEnergy = 
        document.getElementById("building-yearly-total-energy") as HTMLInputElement
      ;
      const buildingLoadFactor = 
        document.getElementById("building-load-factor") as HTMLInputElement
      ;
      const buildingPUE = 
        document.getElementById("building-power-usage-effectiveness") as HTMLInputElement
      ;
      const buildingWUE = 
        document.getElementById("building-water-usage-effectiveness") as HTMLInputElement
      ;
      const buildingERF = 
        document.getElementById("building-energy-reuse-factor") as HTMLInputElement
      ;
      const buildingREF = 
        document.getElementById("building-renewable-energy-factor") as HTMLInputElement
      ;
      const buildingResilience = document.getElementById(
        "building-electrical-technical-resilience"
      ) as HTMLInputElement;
      const buildingCoolingSystem = document.getElementById(
        "building-cooling-system"
      ) as HTMLInputElement;
      const buildingLocation = document.getElementById("building-location") as HTMLInputElement;
      const buildingStudyDuration = 
        document.getElementById("building-study-duration") as HTMLInputElement
      ;
      const buildingConcreteVolume = 
        document.getElementById("building-concrete-volume") as HTMLInputElement
      ;
      const buildingSteelMass =
        document.getElementById("building-steel-mass") as HTMLInputElement
      ;
      const buildingDesignedFloorSurface = 
        document.getElementById("building-designed-floor-assembly-surface") as HTMLInputElement
      ;
      const buildingSuspendedCeilingSurface = 
        document.getElementById("building-suspended-ceiling-surface") as HTMLInputElement
      ;
      const buildingLifts = 
        document.getElementById("building-lifts") as HTMLInputElement
      ;
      const buildingFreightLifts = 
        document.getElementById("building-freight-lifts") as HTMLInputElement
      ;
      const buildingPartitionSurface = 
        document.getElementById("building-partition-surface") as HTMLInputElement
      ;

      const buildingInventory: DataCenterBuilding = {
        lifespan: validateInt(buildingLifespan.value),
        totalSurface: validateFloat(buildingTotalSurface.value),
        technicalRoomSurface: validateFloat(buildingTechnicalRoomsSurface.value),
        yearlyTotalEnergy: validateInt(buildingYearlyTotalEnergy.value),
        maximumUsableElectricalPower: validateInt(buildingMaximumUsableElectricalPower.value),
        dataCenterLoadFactor: validateFloat(buildingLoadFactor.value),
        powerUsageEffectiveness: validateFloat(buildingPUE.value),
        waterUsageEffectiveness: validateFloat(buildingWUE.value),
        energyReuseFactor: validateFloat(buildingERF.value),
        renewableEnergyFactor: validateFloat(buildingREF.value),
        electricalTechnicalResilience: buildingResilience.value,
        coolingSystemType: buildingCoolingSystem.value,
        location: validateString(buildingLocation.value),
        studyDuration: validateInt(buildingStudyDuration.value),
        concreteVolume: validateFloat(buildingConcreteVolume.value),
        steelMass: validateFloat(buildingSteelMass.value),
        designedFloorAssemblySurface: validateFloat(buildingDesignedFloorSurface.value),
        suspendedCeilingSurface: validateFloat(buildingSuspendedCeilingSurface.value),
        lifts: validateInt(buildingLifts.value),
        freightLifts: validateInt(buildingFreightLifts.value),
        partitionSurface: validateFloat(buildingPartitionSurface.value)
      };
      submittedBuildingInventory = buildingInventory;
    } catch (error) {
      return fail(422, { error: error.message });
    }
  }
</script>

{#if !submittedBuildingInventory}
  <form aria-label="Building characteristics form">
    <div class="row-input">
      <label for="building-lifespan">Building lifespan, in years</label>
      <input type="number" id="building-lifespan" required />
    </div>
    <div class="row-input">
      <label for="building-total-surface">Building total surface, in square meters</label>
      <input type="number" id="building-total-surface" step="0.01" required />
    </div>
    <div class="row-input">
      <label for="building-technical-rooms-surface"
        >Technical rooms surface area, in square meters</label
      >
      <input type="number" id="building-technical-rooms-surface" step="0.01" required />
    </div>
    <div class="row-input">
      <label for="building-maximum-usable-electrical-power"
        >Maximum usable electrical power, in kilowatts</label
      >
      <input type="number" id="building-maximum-usable-electrical-power" required />
    </div>
    <div class="row-input">
      <label for="building-yearly-total-energy"> Total energy for one year, in kilowatts </label>
      <input type="number" id="building-yearly-total-energy" required />
    </div>
    <div class="row-input">
      <label for="building-load-factor"> Load factor </label>
      <input type="number" id="building-load-factor" step="0.1" required />
    </div>
    <div class="row-input">
      <label for="building-power-usage-effectiveness"> Power Usage Effectiveness (PUE) </label>
      <input
        type="number"
        id="building-power-usage-effectiveness"
        min="1"
        max="2"
        step="0.01"
        required
      />
    </div>
    <div class="row-input">
      <label for="building-water-usage-effectiveness"> Water Usage Effectiveness (WUE) </label>
      <input
        type="number"
        id="building-water-usage-effectiveness"
        min="0"
        max="3"
        step="0.01"
        required
      />
    </div>
    <div class="row-input">
      <label for="building-energy-reuse-factor"> Energy Reuse Factor (ERF) </label>
      <input type="number" id="building-energy-reuse-factor" min="0" max="3" step="0.01" required />
    </div>
    <div class="row-input">
      <label for="building-renewable-energy-factor"> Renewable Energy Factor (REF) </label>
      <input
        type="number"
        id="building-renewable-energy-factor"
        min="0"
        max="3"
        step="0.01"
        required
      />
    </div>
    <div class="row-input">
      <label for="building-electrical-technical-resilience">
        Electrical Technical Resilience tier
      </label>
      <select id="building-electrical-technical-resilience">
        {#each resilienceTiers as resilienceTier}
          <option value={resilienceTier}>{resilienceTier}</option>
        {/each}
      </select>
    </div>
    <div class="row-input">
      <label for="building-cooling-system"> Cooling system type </label>
      <select id="building-cooling-system">
        {#each coolingSystems as coolingSystem}
          <option value={coolingSystem}>{coolingSystem}</option>
        {/each}
      </select>
    </div>
    <div class="row-input">
      <label for="building-location"> Location </label>
      <input type="text" id="building-location" required />
    </div>
    <div class="row-input">
      <label for="building-study-duration"> Study duration, in days </label>
      <input type="number" id="building-study-duration" required />
    </div>
    <div class="row-input">
      <label for="building-concrete-volume"> Concrete volume, in cubic meters </label>
      <input type="number" id="building-concrete-volume" step="0.01" required />
    </div>
    <div class="row-input">
      <label for="building-steel-mass"> Steel mass, in kilograms </label>
      <input type="number" id="building-steel-mass" step="0.01" required />
    </div>
    <div class="row-input">
      <label for="building-designed-floor-assembly-surface">
        Designed floor assembly surface, in square meters
      </label>
      <input type="number" id="building-designed-floor-assembly-surface" step="0.01" required />
    </div>
    <div class="row-input">
      <label for="building-suspended-ceiling-surface">
        Suspended ceiling surface, in square meters
      </label>
      <input type="number" id="building-suspended-ceiling-surface" step="0.01" required />
    </div>
    <div class="row-input">
      <label for="building-lifts"> Number of lifts </label>
      <input type="number" id="building-lifts" required />
    </div>
    <div class="row-input">
      <label for="building-freight-lifts"> Number of freight lifts </label>
      <input type="number" id="building-freight-lifts" required />
    </div>
    <div class="row-input">
      <label for="building-partition-surface"> Partition surface, in square meters </label>
      <input type="number" id="building-partition-surface" step="0.01" required />
    </div>
    <button onclick={submitBuildingInventory}>Submit building details</button>
  </form>
{/if}

{#if submittedBuildingInventory}
  {#each Object.entries(submittedBuildingInventory) as [inventoryElementName, inventoryElementValue]}<p
    >
      Building {formatBuildingCharacteristicName(inventoryElementName)} : {inventoryElementValue}
    </p>{/each}
{/if}

<style>
  form {
    border: 2px black solid;
  }
  .row-input {
    display: flex;
    justify-content: space-between;
  }
</style>
