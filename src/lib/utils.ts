import html2canvas from "html2canvas";
import type { TidyImpactFactor } from "./types/gpu";
import { ImpactCriterionAcronym } from "./types/enums";

export function convertTableToCSV(table: HTMLTableElement) {
  const rows = Array.from(table.getElementsByTagName("tr"));
  const csv = rows
    .map((row) =>
      Array.from(row.children)
        .map((element) => element.textContent)
        .join(",")
    )
    .join("\n");
  return csv;
}

export function downloadToCSV(nodeId: string) {
  const table = document.getElementById(nodeId)?.getElementsByTagName("table")[0];
  const csvRaw = convertTableToCSV(table!);
  const csvFile = new File([csvRaw], "text/csv");
  const temporaryLink = document.createElement("a");
  const url = window.URL.createObjectURL(csvFile);

  temporaryLink.download = `${nodeId}.csv`;
  temporaryLink.href = url;
  temporaryLink.style.display = "none";
  document.body.appendChild(temporaryLink);
  temporaryLink.click();
  document.body.removeChild(temporaryLink);
  window.URL.revokeObjectURL(url);
}

export async function downloadToPNG(nodeId: string) {
  const graph = document.getElementById(nodeId);
  const canvas = await html2canvas(graph!);

  const temporaryLink = document.createElement("a");
  const url = canvas.toDataURL("image/png");

  temporaryLink.download = `${nodeId}.png`;
  temporaryLink.href = url;
  temporaryLink.style.display = "none";
  document.body.appendChild(temporaryLink);
  temporaryLink.click();
  document.body.removeChild(temporaryLink);
  window.URL.revokeObjectURL(url);
}

export function isNotATransport(value: string) {
  if (value === "transport_boat" || value === "transport_truck" || value === "transport_plane") {
    return false;
  }
  return true;
}

export function isNotExcludedCriterion(value: string) {
  if (
    value === "GWPb" ||
    value === "GWPf" ||
    value === "GWPlu" ||
    value === "LU" ||
    value === "MIPS" ||
    value === "DEEE" ||
    value === "TPE"
  ) {
    return false;
  }
  return true;
}

export function isNotMipsOrDeee(value: TidyImpactFactor) {
  if (value.impactCriterion === ImpactCriterionAcronym.MIPS || value.impactCriterion === "DEEE") {
    return false;
  } else {
    return true;
  }
}
