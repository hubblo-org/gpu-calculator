import type {
  GraphicsCard,
  GraphicsCardComponents,
  GraphicsCardImpactFactors,
  ImpactFactors,
  ImpactFactorsKeys
} from "$lib/types/gpu";
export function computeAverageModel(
  graphicsCards: GraphicsCard[],
  impactFactors: GraphicsCardImpactFactors[]
): GraphicsCardImpactFactors {
  const computableProperties = Object.keys(impactFactors[0].components.casing).filter(
    (property) => property != "graphics_card" && property != "component"
  );

  let averageModel = <GraphicsCardImpactFactors>{};
  averageModel.graphics_card = "average";

  const intermediateValues: GraphicsCardComponents[] = impactFactors.map((componentFactors) => {
    const card = graphicsCards.filter((card) => card.name == componentFactors.graphics_card)[0];
    const casing: ImpactFactors = componentFactors.components.casing;
    const heatsink: ImpactFactors = componentFactors.components.heatsink;
    const pwb = componentFactors.components.printed_wiring_board;
    const gpu = componentFactors.components.graphics_processing_unit;
    const vram = componentFactors.components.video_ram;
    const transport = componentFactors.components.upstream_transport;
    const eol = componentFactors.components.end_of_life;

    computableProperties.forEach((property) => {
      casing[property] =
        typeof casing[property] === "number" && casing[property] != 0
          ? casing[property] / (card.casingWeight * 0.001)
          : 0;
      heatsink[property] =
        typeof heatsink[property] === "number" && heatsink[property] != 0
          ? heatsink[property] / card.heatsinkWeight
          : 0;
      pwb[property] =
        typeof pwb[property] === "number" && pwb[property] != 0
          ? pwb[property] / card.cardSurface
          : 0;
      gpu[property] =
        typeof gpu[property] === "number" && gpu[property] != 0
          ? gpu[property] / card.gpuSurface
          : 0;
      vram[property] =
        card.videoRamDieSurface && typeof vram[property] && (vram[property] != 0) === "number"
          ? vram[property] / card.videoRamDieSurface
          : 0;
      transport[property] =
        typeof transport[property] === "number" && transport[property] != 0
          ? transport[property] / card.totalWeight
          : 0;
      eol[property] =
        typeof eol[property] === "number" && eol[property] != 0
          ? eol[property] / card.totalWeight
          : 0;
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

  const cardsCasingValues = intermediateValues.map((component) => component.casing);
  computableProperties.forEach((property) => {
    const values = cardsCasingValues.map((card) => card[property]).filter((value) => value != 0);
    const divisionOperand = values.length;

    const sum = values.reduce((total, current) => {
      return total + current;
    }, 0);
    const average = sum != 0 ? sum / divisionOperand : 0;
    console.log(`${property} : ${average}`);
  });
  return;
}
