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
  Building,
  Cooling,
  Energy,
  EnergyBackup,
  Maintenance,
  Water
}

export enum LifeCycleSteps {
  Extraction = "Extraction",
  Manufacturing = "Manufacturing",
  Transportation = "Transportation",
  Use = "Use",
  EndOfLife = "End of life"
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

export enum ImpactCriterias {
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

export declare type IC = keyof typeof ImpactCriterias;

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

export function getImpactCriteria(impactCriterias: ImpactCriterias): ImpactCriteria {
  switch (impactCriterias) {
    case ImpactCriterias.AbioticDepletionPotentialElements:
      return { name: "Abiotic Depletion Potential Elements", acronym: "ADPe", unit: "kg Sb-Eq" };
    case ImpactCriterias.AbioticDepletionPotentialFossilFuels:
      return {
        name: "Abiotic Depletion Potential Fossil Fuels",
        acronym: "ADPf",
        unit: "MJ, net calorific value"
      };
    case ImpactCriterias.AcidificationPotential:
      return { name: "Acidification Potential", acronym: "AP", unit: "mol H+-Eq" };
    case ImpactCriterias.ComparativeToxicityUnitsForEcosystems:
      return { acronym: "CTUe", name: "Comparative Toxicity Units For Ecosystems", unit: "CTUe" };
    case ImpactCriterias.ComparativeToxicityUnitsForHumans:
      return { acronym: "CTUh", name: "Comparative Toxicity Units For Humans", unit: "CTUh" };
    case ImpactCriterias.ComparativeToxicityUnitsForHumansCarcinogenic:
      return {
        acronym: "CTUh_c",
        name: "Comparative Toxicity Units For Humans Carcinogenic",
        unit: "CTUh"
      };
    case ImpactCriterias.ComparativeToxicityUnitsForHumansNonCarcinogenic:
      return {
        acronym: "CTUh_nc",
        name: "Comparative Toxicity Units For Humans Non Carcinogenic",
        unit: "CTUh"
      };
    case ImpactCriterias.EutrophicationPotentialFreshWater:
      return { acronym: "EPF", name: "Eutrophication Potential Fresh Water", unit: "kg P-Eq" };
    case ImpactCriterias.EutrophicationPotentialMarine:
      return { acronym: "EPM", name: "Eutrophication Potential Marine", unit: "kg N-Eq" };
    case ImpactCriterias.EutrophicationPotentialTerrestrial:
      return { acronym: "EPT", name: "Eutrophication Potential Terrestrial", unit: "mol N-Eq" };
    case ImpactCriterias.GlobalWarmingPotential:
      return { acronym: "GWP", name: "Global Warming Potential", unit: "kg CO2-Eq" };
    case ImpactCriterias.GlobalWarmingPotentialBiogenic:
      return { acronym: "GWPb", name: "Global Warming Potential Biogenic", unit: "kg CO2-Eq" };
    case ImpactCriterias.GlobalWarmingPotentialFossil:
      return { acronym: "GWPf", name: "Global WarmingPotentialFossil", unit: "kg C02-Eq" };
    case ImpactCriterias.GlobalWarmingPotentialLandUse:
      return { acronym: "GWPlu", name: "Global Warming Potential LandUse", unit: "kg CO2-Eq" };
    case ImpactCriterias.IonisingRadiation:
      return { acronym: "IR", name: "Ionising Radiation", unit: "kBq U235-Eq" };
    case ImpactCriterias.LandUse:
      return { acronym: "LU", name: "Land Use", unit: "u" };
    case ImpactCriterias.MaterialInputPerServiceUnit:
      return { acronym: "MIPS", name: "Material Input Per Service Unit", unit: "kg" };
    case ImpactCriterias.OzoneDepletionPotential:
      return { acronym: "ODP", name: "Ozone Depletion Potential", unit: "kg CFC-11-Eq" };
    case ImpactCriterias.ParticulateMatter:
      return { acronym: "PM", name: "Particulate Matter", unit: "disease incidence" };
    case ImpactCriterias.PhotochemicalOzoneFormationPotential:
      return {
        acronym: "POCP",
        name: "Photochemical Ozone Formation Potential",
        unit: "kg NMVOC-Eq"
      };
    case ImpactCriterias.TotalPrimaryEnergy:
      return { acronym: "TPE", name: "Total Primary Energy", unit: "MJ, net calorific value" };
    case ImpactCriterias.WaterUse:
      return { acronym: "WU", name: "Water Use", unit: "m3 world eq. deprived" };
  }
}

export function getAllImpactCriterias(): ImpactCriteria[] {
  const impactCriterias = Object.keys(ImpactCriterias).filter((key) => isNaN(Number(key)));
  const impactCriteriasValues = impactCriterias.map((impactCriteria) => {
    const value = getImpactCriteria(ImpactCriterias[impactCriteria as IC]);
    return value;
  });
  return impactCriteriasValues;
}

export function getImpactCriteriasByField(field: keyof ImpactCriteria): string[] {
  const impactCriterias = Object.keys(ImpactCriterias).filter((key) => isNaN(Number(key)));

  const impactCriteriasValues = impactCriterias.map((impactCriteria) => {
    const value = getImpactCriteria(ImpactCriterias[impactCriteria as IC])[field];
    return value;
  });
  return impactCriteriasValues;
}
