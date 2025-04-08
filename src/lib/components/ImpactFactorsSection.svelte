<script lang="ts">
  import { renderStackedBarPlot } from "$lib/plots";
  import { getAllImpactCriterias, LifeCycleSteps } from "$lib/types/enums";
  import { sortByLifeCycle } from "$lib/inventory";
  import { downloadToCSV } from "$lib/utils";
  import DropdownButton from "./DropdownButton.svelte";

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
  }

  const { source, results }: Props = $props();

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
      }
    }
  });
</script>

<section aria-labelledby={sectionTexts.heading_id}>
  <div id="section-heading">
    <h3 id={sectionTexts.heading_id}>{sectionTexts.section_label}</h3>
    <a href="#table-of-contents" aria-label="Scroll back to table of contents">▲</a>
  </div>
  <div id="graph-display">
    <div id="impact-factors-plot-{source}"></div>

    <div id="criteria-selection">
      <button class="btn btn-sm btn-primary" onclick={switchGraphDisplay}
        >Switch graph display</button
      >

      {#if selectedGraph === "treemap"}
        <select aria-label="Select an impact criteria"
          >{#each mainImpactCriterias as impactCriteria}<option>{impactCriteria.acronym}</option
            >{/each}</select
        >
      {/if}
    </div>
  </div>

  {#if absoluteValues === "hide"}
    <DropdownButton
      direction="down"
      label={absoluteValuesButtonText}
      visibilityFunction={switchAbsoluteValuesDisplay}
    />
  {/if}

  {#if absoluteValues === "display"}
    <div id="absolute-values-table">
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
        onclick={downloadToCSV("absolute-values-table")}>csv</button
      >
    </div>
    <DropdownButton
      direction="up"
      label={absoluteValuesButtonText}
      visibilityFunction={switchAbsoluteValuesDisplay}
    />
  {/if}
</section>

<style>
  #absolute-values-table {
    display: flex;
    align-self: center;
    flex-direction: column;
    width: 100%;
  }

  #absolute-values-table button {
    margin-left: auto;
  }
  #section-heading,
  #graph-display {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  #criteria-selection {
    display: flex;
    gap: 12px;
    flex-direction: column;
    width: 20%;
  }
  #criteria-selection select {
    appearance: auto;
    background-color: var(--color-secondary-30);
  }
</style>
