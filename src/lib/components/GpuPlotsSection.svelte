<script lang="ts">
  import { LifeCycleSteps, Scopes } from "$lib/types/enums";

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
</script>

<section aria-labelledby="gpu-plots-section">
  <h2 id="gpu-plots-section">Graphics card impact factors</h2>
  <label for="gpu-plots-selection">Display impact factors by:</label>
  <select bind:value={selectedScope} id="gpu-plots-selection" onselect={switchSelectedScope}
    >{#each options as option}<option>{option}</option>{/each}</select
  >

  <div id="impact-factors-plot-criteria"></div>
  {#if selectedScope === Scopes.LifeCycleStep}
    <h2>{selectedLifeCycleStep} impact factors by component</h2>
    <label for="life-cycle-step-selection">Select life cycle step:</label>
    <select bind:value={selectedLifeCycleStep} id="life-cycle-step-selection"
      >{#each lifeCycleSteps as step}<option>{step}</option>{/each}</select
    >
    <div id="impact-factors-plot-perlcstep"></div>
  {/if}
</section>
