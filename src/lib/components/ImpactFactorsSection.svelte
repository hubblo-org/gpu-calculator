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
    LifeCycleSteps
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

  const selectableCriterias = { main: "Main criterias", all: "All criterias" };

  const { source, results, resultsTreemap }: Props = $props();

  let selectedCriterias = $state(selectableCriterias.main);
  let selectedImpactCriteria = $state(
    getImpactCriteria(ImpactCriterias.GlobalWarmingPotential).acronym
  );
  let selectedGraph = $state(graphs.barPlot);
  let absoluteValuesButtonText = $state(absoluteValuesTexts.hide);

  const lifeCycleSteps = Object.values(LifeCycleSteps);
  const mainImpactCriterias = getAllImpactCriterias().filter(
    (impactCriteria) =>
      impactCriteria.acronym === "GWP" ||
      impactCriteria.acronym === "TPE" ||
      impactCriteria.acronym === "WU"
  );

  const resultsWithMainCriterias: Result[] = $derived.by(() => {
    const filteredResults = results?.per_lifecycle.filter(
      (result) =>
        result.impact_criteria === "GWP" ||
        result.impact_criteria === "TPE" ||
        result.impact_criteria === "WU"
    );
    return filteredResults;
  });

  const displayedResults: Result[] | Results = $derived.by(() => {
    if (selectedCriterias === selectableCriterias.main) {
      return resultsWithMainCriterias!;
    } else if (selectedCriterias === selectableCriterias.all) {
      return results?.per_lifecycle;
    }
  });

  const resultsGroupedByImpactCriteria = $derived.by(() => {
    const groupedResults = mainImpactCriterias.map((impactCriteria) => {
      const group = resultsWithMainCriterias?.filter(
        (result) => result.impact_criteria === impactCriteria.acronym
      );
      if (group) {
        const sortedGroup = sortByLifeCycle<Result>(group, "lc_step" as keyof Result);
        return sortedGroup;
      }
    });
    return groupedResults;
  });

  const resultsForTreemap: Node = $derived.by(() => {
    const selectedCriteriaAcronym = selectedImpactCriteria as keyof ImpactFactors;
    return {
      name: "dc_data",
      children: lifeCycleSteps.map((lifeCycle) => {
        const resultsByLifeCycle = resultsTreemap?.filter(
          (result) => result.life_cycle_step === lifeCycle.toLowerCase()
        );
        const resultsImpacts = resultsByLifeCycle?.map((result) => {
          const leaf: Leaf = {
            name: result.name!,
            value: result.impacts[selectedCriteriaAcronym].value
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
      return {
        heading_id: "data-center-table-heading",
        section_label: "Data center impact factors",
        table_caption: "Data center impact factors absolute values, per impact criteria"
      };
    } else if (source === "functional-unit") {
      return {
        heading_id: "functional-unit-table-heading",
        section_label: "Functional unit results",
        table_caption: "Totals for the functional unit per impact criteria, as absolute values"
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

  const sectionTexts = setSectionTexts();
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
      } else if (selectedGraph === graphs.treemap) {
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
      <select bind:value={selectedImpactCriteria} aria-label="Select an impact criteria"
        >{#each mainImpactCriterias as impactCriteria}<option>{impactCriteria.acronym}</option
          >{/each}</select
      >
    {/if}
    {#if selectedGraph === graphs.barPlot}
      <select bind:value={selectedCriterias} aria-label="Select displayed criterias"
        ><option>{selectableCriterias.main}</option><option>{selectableCriterias.all}</option
        ></select
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

  {#if absoluteValuesButtonText === absoluteValuesTexts.hide}
    <DropdownButton
      direction="down"
      label={absoluteValuesButtonText}
      visibilityFunction={switchAbsoluteValuesDisplay}
    />
  {/if}

  {#if absoluteValuesButtonText === absoluteValuesTexts.display}
    {@const tableId = `${source}-table`}
    <div class="absolute-values-table" id={tableId}>
      <table>
        <caption>{sectionTexts!.table_caption}</caption><thead
          ><tr
            ><th>Impact criteria</th>{#each lifeCycleSteps as lifeCycleStep}<th>{lifeCycleStep}</th
              >{/each}</tr
          ></thead
        >
        <tbody>
          {#each mainImpactCriterias as impactCriteria}<tr
              ><th scope="row">{impactCriteria.acronym}</th>
              {#each resultsGroupedByImpactCriteria as results}{#each results as result}{#if result.impact_criteria === impactCriteria.acronym}<td
                      >{result.share}</td
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
    <DropdownButton
      direction="up"
      label={absoluteValuesButtonText}
      visibilityFunction={switchAbsoluteValuesDisplay}
    />
  {/if}
</section>
