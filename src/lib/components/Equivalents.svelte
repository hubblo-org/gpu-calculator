<script lang="ts">
  import { Card } from "$lib/gpu/gpu.svelte";
  interface Props {
    card: InstanceType<typeof Card>;
  }
  const { card }: Props = $props();
</script>

<section aria-labelledby="equivalent-list">
  <h2 id="equivalent-list">Equivalents</h2>
  <p>
    Equivalents in other products are given for several impact criteria for the computed graphics
    card impacts across its life-cycle.
  </p>
  <div id="equivalence">
    <ul aria-labelledby="equivalent-list">
      <li title="adpf">
        <p class="criterion">Depletion of fossil resources</p>
        <p><span class="symbol">🛢</span> {card.equivalents?.inCrudeOil} liters of crude oil</p>
      </li>
      <li title="gwp">
        <p class="criterion">Global warming potential</p>
        <p>
          <span class="symbol">🚗</span>
          {card.equivalents?.inKilometersByCar} kilometers traveled by car
        </p>
      </li>
      <li title="adpe">
        <p class="criterion">Depletion of mineral resources</p>

        <p><span class="symbol">Cu</span> {card.equivalents?.inCopper} kilograms of copper</p>
      </li>
    </ul>
  </div>
</section>

<style>
  .criterion {
    font-weight: bold;
  }
  .symbol {
    border: 2px solid var(--color-primary-100);
    border-radius: 25%;
    font-size: 1.5rem;
  }
  #equivalence {
    display: flex;
    flex-direction: row;
  }
  #equivalence ul {
    list-style-type: none;
    width: 100%;
  }
  #equivalence li {
    float: left;
    width: 33%;
  }
</style>
