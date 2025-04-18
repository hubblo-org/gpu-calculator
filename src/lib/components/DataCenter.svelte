<script lang="ts">
  import { fade } from "svelte/transition";
  import { Countries, ElectricalTechnicalResilienceTiers } from "$lib/types/enums";
  import { DataCenter } from "$lib/data-center.svelte";
  import type { DataCenterBuilding } from "$lib/types/pcr-cloud";
  import DropdownButton from "./DropdownButton.svelte";
  import ToggleTip from "./ToggleTip.svelte";
  import ImpactFactorsSection from "./ImpactFactorsSection.svelte";
  import { genNullImpact, inventoryWithImpact } from "../../mocks/dc-data";
  import {
    buildImpactsPerCategoriesAndLifecycle,
    formatForBarPlot,
    computeUnitOneResults
  } from "$lib/calculations";
  import { onMount } from "svelte";
  import Summary from "./Summary.svelte";
  import FunctionalUnit from "./FunctionalUnit.svelte";

  interface Props {
    dataCenter: DataCenterBuilding;
  }
  const { dataCenter }: Props = $props();
  const dc = new DataCenter(dataCenter);

  // Visual parameters
  let secondaryCharacteristicsAreVisible = $state(false);
  let secondaryCharacteristicsButtonLabel = $state(
    "Display the data center secondary characteristics"
  );

  // Initiate state variables
  let results: null | any = $state();
  let resultsForTreemap: null | any = $state();
  let uf1Results: null | any = $state();
  let uf1BarPlotResults: null | any = $state();

  const electricalTechnicalResilienceTiers = Object.values(ElectricalTechnicalResilienceTiers);
  const countriesNames = Object.values(Countries);
  var tier = "Tier " + dc.electricalTechnicalResilience;

  function handleSecondaryCharacteristicsVisibility() {
    if (secondaryCharacteristicsAreVisible) {
      secondaryCharacteristicsAreVisible = false;
      secondaryCharacteristicsButtonLabel = "Display the data center secondary characteristics";
    } else {
      secondaryCharacteristicsAreVisible = true;
      secondaryCharacteristicsButtonLabel = "Hide the data center secondary characteristics";
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

  /// Trigger calculations
  //onMount(() => {
  //resultsForTreemap.res = buildImpactsPerCategoriesAndLifecycle(inventoryWithImpact, dc);
  //results = computeResults(resultsForTreemap.res);
  //});

  function updateResults() {
    resultsForTreemap = buildImpactsPerCategoriesAndLifecycle(inventoryWithImpact, dc);
    results = formatForBarPlot(resultsForTreemap);
    uf1Results = computeUnitOneResults(dc, resultsForTreemap);
    uf1BarPlotResults = formatForBarPlot(uf1Results);
  }

  updateResults();
</script>

<section aria-labelledby="data-center-characteristics">
  <header>
    <img id="data-center" src="/media/data-center.svg" alt="A data center" />
    <div id="data-center-description">
      <h2 id="data-center-characteristics">Data center characteristics</h2>

      <p>
        These are the parameters used in calculating the environmental impact factors for a given
        data center.
      </p>
    </div>
    <a href="#table-of-contents" aria-label="Scroll back to table of contents">▲</a>
  </header>
  <div class="section-main">
    <div class="grid">
      <div class="field">
        <div class="label-wrapper">
          <label for="building-total-surface">{dataCenter.totalSurface.label} (m²) </label>

          <ToggleTip info={dataCenter.totalSurface.description!} source="total-surface" />
        </div>
        <input
          type="number"
          id="building-total-surface"
          oninput={(event) => updateColor(event, dataCenter.totalSurface.value)}
          bind:value={dc.totalSurface}
        />
      </div>
      <div class="field">
        <div class="label-wrapper">
          <label for="concrete-volume">{dataCenter.concreteVolume.label} (m³)</label>
          <ToggleTip info={dataCenter.concreteVolume.description!} source="concrete-volume" />
        </div>

        <input
          type="number"
          id="concrete-volume"
          oninput={(event) => updateColor(event, dataCenter.concreteVolume.value)}
          bind:value={dc.concreteVolume}
        />
      </div>
      <div class="field">
        <div class="label-wrapper">
          <label for="steel-mass">{dataCenter.steelMass.label} (kg)</label>
          <ToggleTip info={dataCenter.steelMass.description!} source="steel-mass" />
        </div>

        <input
          type="number"
          id="steel-mass"
          oninput={(event) => updateColor(event, dataCenter.steelMass.value)}
          bind:value={dc.steelMass}
        />
      </div>
      <div class="field">
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
          oninput={(event) => updateColor(event, dataCenter.yearlyTotalEnergy.value)}
          bind:value={dc.yearlyTotalEnergy}
        />
      </div>
    </div>
    <div class="grid">
      <div class="field">
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
          oninput={(event) => updateColor(event, dataCenter.powerUsageEffectiveness.value)}
          bind:value={dc.powerUsageEffectiveness}
        />
      </div>
      <div class="field">
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
      </div>
      <div class="field">
        <div class="label-wrapper">
          <label for="electrical-technical-resilience">Electrical Technical Resilience tier</label>
          <ToggleTip
            info={dataCenter.electricalTechnicalResilience.description!}
            source="electrical-technical-resilience"
          />
        </div>
        <select
          bind:value={dc.electricalTechnicalResilience}
          oninput={(event) => updateColor(event, dataCenter.electricalTechnicalResilience.value)}
          id="electrical-technical-resilience"
        >
          {#each electricalTechnicalResilienceTiers as tier}<option>{tier}</option>{/each}
        </select>
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
      </div>
      <div class="field">
        <div class="label-wrapper">
          <label for="building-lifespan">{dataCenter.lifespan.label} (years)</label>
          <ToggleTip info={dataCenter.lifespan.description!} source="building-lifespan" />
        </div>

        <input type="number" id="building-lifespan" bind:value={dc.lifespan} />
      </div>
    </div>

    {#if !secondaryCharacteristicsAreVisible}
      <DropdownButton
        direction="down"
        label={secondaryCharacteristicsButtonLabel}
        visibilityFunction={handleSecondaryCharacteristicsVisibility}
      />
    {/if}
    {#if secondaryCharacteristicsAreVisible}
      <div transition:fade class="section-main" id="secondary-characteristics">
        <div class="grid">
          <div class="field">
            <div class="label-wrapper">
              <label for="building-lifespan">{dataCenter.lifespan.label} (years)</label>
              <ToggleTip info={dataCenter.lifespan.description!} source="building-lifespan" />
            </div>

            <input
              type="number"
              id="building-lifespan"
              oninput={(event) => updateColor(event, dataCenter.lifespan.value)}
              bind:value={dc.lifespan}
            />
          </div>

          <div class="field">
            <div class="label-wrapper">
              <label for="building-technical-rooms-surface"
                >{dataCenter.technicalRoomSurface.label} (m²)</label
              >
              <ToggleTip
                info={dataCenter.technicalRoomSurface.description!}
                source="building-technical-rooms-surface"
              />
            </div>

            <input
              type="number"
              id="building-technical-rooms-surface"
              step="0.01"
              oninput={(event) => updateColor(event, dataCenter.technicalRoomSurface.value)}
              bind:value={dc.technicalRoomsSurface}
            />
          </div>

          <div class="field">
            <div class="label-wrapper">
              <label for="building-suspended-ceiling-surface">
                {dataCenter.suspendedCeilingSurface.label} (m²)
              </label>
              <ToggleTip
                info={dataCenter.suspendedCeilingSurface.description!}
                source="building-suspended-ceiling-surface"
              />
            </div>
            <input
              type="number"
              id="building-suspended-ceiling-surface"
              step="0.01"
              oninput={(event) => updateColor(event, dataCenter.suspendedCeilingSurface.value)}
              bind:value={dc.suspendedCeilingSurface}
            />
          </div>

          <div class="field">
            <div class="label-wrapper">
              <label for="building-lifts"> {dataCenter.lifts.label} </label>
              <ToggleTip info={dataCenter.lifts.description!} source="building-lifts" />
            </div>
            <input
              type="number"
              id="building-lifts"
              oninput={(event) => updateColor(event, dataCenter.lifts.value)}
              bind:value={dc.lifts}
            />
          </div>
        </div>

        <div class="grid">
          <div class="field">
            <div class="label-wrapper">
              <label for="building-freight-lifts"> {dataCenter.freightLifts.label} </label>
              <ToggleTip
                info={dataCenter.freightLifts.description!}
                source="building-freight-lifts"
              />
            </div>
            <input
              type="number"
              id="building-freight-lifts"
              oninput={(event) => updateColor(event, dataCenter.freightLifts.value)}
              bind:value={dc.freightLifts}
            />
          </div>

          <div class="field">
            <div class="label-wrapper">
              <label for="building-partition-surface">
                {dataCenter.partitionSurface.label} (²)
              </label>
              <ToggleTip
                info={dataCenter.partitionSurface.description!}
                source="building-partition-surface"
              />
            </div>
            <input
              type="number"
              id="building-partition-surface"
              step="0.01"
              oninput={(event) => updateColor(event, dataCenter.partitionSurface.value)}
              bind:value={dc.partitionSurface}
            />
          </div>
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
    <button id="recalculate" class="btn btn-primary btn-sm" onclick={() => renderResults()}
      >Recalculate</button
    >
  </div>
</section>

<ImpactFactorsSection source="data-center" {results} resultsTreemap={resultsForTreemap} />

<Summary />

<FunctionalUnit {uf1Results} {uf1BarPlotResults} />

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
  #secondary-characteristics {
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
    .section-main {
      display: flex;
      flex-direction: column;
      max-width: 80rem;
      justify-content: space-evenly;
      position: relative;
      margin-inline: auto;
    }
    #data-center-description {
      display: flex;
      flex-direction: column;
    }
  }
</style>
