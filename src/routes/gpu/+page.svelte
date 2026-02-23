<script lang="ts">
  import GraphicsCards from "../../../src/data/gpu/gpus.json";
  import Introduction from "$lib/components/Introduction.svelte";
  import GpuPlotsSection from "$lib/components/GpuPlotsSection.svelte";
  import GpuSection from "$lib/components/GpuSection.svelte";
  import { Card } from "$lib/gpu/gpu.svelte";
  import Partners from "$lib/components/Partners.svelte";
  import Equivalents from "$lib/components/Equivalents.svelte";
  import Results from "$lib/components/Results.svelte";
  import LicenceCite from "$lib/components/LicenceCite.svelte";

  const defaultCardName = "NVIDIA A100 PCIe 40GB";

  let defaultCard = GraphicsCards.filter((gc) => gc.name === defaultCardName)[0];
  let card = new Card(defaultCard);
</script>

<div>
  <Introduction />
  <GpuSection {card} />
  <Results {card} />
  <Equivalents {card} />
  <GpuPlotsSection {card} />
  <LicenceCite />
  <Partners />
</div>
