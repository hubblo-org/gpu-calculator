<script lang="ts">
  import { Card } from "$lib/gpu/gpu.svelte";
  import Gpus from "../../data/gpu/gpus.json";

  interface Props {
    card: InstanceType<typeof Card>;
  }

  const { card }: Props = $props();

  let toComputeWithParametricModel = $state(false);

  function handleCardSelection(event: Event) {
    event.preventDefault();
    if (card.parameters!.name === "Custom") {
      toComputeWithParametricModel = true;
      card.new();
    } else if (card.parameters!.name === "NVIDIA H100 PCIe 80GB") {
      toComputeWithParametricModel = true;
      card.selectDocumentedCard(card.parameters!.name);
    } else {
      toComputeWithParametricModel = false;
      card.selectDocumentedCard(card.parameters!.name);
    }
  }
</script>

<section aria-labelledby="graphics-card-parameters">
  <h2 id="graphics-card-parameters">Graphics card parameters</h2>
  <label for="graphics-card-selection">Select a graphics card:</label>
  <form>
    <select
      onchange={handleCardSelection}
      bind:value={card.parameters!.name}
      id="graphics-card-selection"
    >
      {#each Gpus as gpu}
        <option>{gpu.name}</option>
      {/each}
      <option>Custom</option>
    </select>
    <div class="grid">
      <div class="field">
        <label for="casing-weight">Casing weight (grams)</label>
        <input
          type="number"
          id="casing-weight"
          bind:value={card.parameters!.casingWeight}
          onchange={() => (toComputeWithParametricModel = true)}
        />
        <label for="heatsink-weight">Heatsink weight (grams)</label>
        <input
          type="number"
          id="heatsink-weight"
          bind:value={card.parameters!.heatsinkWeight}
          onchange={() => (toComputeWithParametricModel = true)}
        />
        <label for="graphics-card-surface">Graphics card surface (cm²)</label>
        <input
          type="number"
          id="graphics-card-surface"
          bind:value={card.parameters!.cardSurface}
          onchange={() => (toComputeWithParametricModel = true)}
        />
        <label for="gpu-surface">GPU surface (mm²)</label>
        <input
          type="number"
          id="gpu-surface"
          bind:value={card.parameters!.gpuSurface}
          onchange={() => (toComputeWithParametricModel = true)}
        />
      </div>
      <div class="field">
        <label for="vram-size">Video RAM capacity (GB)</label>
        <input
          type="number"
          id="vram-size"
          bind:value={card.parameters!.videoRamCapacity}
          onchange={() => (toComputeWithParametricModel = true)}
        />
        <label for="vram-dies">Video RAM dies</label>
        <input
          type="number"
          id="vram-dies"
          bind:value={card.parameters!.videoRamDies}
          onchange={() => (toComputeWithParametricModel = true)}
        />
        <label for="vram-die-surface">Video RAM die surface (mm²)</label>
        <input
          type="number"
          id="vram-die-surface"
          bind:value={card.parameters!.videoRamDieSurface}
          onchange={() => (toComputeWithParametricModel = true)}
        />
      </div>
    </div>
  </form>
  <button
    onclick={() => card.updateImpactFactors(card.parameters!.name, toComputeWithParametricModel)}
    id="btn-recalculate"
    class="btn btn-primary btn-sm">Recalculate</button
  >
</section>

<style>
  section {
    overflow-y: hidden;
  }
  .field {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 12px;
    margin-top: 12px;
  }
  @media (width >= 481px) {
    input,
    select {
      height: 50px;
      box-sizing: border-box;
    }
    .field {
      width: 800px;
    }
    .grid {
      display: flex;
      gap: 50px;
    }
    #btn-recalculate {
      margin: 24px 24px 0px 24px;
    }
  }
</style>
