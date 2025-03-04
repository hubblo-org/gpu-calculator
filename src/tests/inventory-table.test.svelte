<script lang="ts">
  import InventoryTable from "$lib/components/InventoryTable.svelte";
  import type { DataCenterInventoryElement } from "$lib/types/pcr-cloud";
  import { InventoryCategories, getInventoryCategorySpelling } from "$lib/types/enums";
  import { removeRow } from "$lib/inventory";

  const coolingCategory = getInventoryCategorySpelling(InventoryCategories.Cooling).lowercase;
  const energyBackupCategory = getInventoryCategorySpelling(
    InventoryCategories.EnergyBackup
  ).lowercase;
  const inventoryElements: DataCenterInventoryElement[] = $state([
    { name: "Drycoolers", category: coolingCategory, quantity: 50, lifespan: 35 },
    {
      name: "Backup diesel generator",
      category: energyBackupCategory,
      quantity: 3,
      lifespan: 45
    }
  ]);

  /* function removeRow(inventory: DataCenterInventoryElement[], inventoryName: string) {
    const isElementWithInventoryName = (element: DataCenterInventoryElement) =>
      element.name === inventoryName;
    const rowIndex = inventory.findIndex(isElementWithInventoryName);
    inventory.splice(rowIndex, 1);
  } */
</script>

{#snippet removeRowButton(inventoryElementName: string)}
  <button
    onclick={() => removeRow(inventoryElements, inventoryElementName)}
    aria-label="Remove inventory element">x</button
  >
{/snippet}

<InventoryTable {inventoryElements} {removeRowButton}></InventoryTable>
