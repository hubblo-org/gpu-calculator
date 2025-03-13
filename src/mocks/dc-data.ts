import MaterialImpacts from "./materials_impacts.json";
import MaterialInventory from "./materials_inventory.json";
import Fu1Results from "./uf1-results.json";
import type {
  DataCenterInventoryElement,
  DataCenterInventoryElementWithImpactFactors,
  FunctionalUnitResultsRow,
  FunctionalUnitResultsRowWithLifeCycle
} from "$lib/types/pcr-cloud";
import { getAllImpactCriterias, getImpactCriteria, ImpactCriterias } from "$lib/types/enums";

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
      impacts: {
        ADPe: {
          value: element.ADPe,
          unit: getImpactCriteria(ImpactCriterias.AbioticDepletionPotentialElements).unit
        },
        ADPf: {
          value: element.ADPf,
          unit: getImpactCriteria(ImpactCriterias.AbioticDepletionPotentialFossilFuels).unit
        },
        AP: {
          value: element.AP,
          unit: getImpactCriteria(ImpactCriterias.AcidificationPotential).unit
        },
        CTUe: {
          value: element.CTUe,
          unit: getImpactCriteria(ImpactCriterias.ComparativeToxicityUnitsForEcosystems).unit
        },
        CTUh: {
          value: element.CTUh_c,
          unit: getImpactCriteria(ImpactCriterias.ComparativeToxicityUnitsForHumans).unit
        },
        CTUh_c: {
          value: element.CTUh_c,
          unit: getImpactCriteria(ImpactCriterias.ComparativeToxicityUnitsForHumansCarcinogenic)
            .unit
        },
        CTUh_nc: {
          value: element.CTUh_nc,
          unit: getImpactCriteria(ImpactCriterias.ComparativeToxicityUnitsForHumansNonCarcinogenic)
            .unit
        },
        EPF: {
          value: element.Epf,
          unit: getImpactCriteria(ImpactCriterias.EutrophicationPotentialFreshWater).unit
        },
        EPM: {
          value: element.Epm,
          unit: getImpactCriteria(ImpactCriterias.EutrophicationPotentialMarine).unit
        },
        EPT: {
          value: element.Ept,
          unit: getImpactCriteria(ImpactCriterias.EutrophicationPotentialTerrestrial).unit
        },
        GWP: {
          value: element.GWP,
          unit: getImpactCriteria(ImpactCriterias.GlobalWarmingPotential).unit
        },
        GWPb: {
          value: element.GWPb,
          unit: getImpactCriteria(ImpactCriterias.GlobalWarmingPotentialBiogenic).unit
        },
        GWPf: {
          value: element.GWPf,
          unit: getImpactCriteria(ImpactCriterias.GlobalWarmingPotentialFossil).unit
        },
        GWPlu: {
          value: element.GWPlu,
          unit: getImpactCriteria(ImpactCriterias.GlobalWarmingPotentialLandUse).unit
        },
        IR: { value: element.IR, unit: getImpactCriteria(ImpactCriterias.IonisingRadiation).unit },
        LU: { value: element.LU, unit: getImpactCriteria(ImpactCriterias.LandUse).unit },
        MIPS: {
          value: element.MIPS,
          unit: getImpactCriteria(ImpactCriterias.MaterialInputPerServiceUnit).unit
        },
        ODP: {
          value: element.ODP,
          unit: getImpactCriteria(ImpactCriterias.OzoneDepletionPotential).unit
        },
        PM: { value: element.PM, unit: getImpactCriteria(ImpactCriterias.ParticulateMatter).unit },
        POCP: {
          value: element.POCP,
          unit: getImpactCriteria(ImpactCriterias.PhotochemicalOzoneFormationPotential).unit
        },
        TPE: {
          value: element.TPE,
          unit: getImpactCriteria(ImpactCriterias.TotalPrimaryEnergy).unit
        },
        WU: { value: element.WU, unit: getImpactCriteria(ImpactCriterias.WaterUse).unit }
      }
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
      impacts: {
        ADPe: {
          value: element.ADPe,
          unit: getImpactCriteria(ImpactCriterias.AbioticDepletionPotentialElements).unit
        },
        ADPf: {
          value: element.ADPf,
          unit: getImpactCriteria(ImpactCriterias.AbioticDepletionPotentialFossilFuels).unit
        },
        AP: {
          value: element.AP,
          unit: getImpactCriteria(ImpactCriterias.AcidificationPotential).unit
        },
        CTUe: {
          value: element.CTUe,
          unit: getImpactCriteria(ImpactCriterias.ComparativeToxicityUnitsForEcosystems).unit
        },
        CTUh: {
          value: element.CTUh_c,
          unit: getImpactCriteria(ImpactCriterias.ComparativeToxicityUnitsForHumans).unit
        },
        CTUh_c: {
          value: element.CTUh_c,
          unit: getImpactCriteria(ImpactCriterias.ComparativeToxicityUnitsForHumansCarcinogenic)
            .unit
        },
        CTUh_nc: {
          value: element.CTUh_nc,
          unit: getImpactCriteria(ImpactCriterias.ComparativeToxicityUnitsForHumansNonCarcinogenic)
            .unit
        },
        EPF: {
          value: element.Epf,
          unit: getImpactCriteria(ImpactCriterias.EutrophicationPotentialFreshWater).unit
        },
        EPM: {
          value: element.Epm,
          unit: getImpactCriteria(ImpactCriterias.EutrophicationPotentialMarine).unit
        },
        EPT: {
          value: element.Ept,
          unit: getImpactCriteria(ImpactCriterias.EutrophicationPotentialTerrestrial).unit
        },
        GWP: {
          value: element.GWP,
          unit: getImpactCriteria(ImpactCriterias.GlobalWarmingPotential).unit
        },
        GWPb: {
          value: element.GWPb,
          unit: getImpactCriteria(ImpactCriterias.GlobalWarmingPotentialBiogenic).unit
        },
        GWPf: {
          value: element.GWPf,
          unit: getImpactCriteria(ImpactCriterias.GlobalWarmingPotentialFossil).unit
        },
        GWPlu: {
          value: element.GWPlu,
          unit: getImpactCriteria(ImpactCriterias.GlobalWarmingPotentialLandUse).unit
        },
        IR: { value: element.IR, unit: getImpactCriteria(ImpactCriterias.IonisingRadiation).unit },
        LU: { value: element.LU, unit: getImpactCriteria(ImpactCriterias.LandUse).unit },
        MIPS: {
          value: element.MIPS,
          unit: getImpactCriteria(ImpactCriterias.MaterialInputPerServiceUnit).unit
        },
        ODP: {
          value: element.ODP,
          unit: getImpactCriteria(ImpactCriterias.OzoneDepletionPotential).unit
        },
        PM: { value: element.PM, unit: getImpactCriteria(ImpactCriterias.ParticulateMatter).unit },
        POCP: {
          value: element.POCP,
          unit: getImpactCriteria(ImpactCriterias.PhotochemicalOzoneFormationPotential).unit
        },
        TPE: {
          value: element.TPE,
          unit: getImpactCriteria(ImpactCriterias.TotalPrimaryEnergy).unit
        },
        WU: { value: element.WU, unit: getImpactCriteria(ImpactCriterias.WaterUse).unit }
      }
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
      impacts: {
        ADPe: {
          value: element.ADPe,
          unit: getImpactCriteria(ImpactCriterias.AbioticDepletionPotentialElements).unit
        },
        ADPf: {
          value: element.ADPf,
          unit: getImpactCriteria(ImpactCriterias.AbioticDepletionPotentialFossilFuels).unit
        },
        AP: {
          value: element.AP,
          unit: getImpactCriteria(ImpactCriterias.AcidificationPotential).unit
        },
        CTUe: {
          value: element.CTUe,
          unit: getImpactCriteria(ImpactCriterias.ComparativeToxicityUnitsForEcosystems).unit
        },
        CTUh: {
          value: element.CTUh_c,
          unit: getImpactCriteria(ImpactCriterias.ComparativeToxicityUnitsForHumans).unit
        },
        CTUh_c: {
          value: element.CTUh_c,
          unit: getImpactCriteria(ImpactCriterias.ComparativeToxicityUnitsForHumansCarcinogenic)
            .unit
        },
        CTUh_nc: {
          value: element.CTUh_nc,
          unit: getImpactCriteria(ImpactCriterias.ComparativeToxicityUnitsForHumansNonCarcinogenic)
            .unit
        },
        EPF: {
          value: element.Epf,
          unit: getImpactCriteria(ImpactCriterias.EutrophicationPotentialFreshWater).unit
        },
        EPM: {
          value: element.Epm,
          unit: getImpactCriteria(ImpactCriterias.EutrophicationPotentialMarine).unit
        },
        EPT: {
          value: element.Ept,
          unit: getImpactCriteria(ImpactCriterias.EutrophicationPotentialTerrestrial).unit
        },
        GWP: {
          value: element.GWP,
          unit: getImpactCriteria(ImpactCriterias.GlobalWarmingPotential).unit
        },
        GWPb: {
          value: element.GWPb,
          unit: getImpactCriteria(ImpactCriterias.GlobalWarmingPotentialBiogenic).unit
        },
        GWPf: {
          value: element.GWPf,
          unit: getImpactCriteria(ImpactCriterias.GlobalWarmingPotentialFossil).unit
        },
        GWPlu: {
          value: element.GWPlu,
          unit: getImpactCriteria(ImpactCriterias.GlobalWarmingPotentialLandUse).unit
        },
        IR: { value: element.IR, unit: getImpactCriteria(ImpactCriterias.IonisingRadiation).unit },
        LU: { value: element.LU, unit: getImpactCriteria(ImpactCriterias.LandUse).unit },
        MIPS: {
          value: element.MIPS,
          unit: getImpactCriteria(ImpactCriterias.MaterialInputPerServiceUnit).unit
        },
        ODP: {
          value: element.ODP,
          unit: getImpactCriteria(ImpactCriterias.OzoneDepletionPotential).unit
        },
        PM: { value: element.PM, unit: getImpactCriteria(ImpactCriterias.ParticulateMatter).unit },
        POCP: {
          value: element.POCP,
          unit: getImpactCriteria(ImpactCriterias.PhotochemicalOzoneFormationPotential).unit
        },
        TPE: {
          value: element.TPE,
          unit: getImpactCriteria(ImpactCriterias.TotalPrimaryEnergy).unit
        },
        WU: { value: element.WU, unit: getImpactCriteria(ImpactCriterias.WaterUse).unit }
      }
    };
    return inventoryElementImpacts;
  });

export const functionalUnitOneResults: FunctionalUnitResultsRow[] = Fu1Results.map((result) => {
  const row: FunctionalUnitResultsRow = {
    amount: result.amount,
    unit: result.unit,
    name: result.name,
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

export function formatToLifeCycle(result_c: string) {
  let match = lifeCycleRegex.exec(result_c);
  if (match) {
    return match[0].split(",")[0];
  } else {
    return "full_life_cycle";
  }
}

const categoryRegex = /(?<=category=)(.*)(?=})/;
export function formatCategory(result_c: string) {
  let match = categoryRegex.exec(result_c);
  if (match) {
    const unformattedString = match[0];
    const category = unformattedString.split(",")[0];
    return category;
  } else {
    return "all_categories";
  }
}

export const functionalUnitOneResultsWithLc: FunctionalUnitResultsRowWithLifeCycle[] =
  Fu1Results.filter((result) => result.a != "material").map((result) => {
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
