export declare type DataCenterInventoryElement = {
  name: string;
  category: InventoryCategories;
  quantity: number;
  lifespan: number;
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
}
declare module "pcr-cloud";
