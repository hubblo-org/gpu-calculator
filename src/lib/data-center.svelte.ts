import {
  buildImpactsPerCategoriesAndLifecycle,
  computeUnitOneResults,
  formatForBarPlot,
  computeTotalEnergyFromTotalPower
} from "./calculations";
import type {
  DataCenterBuilding,
  DataCenterInventoryElementWithImpactFactors,
  ResultWithLifeCycle,
  OrderedImpactFactors
} from "./types/pcr-cloud";

export class DataCenter {
  dataCenterInventory: DataCenterInventoryElementWithImpactFactors[];
  impactFactors = $state<ResultWithLifeCycle[]>();
  impactFactorsShares = $state<OrderedImpactFactors>();
  firstUnitResults = $state<ResultWithLifeCycle[]>();
  firstUnitShares = $state<OrderedImpactFactors>();
  yearlyTotalEnergy = $state<number>();
  steelMass = $state<number>();
  concreteVolume = $state<number>();
  totalSurface = $state<number>();
  lifespan = $state<number>();
  datacenterLoadFactor = $state<number>();
  maximumUsableElectricalPower = $state<number>();
  electricalTechnicalResilience = $state<string>();
  powerUsageEffectiveness = $state<number>();
  waterUsageEffectiveness = $state<number>();
  location = $state<string>();
  technicalRoomsSurface = $state<number>();
  suspendedCeilingSurface = $state<number>();
  lifts = $state<number>();
  freightLifts = $state<number>();
  partitionSurface = $state<number>();

  constructor(
    dataCenter: DataCenterBuilding,
    dataCenterInventory: DataCenterInventoryElementWithImpactFactors[]
  ) {
    this.dataCenterInventory = dataCenterInventory;
    this.yearlyTotalEnergy = dataCenter.yearlyTotalEnergy.value as number;
    //this.steelMass = dataCenter.steelMass.value as number;
    //this.concreteVolume = dataCenter.concreteVolume.value as number;
    this.totalSurface = dataCenter.totalSurface.value as number;
    this.lifespan = dataCenter.lifespan.value as number;
    this.electricalTechnicalResilience = dataCenter.electricalTechnicalResilience.value as string;
    this.powerUsageEffectiveness = dataCenter.powerUsageEffectiveness.value as number;
    this.waterUsageEffectiveness = dataCenter.waterUsageEffectiveness.value as number;
    this.location = dataCenter.location.value as string;
    //this.technicalRoomsSurface = dataCenter.technicalRoomSurface.value as number;
    //this.suspendedCeilingSurface = dataCenter.suspendedCeilingSurface.value as number;
    //this.lifts = dataCenter.lifts.value as number;
    //this.freightLifts = dataCenter.freightLifts.value as number;
    //this.partitionSurface = dataCenter.partitionSurface.value as number;
    this.datacenterLoadFactor = dataCenter.dataCenterLoadFactor.value as number;
    this.impactFactors = buildImpactsPerCategoriesAndLifecycle(this, this.dataCenterInventory);
    this.impactFactorsShares = formatForBarPlot(this.impactFactors);
    this.firstUnitResults = computeUnitOneResults(this, this.impactFactors);
    this.firstUnitShares = formatForBarPlot(this.firstUnitResults);
    this.yearlyTotalEnergy = computeTotalEnergyFromTotalPower(
      Number(this.maximumUsableElectricalPower),
      Number(this.datacenterLoadFactor)
    );
  }

  update() {
    this.impactFactors = buildImpactsPerCategoriesAndLifecycle(this, this.dataCenterInventory);
    this.impactFactorsShares = formatForBarPlot(this.impactFactors);
    this.firstUnitResults = computeUnitOneResults(this, this.impactFactors);
    this.firstUnitShares = formatForBarPlot(this.firstUnitResults);
    this.yearlyTotalEnergy = computeTotalEnergyFromTotalPower(
      Number(this.maximumUsableElectricalPower),
      Number(this.datacenterLoadFactor)
    );
  }
}
