<script lang="ts">
  import type { DataCenterInventoryElement } from "$lib/types/pcr-cloud";
  interface Props {
    inventoryElements: DataCenterInventoryElement[];
  }
  const { inventoryElements }: Props = $props();
</script>

<table>
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
        ><td>{inventoryElement.lifespan}</td></tr
      ></tbody
    >
  {/each}
</table>
