import MaterialImpacts from "./materials_impacts.json";
import MaterialInventory from "./materials_inventory.json";
import type {
  DataCenterInventoryElement,
  DataCenterInventoryElementWithImpactFactors
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
