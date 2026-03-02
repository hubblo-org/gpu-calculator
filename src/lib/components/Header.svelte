<script lang="ts">
  import Logo from "./Logo.svelte";
</script>

<header>
  <div id="header-logo">
    <a class="logo" href="https://hubblo.org/en/" aria-label="Navigate to the Hubblo website">
      <Logo />
      <span>Hubblo</span>
    </a>
  </div>
  <div id="top-buttons">
    <div class="top-button">
      <a
        href="https://data.hubblo.org/gpu"
        class="simple-link"
        aria-label="Navigate to the calculator page"
      >
        🧮 Calculator
      </a>
    </div>
    <div class="top-button">
      <a
        href="https://data.hubblo.org/gpu/docs"
        class="simple-link"
        aria-label="Navigate to the calculator documentation page"
      >
        📖 Documentation
      </a>
    </div>
    <div class="top-button">
      <a
        href="https://github.com/hubblo-org/gpu-calculator"
        class="simple-link"
        aria-label="Navigate to the calculator code repository"
      >
        👩‍💻 Code
      </a>
    </div>
    <div class="top-button">
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
</style>
