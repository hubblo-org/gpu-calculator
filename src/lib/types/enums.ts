import type { ImpactCriteria } from "./gpu";

export enum ImpactFactorsSource {
  LCASimple = "Life-cycle assessment, simple",
  LCAComplete = "Life-cycle assessment, complete",
  ParametricModel = "Parametric model"
}

export enum Scopes {
  LifeCycleStep = "Life cycle step",
  Component = "Component",
  PlanetBoundary = "Planet boundary"
}

export enum LifeCycleSteps {
  Manufacturing = "Manufacturing",
  Transport = "Transport",
  Use = "Use",
  EndOfLife = "End-of-life"
}

export enum Components {
  Casing = "casing",
  Heatsink = "heatsink",
  PWB = "printed_wiring_board",
  GPU = "graphics_processing_unit",
  VRAM = "video_ram",
  Transport = "upstream_transport",
  EndOfLife = "end_of_life"
}

const humanPopulation = 8e9;

export enum PlanetBoundaries {
  AbioticDepletionPotentialElements = 2.19e8 / humanPopulation,
  AbioticDepletionPotentialFossilFuels = 2.24e14 / humanPopulation,
  AcidificationPotential = 1e12 / humanPopulation,
  ComparativeToxicityUnitsForEcosystems = 1.31e14 / humanPopulation,
  ComparativeToxicityUnitsForHumansCarcinogenic = 9.62e5 / humanPopulation,
  ComparativeToxicityUnitsForHumansNonCarcinogenic = 4.1e6 / humanPopulation,
  EutrophicationPotentialFreshWater = 5.81e9 / humanPopulation,
  EutrophicationPotentialMarine = 2.01e11 / humanPopulation,
  EutrophicationPotentialTerrestrial = 613e12 / humanPopulation,
  GlobalWarmingPotential = 6.81e12 / humanPopulation,
  IonisingRadiation = 5.27e14 / humanPopulation,
  OzoneDepletionPotential = 5.39e8 / humanPopulation,
  ParticulateMatter = 5.16e5 / humanPopulation,
  PhotochemicalOzoneFormationPotential = 4.07e11 / humanPopulation,
  WaterUse = 1.82e14 / humanPopulation
}

// For reverse mapping between impact criteria acronyms and associated values, just using ImpactCriterionAcronym could be enough with a method returning needed metadata. It could lose some legibility while dealing with the various impact criteria though, therefore having an enum with complete criteria names
// could still be useful.

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

export enum ImpactCriterionAcronym {
  ADPe = "ADPe",
  ADPf = "ADPf",
  AP = "AP",
  CTUe = "CTUe",
  CTUh = "CTUh",
  CTUh_c = "CTUh_c",
  CTUh_nc = "CTUh_nc",
  EPF = "Epf",
  EPM = "Epm",
  EPT = "Ept",
  GWP = "GWP",
  GWPb = "GWPb",
  GWPf = "GWPf",
  GWPlu = "GWPlu",
  IR = "IR",
  LU = "LU",
  MIPS = "MIPS",
  ODP = "ODP",
  PM = "PM",
  POCP = "POCP",
  TPE = "TPE",
  WU = "WU"
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
    case ImpactCriterion.AbioticDepletionPotentialFossilFuels:
      return {
        acronym: ImpactCriterionAcronym.ADPf,
        name: "Abiotic Depletion Potential Fossil Fuels",
        unit: "MJ, net calorific value"
      };
    case ImpactCriterion.AcidificationPotential:
      return {
        acronym: ImpactCriterionAcronym.AP,
        name: "Acidification Potential",
        unit: "mol H+-Eq"
      };
    case ImpactCriterion.ComparativeToxicityUnitsForEcosystems:
      return {
        acronym: ImpactCriterionAcronym.CTUe,
        name: "Comparative Toxicity Units For Ecosystems",
        unit: "CTUe"
      };
    case ImpactCriterion.ComparativeToxicityUnitsForHumans:
      return {
        acronym: ImpactCriterionAcronym.CTUh,
        name: "Comparative Toxicity Units For Humans",
        unit: "CTUh"
      };
    case ImpactCriterion.ComparativeToxicityUnitsForHumansCarcinogenic:
      return {
        acronym: ImpactCriterionAcronym.CTUh_c,
        name: "Comparative Toxicity Units For Humans Carcinogenic",
        unit: "CTUh"
      };
    case ImpactCriterion.ComparativeToxicityUnitsForHumansNonCarcinogenic:
      return {
        acronym: ImpactCriterionAcronym.CTUh_nc,
        name: "Comparative Toxicity Units For Humans Non Carcinogenic",
        unit: "CTUh"
      };
    case ImpactCriterion.EutrophicationPotentialFreshWater:
      return {
        acronym: ImpactCriterionAcronym.EPF,
        name: "Eutrophication Potential Fresh Water",
        unit: "kg P-Eq"
      };
    case ImpactCriterion.EutrophicationPotentialMarine:
      return {
        acronym: ImpactCriterionAcronym.EPM,
        name: "Eutrophication Potential Marine",
        unit: "kg N-Eq"
      };
    case ImpactCriterion.EutrophicationPotentialTerrestrial:
      return {
        acronym: ImpactCriterionAcronym.EPT,
        name: "Eutrophication Potential Terrestrial",
        unit: "mol N-Eq"
      };
    case ImpactCriterion.GlobalWarmingPotential:
      return {
        acronym: ImpactCriterionAcronym.GWP,
        name: "Global Warming Potential",
        unit: "kg CO2-Eq"
      };
    case ImpactCriterion.GlobalWarmingPotentialBiogenic:
      return {
        acronym: ImpactCriterionAcronym.GWPb,
        name: "Global Warming Potential Biogenic",
        unit: "kg CO2-Eq"
      };
    case ImpactCriterion.GlobalWarmingPotentialFossil:
      return {
        acronym: ImpactCriterionAcronym.GWPf,
        name: "Global WarmingPotentialFossil",
        unit: "kg C02-Eq"
      };
    case ImpactCriterion.GlobalWarmingPotentialLandUse:
      return {
        acronym: ImpactCriterionAcronym.GWPlu,
        name: "Global Warming Potential LandUse",
        unit: "kg CO2-Eq"
      };
    case ImpactCriterion.IonisingRadiation:
      return {
        acronym: ImpactCriterionAcronym.IR,
        name: "Ionising Radiation",
        unit: "kBq U235-Eq"
      };
    case ImpactCriterion.LandUse:
      return { acronym: ImpactCriterionAcronym.LU, name: "Land Use", unit: "u" };
    case ImpactCriterion.MaterialInputPerServiceUnit:
      return {
        acronym: ImpactCriterionAcronym.MIPS,
        name: "Material Input Per Service Unit",
        unit: "kg"
      };
    case ImpactCriterion.OzoneDepletionPotential:
      return {
        acronym: ImpactCriterionAcronym.ODP,
        name: "Ozone Depletion Potential",
        unit: "kg CFC-11-Eq"
      };
    case ImpactCriterion.ParticulateMatter:
      return {
        acronym: ImpactCriterionAcronym.PM,
        name: "Particulate Matter",
        unit: "disease incidence"
      };
    case ImpactCriterion.PhotochemicalOzoneFormationPotential:
      return {
        acronym: ImpactCriterionAcronym.POCP,
        name: "Photochemical Ozone Formation Potential",
        unit: "kg NMVOC-Eq"
      };
    case ImpactCriterion.TotalPrimaryEnergy:
      return {
        acronym: ImpactCriterionAcronym.TPE,
        name: "Total Primary Energy",
        unit: "MJ, net calorific value"
      };
    case ImpactCriterion.WaterUse:
      return {
        acronym: ImpactCriterionAcronym.WU,
        name: "Water Use",
        unit: "m3 world eq. deprived"
      };
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

export function getPlanetBoundary(acronym: ImpactCriterionAcronym): PlanetBoundaries {
  switch (acronym) {
    case ImpactCriterionAcronym.ADPe:
      return PlanetBoundaries.AbioticDepletionPotentialElements;
    case ImpactCriterionAcronym.ADPf:
      return PlanetBoundaries.AbioticDepletionPotentialFossilFuels;
    case ImpactCriterionAcronym.AP:
      return PlanetBoundaries.AcidificationPotential;
    case ImpactCriterionAcronym.CTUe:
      return PlanetBoundaries.ComparativeToxicityUnitsForEcosystems;
    case ImpactCriterionAcronym.CTUh_c:
      return PlanetBoundaries.ComparativeToxicityUnitsForHumansCarcinogenic;
    case ImpactCriterionAcronym.CTUh_nc:
      return PlanetBoundaries.ComparativeToxicityUnitsForHumansNonCarcinogenic;
    case ImpactCriterionAcronym.EPF:
      return PlanetBoundaries.EutrophicationPotentialFreshWater;
    case ImpactCriterionAcronym.EPM:
      return PlanetBoundaries.EutrophicationPotentialMarine;
    case ImpactCriterionAcronym.EPT:
      return PlanetBoundaries.EutrophicationPotentialTerrestrial;
    case ImpactCriterionAcronym.GWP:
      return PlanetBoundaries.GlobalWarmingPotential;
    case ImpactCriterionAcronym.IR:
      return PlanetBoundaries.IonisingRadiation;
    case ImpactCriterionAcronym.LU:
    case ImpactCriterionAcronym.ODP:
      return PlanetBoundaries.OzoneDepletionPotential;
    case ImpactCriterionAcronym.PM:
      return PlanetBoundaries.ParticulateMatter;
    case ImpactCriterionAcronym.POCP:
      return PlanetBoundaries.PhotochemicalOzoneFormationPotential;
    case ImpactCriterionAcronym.WU:
      return PlanetBoundaries.WaterUse;
    default:
      throw new Error("Unknown acronym!");
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
