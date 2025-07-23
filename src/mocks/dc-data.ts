import MaterialImpacts from "./materials_impacts.json";
import MaterialInventory from "./materials_inventory.json";
import Fu1Results from "./uf1-results.json";
import dataCenterInventory from "./building_inventory.json";
import type {
  DataCenterBuilding,
  DataCenterInventoryElement,
  DataCenterInventoryElementWithImpactFactors,
  Result,
  ResultWithLifeCycle
} from "$lib/types/pcr-cloud";
import { getImpactCriterionValues, ImpactCriterion } from "$lib/types/enums";

export const dataCenterCharacteristics: DataCenterBuilding = {
  electricalTechnicalResilience: {
    label: "Electrical Technical Resilience",
    value: dataCenterInventory.electricalTechnicalResilience,
    description: "test"
  },
  location: { label: "Location", value: dataCenterInventory.location, description: "test" },
  maximumUsableElectricalPower: {
    label: "Total power installed (IT + facility)",
    value: dataCenterInventory.maximumUsableElectricalPower,
    description: "test"
  },
  dataCenterLoadFactor: {
    label: "Load factor",
    value: dataCenterInventory.dataCenterLoadFactor,
    description: "test"
  },
  lifespan: {
    label: "Building lifespan",
    value: dataCenterInventory.lifespan,
    description: "test"
  },
  totalSurface: {
    label: "Building total surface",
    value: dataCenterInventory.totalSurface,
    description:
      "The building total surface in square meters, allowing to compute the total and yearly impacts for the manufacturing, transport and end-of-life life cycle steps"
  },
  yearlyTotalEnergy: {
    label: "Total energy (IT + facility), for one year",
    value: dataCenterInventory.yearlyTotalEnergy,
    description: "test"
  },
  powerUsageEffectiveness: {
    label: "Power Usage Effectiveness",
    value: dataCenterInventory.powerUsageEffectiveness,
    description: "test"
  },
  waterUsageEffectiveness: {
    label: "Water Usage Effectiveness",
    value: dataCenterInventory.waterUsageEffectiveness,
    description: "test"
  }
};

export function genNullImpact() {
  const nullImpact: ResultWithLifeCycle = {
    name: "Null initialized element",
    amount: 0,
    lifeCycleStep: "all lifecycle",
    source: "Generated",
    impacts: {
      ADPe: {
        value: 0,
        unit: getImpactCriterionValues(ImpactCriterion.AbioticDepletionPotentialElements).unit
      },
      //ADPf: {
      //  value: 0,
      //  unit: getImpactCriterionValues(ImpactCriterion.AbioticDepletionPotentialFossilFuels).unit
      //},
      AP: {
        value: 0,
        unit: getImpactCriterionValues(ImpactCriterion.AcidificationPotential).unit
      },
      //CTUe: {
      //  value: 0,
      //  unit: getImpactCriterionValues(ImpactCriterion.ComparativeToxicityUnitsForEcosystems).unit
      //},
      //CTUh: {
      //  value: 0,
      //  unit: getImpactCriterionValues(ImpactCriterion.ComparativeToxicityUnitsForHumans).unit
      //},
      //CTUh_c: {
      //  value: 0,
      //  unit: getImpactCriterionValues(
      //    ImpactCriterion.ComparativeToxicityUnitsForHumansCarcinogenic
      //  ).unit
      //},
      //CTUh_nc: {
      //  value: 0,
      //  unit: getImpactCriterionValues(
      //    ImpactCriterion.ComparativeToxicityUnitsForHumansNonCarcinogenic
      //  ).unit
      //},
      //EPF: {
      //  value: 0,
      //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialFreshWater).unit
      //},
      //EPM: {
      //  value: 0,
      //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialMarine).unit
      //},
      //EPT: {
      //  value: 0,
      //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialTerrestrial).unit
      //
      GWP: {
        value: 0,
        unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotential).unit
      },
      //GWPb: {
      //  value: 0,
      //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialBiogenic).unit
      //},
      //GWPf: {
      //  value: 0,
      //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialFossil).unit
      //},
      //GWPlu: {
      //  value: 0,
      //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialLandUse).unit
      //},
      IR: { value: 0, unit: getImpactCriterionValues(ImpactCriterion.IonisingRadiation).unit },
      //LU: { value: 0, unit: getImpactCriterionValues(ImpactCriterion.LandUse).unit },
      //MIPS: {
      //  value: 0,
      //  unit: getImpactCriterionValues(ImpactCriterion.MaterialInputPerServiceUnit).unit
      //},
      //ODP: {
      //  value: 0,
      //  unit: getImpactCriterionValues(ImpactCriterion.OzoneDepletionPotential).unit
      //},
      PM: { value: 0, unit: getImpactCriterionValues(ImpactCriterion.ParticulateMatter).unit },
      //POCP: {
      //  value: 0,
      //  unit: getImpactCriterionValues(ImpactCriterion.PhotochemicalOzoneFormationPotential).unit
      //},
      TPE: {
        value: 0,
        unit: getImpactCriterionValues(ImpactCriterion.TotalPrimaryEnergy).unit
      }
      //WU: { value: 0, unit: getImpactCriterionValues(ImpactCriterion.WaterUse).unit }
    }
  };
  return nullImpact;
}

export const inventoryWithImpact: DataCenterInventoryElementWithImpactFactors[] =
  MaterialImpacts.map((element) => {
    const elementDetails = MaterialInventory.filter(
      (inventoryElement) => element.id == inventoryElement.id
    );
    if (elementDetails.length == 0) {
      console.error("is empty: " + element.id);
    } else {
      for (var key in elementDetails) {
        console.log("element details, key " + key + ": " + elementDetails[key]);
        for (var k in elementDetails[key]) {
          console.log("details: " + k + " value=" + elementDetails[key][k]);
        }
      }
    }
    const inventoryElement = {
      name: element.material_name,
      category: elementDetails[0]?.category,
      mass: element.mass,
      source: element.source,
      quantity: elementDetails[0]?.quantity,
      lifespan: elementDetails[0]?.lifespan,
      lifeCycleStep: element.lc_step,
      impacts: {
        ADPe: {
          value: element.ADPe,
          unit: getImpactCriterionValues(ImpactCriterion.AbioticDepletionPotentialElements).unit
        },
        //ADPf: {
        //  value: element.ADPf,
        //  unit: getImpactCriterionValues(ImpactCriterion.AbioticDepletionPotentialFossilFuels).unit
        //},
        AP: {
          value: element.AP,
          unit: getImpactCriterionValues(ImpactCriterion.AcidificationPotential).unit
        },
        //CTUe: {
        //  value: element.CTUe,
        //  unit: getImpactCriterionValues(ImpactCriterion.ComparativeToxicityUnitsForEcosystems).unit
        //},
        //CTUh: {
        //  value: element.CTUh_c,
        //  unit: getImpactCriterionValues(ImpactCriterion.ComparativeToxicityUnitsForHumans).unit
        //},
        //CTUh_c: {
        //  value: element.CTUh_c,
        //  unit: getImpactCriterionValues(
        //    ImpactCriterion.ComparativeToxicityUnitsForHumansCarcinogenic
        //  ).unit
        //},
        //CTUh_nc: {
        //  value: element.CTUh_nc,
        //  unit: getImpactCriterionValues(
        //    ImpactCriterion.ComparativeToxicityUnitsForHumansNonCarcinogenic
        //  ).unit
        //},
        //EPF: {
        //  value: element.Epf,
        //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialFreshWater).unit
        //},
        //EPM: {
        //  value: element.Epm,
        //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialMarine).unit
        //},
        //EPT: {
        //  value: element.Ept,
        //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialTerrestrial).unit
        //},
        GWP: {
          value: element.GWP,
          unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotential).unit
        },
        //GWPb: {
        //  value: element.GWPb,
        //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialBiogenic).unit
        //},
        //GWPf: {
        //  value: element.GWPf,
        //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialFossil).unit
        //},
        //GWPlu: {
        //  value: element.GWPlu,
        //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialLandUse).unit
        //},
        IR: {
          value: element.IR,
          unit: getImpactCriterionValues(ImpactCriterion.IonisingRadiation).unit
        },
        //LU: { value: element.LU, unit: getImpactCriterionValues(ImpactCriterion.LandUse).unit },
        //MIPS: {
        //  value: element.MIPS,
        //  unit: getImpactCriterionValues(ImpactCriterion.MaterialInputPerServiceUnit).unit
        //},
        //ODP: {
        //  value: element.ODP,
        //  unit: getImpactCriterionValues(ImpactCriterion.OzoneDepletionPotential).unit
        //},
        PM: {
          value: element.PM,
          unit: getImpactCriterionValues(ImpactCriterion.ParticulateMatter).unit
        },
        //POCP: {
        //  value: element.POCP,
        //  unit: getImpactCriterionValues(ImpactCriterion.PhotochemicalOzoneFormationPotential).unit
        //},
        TPE: {
          value: element.TPE,
          unit: getImpactCriterionValues(ImpactCriterion.TotalPrimaryEnergy).unit
        }
        //WU: { value: element.WU, unit: getImpactCriterionValues(ImpactCriterion.WaterUse).unit }
      }
    };
    return inventoryElement;
  });

export const firstInventoryElement = MaterialInventory[0];
const inventoryElementWithImpactFactors = MaterialImpacts.filter(
  (elementWithImpacts) => elementWithImpacts.id === firstInventoryElement.id
);
export const inventoryElementsLifeCycleSteps = inventoryElementWithImpactFactors.map(
  (elementWithImpactFactors) => elementWithImpactFactors.lifeCycleStep
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
          unit: getImpactCriterionValues(ImpactCriterion.AbioticDepletionPotentialElements).unit
        },
        //ADPf: {
        //  value: element.ADPf,
        //  unit: getImpactCriterionValues(ImpactCriterion.AbioticDepletionPotentialFossilFuels).unit
        //},
        AP: {
          value: element.AP,
          unit: getImpactCriterionValues(ImpactCriterion.AcidificationPotential).unit
        },
        //CTUe: {
        //  value: element.CTUe,
        //  unit: getImpactCriterionValues(ImpactCriterion.ComparativeToxicityUnitsForEcosystems).unit
        //},
        //CTUh: {
        //  value: element.CTUh_c,
        //  unit: getImpactCriterionValues(ImpactCriterion.ComparativeToxicityUnitsForHumans).unit
        //},
        //CTUh_c: {
        //  value: element.CTUh_c,
        //  unit: getImpactCriterionValues(
        //    ImpactCriterion.ComparativeToxicityUnitsForHumansCarcinogenic
        //  ).unit
        //},
        //CTUh_nc: {
        //  value: element.CTUh_nc,
        //  unit: getImpactCriterionValues(
        //    ImpactCriterion.ComparativeToxicityUnitsForHumansNonCarcinogenic
        //  ).unit
        //},
        //EPF: {
        //  value: element.Epf,
        //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialFreshWater).unit
        //},
        //EPM: {
        //  value: element.Epm,
        //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialMarine).unit
        //},
        //EPT: {
        //  value: element.Ept,
        //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialTerrestrial).unit
        //},
        GWP: {
          value: element.GWP,
          unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotential).unit
        },
        //GWPb: {
        //  value: element.GWPb,
        //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialBiogenic).unit
        //},
        //GWPf: {
        //  value: element.GWPf,
        //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialFossil).unit
        //},
        //GWPlu: {
        //  value: element.GWPlu,
        //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialLandUse).unit
        //},
        IR: {
          value: element.IR,
          unit: getImpactCriterionValues(ImpactCriterion.IonisingRadiation).unit
        },
        //LU: { value: element.LU, unit: getImpactCriterionValues(ImpactCriterion.LandUse).unit },
        //MIPS: {
        //  value: element.MIPS,
        //  unit: getImpactCriterionValues(ImpactCriterion.MaterialInputPerServiceUnit).unit
        //},
        //ODP: {
        //  value: element.ODP,
        //  unit: getImpactCriterionValues(ImpactCriterion.OzoneDepletionPotential).unit
        //},
        PM: {
          value: element.PM,
          unit: getImpactCriterionValues(ImpactCriterion.ParticulateMatter).unit
        },
        //POCP: {
        //  value: element.POCP,
        //  unit: getImpactCriterionValues(ImpactCriterion.PhotochemicalOzoneFormationPotential).unit
        //},
        TPE: {
          value: element.TPE,
          unit: getImpactCriterionValues(ImpactCriterion.TotalPrimaryEnergy).unit
        },
        WU: { value: element.WU, unit: getImpactCriterionValues(ImpactCriterion.WaterUse).unit }
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
      lifeCycleStep: element.lifeCycleStep,
      impacts: {
        ADPe: {
          value: element.ADPe,
          unit: getImpactCriterionValues(ImpactCriterion.AbioticDepletionPotentialElements).unit
        },
        //ADPf: {
        //  value: element.ADPf,
        //  unit: getImpactCriterionValues(ImpactCriterion.AbioticDepletionPotentialFossilFuels).unit
        //},
        AP: {
          value: element.AP,
          unit: getImpactCriterionValues(ImpactCriterion.AcidificationPotential).unit
        },
        //CTUe: {
        //  value: element.CTUe,
        //  unit: getImpactCriterionValues(ImpactCriterion.ComparativeToxicityUnitsForEcosystems).unit
        //},
        //CTUh: {
        //  value: element.CTUh_c,
        //  unit: getImpactCriterionValues(ImpactCriterion.ComparativeToxicityUnitsForHumans).unit
        //},
        //CTUh_c: {
        //  value: element.CTUh_c,
        //  unit: getImpactCriterionValues(
        //    ImpactCriterion.ComparativeToxicityUnitsForHumansCarcinogenic
        //  ).unit
        //},
        //CTUh_nc: {
        //  value: element.CTUh_nc,
        //  unit: getImpactCriterionValues(
        //    ImpactCriterion.ComparativeToxicityUnitsForHumansNonCarcinogenic
        //  ).unit
        //},
        //EPF: {
        //  value: element.Epf,
        //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialFreshWater).unit
        //},
        //EPM: {
        //  value: element.Epm,
        //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialMarine).unit
        //},
        //EPT: {
        //  value: element.Ept,
        //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialTerrestrial).unit
        //},
        GWP: {
          value: element.GWP,
          unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotential).unit
        },
        //GWPb: {
        //  value: element.GWPb,
        //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialBiogenic).unit
        //},
        //GWPf: {
        //  value: element.GWPf,
        //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialFossil).unit
        //},
        //GWPlu: {
        //  value: element.GWPlu,
        //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialLandUse).unit
        //},
        IR: {
          value: element.IR,
          unit: getImpactCriterionValues(ImpactCriterion.IonisingRadiation).unit
        },
        //LU: { value: element.LU, unit: getImpactCriterionValues(ImpactCriterion.LandUse).unit },
        //MIPS: {
        //  value: element.MIPS,
        //  unit: getImpactCriterionValues(ImpactCriterion.MaterialInputPerServiceUnit).unit
        //},
        //ODP: {
        //  value: element.ODP,
        //  unit: getImpactCriterionValues(ImpactCriterion.OzoneDepletionPotential).unit
        //},
        PM: {
          value: element.PM,
          unit: getImpactCriterionValues(ImpactCriterion.ParticulateMatter).unit
        },
        //POCP: {
        //  value: element.POCP,
        //  unit: getImpactCriterionValues(ImpactCriterion.PhotochemicalOzoneFormationPotential).unit
        //},
        TPE: {
          value: element.TPE,
          unit: getImpactCriterionValues(ImpactCriterion.TotalPrimaryEnergy).unit
        }
        //WU: { value: element.WU, unit: getImpactCriterionValues(ImpactCriterion.WaterUse).unit }
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
      lifeCycleStep: element.lifeCycleStep,
      impacts: {
        ADPe: {
          value: element.ADPe,
          unit: getImpactCriterionValues(ImpactCriterion.AbioticDepletionPotentialElements).unit
        },
        //ADPf: {
        //  value: element.ADPf,
        //  unit: getImpactCriterionValues(ImpactCriterion.AbioticDepletionPotentialFossilFuels).unit
        //},
        AP: {
          value: element.AP,
          unit: getImpactCriterionValues(ImpactCriterion.AcidificationPotential).unit
        },
        //CTUe: {
        //  value: element.CTUe,
        //  unit: getImpactCriterionValues(ImpactCriterion.ComparativeToxicityUnitsForEcosystems).unit
        //},
        //CTUh: {
        //  value: element.CTUh_c,
        //  unit: getImpactCriterionValues(ImpactCriterion.ComparativeToxicityUnitsForHumans).unit
        //},
        //CTUh_c: {
        //  value: element.CTUh_c,
        //  unit: getImpactCriterionValues(
        //    ImpactCriterion.ComparativeToxicityUnitsForHumansCarcinogenic
        //  ).unit
        //},
        //CTUh_nc: {
        //  value: element.CTUh_nc,
        //  unit: getImpactCriterionValues(
        //    ImpactCriterion.ComparativeToxicityUnitsForHumansNonCarcinogenic
        //  ).unit
        //},
        //EPF: {
        //  value: element.Epf,
        //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialFreshWater).unit
        //},
        //EPM: {
        //  value: element.Epm,
        //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialMarine).unit
        //},
        //EPT: {
        //  value: element.Ept,
        //  unit: getImpactCriterionValues(ImpactCriterion.EutrophicationPotentialTerrestrial).unit
        //},
        GWP: {
          value: element.GWP,
          unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotential).unit
        },
        //GWPb: {
        //  value: element.GWPb,
        //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialBiogenic).unit
        //},
        //GWPf: {
        //  value: element.GWPf,
        //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialFossil).unit
        //},
        //GWPlu: {
        //  value: element.GWPlu,
        //  unit: getImpactCriterionValues(ImpactCriterion.GlobalWarmingPotentialLandUse).unit
        //},
        IR: {
          value: element.IR,
          unit: getImpactCriterionValues(ImpactCriterion.IonisingRadiation).unit
        },
        //LU: { value: element.LU, unit: getImpactCriterionValues(ImpactCriterion.LandUse).unit },
        //MIPS: {
        //  value: element.MIPS,
        //  unit: getImpactCriterionValues(ImpactCriterion.MaterialInputPerServiceUnit).unit
        //},
        //ODP: {
        //  value: element.ODP,
        //  unit: getImpactCriterionValues(ImpactCriterion.OzoneDepletionPotential).unit
        //},
        PM: {
          value: element.PM,
          unit: getImpactCriterionValues(ImpactCriterion.ParticulateMatter).unit
        },
        //POCP: {
        //  value: element.POCP,
        //  unit: getImpactCriterionValues(ImpactCriterion.PhotochemicalOzoneFormationPotential).unit
        //},
        TPE: {
          value: element.TPE,
          unit: getImpactCriterionValues(ImpactCriterion.TotalPrimaryEnergy).unit
        }
        //WU: { value: element.WU, unit: getImpactCriterionValues(ImpactCriterion.WaterUse).unit }
      }
    };
    return inventoryElementImpacts;
  });

export const functionalUnitOneResults: Result[] = Fu1Results.map((result) => {
  const row: Result = {
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

const lifeCycleRegex = /(?<=lifeCycleStep=)(.*)(?=})/;

export function formatToLifeCycle(result_c: string) {
  let match = lifeCycleRegex.exec(result_c);
  if (match) {
    const unformattedLifeCycle = match[0].split(",")[0];
    const lifeCycle =
      String(unformattedLifeCycle).charAt(0).toUpperCase() + String(unformattedLifeCycle).slice(1);
    return lifeCycle;
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

export const functionalUnitOneResultsWithLc: ResultWithLifeCycle[] = Fu1Results.filter(
  (result) => result.a != "material"
).map((result) => {
  const row: ResultWithLifeCycle = {
    amount: result.amount,
    unit: result.unit,
    source: result.a,
    scope: result.c,
    lifeCycleStep: formatToLifeCycle(result.c),
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
