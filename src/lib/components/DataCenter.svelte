<script lang="ts">
  import { fade } from "svelte/transition";
  import { CoolingSystems, Countries, ElectricalTechnicalResilienceTiers } from "$lib/types/enums";
  import type { DataCenterBuilding } from "$lib/types/pcr-cloud";
  import ImpactFactorsSection from "./ImpactFactorsSection.svelte";
  import {
    genNullImpact,
    inventoryElementImpactFactors,
    inventoryWithImpact,
    dataCenterCharacteristics
  } from "../../mocks/dc-data";
  import ResultsPercentages from "./ResultsPercentages.svelte";
  import type {
    FunctionalUnitResultsRowWithLifeCycle,
    FunctionalUnitResultsRow,
    ImpactFactor,
    ImpactFactors,
    DataCenterInventoryElementWithImpactFactors
  } from "$lib/types/pcr-cloud";
  import BuildingForm from "./BuildingForm.svelte";
  import ResultsPerImpactFactor from "./ResultsPerImpactFactor.svelte";
  import ResultsVerticalPercentages from "./ResultsVerticalPercentages.svelte";

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
  const coolingSystemTypes = Object.values(CoolingSystems);

  function computeImpact(
    impact1: number,
    quantity_impact2: number,
    impact2: number,
    reference_years: number,
    lifespan: number
  ) {
    if (isNaN(impact1)) {
      impact1 = 0;
    }
    //console.log(
    //  "impact1=" +
    //    impact1 +
    //    " quantity=" +
    //    quantity_impact2 +
    //    " impact2=" +
    //    impact2 +
    //    " refyears=" +
    //    reference_years +
    //    " lifespan=" +
    //    lifespan
    //);
    return ((impact1 + quantity_impact2 * impact2) * reference_years) / lifespan;
  }

  function addImpacts(
    impacts1: ImpactFactors,
    quantity: number,
    impacts2: ImpactFactors,
    ref_years: number,
    lifespan: number
  ) {
    var res: ImpactFactors = {
      ADPe: {
        value: computeImpact(
          impacts1.ADPe.value,
          quantity,
          impacts2.ADPe.value,
          ref_years,
          lifespan
        ),
        unit: impacts1.ADPe.unit
      },
      ADPf: {
        value: computeImpact(
          impacts1.ADPf.value,
          quantity,
          impacts2.ADPf.value,
          ref_years,
          lifespan
        ),
        unit: impacts1.ADPf.unit
      },
      AP: {
        value: computeImpact(impacts1.AP.value, quantity, impacts2.AP.value, ref_years, lifespan),
        unit: impacts1.AP.unit
      },
      CTUe: {
        value: computeImpact(
          impacts1.CTUe.value,
          quantity,
          impacts2.CTUe.value,
          ref_years,
          lifespan
        ),
        unit: impacts1.CTUe.unit
      },
      CTUh: {
        value: computeImpact(
          impacts1.CTUh.value,
          quantity,
          impacts2.CTUh.value,
          ref_years,
          lifespan
        ),
        unit: impacts1.CTUh.unit
      },
      CTUh_c: {
        value: computeImpact(
          impacts1.CTUh_c.value,
          quantity,
          impacts2.CTUh_c.value,
          ref_years,
          lifespan
        ),
        unit: impacts1.CTUh_c.unit
      },
      CTUh_nc: {
        value: computeImpact(
          impacts1.CTUh_nc.value,
          quantity,
          impacts2.CTUh_nc.value,
          ref_years,
          lifespan
        ),
        unit: impacts1.CTUh_nc.unit
      },
      EPF: {
        value: computeImpact(impacts1.EPF.value, quantity, impacts2.EPF.value, ref_years, lifespan),
        unit: impacts1.EPF.unit
      },
      EPM: {
        value: computeImpact(impacts1.EPM.value, quantity, impacts2.EPM.value, ref_years, lifespan),
        unit: impacts1.EPM.unit
      },
      EPT: {
        value: computeImpact(impacts1.EPT.value, quantity, impacts2.EPT.value, ref_years, lifespan),
        unit: impacts1.EPT.unit
      },
      GWP: {
        value: computeImpact(impacts1.GWP.value, quantity, impacts2.GWP.value, ref_years, lifespan),
        unit: impacts1.GWP.unit
      },
      GWPb: {
        value: computeImpact(
          impacts1.GWPb.value,
          quantity,
          impacts2.GWPb.value,
          ref_years,
          lifespan
        ),
        unit: impacts1.GWPb.unit
      },
      GWPf: {
        value: computeImpact(
          impacts1.GWPf.value,
          quantity,
          impacts2.GWPf.value,
          ref_years,
          lifespan
        ),
        unit: impacts1.GWPf.unit
      },
      GWPlu: {
        value: computeImpact(
          impacts1.GWPlu.value,
          quantity,
          impacts2.GWPlu.value,
          ref_years,
          lifespan
        ),
        unit: impacts1.GWPlu.unit
      },
      IR: {
        value: computeImpact(impacts1.IR.value, quantity, impacts2.IR.value, ref_years, lifespan),
        unit: impacts1.IR.unit
      },
      LU: {
        value: computeImpact(impacts1.LU.value, quantity, impacts2.LU.value, ref_years, lifespan),
        unit: impacts1.LU.unit
      },
      MIPS: {
        value: computeImpact(
          impacts1.MIPS.value,
          quantity,
          impacts2.MIPS.value,
          ref_years,
          lifespan
        ),
        unit: impacts1.MIPS.unit
      },
      ODP: {
        value: computeImpact(impacts1.ODP.value, quantity, impacts2.ODP.value, ref_years, lifespan),
        unit: impacts1.ODP.unit
      },
      PM: {
        value: computeImpact(impacts1.PM.value, quantity, impacts2.PM.value, ref_years, lifespan),
        unit: impacts1.PM.unit
      },
      POCP: {
        value: computeImpact(
          impacts1.POCP.value,
          quantity,
          impacts2.POCP.value,
          ref_years,
          lifespan
        ),
        unit: impacts1.POCP.unit
      },
      TPE: {
        value: computeImpact(impacts1.TPE.value, quantity, impacts2.TPE.value, ref_years, lifespan),
        unit: impacts1.TPE.unit
      },
      WU: {
        value: computeImpact(impacts1.WU.value, quantity, impacts2.WU.value, ref_years, lifespan),
        unit: impacts1.WU.unit
      }
    };
    return res;
  }

  /// Casts Data Centre inventory in FunctionalUnitResults
  function build_impact_per_lifecycle_step(
    inventory_with_impact: DataCenterInventoryElementWithImpactFactors[]
  ) {
    var ref_hours = 8760; // hours = 1 year
    var ref_years = 1;
    /// With lifecycle only
    var res: FunctionalUnitResultsRowWithLifeCycle[] = [];
    var initManuf = genNullImpact();
    initManuf.life_cycle_step = "manufacturing";
    initManuf.name = "Combined manufacturing impact of all equipments in the Data Centre";
    var initUse = genNullImpact();
    initUse.name = "Combined use impact of all equipments in the Data Centre";
    initUse.life_cycle_step = "use";
    var initTransport = genNullImpact();
    initTransport.name = "Combined transport impact of all equipments in the Data Centre";
    initTransport.life_cycle_step = "transport";
    var initEOL = genNullImpact();
    initEOL.name = "Combined end-of-life impact of all equipments in the Data Centre";
    initEOL.life_cycle_step = "end-of-life";
    res.push(initEOL);
    res.push(initUse);
    res.push(initTransport);
    res.push(initManuf);

    for (var i = 0; i < inventory_with_impact.length; i++) {
      // if lifecycle step is usage
      if (inventory_with_impact[i].lifeCycleStep === "use") {
        for (var j = 0; j < res.length; j++) {
          if (res[j].life_cycle_step == inventory_with_impact[i].lifeCycleStep) {
            console.log(
              "USE res j lifecyclestep = " +
                res[j].life_cycle_step +
                " inventory_with_impact i lifecyclestep = " +
                inventory_with_impact[i].lifeCycleStep +
                " quantity=" +
                inventory_with_impact[i].quantity +
                " lifespan=" +
                inventory_with_impact[i].lifespan
            );
            res[j].amount += 1;
            res[j].impacts = addImpacts(
              res[j].impacts,
              inventory_with_impact[i].quantity,
              inventory_with_impact[i].impacts,
              ref_years,
              inventory_with_impact[i].lifespan
            );
          }
        }
        // if manuf, transport or eol
      } else if (inventory_with_impact[i].lifeCycleStep != "full_life_cycle") {
        for (var j = 0; j < res.length; j++) {
          //console.log(
          //  "res j lifecyclestep = " +
          //    res[j].life_cycle_step +
          //    " inventory_with_impact i lifecyclestep = " +
          //    inventory_with_impact[i].lifeCycleStep
          //);
          if (
            res[j].life_cycle_step == inventory_with_impact[i].lifeCycleStep ||
            (res[j].life_cycle_step == "eol" &&
              inventory_with_impact[i].lifeCycleStep == "end-of-life")
          ) {
            console.log("updating at index " + j);
            res[j].amount += 1;
            res[j].impacts = addImpacts(
              res[j].impacts,
              inventory_with_impact[i].quantity,
              inventory_with_impact[i].impacts,
              ref_years,
              inventory_with_impact[i].lifespan
            );
          }
        }
        // if full lifecycle
      } else {
        console.log("life cycle step has an issue");
      }
    }
    // else
    console.log("result:");
    console.log(res);
    return res;
  }

  const results = build_impact_per_lifecycle_step(inventoryWithImpact);
  console.log("results / inventory:");
  console.log(results);

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

<div class="wrapper">
  <section aria-labelledby="data-center-characteristics">
    <div class="section-header">
      <img id="data-center" src="/data-center.svg" alt="A data center" />
      <h2 id="data-center-characteristics">Data center characteristics</h2>
    </div>
    <label for="building-total-surface">{dataCenter.totalSurface.label} (square meters):</label
    ><input
      type="number"
      id="building-total-surface"
      placeholder={dataCenter.totalSurface.value as string}
    />
    <label for="concrete-volume">{dataCenter.concreteVolume.label} (cubic meters):</label><input
      type="number"
      id="concrete-volume"
      placeholder={dataCenter.concreteVolume.value as string}
    />
    <label for="steel-mass">Steel mass (kilograms):</label><input
      type="number"
      id="steel-mass"
      placeholder={dataCenter.steelMass.value as string}
    />
    <label for="yearly-total-energy">Total energy for one year (kilowatts):</label><input
      type="number"
      id="yearly-total-energy"
      placeholder={dataCenter.yearlyTotalEnergy.value as string}
    />
    <label for="power-usage-effectiveness">Power Usage Effectiveness (PUE):</label><input
      type="number"
      id="power-usage-effectiveness"
      placeholder={dataCenter.powerUsageEffectiveness.value as string}
    />
    <label for="water-usage-effectiveness">Water Usage Effectiveness (WUE):</label><input
      type="number"
      id="water-usage-effectiveness"
      placeholder={dataCenter.waterUsageEffectiveness.value as string}
    />
    <label for="electrical-technical-resilience">Electrical Technical Resilience tier:</label
    ><select
      bind:value={dataCenter.electricalTechnicalResilience.value}
      id="electrical-technical-resilience"
    >
      {#each electricalTechnicalResilienceTiers as tier}<option>{tier}</option>{/each}
    </select>
    <label for="location">Location:</label><select
      bind:value={dataCenter.location.value}
      id="location"
      >{#each countriesNames as country}<option>{country}</option>{/each}</select
    >

    {#if secondaryCharacteristicsAreVisible}
      <div transition:fade id="secondary-characteristics">
        <label for="building-lifespan">Building lifespan, in years</label>
        <input
          type="number"
          id="building-lifespan"
          placeholder={dataCenter.lifespan.value as string}
        />

        <label for="building-technical-rooms-surface"
          >Technical rooms surface area, in square meters</label
        >
        <input
          type="number"
          id="building-technical-rooms-surface"
          step="0.01"
          placeholder={dataCenter.technicalRoomSurface.value as string}
        />
        <label for="building-maximum-usable-electrical-power"
          >Maximum usable electrical power, in kilowatts</label
        >
        <input
          type="number"
          id="building-maximum-usable-electrical-power"
          placeholder={dataCenter.maximumUsableElectricalPower.value as string}
        />

        <label for="building-load-factor"> Load factor </label>
        <input
          type="number"
          id="building-load-factor"
          step="0.1"
          placeholder={dataCenter.dataCenterLoadFactor.value as string}
        />

        <label for="building-energy-reuse-factor"> Energy Reuse Factor (ERF) </label>
        <input
          type="number"
          id="building-energy-reuse-factor"
          min="0"
          max="3"
          step="0.01"
          placeholder={dataCenter.energyReuseFactor.value as string}
        />

        <label for="building-renewable-energy-factor"> Renewable Energy Factor (REF) </label>
        <input
          type="number"
          id="building-renewable-energy-factor"
          min="0"
          max="3"
          step="0.01"
          placeholder={dataCenter.renewableEnergyFactor.value as string}
        />

        <label for="building-cooling-system"> Cooling system type </label>
        <select bind:value={dataCenter.coolingSystemType.value} id="building-cooling-system">
          {#each coolingSystemTypes as coolingSystem}
            <option>{coolingSystem}</option>{/each}
        </select>

        <label for="building-designed-floor-assembly-surface">
          Designed floor assembly surface, in square meters
        </label>
        <input
          type="number"
          id="building-designed-floor-assembly-surface"
          step="0.01"
          placeholder={dataCenter.designedFloorAssemblySurface.value as string}
        />

        <label for="building-suspended-ceiling-surface">
          Suspended ceiling surface, in square meters
        </label>
        <input
          type="number"
          id="building-suspended-ceiling-surface"
          step="0.01"
          placeholder={dataCenter.suspendedCeilingSurface.value as string}
        />

        <label for="building-lifts"> Number of lifts </label>
        <input type="number" id="building-lifts" placeholder={dataCenter.lifts.value as string} />

        <label for="building-freight-lifts"> Number of freight lifts </label>
        <input
          type="number"
          id="building-freight-lifts"
          placeholder={dataCenter.freightLifts.value as string}
        />

        <label for="building-partition-surface"> Partition surface, in square meters </label>
        <input
          type="number"
          id="building-partition-surface"
          step="0.01"
          placeholder={dataCenter.partitionSurface.value as string}
        />
      </div>
    {/if}

    <button
      aria-label={secondaryCharacteristicsButtonLabel}
      class="btn btn-sm btn-primary"
      onclick={handleSecondaryCharacteristicsVisibility}
      >{#if secondaryCharacteristicsAreVisible}
        Hide secondary characteristics
      {:else}
        Show secondary characteristics
      {/if}</button
    >
  </section>
</div>

<ResultsVerticalPercentages {results} />

<ImpactFactorsSection source="data-center" />

<style>
  #secondary-characteristics {
    display: flex;
    flex-direction: column;
  }
  #data-center {
    width: 80px;
    height: 80px;
  }
</style>
