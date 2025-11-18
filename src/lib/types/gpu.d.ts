export declare type TidyImpactFactor = {
  component?: string;
  impactCriterion: string;
  lifeCycleStep: string;
  value: number;
};

export declare type TidyRatio = {
  totalImpactFactor: number;
  impactCriterion: string;
  ratioNumber: number;
  ratioPercentage: number;
};

export declare type GraphicsCard = {
  name: string;
  totalWeight: number;
  casingWeight: number;
  heatsinkWeight: number;
  cardSurface: number;
  videoRamSize: number;
  videoRamDies: number;
  videoRamDieSurface?: number;
  gpuSurface: number;
};

export declare type GraphicsCardComponents = {
  casing: UnorderedImpactFactors;
  heatsink: UnorderedImpactFactors;
  printed_wiring_board: UnorderedImpactFactors;
  graphics_processing_unit: UnorderedImpactFactors;
  video_ram: UnorderedImpactFactors;
  upstream_transport: UnorderedImpactFactors;
  end_of_life: UnorderedImpactFactors;
  transport_boat?: UnorderedImpactFactors;
  transport_truck?: UnorderedImpactFactors;
  transport_plane?: UnorderedImpactFactors;
};

export declare type GraphicsCardImpactFactors = {
  graphics_card: string;
  components: GraphicsCardComponents;
};

export declare type UnorderedImpactFactors = {
  graphics_card: string;
  component: string;
  manufacturing_ADPe?: number;
  manufacturing_ADPf?: number;
  manufacturing_AP?: number;
  manufacturing_CTUe?: number;
  manufacturing_CTUh_c?: number;
  manufacturing_CTUh_nc?: number;
  manufacturing_Epf?: number;
  manufacturing_Epm?: number;
  manufacturing_Ept?: number;
  manufacturing_GWP?: number;
  manufacturing_GWPb?: number;
  manufacturing_GWPf?: number;
  manufacturing_GWPlu?: number;
  manufacturing_IR?: number;
  manufacturing_LU?: number;
  manufacturing_ODP?: number;
  manufacturing_PM?: number;
  manufacturing_POCP?: number;
  manufacturing_WU?: number;
  manufacturing_MIPS?: number;
  manufacturing_DEEE?: number;
  manufacturing_TPE?: number;
  transport_ADPe?: number;
  transport_ADPf?: number;
  transport_AP?: number;
  transport_CTUe?: number;
  transport_CTUh_c?: number;
  transport_CTUh_nc?: number;
  transport_Epf?: number;
  transport_Epm?: number;
  transport_Ept?: number;
  transport_GWP?: number;
  transport_GWPb?: number;
  transport_GWPf?: number;
  transport_GWPlu?: number;
  transport_IR?: number;
  transport_LU?: number;
  transport_ODP?: number;
  transport_PM?: number;
  transport_POCP?: number;
  transport_WU?: number;
  transport_MIPS?: number;
  transport_DEEE?: number;
  transport_TPE?: number;
  use_ADPe?: number;
  use_ADPf?: number;
  use_AP?: number;
  use_CTUe?: number;
  use_CTUh_c?: number;
  use_CTUh_nc?: number;
  use_Epf?: number;
  use_Epm?: number;
  use_Ept?: number;
  use_GWP?: number;
  use_GWPb?: number;
  use_GWPf?: number;
  use_GWPlu?: number;
  use_IR?: number;
  use_LU?: number;
  use_ODP?: number;
  use_PM?: number;
  use_POCP?: number;
  use_WU?: number;
  use_MIPS?: number;
  use_DEEE?: number;
  use_TPE?: number;
  end_of_life_ADPe?: number;
  end_of_life_ADPf?: number;
  end_of_life_AP?: number;
  end_of_life_CTUe?: number;
  end_of_life_CTUh_c?: number;
  end_of_life_CTUh_nc?: number;
  end_of_life_Epf?: number;
  end_of_life_Epm?: number;
  end_of_life_Ept?: number;
  end_of_life_GWP?: number;
  end_of_life_GWPb?: number;
  end_of_life_GWPf?: number;
  end_of_life_GWPlu?: number;
  end_of_life_IR?: number;
  end_of_life_LU?: number;
  end_of_life_ODP?: number;
  end_of_life_PM?: number;
  end_of_life_POCP?: number;
  end_of_life_WU?: number;
  end_of_life_MIPS?: number;
  end_of_life_DEEE?: number;
  end_of_life_TPE?: number;
};

export declare type ImpactFactorsKeys = keyof UnorderedImpactFactors;

export declare type GraphicsCardLifeCycle = {
  manufacturing: ImpactFactors;
  use: ImpactFactors;
  transport: ImpactFactors;
  endOfLife: ImpactFactors;
};

export declare type ImpactFactors = {
  ADPe?: number;
  ADPf?: number;
  AP?: number;
  CTUe?: number;
  CTUh?: number;
  CTUh_c?: number;
  CTUh_nc?: number;
  Epf?: number;
  Epm?: number;
  Ept?: number;
  GWP?: number;
  GWPb?: number;
  GWPf?: number;
  GWPlu?: number;
  IR?: number;
  LU?: number;
  MIPS?: number;
  ODP?: number;
  PM?: number;
  POCP?: number;
  TPE?: number;
  WU?: number;
};

export declare type IF = keyof ImpactFactors;

declare module "gpu";
