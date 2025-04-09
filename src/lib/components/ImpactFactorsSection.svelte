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

  const { source, results, resultsTreemap }: Props = $props();
  let selectedImpactCriteria = $state(
    getImpactCriteria(ImpactCriterias.GlobalWarmingPotential).acronym
  );

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

  const absoluteValuesTexts = {
    display: "Display absolute values",
    hide: "Hide absolute values"
  };

  let selectedGraph = $state("bar-plot");
  let absoluteValues = $state("hide");
  let absoluteValuesButtonText = $state(absoluteValuesTexts.display);

  function setSectionTexts() {
    if (source === "data-center") {
      return {
        heading_id: "data-center-table-heading",
        section_label: "Data center impact factors",
        table_caption: "Data center impact factors absolute values, per impact criteria"
      };
    } else {
      return {
        heading_id: "functional-unit-table-heading",
        section_label: "Functional unit results",
        table_caption: "Totals for the functional unit per impact criteria, as absolute values"
      };
    }
  }

  function switchGraphDisplay() {
    if (selectedGraph === "bar-plot") {
      selectedGraph = "treemap";
    } else {
      selectedGraph = "bar-plot";
    }
  }

  function switchAbsoluteValuesDisplay() {
    if (absoluteValues === "display") {
      absoluteValues = "hide";
      absoluteValuesButtonText = absoluteValuesTexts.display;
    } else {
      absoluteValues = "display";
      absoluteValuesButtonText = absoluteValuesTexts.hide;
    }
  }

  const sectionTexts = setSectionTexts();
  $effect(() => {
    if (results) {
      if (selectedGraph === "bar-plot") {
        renderStackedBarPlot(
          source,
          1200,
          800,
          resultsWithMainCriterias,
          results?.steps,
          "share",
          "impact_criteria",
          "lc_step"
        );
      } else if (selectedGraph === "treemap") {
        renderTreemap(source, resultsForTreemap, 1300, 600);
      }
    }
  });
</script>

<section aria-labelledby={sectionTexts.heading_id}>
  <header>
    <h3 id={sectionTexts.heading_id}>{sectionTexts.section_label}</h3>
    <a href="#table-of-contents" aria-label="Scroll back to table of contents">▲</a>
  </header>

  <div class="options">
    {#if selectedGraph === "treemap"}
      <select bind:value={selectedImpactCriteria} aria-label="Select an impact criteria"
        >{#each mainImpactCriterias as impactCriteria}<option>{impactCriteria.acronym}</option
          >{/each}</select
      >
    {/if}
    <button class="btn btn-sm btn-primary" onclick={switchGraphDisplay}>Switch graph display</button
    >
  </div>

  <div class="graph-display">
    {#if selectedGraph === "bar-plot"}
      <div id="impact-factors-plot-{source}"></div>
    {/if}
    {#if selectedGraph === "treemap"}
      <div class="treemap-wrapper">
        <div id="{source}-treemap-legend-wrapper">
          <div id="{source}-treemap-legend"></div>
        </div>
        <div id="{source}-treemap"></div>
      </div>
    {/if}
  </div>

  {#if absoluteValues === "hide"}
    <DropdownButton
      direction="down"
      label={absoluteValuesButtonText}
      visibilityFunction={switchAbsoluteValuesDisplay}
    />
  {/if}

  {#if absoluteValues === "display"}
		{@const tableId = `${source}-table`} 
    <div class="absolute-values-table" id="{tableId}">
      <table>
        <caption>{sectionTexts.table_caption}</caption><thead
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
