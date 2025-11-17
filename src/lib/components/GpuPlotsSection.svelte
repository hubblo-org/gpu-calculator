<script lang="ts">
  import { LifeCycleSteps, Scopes } from "$lib/types/enums";
  import { Card } from "$lib/gpu/gpu.svelte";
  import { renderStackedBarPlot } from "$lib/plots";
  import { isNotATransport } from "$lib/utils";

  interface Props {
    card: InstanceType<typeof Card>;
  }

  const { card }: Props = $props();

  const options = Object.values(Scopes).filter((scope) => typeof scope === "string");
  const lifeCycleSteps = Object.values(LifeCycleSteps).filter((step) => typeof step === "string");

  let selectedScope = $state(Scopes.Criteria);
  let selectedLifeCycleStep = $state(LifeCycleSteps.Manufacturing);

  function switchSelectedScope() {
    if (selectedScope === Scopes.LifeCycleStep) {
      selectedScope = Scopes.Criteria;
    } else if (selectedScope === Scopes.Criteria) {
      selectedScope = Scopes.LifeCycleStep;
    }
  }

  $effect(() => {
    const lcSteps = ["manufacturing", "transport", "use", "endOfLife"];

    if (selectedScope === Scopes.Criteria) {
      const source = "criteria";
      renderStackedBarPlot(
        source,
        1000,
        600,
        card.tidyTotals,
        lcSteps,
        "impactCriterion",
        "value",
        "lifeCycleStep"
      );
    } else if (selectedScope === Scopes.LifeCycleStep) {
      const source = "perlcstep";
      const components = Object.keys(card.impactFactors!.components).filter(isNotATransport);
      const filteredImpactFactors = card.tidyImpactFactors?.filter((impact) => {
        const lcStep =
          selectedLifeCycleStep === LifeCycleSteps.EndOfLife
            ? "endoflife"
            : selectedLifeCycleStep.toLowerCase();
        return impact.lifeCycleStep === lcStep;
      });
      renderStackedBarPlot(
        source,
        1000,
        600,
        filteredImpactFactors,
        components,
        "impactCriterion",
        "value",
        "component"
      );
    }
  });
</script>

<section aria-labelledby="gpu-plots-section">
  <h2>{card.parameters!.name}</h2>
  <label for="gpu-plots-selection">Display impact factors by:</label>
  <select bind:value={selectedScope} id="gpu-plots-selection" onselect={switchSelectedScope}
    >{#each options as option}<option>{option}</option>{/each}</select
  >
  {#if selectedScope === Scopes.Criteria}
    <h3 id="gpu-plots-section">Graphics card impact factors</h3>
    <div id="impact-factors-plot-criteria"></div>
  {/if}

  {#if selectedScope === Scopes.LifeCycleStep}
    <h3>{selectedLifeCycleStep} impact factors by component</h3>
    <label for="life-cycle-step-selection">Select life cycle step:</label>
    <select bind:value={selectedLifeCycleStep} id="life-cycle-step-selection"
      >{#each lifeCycleSteps as step}<option>{step}</option>{/each}</select
    >
    <div id="impact-factors-plot-perlcstep"></div>
  {/if}
</section>
