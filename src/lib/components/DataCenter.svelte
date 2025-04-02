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

    var res = ((impact1 + quantity_impact2 * impact2) * reference_years) / lifespan;
    if (isNaN(res)) {
      console.error(
        "Wrong calculation : impact1=" +
          impact1 +
          " impact2=" +
          impact2 +
          " quantity=" +
          quantity_impact2 +
          " refyears=" +
          reference_years +
          " lifespan=" +
          lifespan
      );
    }
    return res;
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

  console.log("matching: " + "Electricity, " + dataCenter.location.value + " mix");
  let electricityItem = inventoryWithImpact.filter(
    (element) => element.name == "Electricity, " + dataCenter.location.value + " mix"
  )[0];
  console.log("electricityItem: " + electricityItem);

  // state variables
  let yearlyTotalEnergy = $state(dataCenter.yearlyTotalEnergy.value);
  let steelMass = $state(dataCenter.steelMass.value);
  let concreteVolume = $state(dataCenter.concreteVolume.value);

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

    let editableInventory = {
      "Concrete volume": concreteVolume,
      "Number of freight lifts": dataCenter.freightLifts.value as number,
      "Number of lifts": dataCenter.lifts.value as number,
      "Steel mass": steelMass,
      "Suspended ceiling surface": dataCenter.suspendedCeilingSurface.value as number
    };
    const keys = Object.keys(editableInventory).filter((key) => isNaN(Number(key)));
    keys.forEach((key) => {
      let impacts = inventory_with_impact.filter((element) => element.name == key);
      console.log("Treating " + key);
      console.log("impacts: ");
      console.log(impacts);
      for (i = 0; i < impacts.length; i++) {
        if (impacts[i].lifeCycleStep == initUse.life_cycle_step) {
          initUse.impacts = addImpacts(
            initUse.impacts,
            editableInventory[key],
            impacts[i].impacts,
            1,
            impacts[i].lifespan
          );
          console.log("Adding impacts of " + key + " to initUse");
        } else if (impacts[i].lifeCycleStep == initManuf.life_cycle_step) {
          initManuf.impacts = addImpacts(
            initManuf.impacts,
            editableInventory[key],
            impacts[i].impacts,
            1,
            impacts[i].lifespan
          );
          console.log("Adding impacts of " + key + " to initManuf");
        } else if (impacts[i].lifeCycleStep == initTransport.life_cycle_step) {
          initTransport.impacts = addImpacts(
            initTransport.impacts,
            editableInventory[key],
            impacts[i].impacts,
            1,
            impacts[i].lifespan
          );
          console.log("Adding impacts of " + key + " to initTransport");
        } else if (impacts[i].lifeCycleStep == initEOL.life_cycle_step) {
          initEOL.impacts = addImpacts(
            initEOL.impacts,
            editableInventory[key],
            impacts[i].impacts,
            1,
            impacts[i].lifespan
          );
          console.log("Adding impacts of " + key + " to initEOL");
        }
      }
    });
    // Electricity
    $inspect(yearlyTotalEnergy);
    initUse.impacts = addImpacts(
      initUse.impacts,
      Number(yearlyTotalEnergy),
      electricityItem.impacts,
      1,
      Number(electricityItem.lifespan)
    );
    //dataCenter.coolingSystemType
    //dataCenter.dataCenterLoadFactor
    //dataCenter.designedFloorAssemblySurface
    //dataCenter.electricalTechnicalResilience
    //dataCenter.energyReuseFactor
    //dataCenter.lifespan
    //dataCenter.location
    //dataCenter.maximumUsableElectricalPower
    //dataCenter.partitionSurface
    //dataCenter.powerUsageEffectiveness
    //dataCenter.renewableEnergyFactor
    //dataCenter.technicalRoomSurface
    //dataCenter.totalSurface
    //dataCenter.waterUsageEffectiveness

    res.push(initEOL);
    res.push(initUse);
    res.push(initTransport);
    res.push(initManuf);

    for (var i = 0; i < inventory_with_impact.length; i++) {
      if (inventory_with_impact[i].name! in editableInventory) {
        // if lifecycle step is usage
        if (inventory_with_impact[i].lifeCycleStep === "use") {
          for (var j = 0; j < res.length; j++) {
            if (res[j].life_cycle_step == inventory_with_impact[i].lifeCycleStep) {
              if (inventory_with_impact[i].name == "Diesel") {
                console.log("Diesel !");
                console.log(
                  "USE res j lifecyclestep = " +
                    res[j].life_cycle_step +
                    " inventory_with_impact i lifecyclestep = " +
                    inventory_with_impact[i].lifeCycleStep +
                    " quantity=" +
                    inventory_with_impact[i].quantity +
                    " lifespan=" +
                    inventory_with_impact[i].lifespan +
                    " impacts GWP=" +
                    inventory_with_impact[i].impacts.GWP.value
                );
              }
              res[j].amount += 1;
              if (
                isNaN(inventory_with_impact[i].quantity) ||
                isNaN(inventory_with_impact[i].lifespan)
              ) {
                console.error(
                  "name=" +
                    inventory_with_impact[i].name +
                    " quantity=" +
                    inventory_with_impact[i].quantity +
                    " lifespan=" +
                    inventory_with_impact[i].lifespan
                );
              }
              res[j].impacts = addImpacts(
                res[j].impacts,
                inventory_with_impact[i].quantity,
                inventory_with_impact[i].impacts,
                ref_years,
                inventory_with_impact[i].lifespan
              );
              console.log("res[j].impacts=");
              console.log(res[j].impacts);
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
    }

    console.log("result:");
    console.log(res);
    return res;
  }

  function handleSecondaryCharacteristicsVisibility() {
    if (secondaryCharacteristicsAreVisible) {
      secondaryCharacteristicsAreVisible = false;
      secondaryCharacteristicsButtonLabel = "Display the data center secondary characteristics";
    } else {
      secondaryCharacteristicsAreVisible = true;
      secondaryCharacteristicsButtonLabel = "Hide the data center secondary characteristics";
    }
  }

  import { onMount } from "svelte";
  import * as Plot from "@observablehq/plot";
  import Results from "./Results.svelte";

  var tier = "Tier " + dataCenter.electricalTechnicalResilience.value;

  let results = $derived.by(() => {
    let res = build_impact_per_lifecycle_step(inventoryWithImpact);

    const filteredResults = res; //.filter((result) => result.life_cycle_step != "full_life_cycle");
    console.log("filteredResults = " + filteredResults);

    const resultsCriteriasPerLifeCycle = filteredResults
      .filter((result) => result.life_cycle_step != "full_life_cycle")
      .flatMap((result) => {
        const impactCriteriasNames = Object.keys(result.impacts);
        const sortedImpactCriterias = impactCriteriasNames.map((impactCriteria) => {
          const object = {
            impact_criteria: impactCriteria,
            lc_step: result.life_cycle_step,
            share: result.impacts[impactCriteria].value
          };
          return object;
        });

        return sortedImpactCriterias;
      });

    const lifeCycleSteps = ["manufacturing", "transport", "use", "end-of-life"];

    return { per_lifecycle: resultsCriteriasPerLifeCycle, steps: lifeCycleSteps };
  });
  function renderStackedBarPlot() {
    let div = document.querySelector("#impact-factors-plot");
    div?.firstChild?.remove();
    if (div) {
      const resultsBarPlot = Plot.plot({
        width: 1600,
        height: 800,
        marginLeft: 100,
        color: { legend: true, domain: results["steps"] },
        y: { percent: true },
        marks: [
          Plot.barY(results["per_lifecycle"], {
            y: "share",
            x: "impact_criteria",
            fill: "lc_step",
            order: results["steps"],
            offset: "normalize",
            tip: true
          })
        ]
      });
      div.append(resultsBarPlot);
    }
  }
  $effect(() => renderStackedBarPlot());
</script>

<section aria-labelledby="data-center-characteristics">
  <div class="section-header">
    <img id="data-center" src="/media/data-center.svg" alt="A data center" />
    <h2 id="data-center-characteristics">Data center characteristics</h2>
  </div>
  <div class="section-main">
    <div class="grid">
      <div class="field">
        <label for="building-total-surface">{dataCenter.totalSurface.label} (square meters)</label
        ><input
          type="number"
          id="building-total-surface"
          placeholder={dataCenter.totalSurface.value as string}
        />
      </div>
      <div class="field">
        <label for="concrete-volume">{dataCenter.concreteVolume.label} (cubic meters)</label><input
          type="number"
          id="concrete-volume"
          bind:value={concreteVolume}
          placeholder={dataCenter.concreteVolume.value as string}
        />
      </div>
      <div class="field">
        <label for="steel-mass">{dataCenter.steelMass.label} (kilograms)</label><input
          type="number"
          id="steel-mass"
          bind:value={steelMass}
          placeholder={dataCenter.steelMass.value as string}
        />
      </div>
      <div class="field">
        <label for="yearly-total-energy"
          >{dataCenter.yearlyTotalEnergy.label} (kilowatts/hour)</label
        ><input
          type="number"
          id="yearly-total-energy"
          bind:value={yearlyTotalEnergy}
          placeholder={dataCenter.yearlyTotalEnergy.value as string}
        />
      </div>
    </div>
    <div class="grid">
      <div class="field">
        <label for="power-usage-effectiveness">Power Usage Effectiveness (PUE)</label><input
          type="number"
          id="power-usage-effectiveness"
          placeholder={dataCenter.powerUsageEffectiveness.value as string}
        />
      </div>
      <div class="field">
        <label for="water-usage-effectiveness">Water Usage Effectiveness (WUE)</label><input
          type="number"
          id="water-usage-effectiveness"
          placeholder={dataCenter.waterUsageEffectiveness.value as string}
        />
      </div>
      <div class="field">
        <label for="electrical-technical-resilience">Electrical Technical Resilience tier</label
        ><select bind:value={tier} id="electrical-technical-resilience">
          {#each electricalTechnicalResilienceTiers as tier}<option>{tier}</option>{/each}
        </select>
      </div>
      <div class="field">
        <label for="location">Location</label><select
          bind:value={dataCenter.location.value}
          id="location"
          >{#each countriesNames as country}<option>{country}</option>{/each}</select
        >
      </div>
    </div>

    {#if secondaryCharacteristicsAreVisible}
      <div transition:fade class="section-main" id="secondary-characteristics">
        <div class="grid">
          <div class="field">
            <label for="building-lifespan">{dataCenter.lifespan.label} (years)</label>
            <input
              type="number"
              id="building-lifespan"
              placeholder={dataCenter.lifespan.value as string}
            />
          </div>

          <div class="field">
            <label for="building-technical-rooms-surface"
              >{dataCenter.technicalRoomSurface.label} (square meters)</label
            >
            <input
              type="number"
              id="building-technical-rooms-surface"
              step="0.01"
              placeholder={dataCenter.technicalRoomSurface.value as string}
            />
          </div>

          <div class="field">
            <label for="building-maximum-usable-electrical-power"
              >{dataCenter.maximumUsableElectricalPower.label} (kilowatts)</label
            >
            <input
              type="number"
              id="building-maximum-usable-electrical-power"
              placeholder={dataCenter.maximumUsableElectricalPower.value as string}
            />
          </div>

          <div class="field">
            <label for="building-load-factor"> Load factor </label>
            <input
              type="number"
              id="building-load-factor"
              step="0.1"
              placeholder={dataCenter.dataCenterLoadFactor.value as string}
            />
          </div>
        </div>

        <!--
        <div class="grid">
          <div class="field">
            <label for="building-energy-reuse-factor">
              {dataCenter.energyReuseFactor.label} (ERF)
            </label>
            <input
              type="number"
              id="building-energy-reuse-factor"
              min="0"
              max="310000"
              step="0.01"
              placeholder={dataCenter.energyReuseFactor.value as string}
            />
          </div>-->

        <!--<div class="field">
            <label for="building-renewable-energy-factor">
              {dataCenter.renewableEnergyFactor.label} (REF)
            </label>
            <input
              type="number"
              id="building-renewable-energy-factor"
              min="0"
              max="3"
              step="0.01"
              placeholder={dataCenter.renewableEnergyFactor.value as string}
            />
          </div>
        </div>-->

        <!--<div class="grid">
          <div class="field">
            <label for="building-cooling-system"> {dataCenter.coolingSystemType.label} </label>
            <select bind:value={dataCenter.coolingSystemType.value} id="building-cooling-system">
              {#each coolingSystemTypes as coolingSystem}
                <option>{coolingSystem}</option>{/each}
            </select>

            <div class="field">
              <label for="building-designed-floor-assembly-surface">
                {dataCenter.designedFloorAssemblySurface.label} (square meters)
              </label>
              <input
                type="number"
                id="building-designed-floor-assembly-surface"
                step="0.01"
                placeholder={dataCenter.designedFloorAssemblySurface.value as string}
              />
            </div>
          </div>
        </div>-->

        <div class="grid">
          <div class="field">
            <label for="building-suspended-ceiling-surface">
              {dataCenter.suspendedCeilingSurface.label} (square meters)
            </label>
            <input
              type="number"
              id="building-suspended-ceiling-surface"
              step="0.01"
              placeholder={dataCenter.suspendedCeilingSurface.value as string}
            />
          </div>

          <div class="field">
            <label for="building-lifts"> {dataCenter.lifts.label} </label>
            <input
              type="number"
              id="building-lifts"
              placeholder={dataCenter.lifts.value as string}
            />
          </div>

          <div class="field">
            <label for="building-freight-lifts"> {dataCenter.freightLifts.label} </label>
            <input
              type="number"
              id="building-freight-lifts"
              placeholder={dataCenter.freightLifts.value as string}
            />
          </div>

          <div class="field">
            <label for="building-partition-surface">
              {dataCenter.partitionSurface.label} (square meters)
            </label>
            <input
              type="number"
              id="building-partition-surface"
              step="0.01"
              placeholder={dataCenter.partitionSurface.value as string}
            />
          </div>
        </div>
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
  </div>
</section>

<section>
  <div id="section-heading">
    <h2>Multi-criteria impacts breakdown</h2>
  </div>
  <div id="graph-display">
    <div id="impact-factors-plot"></div>
  </div>
</section>

<style>
  .field {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 16px;
    margin-top: 12px;
  }
  #secondary-characteristics {
    display: flex;
    flex-direction: column;
  }
  #data-center {
    width: 80px;
    height: 80px;
  }

  @media (width >= 481px) {
    .field {
      width: 800px;
    }
    label {
      height: 40px;
      width: 100%;
    }
    input,
    select {
      height: 50px;
    }
    .section-main {
      display: flex;
      flex-direction: column;
      max-width: 80rem;
      justify-content: space-evenly;
      position: relative;
      margin-inline: auto;
    }
    .grid {
      display: flex;
      padding-top: 10px;
      gap: 50px;
    }
  }
</style>
