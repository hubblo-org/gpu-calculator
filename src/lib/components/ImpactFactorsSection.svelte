<script lang="ts">
  import type {
    ImpactFactorShare,
    OrderedImpactFactors,
    FunctionalUnitResultsRowWithLifeCycle,
    Node,
    Leaf,
    IF
  } from "$lib/types/pcr-cloud";
  import { renderStackedBarPlot } from "$lib/plots";
  import {
    ImpactCriterias,
    getImpactCriteria,
    getAllImpactCriterias,
    LifeCycleSteps,
    InventoryCategories
  } from "$lib/types/enums";
  import { groupByImpactCriterion, formatForTreemap } from "$lib/inventory";
  import { downloadToCSV } from "$lib/utils";
  import DropdownButton from "./DropdownButton.svelte";
  import { renderTreemap } from "$lib/treemap";

  interface Props {
    source: string;
    impactFactors: FunctionalUnitResultsRowWithLifeCycle[];
    impactFactorsShares: OrderedImpactFactors;
  }

  const absoluteValuesTexts = {
    display: "Display absolute values",
    hide: "Hide absolute values"
  };

  const graphs = {
    barPlot: "Bar plot",
    treemap: "Treemap"
  };

  const selectableCriteria = { main: "Main criteria", all: "All criteria" };

  const lifeCycleSteps = Object.values(LifeCycleSteps);
  const inventoryCategories = Object.values(InventoryCategories).filter(
    (category) => category != "Energy backup"
  );
  const allImpactCriteria = getAllImpactCriterias();
  const mainImpactCriteria = getAllImpactCriterias().filter(
    (impactCriterion) =>
      impactCriterion.acronym === "GWP" ||
      impactCriterion.acronym === "TPE" ||
      impactCriterion.acronym === "WU"
  );

  const { source, impactFactors, impactFactorsShares }: Props = $props();

  let selectedCriterion = $state(selectableCriteria.main);
  let selectedImpactCriterion = $state(getImpactCriteria(ImpactCriterias.GlobalWarmingPotential));
  let selectedGraph = $state(graphs.barPlot);
  let absoluteValuesButtonText = $state(absoluteValuesTexts.display);

  const impactsGroupedByImpactCriterion = $derived(
    groupByImpactCriterion(allImpactCriteria, impactFactorsShares)
  );

  const impactsForTreemap = $derived(
    formatForTreemap(selectedImpactCriterion.acronym as IF, impactFactors)
  );

  const impactsWithMainCriteria: ImpactFactorShare[] = $derived.by(() => {
    const filtered = impactFactorsShares.perLifeCycle.filter(
      (result) =>
        result.impactCriterion === "GWP" ||
        result.impactCriterion === "TPE" ||
        result.impactCriterion === "WU"
    );
    return filtered;
  });

  const displayedImpacts = $derived.by(() => {
    if (selectedCriterion === selectableCriteria.main) {
      return impactsWithMainCriteria;
    } else if (selectedCriterion === selectableCriteria.all) {
      return impactFactorsShares.perLifeCycle;
    }
  });

  const displayedCriteria = $derived.by(() => {
    if (selectedCriterion === selectableCriteria.main) {
      return mainImpactCriteria!;
    } else if (selectedCriterion === selectableCriteria.all) {
      return allImpactCriteria;
    }
  });

  function setSectionTexts() {
    if (source === "data-center") {
      if (selectedGraph === graphs.barPlot) {
        return {
          heading_id: "data-center-table-heading",
          section_label: "Data center impact factors",
          table_caption: "Data center impact factors absolute values, per impact criterion"
        };
      } else if (selectedGraph === graphs.treemap) {
        return {
          heading_id: "data-center-table-heading",
          section_label: "Data center impact factors",
          table_caption: "Data center impact factors absolute values, per inventory category"
        };
      }
    } else if (source === "functional-unit") {
      return {
        heading_id: "functional-unit-table-heading",
        section_label: "Functional unit results",
        table_caption: "Totals for the functional unit per impact criterion, as absolute values"
      };
    }
  }

  function switchGraphDisplay() {
    if (selectedGraph === graphs.barPlot) {
      selectedGraph = graphs.treemap;
    } else if (selectedGraph === graphs.treemap) {
      selectedGraph = graphs.barPlot;
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
      if (selectedGraph === graphs.barPlot) {
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
      if (selectedGraph === graphs.treemap) {
        renderTreemap(source, impactsForTreemap, 1000, 600);
      }
    }
  });
</script>

<section aria-labelledby={sectionTexts!.heading_id}>
  <header>
    <h3 id={sectionTexts!.heading_id}>{sectionTexts!.section_label}</h3>
    <a href="#table-of-contents" aria-label="Scroll back to table of contents">▲</a>
  </header>

  <div class="options">
    {#if selectedGraph === graphs.treemap}
      <select bind:value={selectedImpactCriterion.acronym} aria-label="Select an impact criterion"
        >{#each allImpactCriteria as impactCriterion}<option>{impactCriterion.acronym}</option
          >{/each}</select
      >
    {/if}
    {#if selectedGraph === graphs.barPlot}
      <select bind:value={selectedCriterion} aria-label="Select displayed criterion"
        ><option>{selectableCriteria.main}</option><option>{selectableCriteria.all}</option></select
      >
    {/if}
    <button class="btn btn-sm btn-primary" onclick={switchGraphDisplay}>Switch graph display</button
    >
  </div>

  <div class="graph-display">
    {#if selectedGraph === graphs.barPlot}
      <div id="impact-factors-plot-{source}"></div>
    {/if}
    {#if selectedGraph === graphs.treemap}
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
    {@const tableId = `${source}-table`}
    <div class="absolute-values-table" id={tableId}>
      {#if selectedGraph === graphs.barPlot}
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
                      >{/if}{/each}{/each}<td>{selectedImpactCriterion.unit}</td>
              </tr>{/each}
          </tbody>
        </table>
      {/if}
      {#if selectedGraph === graphs.treemap}
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
                {/each}<td>{selectedImpactCriterion.unit}</td></tr
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
    <DropdownButton
      direction="up"
      label={absoluteValuesButtonText}
      visibilityFunction={switchAbsoluteValuesDisplay}
    />
  {/if}
</section>
