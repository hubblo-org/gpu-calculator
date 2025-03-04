<script lang="ts">
  import InventoryForm from "$lib/components/InventoryForm.svelte";
  import BuildingForm from "$lib/components/BuildingForm.svelte";
  import type { DataCenterInventoryElement } from "$lib/types/pcr-cloud";
  import { addInventoryElement, removeRow } from "$lib/inventory";
  import InventoryTable from "$lib/components/InventoryTable.svelte";
  let inventory: DataCenterInventoryElement[] = $state([]);

</script>

{#snippet removeRowButton(inventoryElementName: string)}
  <button
    onclick={() => removeRow(inventory, inventoryElementName)}
    aria-label="Remove inventory element">x</button
  >
{/snippet}

<h1>PCR for Cloud provider services</h1>
<p>
  Fill these forms to calculate the environmental costs of the cloud service according to the
  selected functional unit
</p>

<div id="calculator">
  <div id="inventory-form">
    <InventoryForm />
    <button onclick={() => addInventoryElement(inventory)}>Add inventory element</button>
  </div>
  <div id="building-form">
    <BuildingForm />
  </div>
  <div id="inventory-table">
    <InventoryTable inventoryElements={inventory} {removeRowButton} />
  </div>
</div>

<style>
  #calculator {
    display: flex;
  }
  #calculator > * {
    margin-right: 10px;
  }
  #inventory-form {
    border: 2px black solid;
    margin-bottom: 20px;
  }
</style>
