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
  impacts: ImpactFactors;
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
export declare type IF = keyof ImpactFactors;

export declare type DataCenterBuilding = {
  lifespan: DataCenterCharacteristic;
  totalSurface: DataCenterCharacteristic;
  technicalRoomSurface: DataCenterCharacteristic;
  yearlyTotalEnergy: DataCenterCharacteristic;
  maximumUsableElectricalPower: DataCenterCharacteristic;
  dataCenterLoadFactor: DataCenterCharacteristic;
  powerUsageEffectiveness: DataCenterCharacteristic;
  waterUsageEffectiveness: DataCenterCharacteristic;
  energyReuseFactor: DataCenterCharacteristic;
  renewableEnergyFactor: DataCenterCharacteristic;
  electricalTechnicalResilience: DataCenterCharacteristic;
  coolingSystemType: DataCenterCharacteristic;
  location: DataCenterCharacteristic;
  concreteVolume: DataCenterCharacteristic;
  steelMass: DataCenterCharacteristic;
  designedFloorAssemblySurface: DataCenterCharacteristic;
  suspendedCeilingSurface: DataCenterCharacteristic;
  lifts: DataCenterCharacteristic;
  freightLifts: DataCenterCharacteristic;
  partitionSurface: DataCenterCharacteristic;
};

export declare type DataCenterCharacteristic = {
  label: string;
  value: string | number;
};

export declare type InventoryCategorySpellings = {
  lowercase: string;
  uppercase: string;
};

export declare type ImpactCriteria = {
  name: string;
  acronym: string;
  unit: string;
};

export declare type FunctionalUnitResultsRow = {
  amount: number;
  name: string;
  unit: string;
  scope: string;
  impacts: ImpactFactors;
};

export declare type FunctionalUnitResultsRowWithLifeCycle = FunctionalUnitResultsRow & {
  life_cycle_step?: string;
  category?: string;
  source?: string;
};

declare module "pcr-cloud";
