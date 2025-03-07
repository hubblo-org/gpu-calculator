<script lang="ts">
  import { functionalUnitOneResults } from "../../mocks/dc-data";
  import ResultsAllImpactFactors from "./ResultsAllImpactFactors.svelte";
  import ResultsPerImpactFactor from "./ResultsPerImpactFactor.svelte";

  const visualizationSelections = [
    { id: 0, selection: "All impact factors per scope" },
    { id: 1, selection: "Per impact factor" }
  ];
  let selectedVisualizationName = $state(visualizationSelections[0].selection);
</script>

{#if selectedVisualizationName === "All impact factors per scope"}
  <ResultsAllImpactFactors results={functionalUnitOneResults} />
{/if}
{#if selectedVisualizationName === "Per impact factor"}
  <ResultsPerImpactFactor results={functionalUnitOneResults} />
{/if}
<select bind:value={selectedVisualizationName}
  >{#each visualizationSelections as visualizationSelection}<option
      value={visualizationSelection.selection}>{visualizationSelection.selection}</option
    >{/each}</select
>
