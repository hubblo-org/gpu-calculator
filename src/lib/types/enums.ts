import type {
  FunctionalUnitParameters,
  ImpactCriteria,
  InventoryCategorySpellings
} from "./pcr-cloud";

export enum FunctionalUnits {
  First
}
export enum Countries {
  FRA = "France",
  GBR = "United Kingdom",
  USA = "United States of America",
  POL = "Poland"
}
export enum InventoryCategories {
  Building = "Building",
  Cooling = "Cooling",
  Energy = "Energy",
  EnergyBackup = "Energy backup",
  Maintenance = "Maintenance",
  Water = "Water"
}

export enum LifeCycleSteps {
  Manufacturing = "Manufacturing",
  Transport = "Transport",
  Use = "Use",
  EndOfLife = "End-of-life"
}

export enum ElectricalTechnicalResilienceTiers {
  BasicCapacity = "Tier 1",
  RedudantCapacityComponents = "Tier 2",
  ConcurrentlyMaintainable = "Tier 3",
  FaultTolerant = "Tier 4"
}

export enum CoolingSystems {
  AirCooling = "Air cooling",
  WaterCooling = "Water cooling",
  LiquidCooling = "Liquid cooling",
  FreeCooling = "Free cooling"
}

export enum ImpactCriterion {
  AbioticDepletionPotentialElements,
  AbioticDepletionPotentialFossilFuels,
  AcidificationPotential,
  ComparativeToxicityUnitsForEcosystems,
  ComparativeToxicityUnitsForHumans,
  ComparativeToxicityUnitsForHumansCarcinogenic,
  ComparativeToxicityUnitsForHumansNonCarcinogenic,
  EutrophicationPotentialFreshWater,
  EutrophicationPotentialMarine,
  EutrophicationPotentialTerrestrial,
  GlobalWarmingPotential,
  GlobalWarmingPotentialBiogenic,
  GlobalWarmingPotentialFossil,
  GlobalWarmingPotentialLandUse,
  IonisingRadiation,
  LandUse,
  MaterialInputPerServiceUnit,
  OzoneDepletionPotential,
  ParticulateMatter,
  PhotochemicalOzoneFormationPotential,
  TotalPrimaryEnergy,
  WaterUse
}

export declare type IC = keyof typeof ImpactCriterion;

export function getFunctionalUnitParameters(
  functionalUnit: FunctionalUnits
): FunctionalUnitParameters {
  switch (functionalUnit) {
    case FunctionalUnits.First:
      return {
        title: "Functional Unit 1",
        service: "Provide hosting services for operation of the IT equipment.",
        product: "For one kilowatt of commercialised IT power.",
        studyDuration: "One year."
      };
  }
}

export function getInventoryCategorySpelling(
  inventoryCategories: InventoryCategories
): InventoryCategorySpellings {
  switch (inventoryCategories) {
    case InventoryCategories.Building:
      return { lowercase: "building", uppercase: "Building" };
    case InventoryCategories.Cooling:
      return { lowercase: "cooling", uppercase: "Cooling" };
    case InventoryCategories.Energy:
      return { lowercase: "energy", uppercase: "Energy" };
    case InventoryCategories.EnergyBackup:
      return { lowercase: "energy_backup", uppercase: "Energy backup" };
    case InventoryCategories.Maintenance:
      return { lowercase: "maintenance", uppercase: "Maintenance" };
    case InventoryCategories.Water:
      return { lowercase: "water", uppercase: "Water" };
  }
}

export function getImpactCriterionValues(impactCriterion: ImpactCriterion): ImpactCriteria {
  switch (impactCriterion) {
    case ImpactCriterion.AbioticDepletionPotentialElements:
      return { name: "Abiotic Depletion Potential Elements", acronym: "ADPe", unit: "kg Sb-Eq" };
    case ImpactCriterion.AbioticDepletionPotentialFossilFuels:
      return {
        name: "Abiotic Depletion Potential Fossil Fuels",
        acronym: "ADPf",
        unit: "MJ, net calorific value"
      };
    case ImpactCriterion.AcidificationPotential:
      return { name: "Acidification Potential", acronym: "AP", unit: "mol H+-Eq" };
    case ImpactCriterion.ComparativeToxicityUnitsForEcosystems:
      return { acronym: "CTUe", name: "Comparative Toxicity Units For Ecosystems", unit: "CTUe" };
    case ImpactCriterion.ComparativeToxicityUnitsForHumans:
      return { acronym: "CTUh", name: "Comparative Toxicity Units For Humans", unit: "CTUh" };
    case ImpactCriterion.ComparativeToxicityUnitsForHumansCarcinogenic:
      return {
        acronym: "CTUh_c",
        name: "Comparative Toxicity Units For Humans Carcinogenic",
        unit: "CTUh"
      };
    case ImpactCriterion.ComparativeToxicityUnitsForHumansNonCarcinogenic:
      return {
        acronym: "CTUh_nc",
        name: "Comparative Toxicity Units For Humans Non Carcinogenic",
        unit: "CTUh"
      };
    case ImpactCriterion.EutrophicationPotentialFreshWater:
      return { acronym: "EPF", name: "Eutrophication Potential Fresh Water", unit: "kg P-Eq" };
    case ImpactCriterion.EutrophicationPotentialMarine:
      return { acronym: "EPM", name: "Eutrophication Potential Marine", unit: "kg N-Eq" };
    case ImpactCriterion.EutrophicationPotentialTerrestrial:
      return { acronym: "EPT", name: "Eutrophication Potential Terrestrial", unit: "mol N-Eq" };
    case ImpactCriterion.GlobalWarmingPotential:
      return { acronym: "GWP", name: "Global Warming Potential", unit: "kg CO2-Eq" };
    case ImpactCriterion.GlobalWarmingPotentialBiogenic:
      return { acronym: "GWPb", name: "Global Warming Potential Biogenic", unit: "kg CO2-Eq" };
    case ImpactCriterion.GlobalWarmingPotentialFossil:
      return { acronym: "GWPf", name: "Global WarmingPotentialFossil", unit: "kg C02-Eq" };
    case ImpactCriterion.GlobalWarmingPotentialLandUse:
      return { acronym: "GWPlu", name: "Global Warming Potential LandUse", unit: "kg CO2-Eq" };
    case ImpactCriterion.IonisingRadiation:
      return { acronym: "IR", name: "Ionising Radiation", unit: "kBq U235-Eq" };
    case ImpactCriterion.LandUse:
      return { acronym: "LU", name: "Land Use", unit: "u" };
    case ImpactCriterion.MaterialInputPerServiceUnit:
      return { acronym: "MIPS", name: "Material Input Per Service Unit", unit: "kg" };
    case ImpactCriterion.OzoneDepletionPotential:
      return { acronym: "ODP", name: "Ozone Depletion Potential", unit: "kg CFC-11-Eq" };
    case ImpactCriterion.ParticulateMatter:
      return { acronym: "PM", name: "Particulate Matter", unit: "disease incidence" };
    case ImpactCriterion.PhotochemicalOzoneFormationPotential:
      return {
        acronym: "POCP",
        name: "Photochemical Ozone Formation Potential",
        unit: "kg NMVOC-Eq"
      };
    case ImpactCriterion.TotalPrimaryEnergy:
      return { acronym: "TPE", name: "Total Primary Energy", unit: "MJ, net calorific value" };
    case ImpactCriterion.WaterUse:
      return { acronym: "WU", name: "Water Use", unit: "m3 world eq. deprived" };
  }
}

export function getImpactCriterion(acronym: string): ImpactCriterion | undefined {
  switch (acronym) {
    case "ADPe":
      return ImpactCriterion.AbioticDepletionPotentialElements;
    case "ADPf":
      return ImpactCriterion.AbioticDepletionPotentialFossilFuels;
    case "AP":
      return ImpactCriterion.AcidificationPotential;
    case "CTUe":
      return ImpactCriterion.ComparativeToxicityUnitsForEcosystems;
    case "CTUh":
      return ImpactCriterion.ComparativeToxicityUnitsForHumans;
    case "CTUh_c":
      return ImpactCriterion.ComparativeToxicityUnitsForHumansCarcinogenic;
    case "CTUh_nc":
      return ImpactCriterion.ComparativeToxicityUnitsForHumansNonCarcinogenic;
    case "EPH":
      return ImpactCriterion.EutrophicationPotentialFreshWater;
    case "EPM":
      return ImpactCriterion.EutrophicationPotentialMarine;
    case "EPT":
      return ImpactCriterion.EutrophicationPotentialTerrestrial;
    case "GWP":
      return ImpactCriterion.GlobalWarmingPotential;
    case "GWPb":
      return ImpactCriterion.GlobalWarmingPotentialBiogenic;
    case "GWPf":
      return ImpactCriterion.GlobalWarmingPotentialFossil;
    case "GWPlu":
      return ImpactCriterion.GlobalWarmingPotentialLandUse;
    case "IR":
      return ImpactCriterion.IonisingRadiation;
    case "LU":
      return ImpactCriterion.LandUse;
    case "MIPS":
      return ImpactCriterion.MaterialInputPerServiceUnit;
    case "ODP":
      return ImpactCriterion.OzoneDepletionPotential;
    case "PM":
      return ImpactCriterion.ParticulateMatter;
    case "POCP":
      return ImpactCriterion.PhotochemicalOzoneFormationPotential;
    case "TPE":
      return ImpactCriterion.TotalPrimaryEnergy;
    case "WU":
      return ImpactCriterion.WaterUse;
  }
}

export function getAllImpactCriteria(): ImpactCriteria[] {
  const impactCriterias = Object.keys(ImpactCriterion).filter((key) => isNaN(Number(key)));
  const impactCriteriasValues = impactCriterias.map((impactCriteria) => {
    const value = getImpactCriterionValues(ImpactCriterion[impactCriteria as IC]);
    return value;
  });
  return impactCriteriasValues;
}

export function getImpactCriterionByField(field: keyof ImpactCriteria): string[] {
  const impactCriterias = Object.keys(ImpactCriterion).filter((key) => isNaN(Number(key)));

  const impactCriteriasValues = impactCriterias.map((impactCriteria) => {
    const value = getImpactCriterionValues(ImpactCriterion[impactCriteria as IC])[field];
    return value;
  });
  return impactCriteriasValues;
}
