<script lang="ts">
  import { Scopes } from "$lib/types/enums";
  import { Card } from "$lib/gpu/gpu.svelte";
  import AbsoluteValuesTable from "./AbsoluteValuesTable.svelte";
  import DropdownButton from "./DropdownButton.svelte";

  interface Props {
    card: InstanceType<typeof Card>;
  }

  const { card }: Props = $props();

  const options = Object.values(Scopes).filter((scope) => typeof scope === "string");

  let selectedScope = $state(Scopes.LifeCycleStep);

  const detailsSummary = "Show absolute values table";
  const criteria = $derived([...new Set(card.tidyTotals!.map((total) => total.impactCriterion))]);
  const criteriaPlanetBoundaries = $derived([
    ...new Set(card.tidyRatiosPerPlanetBoundary!.map((ratio) => ratio.impactCriterion))
  ]);
  const lifeCycleSteps = $derived([
    ...new Set(card.tidyTotals!.map((total) => total.lifeCycleStep))
  ]);
  const components = $derived(
    [...new Set(card.tidyImpactFactors!.map((impactFactor) => impactFactor.component))].filter(
      (component) => component!.includes("transport_") === false
    )
  );
  const manufacturingImpactFactors = $derived(
    card.tidyImpactFactors!.filter((impactFactor) => impactFactor.lifeCycleStep === "manufacturing")
  );

  $effect(() => {
    if (selectedScope === Scopes.LifeCycleStep) {
      card.updatePlotPerLifeCycleStep();
    } else if (selectedScope === Scopes.Component) {
      card.updatePlotPerComponent();
    } else if (selectedScope === Scopes.PlanetBoundary) {
      card.updatePlotPerPlanetBoundary();
    }
  });
</script>

<section aria-labelledby="gpu-plots-section">
  <h2>{card.name} ({card.source})</h2>
  <label for="gpu-plots-selection">Display impact factors by:</label>
  <select bind:value={selectedScope} id="gpu-plots-selection"
    >{#each options as option}<option>{option}</option>{/each}</select
  >
  {#if selectedScope === Scopes.LifeCycleStep}
    <h3 id="gpu-plots-section">Graphics card impact factors</h3>
    <div id="impact-factors-plot-criteria"></div>

    <AbsoluteValuesTable
      caption={`${card.name} impact factors per life cycle step, absolute values`}
      columns={criteria}
      rows={lifeCycleSteps}
      keyColumn="impactCriterion"
      keyRow="lifeCycleStep"
      data={card.tidyTotals!}
    />
  {/if}

  {#if selectedScope === Scopes.Component}
    <h3>Manufacturing impact factors by component</h3>
    <div id="impact-factors-plot-perlcstep"></div>

    <AbsoluteValuesTable
      caption={`${card.name} manufacturing impact factors per component, absolute values`}
      columns={criteria}
      rows={components}
      keyColumn="impactCriterion"
      keyRow="component"
      data={manufacturingImpactFactors}
    />
  {/if}

  {#if selectedScope === Scopes.PlanetBoundary}
    <h3 id="gpu-plots-section">Graphics card impact factors related to planet boundaries</h3>
    <div id="impact-factors-plot-planetboundary"></div>

    <AbsoluteValuesTable
      caption={`${card.name} impact factors related to planet boundaries, absolute values`}
      columns={criteriaPlanetBoundaries}
      rows={Object.keys(card.tidyRatiosPerPlanetBoundary![0]).filter(
        (key) => key != "impactCriterion"
      )}
      keyColumn="impactCriterion"
      firstColumnName="Values"
      data={card.tidyRatiosPerPlanetBoundary!}
    />
  {/if}
</section>
