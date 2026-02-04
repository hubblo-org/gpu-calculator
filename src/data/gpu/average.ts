import { computeAverageModel } from "../../lib/gpu/calculations.ts";
import { writeFile } from "node:fs";
import GpusImpactFactors from "../../data/gpu/gpus_impact_factors.json" with { type: "json" };
import Gpus from "../../data/gpu/gpus.json" with { type: "json" };

const impactFactors = GpusImpactFactors.slice().filter(
  (card) => card.graphics_card != "NVIDIA H100 PCIe 80GB"
);
const graphicsCards = Gpus.slice().filter((card) => card.name != "NVIDIA H100 PCIe 80GB");
const averageModel = JSON.stringify(computeAverageModel(graphicsCards, impactFactors));

const averageModelFileName = "average_model.json";

writeFile(averageModelFileName, averageModel, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Saved average GPU model to file.");
  }
});
