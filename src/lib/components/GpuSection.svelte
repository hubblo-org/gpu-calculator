<script lang="ts">
  import type { GraphicsCard } from "$lib/types/gpu";
  import Gpus from "../../data/gpu/gpus.json";

  const h100 = Gpus.filter((card) => card.name.includes("H100"))[0];

  let selectedCard = $state(h100);

  function handleCardSelection(event: Event) {
    event.preventDefault();
    if (selectedCard.name != "Custom") {
      const newSelectedCard = Gpus.filter((card) => card.name == selectedCard.name)[0];
      selectedCard = newSelectedCard;

      const inputs: HTMLInputElement[] = Array.from(document.getElementsByTagName("input"));
      inputs.forEach((input) => input.setAttribute("readonly", "true"));
    } else {
      const customCard: GraphicsCard = {
        name: "Custom",
        totalWeight: 0,
        cardSurface: 0,
        casingWeight: 0,
        heatsinkWeight: 0,
        gpuSurface: 0,
        videoRamSize: 0,
        videoRamDies: 0,
        videoRamDieSurface: 0
      };
      selectedCard = customCard;
      const inputs: HTMLInputElement[] = Array.from(document.getElementsByTagName("input"));
      inputs.forEach((input) => input.removeAttribute("readonly"));
    }
  }
</script>

<section aria-labelledby="graphics-card-parameters">
  <h2 id="graphics-card-parameters">Graphics card parameters</h2>
  <label for="graphics-card-selection">Select a graphics card:</label>
  <form>
    <select
      onchange={handleCardSelection}
      bind:value={selectedCard.name}
      id="graphics-card-selection"
    >
      {#each Gpus as card}
        <option>{card.name}</option>
      {/each}
      <option>Custom</option>
    </select>
    <div class="grid">
      <div class="field">
        <label for="casing-weight">Casing weight</label>
        <input type="number" id="casing-weight" bind:value={selectedCard.casingWeight} readonly />
        <label for="heatsink-weight">Heatsink weight</label>
        <input
          type="number"
          id="heatsink-weight"
          bind:value={selectedCard.heatsinkWeight}
          readonly
        />
        <label for="graphics-card-surface">Graphics card surface</label>
        <input
          type="number"
          id="graphics-card-surface"
          bind:value={selectedCard.cardSurface}
          readonly
        />
        <label for="gpu-surface">GPU surface</label>
        <input type="number" id="gpu-surface" bind:value={selectedCard.gpuSurface} readonly />
      </div>
      <div class="field">
        <label for="vram-size">Video RAM size</label>
        <input type="number" id="vram-size" bind:value={selectedCard.videoRamSize} readonly />
        <label for="vram-dies">Video RAM dies</label>
        <input type="number" id="vram-dies" bind:value={selectedCard.videoRamDies} readonly />
        <label for="vram-die-surface">Video RAM die surface</label>
        <input
          type="number"
          id="vram-die-surface"
          bind:value={selectedCard.videoRamDieSurface}
          readonly
        />
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
