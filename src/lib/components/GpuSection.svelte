<script lang="ts">
  import { Card } from "$lib/gpu/gpu.svelte";
  import Gpus from "../../data/gpu/gpus.json";

  interface Props {
    card: InstanceType<typeof Card>;
  }

  const { card }: Props = $props();

  function handleCardSelection(event: Event) {
    event.preventDefault();
    if (card.name === "Custom") {
      card.new();

      const inputs: HTMLInputElement[] = Array.from(document.getElementsByTagName("input"));
      inputs.forEach((input) => input.removeAttribute("readonly"));
    } else {
      card.selectDocumentedCard(card.name!);

      const inputs: HTMLInputElement[] = Array.from(document.getElementsByTagName("input"));
      inputs.forEach((input) => input.setAttribute("readonly", "true"));
    }
  }
</script>

<section aria-labelledby="graphics-card-parameters">
  <h2 id="graphics-card-parameters">Graphics card parameters</h2>
  <label for="graphics-card-selection">Select a graphics card:</label>
  <form>
    <select onchange={handleCardSelection} bind:value={card.name} id="graphics-card-selection">
      {#each Gpus as gpu}
        <option>{gpu.name}</option>
      {/each}
      <option>Custom</option>
    </select>
    <div class="grid">
      <div class="field">
        <label for="casing-weight">Casing weight</label>
        <input type="number" id="casing-weight" bind:value={card.casingWeight} readonly />
        <label for="heatsink-weight">Heatsink weight</label>
        <input type="number" id="heatsink-weight" bind:value={card.heatsinkWeight} readonly />
        <label for="graphics-card-surface">Graphics card surface</label>
        <input type="number" id="graphics-card-surface" bind:value={card.cardSurface} readonly />
        <label for="gpu-surface">GPU surface</label>
        <input type="number" id="gpu-surface" bind:value={card.gpuSurface} readonly />
      </div>
      <div class="field">
        <label for="vram-size">Video RAM size</label>
        <input type="number" id="vram-size" bind:value={card.videoRamSize} readonly />
        <label for="vram-dies">Video RAM dies</label>
        <input type="number" id="vram-dies" bind:value={card.videoRamDies} readonly />
        <label for="vram-die-surface">Video RAM die surface</label>
        <input type="number" id="vram-die-surface" bind:value={card.videoRamDieSurface} readonly />
      </div>
    </div>
  </form>
  <button class="btn btn-primary btn-sm">Recalculate</button>
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
    input {
      margin-top: auto;
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
