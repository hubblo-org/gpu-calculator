<script lang="ts">
  import Gpus from "../../data/gpu/gpus.json";

  const h100 = Gpus.filter((card) => card.name.includes("H100"))[0];

  let selectedCard = $state(h100);

  function handleCardSelection(event: Event) {
    event.preventDefault();
    const newSelectedCard = Gpus.filter((card) => card.name == selectedCard.name)[0];
    selectedCard = newSelectedCard;
  }
</script>

<section aria-labelledby="graphics-card-parameters">
  <h2 id="graphics-card-parameters">Graphics card parameters</h2>
  <label for="graphics-card-selection">Select a graphics card:</label>
  <form>
    <select onchange={handleCardSelection} bind:value={selectedCard.name} id="graphics-card-selection">
      {#each Gpus as card}
        <option>{card.name}</option>
      {/each}
    </select>
    <div class="grid">
      <div class="field">
        <label for="casing-weight">Casing weight</label>
        <input type="number" id="casing-weight" bind:value={selectedCard.casingWeight} />
        <label for="heatsink-weight">Heatsink weight</label>
        <input type="number" id="heatsink-weight" bind:value={selectedCard.heatsinkWeight} />
        <label for="graphics-card-surface">Graphics card surface</label>
        <input type="number" id="graphics-card-surface" bind:value={selectedCard.cardSurface} />
        <label for="gpu-surface">GPU surface</label>
        <input type="number" id="gpu-surface" bind:value={selectedCard.gpuSurface} />
      </div>
      <div class="field">
        <label for="vram-size">Video RAM size</label>
        <input type="number" id="vram-size" bind:value={selectedCard.videoRamSize} />
        <label for="vram-dies">Video RAM dies</label>
        <input type="number" id="vram-dies" bind:value={selectedCard.videoRamDies} />
        <label for="vram-die-surface">Video RAM die surface</label>
        <input type="number" id="vram-die-surface" bind:value={selectedCard.videoRamDieSurface} />
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
