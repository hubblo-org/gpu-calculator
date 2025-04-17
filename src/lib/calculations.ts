import { genNullImpact } from "../mocks/dc-data";
import type { DataCenter } from "./data-center.svelte";
import type { DataCenterCharacteristic, ImpactFactors, Node } from "./types/pcr-cloud";
import type {
  FunctionalUnitResultsRowWithLifeCycle,
  DataCenterInventoryElementWithImpactFactors
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
  //if (isNaN(res)) { console.error("Wrong calculation : impact1=" +impact1 +" impact2=" +impact2 +" quantity=" +quantity_impact2 +" refyears=" +reference_years +" lifespan="+lifespan);}
  return res;
}

export function addImpacts(
  impacts1: ImpactFactors,
  quantity: number,
  impacts2: ImpactFactors,
  ref_years: number,
  lifespan: number,
  fullLifespanCalculation: boolean
  // whether or not to calculate the impact on the full lifespan
  // will calculate on ref_years / lifespan if not
) {
  var res: ImpactFactors = {
    ADPe: {
      value: computeImpact(
        impacts1.ADPe.value,
        quantity,
        impacts2.ADPe.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.ADPe.unit
    },
    ADPf: {
      value: computeImpact(
        impacts1.ADPf.value,
        quantity,
        impacts2.ADPf.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
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
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.CTUe.unit
    },
    CTUh: {
      value: computeImpact(
        impacts1.CTUh.value,
        quantity,
        impacts2.CTUh.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.CTUh.unit
    },
    CTUh_c: {
      value: computeImpact(
        impacts1.CTUh_c.value,
        quantity,
        impacts2.CTUh_c.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.CTUh_c.unit
    },
    CTUh_nc: {
      value: computeImpact(
        impacts1.CTUh_nc.value,
        quantity,
        impacts2.CTUh_nc.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.CTUh_nc.unit
    },
    EPF: {
      value: computeImpact(
        impacts1.EPF.value,
        quantity,
        impacts2.EPF.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.EPF.unit
    },
    EPM: {
      value: computeImpact(
        impacts1.EPM.value,
        quantity,
        impacts2.EPM.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.EPM.unit
    },
    EPT: {
      value: computeImpact(
        impacts1.EPT.value,
        quantity,
        impacts2.EPT.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.EPT.unit
    },
    GWP: {
      value: computeImpact(
        impacts1.GWP.value,
        quantity,
        impacts2.GWP.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.GWP.unit
    },
    GWPb: {
      value: computeImpact(
        impacts1.GWPb.value,
        quantity,
        impacts2.GWPb.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.GWPb.unit
    },
    GWPf: {
      value: computeImpact(
        impacts1.GWPf.value,
        quantity,
        impacts2.GWPf.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.GWPf.unit
    },
    GWPlu: {
      value: computeImpact(
        impacts1.GWPlu.value,
        quantity,
        impacts2.GWPlu.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.GWPlu.unit
    },
    IR: {
      value: computeImpact(
        impacts1.IR.value,
        quantity,
        impacts2.IR.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.IR.unit
    },
    LU: {
      value: computeImpact(
        impacts1.LU.value,
        quantity,
        impacts2.LU.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.LU.unit
    },
    MIPS: {
      value: computeImpact(
        impacts1.MIPS.value,
        quantity,
        impacts2.MIPS.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.MIPS.unit
    },
    ODP: {
      value: computeImpact(
        impacts1.ODP.value,
        quantity,
        impacts2.ODP.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.ODP.unit
    },
    PM: {
      value: computeImpact(
        impacts1.PM.value,
        quantity,
        impacts2.PM.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.PM.unit
    },
    POCP: {
      value: computeImpact(
        impacts1.POCP.value,
        quantity,
        impacts2.POCP.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.POCP.unit
    },
    TPE: {
      value: computeImpact(
        impacts1.TPE.value,
        quantity,
        impacts2.TPE.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.TPE.unit
    },
    WU: {
      value: computeImpact(
        impacts1.WU.value,
        quantity,
        impacts2.WU.value,
        ref_years,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.WU.unit
    }
  };
  return res;
}

export function computeResults(
  inventoryWithImpact: DataCenterInventoryElementWithImpactFactors[],
  datacenterSpecs: DataCenter
) {
  let res = buildImpactsPerCategoriesAndLifecycle(inventoryWithImpact, datacenterSpecs);

  const lifeCycleSteps = ["manufacturing", "transport", "use", "end-of-life"];
  let resultsPerLifecycle = [];
  let sample = genNullImpact();
  const impactCriteria = Object.keys(sample.impacts);

  lifeCycleSteps.forEach((step) => {
    impactCriteria.forEach((crit) => {
      let totalImpact = {
        impact_criteria: crit,
        lc_step: step,
        share: 0
      };
      res.forEach((item) => {
        if (item.life_cycle_step == step) {
          totalImpact.share = totalImpact.share + item.impacts[crit].value;
        }
      });
      resultsPerLifecycle.push(totalImpact);
    });
  });

  const computedResults = { per_lifecycle: resultsPerLifecycle, steps: lifeCycleSteps };
  console.error("Computed results:");
  console.error(computedResults);
  return computedResults;
}

//export declare type FunctionalUnitResultsRow = {
//  amount: number;
//  name: string;
//  impacts: ImpactFactors;
//  life_cycle_step?: string;
//  category?: string;
//  source?: string;
//};
export function buildImpactsPerCategoriesAndLifecycle(
  inventoryWithImpact: DataCenterInventoryElementWithImpactFactors[],
  datacenterSpecs: DataCenter
): FunctionalUnitResultsRowWithLifeCycle[] {
  let res: FunctionalUnitResultsRowWithLifeCycle[] = [];
  let refYears = 1;

  let categories = ["building", "cooling", "energy", "maintenance", "water"];
  let lifecycleSteps = ["manufacturing", "use", "transport", "end-of-life"];

  categories.forEach((category) => {
    lifecycleSteps.forEach((step) => {
      let totalImpact = genNullImpact();
      totalImpact.name = category + " (consumables & hardware)";
      totalImpact.life_cycle_step = step;
      totalImpact.category = category;
      // Electricity impacts
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
      }
      // Concrete impacts
      if (category == "building" && step != "use") {
        let concreteItem = inventoryWithImpact.filter(
          (element) => element.name == "Concrete volume"
        )[0];
        totalImpact.impacts = addImpacts(
          totalImpact.impacts,
          Number(datacenterSpecs.concreteVolume),
          concreteItem.impacts,
          refYears,
          Number(concreteItem.lifespan),
          true
        );
      }
      // Steel impacts
      if (category == "building" && step != "use") {
        let steelItem = inventoryWithImpact.filter((element) => element.name == "Steel mass")[0];
        totalImpact.impacts = addImpacts(
          totalImpact.impacts,
          Number(datacenterSpecs.steelMass),
          steelItem.impacts,
          refYears,
          Number(steelItem.lifespan),
          true
        );
      }
      // Global inventory impacts
      inventoryWithImpact.forEach((item) => {
        if (item.category == category && item.lifeCycleStep == step) {
          console.error("adding impacts for " + category + " on " + step + " step");
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
