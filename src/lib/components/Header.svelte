<header>
  <div id="logo">
    <a href="https://hubblo.org/en" aria-label="Navigate to the Hubblo website">
      <img src="/media/logo.svg" alt="Hubblo logo" />
      <span>Hubblo</span>
    </a>
  </div>
</header>

<style>
  a {
    display: flex;
    column-gap: 0.5rem;
    font-size: 1.4375rem;
    font-weight: 500;
    height: var(--space-32);
    color: var(--color-headings);
  }
  header {
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
