<script lang="ts">
  import type { DataCenterInventoryElementWithImpactFactors } from "$lib/types/pcr-cloud";
  import { ImpactCriterias } from "$lib/types/enums";

  interface Props {
    inventoryElementsWithImpacts: DataCenterInventoryElementWithImpactFactors[];
  }
  const { inventoryElementsWithImpacts }: Props = $props();

  const impactCriteriasColumns = Object.values(ImpactCriterias);
</script>

<table>
  <caption>Data center elements inventory with impact factors</caption><thead
    ><tr
      ><th scope="col">Name</th><th scope="col">Category</th><th scope="col">Mass</th><th scope="col">Source</th><th
        scope="col">Life-cycle step</th
      >{#each impactCriteriasColumns as column}<th scope="col">{column}</th>{/each}</tr
    ></thead
  ><tbody
    >{#each inventoryElementsWithImpacts as inventoryElement}<tr
        ><th scope="row">{inventoryElement.name}</th
        >{#each Object.values(inventoryElement).filter((value) => value != inventoryElement.name) as inventoryValue}<td
            >{inventoryValue}</td
          >{/each}</tr
      >{/each}</tbody
  >
</table>
