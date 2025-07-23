import { genNullImpact } from "../mocks/dc-data";
import type { DataCenter } from "./data-center.svelte";
import type { IF, ImpactFactors, ImpactFactorShare } from "./types/pcr-cloud";
import type {
  DataCenterInventoryElementWithImpactFactors,
  ResultWithLifeCycle,
  OrderedImpactFactors
} from "./types/pcr-cloud";

/**
 * @returns the resulting impact (Number) from the addition of impact1 and quantityImpact2 * impact2,
 * resulting impact if then multiplied by referenceYears and divided by lifespan if fullLifespanCalculation is true.
 *
 * @example
 * returns 3
 * ```ts
 * computeImpact(1,2,1,1,5,false);
 * ```
 */
export function computeImpact(
  impact1: number,
  quantityImpact2: number,
  impact2: number,
  referenceYears: number,
  lifespan: number,
  fullLifespanCalculation: boolean
) {
  if (isNaN(impact1)) {
    impact1 = 0;
  }
  var res = 0;
  if (!fullLifespanCalculation) {
    res = ((impact1 + quantityImpact2 * impact2) * referenceYears) / lifespan;
  } else {
    res = impact1 + quantityImpact2 * impact2;
  }
  return res;
}

export function addImpacts(
  impacts1: ImpactFactors,
  quantity: number,
  impacts2: ImpactFactors,
  refYears: number,
  lifespan: number,
  fullLifespanCalculation: boolean
  // whether or not to calculate the impact on the full lifespan
  // will calculate on refYears / lifespan if not
) {
  var res: ImpactFactors = {
    ADPe: {
      value: computeImpact(
        impacts1.ADPe.value,
        quantity,
        impacts2.ADPe.value,
        refYears,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.ADPe.unit
    },
    AP: {
      value: computeImpact(
        impacts1.AP.value,
        quantity,
        impacts2.AP.value,
        refYears,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.AP.unit
    },
    GWP: {
      value: computeImpact(
        impacts1.GWP.value,
        quantity,
        impacts2.GWP.value,
        refYears,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.GWP.unit
    },
    IR: {
      value: computeImpact(
        impacts1.IR.value,
        quantity,
        impacts2.IR.value,
        refYears,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.IR.unit
    },
    PM: {
      value: computeImpact(
        impacts1.PM.value,
        quantity,
        impacts2.PM.value,
        refYears,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.PM.unit
    },
    TPE: {
      value: computeImpact(
        impacts1.TPE.value,
        quantity,
        impacts2.TPE.value,
        refYears,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.TPE.unit
    }
  };
  return res;
}

export function formatForBarPlot(categorizedImpacts: ResultWithLifeCycle[]): OrderedImpactFactors {
  let res = categorizedImpacts;

  const lifeCycleSteps = ["manufacturing", "transport", "use", "end-of-life"];
  let resultsPerLifecycle: ImpactFactorShare[] = [];
  let sample = genNullImpact();
  const impactCriteria = Object.keys(sample.impacts);

  lifeCycleSteps.forEach((step) => {
    impactCriteria.forEach((crit) => {
      let totalImpact = {
        impactCriterion: crit,
        lifeCycleStep: step,
        share: 0
      };
      res.forEach((item) => {
        if (item.lifeCycleStep == step) {
          if (crit in item.impacts) {
            console.log("item impacts " + item.impacts[crit as IF].value);
            totalImpact.share = totalImpact.share + item.impacts[crit as IF].value;
          }
        }
      });
      resultsPerLifecycle.push(totalImpact);
    });
  });

  const computedResults: OrderedImpactFactors = {
    perLifeCycle: resultsPerLifecycle,
    steps: lifeCycleSteps
  };
  return computedResults;
}

export function buildImpactsPerCategoriesAndLifecycle(
  datacenterSpecs: DataCenter,
  inventoryWithImpact: DataCenterInventoryElementWithImpactFactors[]
): ResultWithLifeCycle[] {
  let res: ResultWithLifeCycle[] = [];
  let refYears = 1;

  let categories = ["building", "cooling", "energy", "maintenance", "water"];
  let lifecycleSteps = ["manufacturing", "use", "transport", "end-of-life"];

  categories.forEach((category) => {
    lifecycleSteps.forEach((step) => {
      let totalImpact = genNullImpact();
      totalImpact.name = category + " (consumables & hardware)";
      totalImpact.lifeCycleStep = step;
      totalImpact.category = category;
      // Electricity impacts
      //
      if (category == "energy" && step == "use") {
        let electricityItem = inventoryWithImpact.filter(
          (element) => element.name == "Electricity, " + datacenterSpecs.location + " mix"
        )[0];
        totalImpact.impacts = addImpacts(
          totalImpact.impacts,
          Number(datacenterSpecs.yearlyTotalEnergy) *
            Number(datacenterSpecs.powerUsageEffectiveness),
          electricityItem.impacts,
          refYears,
          Number(electricityItem.lifespan),
          true
        );
        console.log(
          "added impacts for Electricity : " +
            Number(datacenterSpecs.yearlyTotalEnergy) *
              Number(
                datacenterSpecs.powerUsageEffectiveness +
                  "x Electricity, " +
                  datacenterSpecs.location +
                  " mix impacts"
              )
        );
      }
      // Diesel impacts
      // We consider that the full diesel capacity available is consumed once per year, for testing and refresh purpose.
      // 1 liter of Diesel = 0.84 kg of weight
      // We consider an average 12 kWh of energy available per kg of diesel consumed
      // We consider that there is a Diesel capacity for 48 hours of running the Datacenter during an electricity shortage, at full power capacity.
      if (category == "energy" && step == "use") {
        let dieselItem = inventoryWithImpact.filter((element) => element.name == "Diesel")[0];
        let maxPower = 1;
        if (datacenterSpecs.maximumUsableElectricalPower > 0) {
          maxPower = datacenterSpecs.maximumUsableElectricalPower;
        }
        totalImpact.impacts = addImpacts(
          totalImpact.impacts,
          (maxPower * 48) / 12,
          dieselItem.impacts,
          refYears,
          Number(dieselItem.lifespan),
          true
        );
        console.log("added impacts for Diesel : " + maxPower * 48 + " x dieselItem impacts");
      }
      // Building architecture impacts based on Cloud & Datacenters PCR from Ademe, generic data
      if (
        category == "building" &&
        (step == "manufacturing" || step == "transport" || step == "end-of-life")
      ) {
        let buildingArchitectureItems = inventoryWithImpact.filter(
          (element) => element.name == "Building architecture" && element.lifeCycleStep == step
        );
        console.log("Got building items : " + buildingArchitectureItems);
        let buildingArchitectureItem = buildingArchitectureItems[0];
        console.log(
          "found buildingArch: " +
            buildingArchitectureItem.name +
            " with lc step = " +
            buildingArchitectureItem.lifeCycleStep +
            " category " +
            buildingArchitectureItem.category
        );
        totalImpact.impacts = addImpacts(
          totalImpact.impacts,
          datacenterSpecs.totalSurface,
          buildingArchitectureItem.impacts,
          refYears,
          Number(buildingArchitectureItem.lifespan),
          false
        );
        console.log(
          "added impacts for Building Architecture, step " +
            step +
            " : " +
            datacenterSpecs.totalSurface +
            " x BuildingArchitectureItem impacts"
        );
      }
      // Global inventory impacts
      inventoryWithImpact.forEach((item) => {
        if (item.category == category && item.lifeCycleStep == step) {
          totalImpact.impacts = addImpacts(
            totalImpact.impacts,
            Number(item.quantity),
            item.impacts,
            refYears,
            Number(item.lifespan),
            true // TODO check that impact factors are on full lifecycle
            // or change formula
          );
        }
      });
      res.push(totalImpact);
    });
  });

  return res;
}

export function computeUnitOneResults(
  datacenterSpecs: DataCenter,
  datacenterResults: ResultWithLifeCycle[]
): ResultWithLifeCycle[] {
  let res: ResultWithLifeCycle[] = [];
  let puissCommDC = 54000; // kW IT, TODO: get it from parameters
  const impactCriteria = Object.keys(genNullImpact().impacts);
  datacenterResults.forEach((item) => {
    let newItem: ResultWithLifeCycle = genNullImpact();
    newItem.amount = item.amount;
    newItem.category = item.category;
    newItem.lifeCycleStep = item.lifeCycleStep;
    newItem.name = item.name;
    newItem.source = item.source;
    if (item.lifeCycleStep == "use") {
      impactCriteria.forEach((crit) => {
        if (crit in newItem.impacts && crit in item.impacts) {
          newItem.impacts[crit as IF].value = item.impacts[crit as IF].value / puissCommDC;
        }
      });
    } else {
      impactCriteria.forEach((crit) => {
        if (crit in newItem.impacts && crit in item.impacts) {
          newItem.impacts[crit as IF].value =
            (item.impacts[crit as IF].value * 1) / (datacenterSpecs.lifespan! * puissCommDC);
        }
      });
    }
    res.push(newItem);
  });
  console.error(datacenterResults);

  return res;
}

export function computeITPowerFromTotalPower(installedPower: number, pue: number) {
  return installedPower / pue;
}

export function computeTotalEnergyFromTotalPower(installedPower: number, loadFactor: number) {
  console.log("returning yearly energy as " + installedPower + " x " + loadFactor + " x 365 x 24");
  return installedPower * loadFactor * 365 * 24;
}

export function computeTotalPowerFromTotalEnergy(yearlyEnergy: number, loadFactor) {
  console.log("returning totalPower as " + yearlyEnergy + " / (" + loadFactor + " x 365 x 24)");
  return yearlyEnergy / (365 * 24 * loadFactor);
}
