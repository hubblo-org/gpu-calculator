import html2canvas from "html2canvas";

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
  const csvFile = new File([csvRaw], { type: "text/csv" });
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
