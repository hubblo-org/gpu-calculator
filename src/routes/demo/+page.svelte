<script lang="ts">
  import FunctionalUnit from "$lib/components/FunctionalUnit.svelte";
  import DataCenter from "$lib/components/DataCenter.svelte";
  import Header from "$lib/components/Header.svelte";
  import { dataCenterCharacteristics } from "../../mocks/dc-data";
  console.log("dataCenterCharacteristics: ");
  console.log(dataCenterCharacteristics);
</script>

<Header />
<main>
  <FunctionalUnit />
  <DataCenter dataCenter={dataCenterCharacteristics} />
</main>
