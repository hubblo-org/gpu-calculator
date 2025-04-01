<script lang="ts">
  import { getAllImpactCriterias } from "$lib/types/enums";
  import type { FunctionalUnitResultsRowWithLifeCycle } from "$lib/types/pcr-cloud";
  import { functionalUnitOneResultsWithLc } from "../../mocks/dc-data";

  interface Props {
    source: string;
    results?: FunctionalUnitResultsRowWithLifeCycle[];
  }

  const { source, results = functionalUnitOneResultsWithLc }: Props = $props();
  const mainImpactCriterias = getAllImpactCriterias().filter(
    (impactCriteria) =>
      impactCriteria.acronym === "GWP" ||
      impactCriteria.acronym === "MIPS" ||
      impactCriteria.acronym === "WU"
  );

  interface Result {
    lc_step: string;
    GWP: number;
    MIPS: number;
    WU: number;
  }

  const resultsWithMainCriterias: Result[] = results!.map((result) => {
    const obj: Result = {
      lc_step: result.life_cycle_step,
      GWP: result.impacts.GWP.value,
      MIPS: result.impacts.MIPS.value,
      WU: result.impacts.WU.value
    };
    return obj;
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
</script>

<section aria-labelledby={sectionTexts.heading_id}>
  <div id="section-heading">
    <h2 id={sectionTexts.heading_id}>{sectionTexts.section_label}</h2>
    <button class="btn btn-sm btn-primary" onclick={switchAbsoluteValuesDisplay}
      >{absoluteValuesButtonText}</button
    >
  </div>
  {#if absoluteValues === "display"}
    <table>
      <caption>{sectionTexts.table_caption}</caption><thead
        ><tr
          ><th>Life cycle step</th>{#each mainImpactCriterias as impactCriteria}<th
              >{impactCriteria.acronym}</th
            >{/each}</tr
        ></thead
      >
      <tbody>
        {#each resultsWithMainCriterias as result}<tr
            ><th scope="row">{result.lc_step}</th><td>{result.GWP}</td><td>{result.MIPS}</td><td
              >{result.WU}</td
            ></tr
          >{/each}
      </tbody>
    </table>
  {/if}
  {#if selectedGraph === "treemap"}
    <select aria-label="Select an impact criteria"
      >{#each mainImpactCriterias as impactCriteria}<option>{impactCriteria.acronym}</option
        >{/each}</select
    >
  {/if}

  <button class="btn btn-sm btn-primary" onclick={switchGraphDisplay}>Switch graph display</button>
</section>

<style>
  #section-heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
