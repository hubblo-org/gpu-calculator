<script lang="ts">
  import { renderStackedBarPlot } from "$lib/plots";
  import { getAllImpactCriterias } from "$lib/types/enums";

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

  const mainImpactCriterias = getAllImpactCriterias().filter(
    (impactCriteria) =>
      impactCriteria.acronym === "GWP" ||
      impactCriteria.acronym === "MIPS" ||
      impactCriteria.acronym === "WU"
  );

  const resultsWithMainCriterias: Result[] = $derived.by(() => {
    const filteredResults = results?.per_lifecycle.filter(
      (result) =>
        result.impact_criteria === "GWP" ||
        result.impact_criteria === "MIPS" ||
        result.impact_criteria === "WU"
    );
    return filteredResults;
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
    <button class="btn btn-sm btn-primary" onclick={switchAbsoluteValuesDisplay}
      >{absoluteValuesButtonText}</button
    >
  </div>
  {#if absoluteValues === "display"}
    <table>
      <caption>{sectionTexts.table_caption}</caption><thead
        ><tr><th>Life cycle step</th><th>Impact criteria</th><th>Value</th></tr></thead
      >
      <tbody>
        {#each resultsWithMainCriterias as result}<tr
            ><th scope="row">{result.lc_step}</th><td>{result.impact_criteria}</td><td
              >{result.share}</td
            ></tr
          >{/each}
      </tbody>
    </table>
  {/if}
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
</section>

<style>
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
