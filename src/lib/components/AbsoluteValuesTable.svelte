<script lang="ts">
  import type { ImpactCriteria, TidyImpactFactor } from "$lib/types/gpu";
  import { Components } from "$lib/types/enums";
  import { downloadToCSV, isNotMipsOrDeee } from "$lib/utils";

  interface Props {
    /* impactCriterionValues: ImpactCriteria;
    source: string;
    selectedGraph: string; */
    impacts: TidyImpactFactor[];
  }

  const { impacts }: Props = $props();

  const components = Object.values(Components);
  const tableId = `absolute-values-table`;
  const manufacturingImpacts = impacts
    .filter((impact) => impact.lifeCycleStep === "manufacturing")
    .filter(isNotMipsOrDeee);

  const criteria = [...new Set(manufacturingImpacts.map((impact) => impact.impactCriterion))];
</script>

<div class="absolute-values-table" id={tableId}>
  <table>
    <caption>Impact factors as absolute values</caption><thead
      ><tr
        ><th>Component</th>{#each criteria as impactCriterion}<th>{impactCriterion}</th>{/each}</tr
      ></thead
    >
    <tbody>
      {#each components as component}<tr
          ><th scope="row">{component}</th>

          {#each manufacturingImpacts as impact}{#each criteria as impactCriterion}{#if impact.component === component && impact.impactCriterion === impactCriterion}<td
                  >{(impact as TidyImpactFactor).value}</td
                >{/if}{/each}{/each}
        </tr>{/each}
    </tbody>
  </table>
  <button
    class="btn-download"
    aria-label="Download data in CSV format"
    onclick={() => downloadToCSV(tableId)}>csv</button
  >
</div>

<style>
  #absolute-values-table {
    width: 800px;
  }
  #absolute-values-table table {
    display: flow;
    overflow-x: auto;
  }
</style>
