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
    ADPf: {
      value: computeImpact(
        impacts1.ADPf.value,
        quantity,
        impacts2.ADPf.value,
        refYears,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.ADPf.unit
    },
    AP: {
      value: computeImpact(impacts1.AP.value, quantity, impacts2.AP.value, refYears, lifespan),
      unit: impacts1.AP.unit
    },
    CTUe: {
      value: computeImpact(
        impacts1.CTUe.value,
        quantity,
        impacts2.CTUe.value,
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
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
        refYears,
        lifespan,
        fullLifespanCalculation
      ),
      unit: impacts1.WU.unit
    }
  };
  return res;
}

export function formatForBarPlot(
  categorizedImpacts: ResultWithLifeCycle[]
): OrderedImpactFactors {
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
          totalImpact.share = totalImpact.share + item.impacts[(crit as IF)].value;
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
        newItem.impacts[(crit as IF)].value = item.impacts[(crit as IF)].value / puissCommDC;
      });
    } else {
      impactCriteria.forEach((crit) => {
        newItem.impacts[(crit as IF)].value =
          (item.impacts[(crit as IF)].value * 1) / (datacenterSpecs.lifespan! * puissCommDC);
      });
    }
    res.push(newItem);
  });
  console.error(datacenterResults);

  return res;
}
