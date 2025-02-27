<form aria-label="Inventory element form" id="inventory-element-form">
  <div class="row-input">
    <label for="inventory-element-name">Name of inventory element</label>
    <input type="text" id="inventory-element-name" required />
  </div>
  <div class="row-input">
    <label for="inventory-element-category">Category of inventory element</label>
    <select id="inventory-element-category" required>
      <option value="">Select an inventory element category</option>
      <option value="building">Building</option>
      <option value="cooling">Cooling</option>
      <option value="energy">Energy</option>
      <option value="energy_backup">Energy backup</option>
      <option value="maintenance">Maintenance</option>
      <option value="water">Water</option>
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
