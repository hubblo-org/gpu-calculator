<script lang="ts">
  import { getAllImpactCriterias, LifeCycleSteps } from "$lib/types/enums";

  interface Props {
    source: string;
  }

  const { source }: Props = $props();
  const mainImpactCriterias = getAllImpactCriterias().filter(
    (impactCriteria) =>
      impactCriteria.acronym === "GWP" ||
      impactCriteria.acronym === "MIPS" ||
      impactCriteria.acronym === "WU"
  );
  const lifeCycleSteps = Object.values(LifeCycleSteps);

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

  const sectionTexts = setSectionTexts();
</script>

<section aria-labelledby={sectionTexts.heading_id}>
  <h2 id={sectionTexts.heading_id}>{sectionTexts.section_label}</h2>
  <button>Switch graph display</button>
  <table>
    <caption>{sectionTexts.table_caption}</caption><thead
      ><tr
        ><th>Life cycle step</th>{#each mainImpactCriterias as impactCriteria}<th
            >{impactCriteria.acronym}</th
          >{/each}</tr
      ></thead
    >
    <tbody>
      {#each lifeCycleSteps as lifeCycleStep}<tr><th scope="row">{lifeCycleStep}</th></tr
        >{/each}</tbody
    >
  </table>
</section>
