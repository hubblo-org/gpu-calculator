<script lang="ts">
  import { fade } from "svelte/transition";
  import { Countries, ElectricalTechnicalResilienceTiers } from "$lib/types/enums";
  import { DataCenter } from "$lib/data-center.svelte";
  import type {
    FunctionalUnitResultsRowWithLifeCycle,
    ImpactFactors,
    DataCenterInventoryElementWithImpactFactors
  } from "$lib/types/pcr-cloud";
  import type { DataCenterBuilding } from "$lib/types/pcr-cloud";
  import DropdownButton from "./DropdownButton.svelte";
  import ToggleTip from "./ToggleTip.svelte";
  import ImpactFactorsSection from "./ImpactFactorsSection.svelte";
  import { genNullImpact, inventoryWithImpact } from "../../mocks/dc-data";

  interface Props {
    dataCenter: DataCenterBuilding;
  }

  const { dataCenter }: Props = $props();

  const dc = new DataCenter(dataCenter);

  let secondaryCharacteristicsAreVisible = $state(false);
  let secondaryCharacteristicsButtonLabel = $state(
    "Display the data center secondary characteristics"
  );
  let results: null | any = $state();

  const electricalTechnicalResilienceTiers = Object.values(ElectricalTechnicalResilienceTiers);
  const countriesNames = Object.values(Countries);

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
  ): ImpactFactors {
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

  console.log("matching: " + "Electricity, " + dc.location + " mix");
  let electricityItem = inventoryWithImpact.filter(
    (element) => element.name == "Electricity, " + dc.location + " mix"
  )[0];
  console.log("electricityItem: " + electricityItem);

  /// Casts Data Centre inventory in FunctionalUnitResults
  function build_impact_per_lifecycle_step(
    inventory_with_impact: DataCenterInventoryElementWithImpactFactors[]
  ): FunctionalUnitResultsRowWithLifeCycle[] {
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
      "Concrete volume": dc.concreteVolume,
      "Number of freight lifts": dc.freightLifts,
      "Number of lifts": dc.lifts,
      "Steel mass": dc.steelMass,
      "Suspended ceiling surface": dc.suspendedCeilingSurface
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
            Number(impacts[i].lifespan)
          );
          console.log("Adding impacts of " + key + " to initUse");
        } else if (impacts[i].lifeCycleStep == initManuf.life_cycle_step) {
          let lifespan = impacts[i].lifespan;
          if (key == "Concrete volume" || key == "Steel mass") {
            lifespan = Number(dc.lifespan);
          }
          initManuf.impacts = addImpacts(
            initManuf.impacts,
            editableInventory[key],
            impacts[i].impacts,
            1,
            Number(lifespan)
          );
          console.log("Adding impacts of " + key + " to initManuf");
        } else if (impacts[i].lifeCycleStep == initTransport.life_cycle_step) {
          let lifespan = impacts[i].lifespan;
          if (key == "Concrete volume" || key == "Steel mass") {
            lifespan = Number(dc.lifespan);
          }
          initTransport.impacts = addImpacts(
            initTransport.impacts,
            editableInventory[key],
            impacts[i].impacts,
            1,
            Number(lifespan)
          );
          console.log("Adding impacts of " + key + " to initTransport");
        } else if (impacts[i].lifeCycleStep == initEOL.life_cycle_step) {
          let lifespan = impacts[i].lifespan;
          if (key == "Concrete volume" || key == "Steel mass") {
            lifespan = Number(dc.lifespan);
          }
          initEOL.impacts = addImpacts(
            initEOL.impacts,
            editableInventory[key],
            impacts[i].impacts,
            1,
            Number(lifespan)
          );
          console.log("Adding impacts of " + key + " to initEOL");
        }
      }
    });
    // Electricity
    //$inspect(yearlyTotalEnergy);
    initUse.impacts = addImpacts(
      initUse.impacts,
      Number(dc.yearlyTotalEnergy),
      electricityItem.impacts,
      1,
      Number(electricityItem.lifespan)
    );
    //dataCenter.coolingSystemType, dataCenter.dataCenterLoadFactor, dataCenter.designedFloorAssemblySurface
    //dataCenter.electricalTechnicalResilience, dataCenter.energyReuseFactor, dataCenter.lifespan, dataCenter.location
    //dataCenter.maximumUsableElectricalPower, dataCenter.partitionSurface, dataCenter.powerUsageEffectiveness
    //dataCenter.renewableEnergyFactor, dataCenter.technicalRoomSurface, dataCenter.totalSurface, dataCenter.waterUsageEffectiveness

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

  function build_full_dc_impacts_with_categories_and_lifecycle(
    inventory_with_impact: DataCenterInventoryElementWithImpactFactors[]
  ) {
    //export declare type FunctionalUnitResultsRow = {
    //  amount: number;
    //  name: string;
    //  impacts: ImpactFactors;
    //};
    //
    //export declare type FunctionalUnitResultsRowWithLifeCycle = FunctionalUnitResultsRow & {
    //  life_cycle_step?: string;
    //  category?: string;
    //  source?: string;
    //};
    //export declare type DataCenterInventoryElementWithImpactFactors = {
    //  name: string;
    //  category: string;
    //  mass: number;
    //  quantity?: number;
    //  lifespan?: number;
    //  source: string;
    //  lifeCycleStep: string;
    //  impacts: ImpactFactors;
    //};
    let res: FunctionalUnitResultsRowWithLifeCycle[] = [];
    inventory_with_impact.forEach((i) => {
      let tmp: FunctionalUnitResultsRowWithLifeCycle = {
        amount: 1,
        impacts: i.impacts,
        name: i.name,
        category: i.category,
        life_cycle_step: i.lifeCycleStep,
        source: i.source
      };
      res.push(tmp);
    });
    return res;
  }

  import { onMount } from "svelte";
  import * as Plot from "@observablehq/plot";
  import Results from "./Results.svelte";

  var tier = "Tier " + dc.electricalTechnicalResilience;

  function computeResults() {
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

    const computedResults = { per_lifecycle: resultsCriteriasPerLifeCycle, steps: lifeCycleSteps };
    results = computedResults;
  }

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
  onMount(() => {
    computeResults();
    renderStackedBarPlot();
  });

  function updateResults() {
    computeResults();
    renderStackedBarPlot();
  }

  let resultsForTreemap = build_full_dc_impacts_with_categories_and_lifecycle(inventoryWithImpact);

  //  const selectedCriteriaAcronym = selectedImpactCriteria.acronym as keyof ImpactFactors;
  //  return {
  //    name: "dc_data",
  //    children: lifeCycleSteps.map((lifeCycle) => {
  //      const resultsByLifeCycle = results.per_lifecycle.filter(
  //        (element) => element.impact_criteria == lifeCycle
  //      ); //.filter((result) => result.life_cycle_step === lifeCycle);
  //      const resultsImpacts = resultsByLifeCycle.map((result) => {
  //        const leaf: Leaf = {
  //          name: result.category!,
  //          value: result.impacts[selectedCriteriaAcronym].value
  //        };
  //        return leaf;
  //      });
  //      return {
  //        name: lifeCycle,
  //        children: resultsImpacts.filter((impactFactors) => impactFactors.name != "all_categories")
  //      };
  //    })
  //  };
  //});
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
          <label for="building-total-surface"
            >{dataCenter.totalSurface.label} (square meters)
          </label>

          <ToggleTip info={dataCenter.totalSurface.description!} source="total-surface" />
        </div>
        <input type="number" id="building-total-surface" bind:value={dc.totalSurface} />
      </div>
      <div class="field">
        <div class="label-wrapper">
          <label for="concrete-volume">{dataCenter.concreteVolume.label} (cubic meters)</label>
          <ToggleTip info={dataCenter.concreteVolume.description!} source="concrete-volume" />
        </div>

        <input type="number" id="concrete-volume" bind:value={dc.concreteVolume} />
      </div>
      <div class="field">
        <div class="label-wrapper">
          <label for="steel-mass">{dataCenter.steelMass.label} (kilograms)</label>
          <ToggleTip info={dataCenter.steelMass.description!} source="steel-mass" />
        </div>

        <input type="number" id="steel-mass" bind:value={dc.steelMass} />
      </div>
      <div class="field">
        <div class="label-wrapper">
          <label for="yearly-total-energy"
            >{dataCenter.yearlyTotalEnergy.label} (kilowatts/hour)</label
          >
          <ToggleTip
            info={dataCenter.yearlyTotalEnergy.description!}
            source="yearly-total-energy"
          />
        </div>
        <input type="number" id="yearly-total-energy" bind:value={dc.yearlyTotalEnergy} />
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
        <select bind:value={dc.electricalTechnicalResilience} id="electrical-technical-resilience">
          {#each electricalTechnicalResilienceTiers as tier}<option>{tier}</option>{/each}
        </select>
      </div>
      <div class="field">
        <div class="label-wrapper">
          <label for="location">Location</label>
          <ToggleTip info={dataCenter.location.description!} source="location" />
        </div>
        <select bind:value={dc.location} id="location"
          >{#each countriesNames as country}<option>{country}</option>{/each}</select
        >
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

            <input type="number" id="building-lifespan" bind:value={dc.lifespan} />
          </div>

          <div class="field">
            <div class="label-wrapper">
              <label for="building-technical-rooms-surface"
                >{dataCenter.technicalRoomSurface.label} (square meters)</label
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
              bind:value={dc.technicalRoomsSurface}
            />
          </div>

          <div class="field">
            <div class="label-wrapper">
              <label for="building-suspended-ceiling-surface">
                {dataCenter.suspendedCeilingSurface.label} (square meters)
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
              bind:value={dc.suspendedCeilingSurface}
            />
          </div>

          <div class="field">
            <div class="label-wrapper">
              <label for="building-lifts"> {dataCenter.lifts.label} </label>
              <ToggleTip info={dataCenter.lifts.description!} source="building-lifts" />
            </div>
            <input type="number" id="building-lifts" bind:value={dc.lifts} />
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
            <input type="number" id="building-freight-lifts" bind:value={dc.freightLifts} />
          </div>

          <div class="field">
            <div class="label-wrapper">
              <label for="building-partition-surface">
                {dataCenter.partitionSurface.label} (square meters)
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
              bind:value={dc.partitionSurface}
            />
          </div>
        </div>
      </div>
      <DropdownButton
        direction="up"
        label={secondaryCharacteristicsButtonLabel}
        visibilityFunction={handleSecondaryCharacteristicsVisibility}
      />
    {/if}
    <button id="recalculate" class="btn btn-primary btn-sm" onclick={() => updateResults()}
      >Recalculate</button
    >
  </div>
</section>

<section>
  <div id="section-heading">
    <h3>Multi-criteria impacts breakdown</h3>
  </div>
  <div id="graph-display">
    <div id="impact-factors-plot"></div>
  </div>
</section>

<!-- <section>
  <div id="section-heading">
    <h3>Treemap impacts breakdown</h3>
  </div>
  <div id="graph-display">
    <p>
      {selectedImpactCriteria.name} ({selectedImpactCriteria.acronym}), in {selectedImpactCriteria.unit}
    </p>
    <ResultsTreeMap results={resultsForTreemap} />
  </div>
</section> -->

<ImpactFactorsSection source="data-center" {results} resultsTreemap={resultsForTreemap} />

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
    margin-right: 12px;
    margin-bottom: 12px;
    position: absolute;
    bottom: 0;
    right: 0;
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
    #recalculate {
      margin-right: initial;
      margin-bottom: initial;
      width: 120px;
    }
  }
</style>
