import type { InventoryCategorySpellings } from "./pcr-cloud";

export enum InventoryCategories {
  Building,
  Cooling,
  Energy,
  EnergyBackup,
  Maintenance,
  Water
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
  AbioticDepletionPotentialElements = "ADPe",
  AbioticDepletionPotentialFossilFuels = "ADPf",
  AcidificationPotential = "AP",
  ComparativeToxicityUnitsForEcosystems = "CTUe",
  ComparativeToxicityUnitsForHumans = "CTUh",
  ComparativeToxicityUnitsForHumansCarcinogenic = "CTUh_c",
  ComparativeToxicityUnitsForHumansNonCarcinogenic = "CTUh_nc",
  EutrophicationPotentialFreshWater = "EPF",
  EutrophicationPotentialMarine = "EPM",
  EutrophicationPotentialTerrestrial = "EPT",
  GlobalWarmingPotential = "GWP",
  GlobalWarmingPotentialBiogenic = "GWPb",
  GlobalWarmingPotentialFossil = "GWPf",
  GlobalWarmingPotentialLandUse = "GWPlu",
  IonisingRadiation = "IR",
  LandUse = "LU",
  MaterialInputPerServiceUnit = "MIPS",
  OzoneDepletionPotential = "ODP",
  ParticulateMatter = "PM",
  PhotochemicalOzoneFormationPotential = "POCP",
  TotalPrimaryEnergy = "TPE",
  WaterUse = "WU"
}

export enum LifeCycleSteps {
  Extraction = "Extraction",
  Manufacturing = "Manufacturing",
  Transportation = "Transportation",
  Use = "Use",
  EndOfLife = "End of life"
}
