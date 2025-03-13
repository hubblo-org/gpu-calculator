<script lang="ts">
  import * as d3 from "d3";
  import type { FunctionalUnitResultsRow } from "$lib/types/pcr-cloud";
  import * as Plot from "@observablehq/plot";
  import { onMount } from "svelte";

  interface Props {
    results: FunctionalUnitResultsRow[];
  }

  const { results }: Props = $props();

  const dimensions = Object.keys(results[0].impacts);
  const lines = results
    .filter((result) => result.name != "material")
    .map((result) => {
      const newLine = {
        scope: result.scope,
        ADPe: result.impacts.ADPe.value,
        ADPf: result.impacts.ADPf.value,
        AP: result.impacts.AP.value,
        CTUe: result.impacts.CTUe.value,
        CTUh: result.impacts.CTUh.value,
        CTUh_c: result.impacts.CTUh_c.value,
        CTUh_nc: result.impacts.CTUh_nc.value,
        EPF: result.impacts.EPF.value,
        EPM: result.impacts.EPM.value,
        EPT: result.impacts.EPT.value,
        GWP: result.impacts.GWP.value,
        GWPb: result.impacts.GWPb.value,
        GWPf: result.impacts.GWPf.value,
        GWPlu: result.impacts.GWPlu.value,
        IR: result.impacts.IR.value,
        LU: result.impacts.LU.value,
        MIPS: result.impacts.MIPS.value,
        ODP: result.impacts.ODP.value,
        PM: result.impacts.PM.value,
        POCP: result.impacts.POCP.value,
        TPE: result.impacts.TPE.value,
        WU: result.impacts.WU.value
      };

      return newLine;
    });
  $inspect(lines[0]);

  const points = dimensions.flatMap((dimension) =>
    lines
      .filter((line) => line.scope != "{id=dc-01}")
      .map(({ scope, [dimension]: value }, index) => ({ index, dimension, value, scope }))
  );

  const scales = new Map(
    dimensions.map((dimension) => [
      dimension,
      d3.scaleLinear().domain(d3.extent(lines, (d) => d[dimension]))
    ])
  );

  const ticks = dimensions.flatMap((dimension) => {
    return scales
      .get(dimension)
      .ticks(dimension.length)
      .map((value) => ({ dimension, value }));
  });

  function renderParallelLinesPlot(strokeColor: string) {
    let div = document.querySelector("#impact-factors-plot");
    div?.firstChild?.remove();
    if (div) {
      const parallelLinesPlot = Plot.plot({
        width: 1200,
        height: 800,
        marginLeft: 104,
        marginRight: 20,
        y: { axis: null },
        x: { padding: 0.1, domain: dimensions, label: null },
        color: { scheme: "Blues", type: "linear" },
        marks: [
          Plot.ruleX(dimensions),
          Plot.lineY(points, {
            y: ({ dimension, value }) => scales.get(dimension)(value),
            x: "dimension",
            z: "index",
            stroke: "purple",
            strokeWidth: 2,
            strokeOpacity: 0.5
          }),
          Plot.tip(
            points,
            Plot.pointer({
              x: "dimension",
              y: ({ dimension, value }) => scales.get(dimension)(value),
              title: (d) => [`Scope: ${d.scope}`, `Impact criteria: ${d.dimension}`].join("\n\n")
            })
          ),
          Plot.text(ticks, {
            y: ({ dimension, value }) => scales.get(dimension)(value),
            x: "dimension",
            text: "value",
            fill: "black",
            stroke: "white",
            strokeWidth: 10,
            strokeOpacity: 1
          })
        ]
      });
      div.append(parallelLinesPlot);
    }
  }

  let strokeColor = $state("ADPe");
  onMount(() => renderParallelLinesPlot(strokeColor));
</script>

<div id="wrapper">
  <div id="impact-factors-plot"></div>
  <div id="max-values">
    <table>
      <caption>Maximum values for the functional unit</caption>
      <tbody>
        {#each Object.entries(lines[0]) as [column, value]}
          <tr><th scope="row">{column}</th><td>{value}</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  #wrapper {
    display: flex;
  }
  #impact-factors-plot {
    padding-top: 15px;
  }
</style>
