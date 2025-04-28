<script lang="ts">
  import type {
    ImpactCriteria,
    ImpactFactorShare,
    Leaf,
    Node,
    SectionText
  } from "$lib/types/pcr-cloud";
  import { Graph, InventoryCategories, LifeCycleSteps } from "$lib/types/enums";
  import { downloadToCSV } from "$lib/utils";

  interface Props {
    displayedCriteria: ImpactCriteria[];
    impactCriterionValues: ImpactCriteria;
    source: string;
    selectedGraph: string;
    sectionTexts: SectionText;
    groupedImpacts?: ImpactFactorShare[][];
    treemapImpacts?: Node;
  }

  const {
    displayedCriteria,
    groupedImpacts,
    impactCriterionValues,
    source,
    selectedGraph,
    sectionTexts,
    treemapImpacts
  }: Props = $props();

  const lifeCycleSteps = Object.values(LifeCycleSteps);
  const inventoryCategories = Object.values(InventoryCategories).filter(
    (category) => category != "Energy backup"
  );
  const tableId = `${source}-table`;
</script>

<div class="absolute-values-table" id={tableId}>
  {#if selectedGraph === Graph.BarPlot}
    <table>
      <caption>{sectionTexts!.tableCaption}</caption><thead
        ><tr
          ><th>Impact criterion</th>{#each lifeCycleSteps as lifeCycleStep}<th>{lifeCycleStep}</th
            >{/each}<th>Unit</th></tr
        ></thead
      >
      <tbody>
        {#each displayedCriteria! as impactCriterion}<tr
            ><th scope="row">{impactCriterion.acronym}</th>
            {#each groupedImpacts! as impacts}{#each impacts as impact}{#if impact.impactCriterion === impactCriterion.acronym}<td
                    >{(impact as ImpactFactorShare).share}</td
                  >{/if}{/each}{/each}<td>{impactCriterion.unit}</td>
          </tr>{/each}
      </tbody>
    </table>
  {/if}
  {#if selectedGraph === Graph.Treemap}
    <table>
      <caption>{sectionTexts!.tableCaption}</caption><thead
        ><tr
          ><th>Inventory category</th>{#each lifeCycleSteps as lifeCycleStep}<th>{lifeCycleStep}</th
            >{/each}<th>Unit</th></tr
        ></thead
      >
      <tbody
        >{#each inventoryCategories as category}<tr
            ><th scope="row">{category}</th
            >{#each treemapImpacts!.children as Array<Node> as impacts}{#each impacts.children as Array<Leaf> as impact}{#if (impact as Leaf).category === category.toLowerCase()}<td
                    >{impact.value}</td
                  >{/if}{/each}
            {/each}<td>{impactCriterionValues.unit}</td></tr
          >{/each}</tbody
      >
    </table>
  {/if}
  <button
    class="btn-download"
    aria-label="Download data in CSV format"
    onclick={() => downloadToCSV(tableId)}>csv</button
  >
</div>
