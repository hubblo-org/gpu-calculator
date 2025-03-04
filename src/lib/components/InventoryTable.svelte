<script lang="ts">
  import type { DataCenterInventoryElement } from "$lib/types/pcr-cloud";
  import type { Snippet } from "svelte";
  interface Props {
    inventoryElements: DataCenterInventoryElement[];
    removeRowButton: Snippet<[string]>;
  }
  const { inventoryElements, removeRowButton }: Props = $props();

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
          >{@render removeRowButton?.(inventoryElement.name)}</td
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
