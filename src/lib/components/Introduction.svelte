<script>
</script>

<section aria-labelledby="introduction-title">
  <div id="introduction-text">
    <h2 id="introduction-title">GPU embedded impacts calculator</h2>
    <p>
      This calculator estimates the embedded impacts (manufacturing, distribution, end-of-life) of a
      graphics card based on 16 Product Environmental Footprint (PEF) impact criteria (excluding the
      use phase). It is based on the parametric model developed for <a href="https://ademe.fr"
        ><span>ADEME</span></a
      >
      by <a href="https://www.linkedin.com/company/tide-env/"><span>Tide</span></a> and
      <a href="https://hubblo.org/fr/"><span>Hubblo</span></a>
      as part of
      <a href="https://arxiv.org/abs/2509.00093"
        ><span>research published in 2025 (Falk et al., 2025)</span></a
      >. The model is the result of extensive data collection, including the dismantling of a dozen
      graphics cards and the performance of a dozen elemental analyses.
    </p>

    <p><a href="https://ademe.fr"><span>Read the full report</span></a></p>
  </div>
  <div id="introduction-gpu-sketch">
    <img
      src="/media/gpu_sketch.svg"
      alt="The different components of a graphics card are depicted: the heatsink and the casing, and outside the casing, the card itself, with its printed wiring board, its video memory and its graphics processing unit."
    />
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  #introduction-text {
    width: 50%;
  }
  #introduction-gpu-sketch {
    width: 50%;
  }
</style>
