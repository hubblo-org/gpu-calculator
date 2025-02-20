```ts
import type {DataCenter} from "./types/pcr.ts";
import {table} from "npm:@observablehq/inputs";

const columns = ["name", "category", "quantity", "lifespan"];
const rows: DataCenter[] = [];

function addRow() {
    const form = document.getElementById("add-row-form");
    form?.addEventListener("submit", (e) => {e.preventDefault()});
    const inventoryElementName = document.getElementById("inventory-element-name") as HTMLInputElement;
    const inventoryElementCategory = document.getElementById("inventory-element-category") as HTMLInputElement;
    const inventoryElementQuantity = document.getElementById("inventory-element-quantity") as HTMLInputElement;
    const inventoryElementLifespan = document.getElementById("inventory-element-lifespan") as HTMLInputElement;

    const row: DataCenter = {
        name: inventoryElementName?.value, 
        category: inventoryElementCategory?.value as InventoryCategories, 
        quantity: parseInt(inventoryElementQuantity?.value), 
        lifespan: parseInt(inventoryElementLifespan?.value)
    };
    rows.push(row);
}

function updateTable() {
    addRow();
    const previousTable = document.getElementsByClassName("pcr-table");
    if (previousTable.length == 1){
    previousTable[0].remove();
    };
    const pcrTable = table(rows, {columns: columns}); 
    pcrTable.classList.add("pcr-table");
    view(pcrTable);
}

const addRowButton = html`<button onClick=${updateTable}> Add row </button>`;

```

<form id="add-row-form">
    <div class="row-input">
    <label for="name">Name of inventory element</label>
    <input type="text" name="name" id="inventory-element-name" />
    </div>
    <div class="row-input">
    <label for="category">Category of inventory element</label>
    <select name="categories" id="inventory-element-category">
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
    <label for="quantity">Quantity of inventory element</label>
    <input type="text" name="quantity" id="inventory-element-quantity" />
    </div>
    <div class="row-input">
    <label for="lifespan">Lifespan of inventory element</label>
    <input type="text" name="lifespan" id="inventory-element-lifespan" />
    </div>
    ${addRowButton}
</form>

<style>
.row-input {
    display: flex;
    justify-content: space-evenly;
}
.row-input input, select {
    appearance: none;
    width: 140px;

}
#add-row-form {
    display: flex;
    flex-direction: column;
}
</style>
