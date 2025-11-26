<script lang="ts">
  import type { TidyImpactFactor, TidyRatio } from "$lib/types/gpu";
  import { downloadToCSV } from "$lib/utils";
  import { onMount } from "svelte";

  interface Props {
    data: TidyImpactFactor[] | TidyRatio[];
    caption: string;
    columns: string[];
    rows: string[];
    keyColumn: string;
    keyRow?: string;
    firstColumnName?: string;
  }

  const { caption, columns, rows, keyColumn, keyRow, data, firstColumnName }: Props = $props();

  const tableId = "absolute-values-table";
  const firstColumnTitle = keyRow ? keyRow : firstColumnName;

  function isTidyImpact(obj: any): obj is TidyImpactFactor {
    if ("value" in obj) {
      return true;
    } else {
      return false;
    }
  }

  function isTidyRatio(obj: any): obj is TidyRatio {
    if ("ratioPercentage" in obj) {
      return true;
    } else {
      return false;
    }
  }

  function appendCells() {
    if (isTidyImpact(data[0])) {
      rows.forEach((row) => {
        columns.forEach((column, index) => {
          const value = data
            .filter(
              (datum: TidyImpactFactor) => datum[keyColumn] === column && datum[keyRow] === row
            )[0]
            .value.toExponential(2);
          const rowId = `${row}-header`;
          const rowElement: HTMLTableRowElement = document.getElementById(rowId);
          rowElement!.insertCell(index + 1).innerText = value;
        });
      });
    } else if (isTidyRatio(data[0])) {
      rows.forEach((row) => {
        columns.forEach((column, index) => {
          const value = data.filter((datum: TidyRatio) => datum[keyColumn] === column)[0][row];
          const rowId = `${row}-header`;
          const rowElement: HTMLTableRowElement = document.getElementById(rowId);
          if (row === "ratioPercentage") {
            rowElement!.insertCell(index + 1).innerText = value.toFixed(2);
          } else {
            rowElement!.insertCell(index + 1).innerText = value.toExponential(2);
          }
        });
      });
    }
  }

  onMount(() => appendCells());
</script>

<div id={tableId}>
  <table>
    <caption id="table-caption">{caption}</caption><thead>
      <tr
        ><th scope="col">{firstColumnTitle}</th>{#each columns as column}<th scope="col" id="{column}-header"
            >{column}</th
          >{/each}</tr
      ></thead
    >
    <tbody>
      {#each rows as row}<tr id="{row}-header"><th scope="row">{row}</th></tr>{/each}
    </tbody>
  </table>
</div>

<button
  class="btn-download"
  aria-label="Download data in CSV format"
  onclick={() => downloadToCSV(tableId)}>csv</button
>

<style>
  #absolute-values-table {
    width: 1200px;
  }
  #absolute-values-table table {
    display: flow;
    overflow-x: auto;
  }
  button {
    margin-left: auto;
  }
</style>
