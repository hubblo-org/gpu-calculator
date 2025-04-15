<script lang="ts">
  import Logo from "./Logo.svelte";
</script>

<header>
  <div id="banner-container">
    <div id="beta-banner">BETA</div>
  </div>
  <div id="header-logo">
    <a class="logo" href="https://hubblo.org/en/" aria-label="Navigate to the Hubblo website">
      <Logo />
      <span>Hubblo</span>
    </a>
  </div>
  <a id="contact" href="https://hubblo.org/en/contact/" class="btn btn-primary btn-sm"> Contact </a>
</header>

<style>
  header {
    display: flex;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    max-width: min(var(--wrapper-max-width), 100vw);
    height: var(--header-height);
    background-color: var(--color-background);
    margin-inline: auto;
    padding: var(--space-16) var(--gutter, 2rem);
    display: flex;
    column-gap: var(--gutter);
    align-items: center;
    justify-content: space-between;
    border-bottom: var(--border);
    border-inline: var(--border);
  }

  #contact,
  #contact:visited {
    color: var(--color-white);
  }

  #banner-container {
    width: 200px;
    height: 200px;
    margin: -26px;
    position: absolute;
    overflow: hidden;
    z-index: -1;
  }
  #beta-banner {
    width: 300px;
    padding-top: 10px;
    padding-right: 48px;
    background-color: var(--color-secondary-30);
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    transform: rotateZ(-45deg);
    text-align: center;
    transform-origin: 150px 180px;
  }
  @media (min-width: 480px) {
    #banner-container {
      margin: -32px;
    }
    #beta-banner {
      padding: 6px;
      padding-right: 12px;
    }
  }
</style>
