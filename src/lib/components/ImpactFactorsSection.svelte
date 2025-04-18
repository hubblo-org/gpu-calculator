<script lang="ts">
  import type {
    ImpactFactors,
    Node,
    Leaf,
    FunctionalUnitResultsRowWithLifeCycle
  } from "$lib/types/pcr-cloud";
  import { renderStackedBarPlot } from "$lib/plots";
  import {
    ImpactCriterias,
    getImpactCriteria,
    getAllImpactCriterias,
    LifeCycleSteps,
    InventoryCategories
  } from "$lib/types/enums";
  import { sortByLifeCycle } from "$lib/inventory";
  import { downloadToCSV } from "$lib/utils";
  import DropdownButton from "./DropdownButton.svelte";
  import { renderTreemap } from "$lib/treemap";

  interface Results {
    per_lifecycle: Result[];
    steps: string[];
  }
  interface Result {
    impact_criteria: string;
    lc_step: string | undefined;
    share: number;
  }
  interface Props {
    source: string;
    results?: Results;
    resultsTreemap?: FunctionalUnitResultsRowWithLifeCycle[];
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
  const inventoryCategories = Object.values(InventoryCategories);
  const allImpactCriteria = getAllImpactCriterias();
  const mainImpactCriteria = getAllImpactCriterias().filter(
    (impactCriteria) =>
      impactCriteria.acronym === "GWP" ||
      impactCriteria.acronym === "TPE" ||
      impactCriteria.acronym === "WU"
  );

  const { source, results, resultsTreemap }: Props = $props();

  let selectedCriteria = $state(selectableCriteria.main);
  let selectedImpactCriterion = $state(
    getImpactCriteria(ImpactCriterias.GlobalWarmingPotential).acronym
  );
  let selectedGraph = $state(graphs.barPlot);
  let absoluteValuesButtonText = $state(absoluteValuesTexts.display);

  const resultsGroupedByImpactCriterion = $derived.by(() => {
    const groupedResults = allImpactCriteria.map((impactCriteria) => {
      const group = results?.per_lifecycle.filter(
        (result) => result.impact_criteria === impactCriteria.acronym
      );
      if (group) {
        const sortedGroup = sortByLifeCycle<Result>(group, "lc_step" as keyof Result);
        return sortedGroup;
      }
    });
    return groupedResults;
  });

  const resultsWithMainCriteria: Result[] = $derived.by(() => {
    const filtered = results?.per_lifecycle.filter(
      (result) =>
        result.impact_criteria === "GWP" ||
        result.impact_criteria === "TPE" ||
        result.impact_criteria === "WU"
    );
    return filtered;
  });

  const displayedResults: Result[] | Results = $derived.by(() => {
    if (selectedCriteria === selectableCriteria.main) {
      return resultsWithMainCriteria!;
    } else if (selectedCriteria === selectableCriteria.all) {
      return results?.per_lifecycle;
    }
  });

  const displayedCriteria = $derived.by(() => {
    if (selectedCriteria === selectableCriteria.main) {
      return mainImpactCriteria!;
    } else if (selectedCriteria === selectableCriteria.all) {
      return allImpactCriteria;
    }
  });

  const resultsForTreemap: Node = $derived.by(() => {
    const selectedCriterionAcronym = selectedImpactCriterion as keyof ImpactFactors;
    return {
      name: "dc_data",
      children: lifeCycleSteps.map((lifeCycle) => {
        const resultsByLifeCycle = resultsTreemap?.filter(
          (result) => result.life_cycle_step === lifeCycle.toLowerCase()
        );
        const resultsImpacts = resultsByLifeCycle?.map((result) => {
          const leaf: Leaf = {
            name: result.name!,
            value: result.impacts[selectedCriterionAcronym].value
          };
          return leaf;
        });
        return {
          name: lifeCycle,
          children: resultsImpacts?.filter(
            (impactFactors) => impactFactors.name != "all_categories"
          )
        };
      })
    };
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
    if (results) {
      if (selectedGraph === graphs.barPlot) {
        renderStackedBarPlot(
          source,
          1000,
          600,
          displayedResults,
          results?.steps,
          "impact_criteria",
          "share",
          "lc_step"
        );
      }
    }
    if (resultsTreemap) {
      if (selectedGraph === graphs.treemap) {
        renderTreemap(source, resultsForTreemap, 1000, 600);
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
      <select bind:value={selectedImpactCriterion} aria-label="Select an impact criterion"
        >{#each allImpactCriteria as impactCriterion}<option>{impactCriterion.acronym}</option
          >{/each}</select
      >
    {/if}
    {#if selectedGraph === graphs.barPlot}
      <select bind:value={selectedCriteria} aria-label="Select displayed criteria"
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
                >{/each}</tr
            ></thead
          >
          <tbody>
            {#each displayedCriteria! as impactCriterion}<tr
                ><th scope="row">{impactCriterion.acronym}</th>
                {#each resultsGroupedByImpactCriterion as results}{#each results as result}{#if result.impact_criteria === impactCriterion.acronym}<td
                        >{result.share}</td
                      >{/if}{/each}{/each}
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
            >{#each inventoryCategories as category}<tr><th scope="row">{category}</th></tr
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
