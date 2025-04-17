<script lang="ts">
  import FunctionalUnit from "$lib/components/FunctionalUnit.svelte";
  import DataCenter from "$lib/components/DataCenter.svelte";
  import Header from "$lib/components/Header.svelte";
  import { dataCenterCharacteristics } from "../../mocks/dc-data";
  import TableOfContents from "$lib/components/TableOfContents.svelte";
  import PcrSection from "$lib/components/PCRSection.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Summary from "$lib/components/Summary.svelte";
  console.log("page.svelte - dataCenterCharacteristics: ");
  console.log(dataCenterCharacteristics);
</script>

<Header />
<main>
  <div class="wrapper" id="toc-wrapper">
    <TableOfContents />
    <PcrSection />
  </div>
  <!-- Total impacts of DC with Electricity (example) -->
  <!-- Total absolute values header -->
  <!-- Relative breakdown barplot per lifecycle -->
  <!-- Relative breakdown barplot per category -->
  <!-- Relative breakdown treemap per category and lifecycle -->
  <DataCenter dataCenter={dataCenterCharacteristics} />
  <Summary />

  <!-- Impats of FU1 without Electricity -->
  <!-- Total absolute values header -->
  <!-- Relative breakdown barplot per lifecycle -->
  <!-- Relative breakdown barplot per category -->
  <!-- Relative breakdown treemap per category and lifecycle -->
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
