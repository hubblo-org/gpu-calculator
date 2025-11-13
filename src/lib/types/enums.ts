import type {
  FunctionalUnitParameters,
  ImpactCriteria,
  InventoryCategorySpellings
} from "./pcr-cloud";

export enum Scopes {
  Criteria = "Criteria",
  LifeCycleStep = "Life cycle step"
}

export enum FunctionalUnits {
  First
}

export enum Countries {
  AU = "Australia",
  CA = "Canada",
  DE = "Germany",
  DK = "Denmark",
  ES = "Spain",
  FR = "France",
  US = "United States"
}

export enum InventoryCategories {
  Building = "Building",
  Cooling = "Cooling",
  Energy = "Energy",
  EnergyBackup = "Energy backup",
  Maintenance = "Maintenance",
  Water = "Water"
}

export enum Graph {
  BarPlot = "bar-plot",
  Treemap = "treemap"
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

// For reverse mapping between impact criteria acronyms and associated values, just using ImpactCriterionAcronym could be enough with a method returning
// needed metadata. It could lose some legibility while dealing with the various impact criteria though, therefore having an enum with complete criteria names
// could still be useful.

export enum ImpactCriterion {
  AbioticDepletionPotentialElements,
  //AbioticDepletionPotentialFossilFuels,
  AcidificationPotential,
  //ComparativeToxicityUnitsForEcosystems,
  //ComparativeToxicityUnitsForHumans,
  //ComparativeToxicityUnitsForHumansCarcinogenic,
  //ComparativeToxicityUnitsForHumansNonCarcinogenic,
  //EutrophicationPotentialFreshWater,
  //EutrophicationPotentialMarine,
  //EutrophicationPotentialTerrestrial,
  GlobalWarmingPotential,
  //GlobalWarmingPotentialBiogenic,
  //GlobalWarmingPotentialFossil,
  //GlobalWarmingPotentialLandUse,
  IonisingRadiation,
  //LandUse,
  //MaterialInputPerServiceUnit,
  //OzoneDepletionPotential,
  ParticulateMatter,
  //PhotochemicalOzoneFormationPotential,
  TotalPrimaryEnergy
  //WaterUse
}

export enum ImpactCriterionAcronym {
  ADPe = "ADPe",
  //ADPf = "ADPf",
  AP = "AP",
  //CTUe = "CTUe",
  //CTUh = "CTUh",
  //CTUh_c = "CTUh_c",
  //CTUh_nc = "CTUh_nc",
  //EPF = "EPF",
  //EPM = "EPM",
  //EPT = "EPT",
  GWP = "GWP",
  //GWPb = "GWPb",
  //GWPf = "GWPf",
  //GWPlu = "GWPlu",
  IR = "IR",
  //LU = "LU",
  //MIPS = "MIPS",
  //ODP = "ODP",
  PM = "PM",
  //POCP = "POCP",
  TPE = "TPE"
  //WU = "WU"
}

export declare type IC = keyof typeof ImpactCriterion;

export function getImpactCriterionValues(impactCriterion: ImpactCriterion): ImpactCriteria {
  switch (impactCriterion) {
    case ImpactCriterion.AbioticDepletionPotentialElements:
      return {
        acronym: ImpactCriterionAcronym.ADPe,
        name: "Abiotic Depletion Potential Elements",
        unit: "kg Sb-Eq"
      };
    //case ImpactCriterion.AbioticDepletionPotentialFossilFuels:
    //  return {
    //    acronym: ImpactCriterionAcronym.ADPf,
    //    name: "Abiotic Depletion Potential Fossil Fuels",
    //    unit: "MJ, net calorific value"
    //  };
    case ImpactCriterion.AcidificationPotential:
      return {
        acronym: ImpactCriterionAcronym.AP,
        name: "Acidification Potential",
        unit: "mol H+-Eq"
      };
    //case ImpactCriterion.ComparativeToxicityUnitsForEcosystems:
    //  return {
    //    acronym: ImpactCriterionAcronym.CTUe,
    //    name: "Comparative Toxicity Units For Ecosystems",
    //    unit: "CTUe"
    //  };
    //case ImpactCriterion.ComparativeToxicityUnitsForHumans:
    //  return {
    //    acronym: ImpactCriterionAcronym.CTUh,
    //    name: "Comparative Toxicity Units For Humans",
    //    unit: "CTUh"
    //  };
    //case ImpactCriterion.ComparativeToxicityUnitsForHumansCarcinogenic:
    //  return {
    //    acronym: ImpactCriterionAcronym.CTUh_c,
    //    name: "Comparative Toxicity Units For Humans Carcinogenic",
    //    unit: "CTUh"
    //  };
    //case ImpactCriterion.ComparativeToxicityUnitsForHumansNonCarcinogenic:
    //  return {
    //    acronym: ImpactCriterionAcronym.CTUh_nc,
    //    name: "Comparative Toxicity Units For Humans Non Carcinogenic",
    //    unit: "CTUh"
    //  };
    //case ImpactCriterion.EutrophicationPotentialFreshWater:
    //  return {
    //    acronym: ImpactCriterionAcronym.EPF,
    //    name: "Eutrophication Potential Fresh Water",
    //    unit: "kg P-Eq"
    //  };
    //case ImpactCriterion.EutrophicationPotentialMarine:
    //  return {
    //    acronym: ImpactCriterionAcronym.EPM,
    //    name: "Eutrophication Potential Marine",
    //    unit: "kg N-Eq"
    //  };
    //case ImpactCriterion.EutrophicationPotentialTerrestrial:
    //  return {
    //    acronym: ImpactCriterionAcronym.EPT,
    //    name: "Eutrophication Potential Terrestrial",
    //    unit: "mol N-Eq"
    //  };
    case ImpactCriterion.GlobalWarmingPotential:
      return {
        acronym: ImpactCriterionAcronym.GWP,
        name: "Global Warming Potential",
        unit: "kg CO2-Eq"
      };
    //case ImpactCriterion.GlobalWarmingPotentialBiogenic:
    //  return {
    //    acronym: ImpactCriterionAcronym.GWPb,
    //    name: "Global Warming Potential Biogenic",
    //    unit: "kg CO2-Eq"
    //  };
    //case ImpactCriterion.GlobalWarmingPotentialFossil:
    //  return {
    //    acronym: ImpactCriterionAcronym.GWPf,
    //    name: "Global WarmingPotentialFossil",
    //    unit: "kg C02-Eq"
    //  };
    //case ImpactCriterion.GlobalWarmingPotentialLandUse:
    //  return {
    //    acronym: ImpactCriterionAcronym.GWPlu,
    //    name: "Global Warming Potential LandUse",
    //    unit: "kg CO2-Eq"
    //  };
    case ImpactCriterion.IonisingRadiation:
      return {
        acronym: ImpactCriterionAcronym.IR,
        name: "Ionising Radiation",
        unit: "kBq U235-Eq"
      };
    //case ImpactCriterion.LandUse:
    //  return { acronym: ImpactCriterionAcronym.LU, name: "Land Use", unit: "u" };
    //case ImpactCriterion.MaterialInputPerServiceUnit:
    //  return {
    //    acronym: ImpactCriterionAcronym.MIPS,
    //    name: "Material Input Per Service Unit",
    //    unit: "kg"
    //  };
    //case ImpactCriterion.OzoneDepletionPotential:
    //  return {
    //    acronym: ImpactCriterionAcronym.ODP,
    //    name: "Ozone Depletion Potential",
    //    unit: "kg CFC-11-Eq"
    //  };
    case ImpactCriterion.ParticulateMatter:
      return {
        acronym: ImpactCriterionAcronym.PM,
        name: "Particulate Matter",
        unit: "disease incidence"
      };
    //case ImpactCriterion.PhotochemicalOzoneFormationPotential:
    //  return {
    //    acronym: ImpactCriterionAcronym.POCP,
    //    name: "Photochemical Ozone Formation Potential",
    //    unit: "kg NMVOC-Eq"
    //  };
    case ImpactCriterion.TotalPrimaryEnergy:
      return {
        acronym: ImpactCriterionAcronym.TPE,
        name: "Total Primary Energy",
        unit: "MJ, net calorific value"
      };
    //case ImpactCriterion.WaterUse:
    //  return {
    //    acronym: ImpactCriterionAcronym.WU,
    //    name: "Water Use",
    //    unit: "m3 world eq. deprived"
    //  };
  }
}

export function getImpactCriterion(acronym: ImpactCriterionAcronym): ImpactCriterion {
  switch (acronym) {
    case ImpactCriterionAcronym.ADPe:
      return ImpactCriterion.AbioticDepletionPotentialElements;
    case ImpactCriterionAcronym.ADPf:
      return ImpactCriterion.AbioticDepletionPotentialFossilFuels;
    case ImpactCriterionAcronym.AP:
      return ImpactCriterion.AcidificationPotential;
    case ImpactCriterionAcronym.CTUe:
      return ImpactCriterion.ComparativeToxicityUnitsForEcosystems;
    case ImpactCriterionAcronym.CTUh:
      return ImpactCriterion.ComparativeToxicityUnitsForHumans;
    case ImpactCriterionAcronym.CTUh_c:
      return ImpactCriterion.ComparativeToxicityUnitsForHumansCarcinogenic;
    case ImpactCriterionAcronym.CTUh_nc:
      return ImpactCriterion.ComparativeToxicityUnitsForHumansNonCarcinogenic;
    case ImpactCriterionAcronym.EPF:
      return ImpactCriterion.EutrophicationPotentialFreshWater;
    case ImpactCriterionAcronym.EPM:
      return ImpactCriterion.EutrophicationPotentialMarine;
    case ImpactCriterionAcronym.EPT:
      return ImpactCriterion.EutrophicationPotentialTerrestrial;
    case ImpactCriterionAcronym.GWP:
      return ImpactCriterion.GlobalWarmingPotential;
    case ImpactCriterionAcronym.GWPb:
      return ImpactCriterion.GlobalWarmingPotentialBiogenic;
    case ImpactCriterionAcronym.GWPf:
      return ImpactCriterion.GlobalWarmingPotentialFossil;
    case ImpactCriterionAcronym.GWPlu:
      return ImpactCriterion.GlobalWarmingPotentialLandUse;
    case ImpactCriterionAcronym.IR:
      return ImpactCriterion.IonisingRadiation;
    case ImpactCriterionAcronym.LU:
      return ImpactCriterion.LandUse;
    case ImpactCriterionAcronym.MIPS:
      return ImpactCriterion.MaterialInputPerServiceUnit;
    case ImpactCriterionAcronym.ODP:
      return ImpactCriterion.OzoneDepletionPotential;
    case ImpactCriterionAcronym.PM:
      return ImpactCriterion.ParticulateMatter;
    case ImpactCriterionAcronym.POCP:
      return ImpactCriterion.PhotochemicalOzoneFormationPotential;
    case ImpactCriterionAcronym.TPE:
      return ImpactCriterion.TotalPrimaryEnergy;
    case ImpactCriterionAcronym.WU:
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
