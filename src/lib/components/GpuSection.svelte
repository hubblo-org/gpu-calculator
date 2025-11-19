<script lang="ts">
  import { Card } from "$lib/gpu/gpu.svelte";
  import Gpus from "../../data/gpu/gpus.json";

  interface Props {
    card: InstanceType<typeof Card>;
  }

  const { card }: Props = $props();

  function handleCardSelection(event: Event) {
    event.preventDefault();
    if (card.parameters!.name === "Custom") {
      card.new();

      const inputs: HTMLInputElement[] = Array.from(document.getElementsByTagName("input"));
      inputs.forEach((input) => input.removeAttribute("readonly"));
    } else {
      card.selectDocumentedCard(card.parameters!.name!);

      const inputs: HTMLInputElement[] = Array.from(document.getElementsByTagName("input"));
      inputs.forEach((input) => input.setAttribute("readonly", "true"));
    }
  }
</script>

<section aria-labelledby="graphics-card-parameters">
  <h2 id="graphics-card-parameters">Graphics card parameters</h2>
  <label for="graphics-card-selection">Select a graphics card:</label>
  <form>
    <select onchange={handleCardSelection} bind:value={card.parameters!.name} id="graphics-card-selection">
      {#each Gpus as gpu}
        <option>{gpu.name}</option>
      {/each}
      <option>Custom</option>
    </select>
    <div class="grid">
      <div class="field">
        <label for="casing-weight">Casing weight (grams)</label>
        <input type="number" id="casing-weight" bind:value={card.parameters!.casingWeight} readonly />
        <label for="heatsink-weight">Heatsink weight (grams)</label>
        <input type="number" id="heatsink-weight" bind:value={card.parameters!.heatsinkWeight} readonly />
        <label for="graphics-card-surface">Graphics card surface (cm²)</label>
        <input type="number" id="graphics-card-surface" bind:value={card.parameters!.cardSurface} readonly />
        <label for="gpu-surface">GPU surface (mm²)</label>
        <input type="number" id="gpu-surface" bind:value={card.parameters!.gpuSurface} readonly />
      </div>
      <div class="field">
        <label for="vram-size">Video RAM capacity (GB)</label>
        <input type="number" id="vram-size" bind:value={card.parameters!.videoRamSize} readonly />
        <label for="vram-dies">Video RAM dies</label>
        <input type="number" id="vram-dies" bind:value={card.parameters!.videoRamDies} readonly />
        <label for="vram-die-surface">Video RAM die surface (mm²)</label>
        <input type="number" id="vram-die-surface" bind:value={card.parameters!.videoRamDieSurface} readonly />
      </div>
    </div>
  </form>
  {#if card.parameters!.name === "Custom"}
    <button onclick={() => card.updateImpactFactors()} class="btn btn-primary btn-sm">Recalculate</button>
  {/if}
</section>

<style>
  section {
    overflow-y: hidden;
  }
  .field {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 16px;
    margin-top: 12px;
  }
  input:read-only {
    background-color: silver;
  }
  @media (width >= 481px) {
    label {
      height: 40px;
      width: 100%;
    }
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
      padding-top: 10px;
      gap: 50px;
    }
  }
</style>
