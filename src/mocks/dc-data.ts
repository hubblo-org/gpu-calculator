import MaterialImpacts from "./materials_impacts.json";
import MaterialInventory from "./materials_inventory.json";
import Fu1Results from "./uf1-results.json";
import type {
  DataCenterInventoryElement,
  DataCenterInventoryElementWithImpactFactors,
  FunctionalUnitResultsRow,
  FunctionalUnitResultsRowWithLifeCycle
} from "$lib/types/pcr-cloud";

export const firstInventoryElement = MaterialInventory[0];
const inventoryElementWithImpactFactors = MaterialImpacts.filter(
  (elementWithImpacts) => elementWithImpacts.id === firstInventoryElement.id
);
export const inventoryElementLifeCycleSteps = inventoryElementWithImpactFactors.map(
  (elementWithImpactFactors) => elementWithImpactFactors.lc_step
);
export const inventoryElementImpactFactors: DataCenterInventoryElementWithImpactFactors[] =
  inventoryElementWithImpactFactors.map((element) => {
    const inventoryElementImpacts = {
      name: element.material_name,
      category: element.category,
      mass: element.mass,
      source: element.source,
      lifeCycleStep: element.lc_step,
      ADPe: element.ADPe,
      ADPf: element.ADPf,
      AP: element.AP,
      CTUe: element.CTUe,
      CTUh: element.CTUh_c,
      CTUh_c: element.CTUh_c,
      CTUh_nc: element.CTUh_nc,
      EPF: element.Epf,
      EPM: element.Epm,
      EPT: element.Ept,
      GWP: element.GWP,
      GWPb: element.GWPb,
      GWPf: element.GWPf,
      GWPlu: element.GWPlu,
      IR: element.IR,
      LU: element.LU,
      MIPS: element.MIPS,
      ODP: element.ODP,
      PM: element.PM,
      POCP: element.POCP,
      TPE: element.TPE,
      WU: element.WU
    };
    return inventoryElementImpacts;
  });

const technicalEnvironmentElements = MaterialImpacts.filter(
  (element) => element.category === "Technical environment"
);
export const technicalEnvironmentElementsWithImpactFactors: DataCenterInventoryElementWithImpactFactors[] =
  technicalEnvironmentElements.map((element) => {
    const inventoryElementImpacts = {
      name: element.material_name,
      category: element.category,
      mass: element.mass,
      source: element.source,
      lifeCycleStep: element.lc_step,
      ADPe: element.ADPe,
      ADPf: element.ADPf,
      AP: element.AP,
      CTUe: element.CTUe,
      CTUh: element.CTUh_c,
      CTUh_c: element.CTUh_c,
      CTUh_nc: element.CTUh_nc,
      EPF: element.Epf,
      EPM: element.Epm,
      EPT: element.Ept,
      GWP: element.GWP,
      GWPb: element.GWPb,
      GWPf: element.GWPf,
      GWPlu: element.GWPlu,
      IR: element.IR,
      LU: element.LU,
      MIPS: element.MIPS,
      ODP: element.ODP,
      PM: element.PM,
      POCP: element.POCP,
      TPE: element.TPE,
      WU: element.WU
    };
    return inventoryElementImpacts;
  });

export const coolingInventoryElements = MaterialInventory.filter(
  (element) => element.category === "cooling"
).map((element) => {
  const dataCenterInventoryElement: DataCenterInventoryElement = {
    name: element.id,
    category: element.category,
    quantity: element.quantity,
    lifespan: element.lifespan
  };
  return dataCenterInventoryElement;
});

const coolingInventoryElementsNames = MaterialInventory.filter(
  (element) => element.category === "cooling"
).map((element) => element.id);
const coolingInventoryElementsWithImpactsFactors = coolingInventoryElementsNames.flatMap(
  (inventoryElementName) =>
    MaterialImpacts.filter((elementWithImpacts) => inventoryElementName === elementWithImpacts.id)
);

export const coolingInventoryElementsImpactsFactors: DataCenterInventoryElementWithImpactFactors[] =
  coolingInventoryElementsWithImpactsFactors.map((element) => {
    const inventoryElementImpacts = {
      name: element.material_name,
      category: element.category,
      mass: element.mass,
      source: element.source,
      lifeCycleStep: element.lc_step,
      ADPe: element.ADPe,
      ADPf: element.ADPf,
      AP: element.AP,
      CTUe: element.CTUe,
      CTUh: element.CTUh_c,
      CTUh_c: element.CTUh_c,
      CTUh_nc: element.CTUh_nc,
      EPF: element.Epf,
      EPM: element.Epm,
      EPT: element.Ept,
      GWP: element.GWP,
      GWPb: element.GWPb,
      GWPf: element.GWPf,
      GWPlu: element.GWPlu,
      IR: element.IR,
      LU: element.LU,
      MIPS: element.MIPS,
      ODP: element.ODP,
      PM: element.PM,
      POCP: element.POCP,
      TPE: element.TPE,
      WU: element.WU
    };
    return inventoryElementImpacts;
  });

export const functionalUnitOneResults: FunctionalUnitResultsRow[] = Fu1Results.map((result) => {
  const row: FunctionalUnitResultsRow = {
    amount: result.amount,
    unit: result.unit,
    scope: result.c,
    impacts: {
      ADPe: { value: result.adpe, unit: result.adpe_unit },
      ADPf: { value: result.adpf, unit: result.adpf_unit },
      AP: { value: result.ap, unit: result.ap_unit },
      CTUe: { value: result.ctue, unit: result.ctue_unit },
      CTUh: { value: result.ctuh_c, unit: result.ctuh_c_unit },
      CTUh_c: { value: result.ctuh_c, unit: result.ctuh_c_unit },
      CTUh_nc: { value: result.ctuh_n, unit: result.ctuh_n_unit },
      EPF: { value: result.epf, unit: result.epf_unit },
      EPM: { value: result.epm, unit: result.epm_unit },
      EPT: { value: result.ept, unit: result.ept_unit },
      GWP: { value: result.gwp, unit: result.gwp_unit },
      GWPb: { value: result.gwpb, unit: result.gwpb_unit },
      GWPf: { value: result.gwpf, unit: result.gwpf_unit },
      GWPlu: { value: result.gwplu, unit: result.gwplu_unit },
      IR: { value: result.ir, unit: result.ir_unit },
      LU: { value: result.lu, unit: result.lu_unit },
      MIPS: { value: result.mips, unit: result.mips_unit },
      ODP: { value: result.odp, unit: result.odp_unit },
      PM: { value: result.pm, unit: result.pm_unit },
      POCP: { value: result.pocp, unit: result.pocp_unit },
      TPE: { value: result.tpe, unit: result.tpe_unit },
      WU: { value: result.wu, unit: result.wu_unit }
    }
  };
  return row;
});

const lifeCycleRegex = /(?<=lc_step=)(.*)(?=})/;

function formatToLifeCycle(result_c: string) {
  let match = lifeCycleRegex.exec(result_c);
  if (match) {
    return match[0].split(",")[0];
  } else {
    return "not_relevant";
  }
}

function formatCategory(result_c: string) {
  let match = lifeCycleRegex.exec(result_c);
  if (match) {
    const category = match[0].split(",")[1];
    if (category) {
      return category.split("=")[1];
    } else {
      return "not_relevant";
    }
  }
}

export const functionalUnitOneResultsWithLc: FunctionalUnitResultsRowWithLifeCycle[] =
  Fu1Results.map((result) => {
    const row: FunctionalUnitResultsRowWithLifeCycle = {
      amount: result.amount,
      unit: result.unit,
      scope: result.c,
      life_cycle_step: formatToLifeCycle(result.c),
      category: formatCategory(result.c),
      impacts: {
        ADPe: { value: result.adpe, unit: result.adpe_unit },
        ADPf: { value: result.adpf, unit: result.adpf_unit },
        AP: { value: result.ap, unit: result.ap_unit },
        CTUe: { value: result.ctue, unit: result.ctue_unit },
        CTUh: { value: result.ctuh_c, unit: result.ctuh_c_unit },
        CTUh_c: { value: result.ctuh_c, unit: result.ctuh_c_unit },
        CTUh_nc: { value: result.ctuh_n, unit: result.ctuh_n_unit },
        EPF: { value: result.epf, unit: result.epf_unit },
        EPM: { value: result.epm, unit: result.epm_unit },
        EPT: { value: result.ept, unit: result.ept_unit },
        GWP: { value: result.gwp, unit: result.gwp_unit },
        GWPb: { value: result.gwpb, unit: result.gwpb_unit },
        GWPf: { value: result.gwpf, unit: result.gwpf_unit },
        GWPlu: { value: result.gwplu, unit: result.gwplu_unit },
        IR: { value: result.ir, unit: result.ir_unit },
        LU: { value: result.lu, unit: result.lu_unit },
        MIPS: { value: result.mips, unit: result.mips_unit },
        ODP: { value: result.odp, unit: result.odp_unit },
        PM: { value: result.pm, unit: result.pm_unit },
        POCP: { value: result.pocp, unit: result.pocp_unit },
        TPE: { value: result.tpe, unit: result.tpe_unit },
        WU: { value: result.wu, unit: result.wu_unit }
      }
    };
    return row;
  });
