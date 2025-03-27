<script lang="ts">
  import FunctionalUnit from "$lib/components/FunctionalUnit.svelte";
  import DataCenter from "$lib/components/DataCenter.svelte";
  import { dataCenterCharacteristics } from "../../mocks/dc-data";
</script>

<FunctionalUnit />
<DataCenter dataCenter={dataCenterCharacteristics} />
