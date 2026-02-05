<script lang="ts">
  import GraphicsCards from "../../../src/data/gpu/gpus.json";
  import Introduction from "$lib/components/Introduction.svelte";
  import GpuPlotsSection from "$lib/components/GpuPlotsSection.svelte";
  import GpuSection from "$lib/components/GpuSection.svelte";
  import { Card } from "$lib/gpu/gpu.svelte";
  import Partners from "$lib/components/Partners.svelte";

  const defaultCardName = "NVIDIA A100 PCIe 40GB";

  let defaultCard = GraphicsCards.filter((gc) => gc.name === defaultCardName)[0];
  let card = new Card(defaultCard);
</script>

<div>
  <Introduction />
  <GpuSection {card} />
  <GpuPlotsSection {card} />
  <Partners />
</div>
