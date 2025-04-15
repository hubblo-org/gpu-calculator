<script lang="ts">
  import FunctionalUnit from "$lib/components/FunctionalUnit.svelte";
  import DataCenter from "$lib/components/DataCenter.svelte";
  import Header from "$lib/components/Header.svelte";
  import { dataCenterCharacteristics } from "../../mocks/dc-data";
  import TableOfContents from "$lib/components/TableOfContents.svelte";
  import PcrSection from "$lib/components/PCRSection.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Summary from "$lib/components/Summary.svelte";
  console.log("dataCenterCharacteristics: ");
  console.log(dataCenterCharacteristics);
</script>

<Header />
<main>
  <div class="wrapper" id="toc-wrapper">
    <TableOfContents />
    <PcrSection />
  </div>
  <DataCenter dataCenter={dataCenterCharacteristics} />
  <Summary />
  <FunctionalUnit />
</main>
<Footer />

<style>
  @media (max-width: 480px) {
    #toc-wrapper {
      padding: 0px;
    }
  }
  @media (min-width: 480px) {
    #toc-wrapper {
      padding-top: 0px;
      padding-bottom: 0px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }
</style>
