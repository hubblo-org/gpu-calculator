<script lang="ts">
  import InventoryForm from "$lib/components/InventoryForm.svelte";
  import BuildingForm from "$lib/components/BuildingForm.svelte";
  import type { DataCenterInventoryElement } from "$lib/types/pcr-cloud";
  import { addInventoryElement } from "$lib/inventory";
  import InventoryTable from "$lib/components/InventoryTable.svelte";
  import type { InventoryCategories } from "$lib/types/enums";
  import { onMount } from "svelte";
  let inventory: DataCenterInventoryElement[] = $state([]);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div id="inventory-form">
  <InventoryForm />
  <button onclick={() => addInventoryElement(inventory)}
    >Add inventory element</button
  >
</div>
<BuildingForm />
<InventoryTable inventoryElements={inventory} />

<style>
  #inventory-form {
    border: 2px black solid;
    margin-bottom: 20px;
  }
</style>
