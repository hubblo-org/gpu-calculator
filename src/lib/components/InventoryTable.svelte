<script lang="ts">
  import type { DataCenterInventoryElement } from "$lib/types/pcr-cloud";
  interface Props {
    inventoryElements: DataCenterInventoryElement[];
  }
  const { inventoryElements }: Props = $props();
  function removeRow(inventoryName: string) {
    const inventoryTable = document.getElementById("data-center-inventory") as HTMLTableElement;
    const isElementWithInventoryName = (element: DataCenterInventoryElement) =>
      element.name === inventoryName;
    const rowIndex = inventoryElements.findIndex(isElementWithInventoryName);
    if (rowIndex === 0) {
      inventoryTable.deleteRow(rowIndex + 1);
    } else {
      inventoryTable.deleteRow(rowIndex);
    }
  }
</script>

<table id="data-center-inventory">
  <caption>Data center inventory elements</caption>
  <thead
    ><tr
      ><th scope="col">Name</th><th scope="col">Category</th><th scope="col">Quantity</th><th
        scope="col">Lifespan</th
      ></tr
    ></thead
  >
  {#each inventoryElements as inventoryElement}
    <tbody
      ><tr
        ><th scope="row">{inventoryElement.name}</th><td>{inventoryElement.category}</td><td
          >{inventoryElement.quantity}</td
        ><td>{inventoryElement.lifespan}</td><td
          ><button
            onclick={() => removeRow(inventoryElement.name)}
            aria-label="Remove inventory element">x</button
          ></td
        ></tr
      ></tbody
    >
  {/each}
</table>

<style>
  tr,
  th,
  table {
    border: 2px solid black;
  }
  td {
    border: 1px solid black;
  }
</style>
