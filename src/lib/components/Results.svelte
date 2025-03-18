<script lang="ts">
  import { functionalUnitOneResults, functionalUnitOneResultsWithLc } from "../../mocks/dc-data";
  import ResultsAllImpactFactors from "./ResultsAllImpactFactors.svelte";
  import ResultsPerImpactFactor from "./ResultsPerImpactFactor.svelte";
  import ResultsTreeMap from "./ResultsTreeMap.svelte";
  import ResultsParallelLines from "./ResultsParallelLines.svelte";
  import ResultsPercentages from "./ResultsPercentages.svelte";

  const visualizationSelections = [
    { id: 0, selection: "All impact factors per scope, absolute values" },
    { id: 1, selection: "Per impact factor" },
    { id: 2, selection: "All impact criterias for whole study, percentages" },
    { id: 3, selection: "Treemap" },
    { id: 4, selection: "Parallel lines" }
  ];
  let selectedVisualizationName = $state(visualizationSelections[0].selection);
</script>

{#if selectedVisualizationName === "All impact factors per scope, absolute values"}
  <ResultsAllImpactFactors results={functionalUnitOneResults} />
{/if}
{#if selectedVisualizationName === "Per impact factor"}
  <ResultsPerImpactFactor results={functionalUnitOneResults} />
{/if}
{#if selectedVisualizationName === "All impact criterias for whole study, percentages"}
  <ResultsPercentages results={functionalUnitOneResultsWithLc} />
{/if}
{#if selectedVisualizationName === "Treemap"}
  <ResultsTreeMap results={functionalUnitOneResultsWithLc} />
{/if}
{#if selectedVisualizationName === "Parallel lines"}
  <ResultsParallelLines results={functionalUnitOneResults}/>
{/if}
<select bind:value={selectedVisualizationName}
  >{#each visualizationSelections as visualizationSelection}<option
      value={visualizationSelection.selection}>{visualizationSelection.selection}</option
    >{/each}</select
>
