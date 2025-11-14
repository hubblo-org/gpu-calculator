<script lang="ts">
  import GraphicsCards from "../../../src/data/gpu/gpus.json";
  import GraphicsCardsImpactFactors from "../../../src/data/gpu/gpus_impact_factors.json";
  import GpuPlotsSection from "$lib/components/GpuPlotsSection.svelte";
  import GpuSection from "$lib/components/GpuSection.svelte";
  import { Card } from "$lib/gpu/gpu.svelte";

  let defaultCard = GraphicsCards.filter((gc) => gc.name === "NVIDIA H100 PCIe 80GB")[0];
  let defaultCardImpactsFactors = GraphicsCardsImpactFactors.filter(
    (gc) => gc.graphics_card === "NVIDIA H100 PCIe 80GB"
  )[0];
  let card = new Card(defaultCard, defaultCardImpactsFactors);
</script>

<div>
  <GpuSection {card} />
  <GpuPlotsSection {card} />
</div>
