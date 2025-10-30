<script lang="ts">
  import { DataCenter } from "$lib/data-center.svelte";
  import FunctionalUnitSection from "$lib/components/FunctionalUnitSection.svelte";
  import DataCenterSection from "$lib/components/DataCenterSection.svelte";
  import TableOfContents from "$lib/components/TableOfContents.svelte";
  import PcrSection from "$lib/components/PCRSection.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import { dataCenterCharacteristics } from "../../mocks/dc-data";
  import { inventoryWithImpact } from "../../mocks/dc-data";

  const dataCenter = new DataCenter(dataCenterCharacteristics, inventoryWithImpact);
</script>

  <div class="wrapper" id="toc-wrapper">
    <TableOfContents />
    <PcrSection />
  </div>
  <!-- Total impacts of DC with Electricity (example) -->
  <!-- Total absolute values header -->
  <!-- Relative breakdown barplot per lifecycle -->
  <!-- Relative breakdown barplot per category -->
  <!-- Relative breakdown treemap per category and lifecycle -->
  <DataCenterSection dc={dataCenter} />
  <Summary />
  <FunctionalUnitSection dc={dataCenter} />
  <!-- Impats of FU1 without Electricity -->
  <!-- Total absolute values header -->
  <!-- Relative breakdown barplot per lifecycle -->
  <!-- Relative breakdown barplot per category -->
  <!-- Relative breakdown treemap per category and lifecycle -->

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
