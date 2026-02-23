<script lang="ts">
  import { Card } from "$lib/gpu/gpu.svelte";
  interface Props {
    card: InstanceType<typeof Card>;
  }
  const { card }: Props = $props();
</script>

<section aria-labelledby="result-list">
  <h2 id="result-list">Results</h2>
  <p>
    The results for a selection of impacts criteria are given for the computed graphics card impacts across its life-cycle (excluding use phase). 
  </p>
  <div id="results">
    <ul aria-labelledby="result-list">
      <li title="adpf">
        <p class="criterion">Depletion of fossil resources</p>
        <p class="absolute-value">{Math.round(card.totalsPerCriteria?.ADPf?)} MJ</p>
      </li>
      <li title="gwp">
        <p class="criterion">Global warming potential</p>
        <p class="absolute-value">{Math.round(card.totalsPerCriteria?.GWP?)} kg CO²eq</p>
      </li>
      <li title="adpe">
        <p class="criterion">Depletion of mineral resources</p>
        <p class="absolute-value">{card.totalsPerCriteria?.ADPe?.toFixed(5)} kg SBeq</p>
      </li>
    </ul>
  </div>
</section>

<style>
  .criterion {
    font-weight: bold;
  }
  #results {
    display: flex;
    flex-direction: row;
  }
  #results ul {
    list-style-type: none;
    width: 100%;
  }
  #results li {
    float: left;
    width: 33%;
  }
</style>
