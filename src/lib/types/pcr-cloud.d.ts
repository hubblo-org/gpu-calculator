import type { LifeCycleSteps } from "./enums";

export declare type DataCenterInventoryElement = {
  name: string;
  category: InventoryCategories;
  quantity: number;
  lifespan: number;
};

export declare type DataCenterInventoryElementWithImpactFactors = {
  name: string;
  category: string;
  mass: number;
  source: string;
  lifeCycleStep: string;
  ADPe: number;
  ADPf: number;
  AP: number;
  CTUe: number;
  CTUh: number;
  CTUh_c: number;
  CTUh_nc: number;
  EPF: number;
  EPM: number;
  EPT: number;
  GWP: number;
  GWPb: number;
  GWPf: number;
  GWPlu: number;
  IR: number;
  LU: number;
  MIPS: number;
  ODP: number;
  PM: number;
  POCP: number;
  TPE: number;
  WU: number;
};

export declare type ImpactFactor = {
  value: number;
  unit: string;
};

export declare type ImpactFactors = {
  ADPe: ImpactFactor;
  ADPf: ImpactFactor;
  AP: ImpactFactor;
  CTUe: ImpactFactor;
  CTUh: ImpactFactor;
  CTUh_c: ImpactFactor;
  CTUh_nc: ImpactFactor;
  EPF: ImpactFactor;
  EPM: ImpactFactor;
  EPT: ImpactFactor;
  GWP: ImpactFactor;
  GWPb: ImpactFactor;
  GWPf: ImpactFactor;
  GWPlu: ImpactFactor;
  IR: ImpactFactor;
  LU: ImpactFactor;
  MIPS: ImpactFactor;
  ODP: ImpactFactor;
  PM: ImpactFactor;
  POCP: ImpactFactor;
  TPE: ImpactFactor;
  WU: ImpactFactor;
};

export declare type DataCenterBuilding = {
  lifespan: number;
  totalSurface: number;
  technicalRoomSurface: number;
  yearlyTotalEnergy: number;
  maximumUsableElectricalPower: number;
  dataCenterLoadFactor: number;
  powerUsageEffectiveness: number;
  waterUsageEffectiveness: number;
  energyReuseFactor: number;
  renewableEnergyFactor: number;
  electricalTechnicalResilience: string;
  coolingSystemType: string;
  location: string;
  studyDuration: number;
  concreteVolume: number;
  steelMass: number;
  designedFloorAssemblySurface: number;
  suspendedCeilingSurface: number;
  lifts: number;
  freightLifts: number;
  partitionSurface: number;
};

export declare type InventoryCategorySpellings = {
  lowercase: string;
  uppercase: string;
};

export declare type FunctionalUnitResultsRow = {
  amount: number;
  unit: string;
  scope: string;
  impacts: ImpactFactors;
};

declare module "pcr-cloud";
