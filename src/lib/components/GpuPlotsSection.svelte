<script lang="ts">
  const options = ["Criteria", "Life cycle step"];
</script>

<section aria-labelledby="gpu-plots-section">
  <h2 id="gpu-plots-section">Graphics card impact factors</h2>
  <label for="gpu-plots-selection">Display impact factors by:</label>
  <select id="gpu-plots-selection"
    >{#each options as option}<option>{option}</option>{/each}</select
  >
</section>
