<script lang="ts">
  import { VERSION } from "svelte/compiler";
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
  <div id="top-buttons">
    <div id="documentation-top-btn">
      <a
        href="https://data.hubblo.org/gpu/docs"
        class="simple-link"
        aria-label="Navigate to the calculator documentation page"
      >
        📖 Documentation
      </a>
    </div>
    <div id="code-top-btn">
      <a
        href="https://github.com/hubblo-org/gpu-calculator"
        class="simple-link"
        aria-label="Navigate to the calculator code repository"
      >
        👩‍💻 Code
      </a>
    </div>
    <div id="contact-top-btn">
      <a
        href="https://hubblo.org/en/contact/"
        class="simple-link"
        aria-label="Navigate to the Hubblo contact form"
      >
        ✉️ Contact
      </a>
    </div>
  </div>
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
