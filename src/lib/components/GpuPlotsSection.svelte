<script lang="ts">
  import { LifeCycleSteps, Scopes } from "$lib/types/enums";
  import { Card } from "$lib/gpu/gpu.svelte";

  interface Props {
    card: InstanceType<typeof Card>;
  }

  const { card }: Props = $props();

  const options = Object.values(Scopes).filter((scope) => typeof scope === "string");

  const planetBoundaryFormats = ["By number of inhabitants", "By percentage"];

  let selectedScope = $state(Scopes.LifeCycleStep);
  let selectedFormat = $state(planetBoundaryFormats[0]);

  function switchFormat() {
    if (selectedFormat === planetBoundaryFormats[0]) {
      selectedFormat = planetBoundaryFormats[1];
    } else if (selectedFormat === planetBoundaryFormats[1]) {
      selectedFormat = planetBoundaryFormats[0];
    }
  }

  $effect(() => {
    if (selectedScope === Scopes.LifeCycleStep) {
      card.updatePlotPerLifeCycleStep();
    } else if (selectedScope === Scopes.Component) {
      card.updatePlotPerComponent();
    } else if (selectedScope === Scopes.PlanetBoundary) {
      card.updatePlotPerPlanetBoundary(selectedFormat);
    }
  });
</script>

<section aria-labelledby="gpu-plots-section">
  <h2>{card.parameters!.name}</h2>
  <label for="gpu-plots-selection">Display impact factors by:</label>
  <select bind:value={selectedScope} id="gpu-plots-selection" 
    >{#each options as option}<option>{option}</option>{/each}</select
  >
  {#if selectedScope === Scopes.LifeCycleStep}
    <h3 id="gpu-plots-section">Graphics card impact factors</h3>
    <div id="impact-factors-plot-criteria"></div>
  {/if}

  {#if selectedScope === Scopes.Component}
    <h3>Manufacturing impact factors by component</h3>
    <div id="impact-factors-plot-perlcstep"></div>
  {/if}

  {#if selectedScope === Scopes.PlanetBoundary}
    <h3 id="gpu-plots-section">Graphics card impact factors related to planet boundaries</h3>

    <select bind:value={selectedFormat} id="planet-boundary-selection" onselect={switchFormat}
      >{#each planetBoundaryFormats as format}<option>{format}</option>{/each}</select
    >
    <div id="impact-factors-plot-planetboundary"></div>
  {/if}
</section>
