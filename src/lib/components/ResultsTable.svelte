<script lang="ts">
  import { ImpactCriterias } from "$lib/types/enums";
  import type { FunctionalUnitResultsRow } from "$lib/types/pcr-cloud";

  interface Props {
    results: FunctionalUnitResultsRow[];
  }
  const { results }: Props = $props();
  const impactCriterias = Object.values(ImpactCriterias);
</script>

<table>
  <caption>Functional unit results</caption><thead
    ><tr
      ><th scope="col">Amount</th>
      <th scope="col">Unit</th>
      <th scope="col">Scope</th>
      {#each impactCriterias as impactCriteria}<th scope="col">{impactCriteria}</th>{/each}
    </tr></thead
  ><tbody
    >{#each results as row}<tr
        ><td>{row.scope}</td><td>{row.amount}</td><td>{row.unit}</td
        >{#each Object.values(row.impacts) as impact}<td>{impact}</td>{/each}</tr
      >{/each}</tbody
  >
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
