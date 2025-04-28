<script lang="ts">
  import type {
    ImpactFactorShare,
    OrderedImpactFactors,
    ResultWithLifeCycle,
    IF,
    SectionText
  } from "$lib/types/pcr-cloud";
  import { renderStackedBarPlot } from "$lib/plots";
  import {
    ImpactCriterionAcronym,
    getImpactCriterionValues,
    getAllImpactCriteria,
    getImpactCriterion,

    Graph

  } from "$lib/types/enums";
  import { groupByImpactCriterion, formatForTreemap, isMainCriterion } from "$lib/inventory";
  import DropdownButton from "./DropdownButton.svelte";
  import AbsoluteValuesTable from "./AbsoluteValuesTable.svelte";
  import { renderTreemap } from "$lib/treemap";

  interface Props {
    source: string;
    impactFactors: ResultWithLifeCycle[];
    impactFactorsShares: OrderedImpactFactors;
  }

  const absoluteValuesTexts = {
    display: "Display absolute values",
    hide: "Hide absolute values"
  };

  const selectableCriteria = { main: "Main criteria", all: "All criteria" };

  const allImpactCriteria = getAllImpactCriteria();
  const mainImpactCriteria = getAllImpactCriteria().filter((impactCriterion) =>
    isMainCriterion(impactCriterion, "acronym")
  );
  const impactCriteriaAcronyms = Object.values(ImpactCriterionAcronym);

  const { source, impactFactors, impactFactorsShares }: Props = $props();

  let selectedGraph = $state(Graph.BarPlot);
  let absoluteValuesButtonText = $state(absoluteValuesTexts.display);

  // BAR-PLOT
  let selectedCriteria = $state(selectableCriteria.main);
  let impactsGroupedByImpactCriterion = $derived(
    groupByImpactCriterion(impactCriteriaAcronyms, impactFactorsShares)
  );

  // TREEMAP
  let selectedImpactCriterion = $state(ImpactCriterionAcronym.GWP);
  let impactCriterionKey = $derived(getImpactCriterion(selectedImpactCriterion!));
  let selectedImpactCriterionValues = $derived(getImpactCriterionValues(impactCriterionKey!));
  let impactsForTreemap = $derived(formatForTreemap(selectedImpactCriterion as IF, impactFactors));

  const impactsWithMainCriteria: ImpactFactorShare[] = $derived.by(() => {
    const filtered = impactFactorsShares.perLifeCycle.filter((result) =>
      isMainCriterion(result, "impactCriterion")
    );
    return filtered;
  });

  const displayedImpacts = $derived.by(() => {
    if (selectedCriteria === selectableCriteria.main) {
      return impactsWithMainCriteria;
    } else if (selectedCriteria === selectableCriteria.all) {
      return impactFactorsShares.perLifeCycle;
    }
  });

  const displayedCriteria = $derived.by(() => {
    if (selectedCriteria === selectableCriteria.main) {
      return mainImpactCriteria!;
    } else if (selectedCriteria === selectableCriteria.all) {
      return allImpactCriteria;
    }
  });

  function setSectionTexts(): SectionText {
    if (source === "data-center") {
      const sectionTexts = {
        headingId: "data-center-table-heading",
        sectionLabel: "Data center impact factors",
        tableCaption:
          selectedGraph === Graph.BarPlot 
            ? "Data center impact factors per impact criterion, as absolute values"
            : "Data center impact factors per inventory category, as absolute values"
      };
      return sectionTexts;
    } else {
      const sectionTexts = {
        headingId: "functional-unit-table-heading",
        sectionLabel: "Functional unit results",
        tableCaption:
          selectedGraph === Graph.BarPlot 
            ? "Totals for the functional unit per impact criterion, as absolute values"
            : "Totals for the functional unit per inventory category, as absolute values"
      };
      return sectionTexts;
    }
  }

  function switchGraphDisplay() {
    if (selectedGraph === Graph.BarPlot) {
      selectedGraph = Graph.Treemap;
    } else if (selectedGraph === Graph.Treemap) {
      selectedGraph = Graph.BarPlot;
    }
  }

  function switchAbsoluteValuesDisplay() {
    if (absoluteValuesButtonText === absoluteValuesTexts.hide) {
      absoluteValuesButtonText = absoluteValuesTexts.display;
    } else if (absoluteValuesButtonText === absoluteValuesTexts.display) {
      absoluteValuesButtonText = absoluteValuesTexts.hide;
    }
  }

  const sectionTexts = $derived(setSectionTexts());

  $effect(() => {
    if (impactFactorsShares) {
      if (selectedGraph === Graph.BarPlot) {
        renderStackedBarPlot(
          source,
          1000,
          600,
          displayedImpacts!,
          impactFactorsShares?.steps,
          "impactCriterion",
          "share",
          "lifeCycleStep"
        );
      }
    }
    if (impactFactors) {
      if (selectedGraph === Graph.Treemap) {
        renderTreemap(source, impactsForTreemap, 1000, 600);
      }
    }
  });
</script>

<section aria-labelledby={sectionTexts!.headingId}>
  <header>
    <h3 id={sectionTexts!.headingId}>{sectionTexts!.sectionLabel}</h3>
    <a href="#table-of-contents" aria-label="Scroll back to table of contents">▲</a>
  </header>

  <div class="options">
    {#if selectedGraph === Graph.Treemap}
      <select bind:value={selectedImpactCriterion} aria-label="Select an impact criterion"
        >{#each impactCriteriaAcronyms as impactCriterion}<option>{impactCriterion}</option
          >{/each}</select
      >
    {/if}
    {#if selectedGraph === Graph.BarPlot}
      <select bind:value={selectedCriteria} aria-label="Select displayed criterion"
        ><option>{selectableCriteria.main}</option><option>{selectableCriteria.all}</option></select
      >
    {/if}
    <button class="btn btn-sm btn-primary" onclick={switchGraphDisplay}>Switch graph display</button
    >
  </div>

  <div class="graph-display">
    {#if selectedGraph === Graph.BarPlot}
      <div id="impact-factors-plot-{source}"></div>
    {/if}
    {#if selectedGraph === Graph.Treemap}
      <div class="treemap-wrapper">
        <div id="{source}-treemap-legend-wrapper">
          <div id="{source}-treemap-legend"></div>
        </div>
        <div id="{source}-treemap"></div>
      </div>
    {/if}
  </div>

  {#if absoluteValuesButtonText === absoluteValuesTexts.display}
    <DropdownButton
      direction="down"
      label={absoluteValuesButtonText}
      visibilityFunction={switchAbsoluteValuesDisplay}
    />
  {/if}

  {#if absoluteValuesButtonText === absoluteValuesTexts.hide}
    {#if selectedGraph === Graph.BarPlot}
      <AbsoluteValuesTable
        displayedCriteria={displayedCriteria!}
        groupedImpacts={impactsGroupedByImpactCriterion}
        impactCriterionValues={selectedImpactCriterionValues}
        selectedGraph={Graph.BarPlot}
        {sectionTexts}
        {source}
      />
    {/if}
    {#if selectedGraph === Graph.Treemap}
      <AbsoluteValuesTable
        displayedCriteria={displayedCriteria!}
        impactCriterionValues={selectedImpactCriterionValues}
        selectedGraph={Graph.Treemap}
        {sectionTexts}
        {source}
        treemapImpacts={impactsForTreemap}
      />
    {/if}
    <!-- {@const tableId = `${source}-table`}
    <div class="absolute-values-table" id={tableId}>
      {#if selectedGraph === Graph.BarPlot}
        <table>
          <caption>{sectionTexts!.table_caption}</caption><thead
            ><tr
              ><th>Impact criterion</th>{#each lifeCycleSteps as lifeCycleStep}<th
                  >{lifeCycleStep}</th
                >{/each}<th>Unit</th></tr
            ></thead
          >
          <tbody>
            {#each displayedCriteria! as impactCriterion}<tr
                ><th scope="row">{impactCriterion.acronym}</th>
                {#each impactsGroupedByImpactCriterion as impacts}{#each impacts as impact}{#if impact.impactCriterion === impactCriterion.acronym}<td
                        >{(impact as ImpactFactorShare).share}</td
                      >{/if}{/each}{/each}<td>{impactCriterion.unit}</td>
              </tr>{/each}
          </tbody>
        </table>
      {/if}
      {#if selectedGraph === Graph.Treemap}
        <table>
          <caption>{sectionTexts!.table_caption}</caption><thead
            ><tr
              ><th>Inventory category</th>{#each lifeCycleSteps as lifeCycleStep}<th
                  >{lifeCycleStep}</th
                >{/each}<th>Unit</th></tr
            ></thead
          >
          <tbody
            >{#each inventoryCategories as category}<tr
                ><th scope="row">{category}</th
                >{#each impactsForTreemap.children as Array<Node> as impacts}{#each impacts.children as Array<Leaf> as impact}{#if (impact as Leaf).category === category.toLowerCase()}<td
                        >{impact.value}</td
                      >{/if}{/each}
                {/each}<td>{selectedImpactCriterionValues.unit}</td></tr
              >{/each}</tbody
          >
        </table> 
      {/if}
      <button
        class="btn-download"
        aria-label="Download data in CSV format"
        onclick={() => downloadToCSV(tableId)}>csv</button
      >
    </div> -->
    <DropdownButton
      direction="up"
      label={absoluteValuesButtonText}
      visibilityFunction={switchAbsoluteValuesDisplay}
    />
  {/if}
</section>
