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
declare module "pcr-cloud";
