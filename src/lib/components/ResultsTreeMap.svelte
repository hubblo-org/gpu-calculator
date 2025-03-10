<script lang="ts">
  import type { FunctionalUnitResultsRowWithLifeCycle } from "$lib/types/pcr-cloud";
  import * as d3 from "d3";

  interface Props {
    results: FunctionalUnitResultsRowWithLifeCycle[];
  }

  const { results }: Props = $props();

  const lifeCycleSteps = ["manufacturing", "transport", "use", "end-of-life"];

  const dcData = {
    name: "dc_data",
    life_cycles: lifeCycleSteps.map((lifeCycle) => {
      const resultsByLifeCycle = results.filter((result) => result.life_cycle_step === lifeCycle);
      return resultsByLifeCycle;
    })
  };
  $inspect(dcData);
  /* function renderTreemap(impactFactors: Object[]) {
    let div = document.querySelector("#impactFactorsPlotTreemap");
    div?.firstChild?.remove();
    if (div) {
      const width = 1154;
      const height = 1154;
      const color = d3.scaleOrdinal(
        impactFactors.map((impactFactor) => impactFactor.scope),
        d3.schemeTableau10
      );

      const root = d3.treemap().tile(d3.treemapSquarify).size([width, height]).padding(1).round(true)(d3.hierarchy(impactFactors).sum((impactFactor) => impactFactor. */
</script>
