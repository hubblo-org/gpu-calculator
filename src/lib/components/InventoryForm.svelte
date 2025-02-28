<script lang="ts">
  import { InventoryCategories, getInventoryCategorySpelling } from "$lib/types/enums";
  const inventoryCategoryValues = Object.values(InventoryCategories);
  const inventoryCategoriesSpellings = inventoryCategoryValues
    .filter((inventoryCat) => !isNaN(Number(inventoryCat)))
    .map((inventoryCat) => {
      const spelling = getInventoryCategorySpelling(inventoryCat as InventoryCategories);
      return spelling;
    });
</script>

<form aria-label="Inventory element form" id="inventory-element-form">
  <div class="row-input">
    <label for="inventory-element-name">Name of inventory element</label>
    <input type="text" id="inventory-element-name" required />
  </div>
  <div class="row-input">
    <label for="inventory-element-category">Category of inventory element</label>
    <select id="inventory-element-category" required>
      <option value="">Select an inventory element category</option>
      {#each inventoryCategoriesSpellings as inventoryCategory}
        <option value={inventoryCategory.lowercase}>{inventoryCategory.uppercase}</option>
      {/each}
    </select>
  </div>
  <div class="row-input">
    <label for="inventory-element-quantity">Quantity of inventory element</label>
    <input type="number" id="inventory-element-quantity" required />
  </div>
  <div class="row-input">
    <label for="inventory-element-lifespan">Lifespan of inventory element</label>
    <input type="number" id="inventory-element-lifespan" required />
  </div>
</form>

<style>
  form {
    border: 2px black solid;
  }
</style>
