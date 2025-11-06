import { computeAverageModel } from "../../lib/gpu/calculations.ts";
import { readFileSync, writeFile } from "node:fs";

const gpusFile = "gpus.json";
const impactFactorsFile = "gpus_impact_factors.json";

const impactFactors = JSON.parse(readFileSync(impactFactorsFile, {encoding: "utf8"}));
const graphicsCards = JSON.parse(readFileSync(gpusFile, {encoding: "utf8"}));

const averageModel = JSON.stringify(computeAverageModel(graphicsCards, impactFactors));

const averageModelFileName = "average_model.json";

writeFile(averageModelFileName, averageModel, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Saved average GPU model to file.");
  }
});
