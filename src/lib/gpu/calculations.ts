import type {
  GraphicsCard,
  GraphicsCardComponents,
  GraphicsCardImpactFactors,
  ImpactFactors,
  ImpactFactorsKeys
} from "../../lib/types/gpu";
export function computeAverageModel(
  graphicsCards: GraphicsCard[],
  impactFactors: GraphicsCardImpactFactors[]
): GraphicsCardImpactFactors {
  const computableProperties = Object.keys(impactFactors[0].components.casing).filter(
    (property) => property != "graphics_card" && property != "component"
  );

  let averageModel = {} as GraphicsCardImpactFactors;
  averageModel.graphics_card = "average";
  averageModel.components = {
    casing: { graphics_card: "average", component: "casing" },
    heatsink: { graphics_card: "average", component: "heatsink" },
    video_ram: { graphics_card: "average", component: "video_ram" },
    printed_wiring_board: {
      graphics_card: "average",
      component: "printed_wiring_board"
    },
    graphics_processing_unit: {
      graphics_card: "average",
      component: "graphics_processing_unit"
    },
    upstream_transport: {
      graphics_card: "average",
      component: "upstream_transport"
    },
    end_of_life: { graphics_card: "average", component: "end_of_life" }
  };

  const intermediateValues: GraphicsCardComponents[] = impactFactors.map((componentFactors) => {
    const card = graphicsCards.filter((card) => card.name == componentFactors.graphics_card)[0];
    const casing: ImpactFactors = componentFactors.components.casing;
    const heatsink = componentFactors.components.heatsink;
    const pwb = componentFactors.components.printed_wiring_board;
    const gpu = componentFactors.components.graphics_processing_unit;
    const vram = componentFactors.components.video_ram;
    const transport = componentFactors.components.upstream_transport;
    const eol = componentFactors.components.end_of_life;

    computableProperties.forEach((property) => {
      let newCasingValue = casing[property as ImpactFactorsKeys] as number;
      let newHeatsinkValue = heatsink[property as ImpactFactorsKeys] as number;
      let newPwbValue = pwb[property as ImpactFactorsKeys] as number;
      let newVramValue = vram[property as ImpactFactorsKeys] as number;
      let newGpuValue = gpu[property as ImpactFactorsKeys] as number;
      let newTransportValue = transport[property as ImpactFactorsKeys] as number;
      let newEolValue = eol[property as ImpactFactorsKeys] as number;

      newCasingValue =
        typeof newCasingValue === "number" && newCasingValue != 0
          ? newCasingValue / (card.casingWeight * 0.001)
          : 0;
      newHeatsinkValue =
        typeof newHeatsinkValue === "number" && newHeatsinkValue != 0
          ? newHeatsinkValue / (card.heatsinkWeight * 0.001)
          : 0;
      newPwbValue =
        typeof newPwbValue === "number" && newPwbValue != 0 ? newPwbValue / card.cardSurface : 0;
      newGpuValue =
        typeof newGpuValue === "number" && newGpuValue != 0 ? newGpuValue / card.gpuSurface : 0;
      newVramValue =
        card.videoRamDieSurface && typeof newVramValue === "number" && newVramValue != 0
          ? newVramValue / card.videoRamDieSurface
          : 0;
      newTransportValue =
        typeof newTransportValue === "number" && newTransportValue != 0
          ? newTransportValue / card.totalWeight
          : 0;
      newEolValue =
        typeof newEolValue === "number" && newEolValue != 0 ? newEolValue / card.totalWeight : 0;

      (casing[property as ImpactFactorsKeys] as number) = newCasingValue;
      (heatsink[property as ImpactFactorsKeys] as number) = newHeatsinkValue;
      (pwb[property as ImpactFactorsKeys] as number) = newPwbValue;
      (gpu[property as ImpactFactorsKeys] as number) = newGpuValue;
      (vram[property as ImpactFactorsKeys] as number) = newVramValue;
      (transport[property as ImpactFactorsKeys] as number) = newTransportValue;
      (eol[property as ImpactFactorsKeys] as number) = newEolValue;
    });

    return {
      name: card.name,
      casing: casing,
      heatsink: heatsink,
      printed_wiring_board: pwb,
      graphics_processing_unit: gpu,
      video_ram: vram,
      upstream_transport: transport,
      end_of_life: eol
    };
  });

  const components = Object.keys(intermediateValues[0]).filter((property) => property != "name");

  const cardsComponentsValues = components.map((component) =>
    intermediateValues.map((card) => card[component as keyof GraphicsCardComponents])
  );
  computableProperties.forEach((property) => {
    cardsComponentsValues.forEach((component) => {
      const componentName = component[0]!.component;
      const filteredValues = component
        .map((card) => card![property as ImpactFactorsKeys])
        .filter((value) => value != 0);
      const divisionOperand = filteredValues.length;
      const sum = filteredValues.reduce((total, current) => {
        return (total as number) + (current as number);
      }, 0);
      const average = sum != 0 ? (sum as number) / divisionOperand : 0;
      (averageModel.components[componentName as keyof GraphicsCardComponents]![
        property as ImpactFactorsKeys
      ] as number) = average;
    });
  });
  return averageModel;
}
