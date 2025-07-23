<script lang="ts">
  import { fade } from "svelte/transition";
  import { Countries, ElectricalTechnicalResilienceTiers } from "$lib/types/enums";
  import { DataCenter } from "$lib/data-center.svelte";

  import { dataCenterCharacteristics as dataCenter } from "../../mocks/dc-data";
  import DropdownButton from "./DropdownButton.svelte";
  import ToggleTip from "./ToggleTip.svelte";
  import ImpactFactorsSection from "./ImpactFactorsSection.svelte";
  import {
    computeTotalEnergyFromTotalPower,
    computeTotalPowerFromTotalEnergy
  } from "$lib/calculations";

  interface Props {
    dc: InstanceType<typeof DataCenter>;
  }
  const { dc }: Props = $props();

  // Visual parameters
  let secondaryCharacteristicsAreVisible = $state(false);
  let secondaryCharacteristicsButtonLabel = $state("Display the data center secondary parameters");

  const electricalTechnicalResilienceTiers = Object.values(ElectricalTechnicalResilienceTiers);
  const countriesNames = Object.values(Countries);

  function handleSecondaryCharacteristicsVisibility() {
    if (secondaryCharacteristicsAreVisible) {
      secondaryCharacteristicsAreVisible = false;
      secondaryCharacteristicsButtonLabel = "Display the data center secondary parameters";
    } else {
      secondaryCharacteristicsAreVisible = true;
      secondaryCharacteristicsButtonLabel = "Hide the data center secondary parameters";
    }
  }

  function updateColor(event: Event, initialValue: string | number) {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
      const newValue = event.target.value;
      if ((newValue as number | string) != initialValue) {
        event.target.style.color = "var(--color-primary-100)";
        event.target.style.fontStyle = "italic";
      } else {
        event.target.style.color = "initial";
        event.target.style.fontStyle = "initial";
      }
    }
  }

  function updateImpacts() {
    dc.update();
    const dataCenterSectionId = "data-center-table-heading";
    const graphSection = document.getElementById(dataCenterSectionId)?.parentElement;
    graphSection?.scrollIntoView();
  }

  function updateValue(event: Event, initialValue: string | number) {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
      console.log("got event");
      if (event.target.id == "maximum-usable-electrical-power") {
        console.log("got event from " + event.target.id);
        let newValue = computeTotalEnergyFromTotalPower(
          event.target.value,
          dc.datacenterLoadFactor
        );
        console.log("setting newvalue to yearly-total-energy: " + newValue);
        dc.yearlyTotalEnergy = newValue;
      } else if (event.target.id == "yearly-total-energy") {
        console.log("got event from " + event.target.id);
        let newValue = computeTotalPowerFromTotalEnergy(
          event.target.value,
          dc.datacenterLoadFactor
        );
        dc.maximumUsableElectricalPower = newValue;
      } else if (event.target.id == "datacenter-load-factor") {
        console.log("got event from " + event.target.id);
        dc.yearlyTotalEnergy = computeTotalEnergyFromTotalPower(
          dc.maximumUsableElectricalPower,
          event.target.value
        );
      }
    }
  }
</script>

<section aria-labelledby="data-center-parameters">
  <header>
    <img id="data-center" src="/media/data-center.svg" alt="A data center" />
    <div id="data-center-description">
      <h2 id="data-center-parameters">Data center parameters</h2>
      <p>
        These are the parameters used in calculating the environmental impact factors for a given
        data center.
      </p>
    </div>
    <a href="#table-of-contents" aria-label="Scroll back to table of contents">▲</a>
  </header>
  <form>
    <div class="grid">
      <div class="field">
        <div class="label-wrapper">
          <label for="building-total-surface">{dataCenter.totalSurface.label} (m²) </label>
          <ToggleTip info={dataCenter.totalSurface.description!} source="total-surface" />
        </div>
        <input
          type="number"
          id="building-total-surface"
          step="0.01"
          oninput={(event) => updateColor(event, dataCenter.totalSurface.value)}
          bind:value={dc.totalSurface}
        />
        <div class="label-wrapper">
          <label for="maximum-usable-electrical-power">
            {dataCenter.maximumUsableElectricalPower.label} MW
          </label>
          <ToggleTip
            info={dataCenter.maximumUsableElectricalPower.description!}
            source="maximum-usable-electrical-power"
          />
        </div>
        <input
          type="number"
          id="maximum-usable-electrical-power"
          step="0.1"
          oninput={(event) => {
            updateColor(event, dataCenter.maximumUsableElectricalPower.value);
            updateValue(event, dataCenter.maximumUsableElectricalPower.value);
          }}
          bind:value={dc.maximumUsableElectricalPower}
        />
        <div class="label-wrapper">
          <label for="yearly-total-energy">{dataCenter.yearlyTotalEnergy.label} (kWh)</label>
          <ToggleTip
            info={dataCenter.yearlyTotalEnergy.description!}
            source="yearly-total-energy"
          />
        </div>
        <input
          type="number"
          id="yearly-total-energy"
          step="0.01"
          oninput={(event) => {
            updateColor(event, dataCenter.yearlyTotalEnergy.value);
            updateValue(event, dataCenter.yearlyTotalEnergy.value);
          }}
          bind:value={dc.yearlyTotalEnergy}
        />
        <div class="label-wrapper">
          <label for="datacenter-load-factor">{dataCenter.dataCenterLoadFactor.label}</label>
          <ToggleTip
            info={dataCenter.dataCenterLoadFactor.description!}
            source="datacenter-load-factor"
          />
        </div>
        <input
          type="number"
          id="datacenter-load-factor"
          step="0.1"
          max="1"
          min="0"
          oninput={(event) => {
            updateColor(event, dataCenter.dataCenterLoadFactor.value);
            updateValue(event, dataCenter.dataCenterLoadFactor.value);
          }}
          bind:value={dc.datacenterLoadFactor}
        />
      </div>
      <div class="field">
        <div class="label-wrapper">
          <label for="location">Location</label>
          <ToggleTip info={dataCenter.location.description!} source="location" />
        </div>
        <select
          bind:value={dc.location}
          oninput={(event) => updateColor(event, dataCenter.location.value)}
          id="location"
          >{#each countriesNames as country}<option>{country}</option>{/each}</select
        >
        <div class="label-wrapper">
          <label for="power-usage-effectiveness">Power Usage Effectiveness (PUE)</label>
          <ToggleTip
            info={dataCenter.powerUsageEffectiveness.description!}
            source="power-usage-effectiveness"
          />
        </div>
        <input
          type="number"
          id="power-usage-effectiveness"
          step="0.01"
          onchange={(event) => updateColor(event, dataCenter.powerUsageEffectiveness.value)}
          bind:value={dc.powerUsageEffectiveness}
        />
        <div class="label-wrapper">
          <label for="water-usage-effectiveness">Water Usage Effectiveness (WUE)</label>
          <ToggleTip
            info={dataCenter.waterUsageEffectiveness.description!}
            source="water-usage-effectiveness"
          />
        </div>
        <input
          type="number"
          id="water-usage-effectiveness"
          step="0.01"
          oninput={(event) => updateColor(event, dataCenter.waterUsageEffectiveness.value)}
          bind:value={dc.waterUsageEffectiveness}
        />
        <div class="label-wrapper">
          <label for="building-lifespan">{dataCenter.lifespan.label} (years)</label>
          <ToggleTip info={dataCenter.lifespan.description!} source="building-lifespan" />
        </div>

        <input type="number" id="building-lifespan" bind:value={dc.lifespan} />
      </div>
    </div>

    <!--
    {#if !secondaryCharacteristicsAreVisible}
      <DropdownButton
        direction="down"
        label={secondaryCharacteristicsButtonLabel}
        visibilityFunction={handleSecondaryCharacteristicsVisibility}
      />
    {/if}
    {#if secondaryCharacteristicsAreVisible}
      <div transition:fade class="section-main" id="secondary-parameters">
        <div class="grid">
          <div class="field">
            <div class="label-wrapper">
              <label for="electrical-technical-resilience"
                >Electrical Technical Resilience tier</label
              >
              <ToggleTip
                info={dataCenter.electricalTechnicalResilience.description!}
                source="electrical-technical-resilience"
              />
            </div>
            <select
              bind:value={dc.electricalTechnicalResilience}
              id="electrical-technical-resilience"
            >
              {#each electricalTechnicalResilienceTiers as tier}<option>{tier}</option>{/each}
            </select>
          </div>
        </div>
      </div>
      <DropdownButton
        direction="up"
        label={secondaryCharacteristicsButtonLabel}
        visibilityFunction={handleSecondaryCharacteristicsVisibility}
      />
    {/if}
    -->
    <button
      id="recalculate"
      class="btn btn-primary btn-sm"
      onclick={(event) => {
        event.preventDefault();
        updateImpacts();
      }}>Recalculate</button
    >
  </form>
</section>

<ImpactFactorsSection
  source="data-center"
  impactFactors={dc.impactFactors!}
  impactFactorsShares={dc.impactFactorsShares!}
/>

<style>
  section {
    overflow-y: hidden;
  }
  .field {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 16px;
    margin-top: 12px;
  }
  .label-wrapper {
    display: flex;
  }
  #secondary-parameters {
    display: flex;
    flex-direction: column;
  }
  #data-center {
    width: 80px;
    height: 80px;
  }
  #recalculate {
    margin-left: auto;
  }
  @media (width >= 481px) {
    label {
      height: 40px;
      width: 100%;
    }
    input {
      margin-top: auto;
    }
    input,
    select {
      height: 50px;
      box-sizing: border-box;
    }
    .field {
      width: 800px;
    }
    .grid {
      display: flex;
      padding-top: 10px;
      gap: 50px;
    }
    #data-center-description {
      display: flex;
      flex-direction: column;
    }
  }
</style>
