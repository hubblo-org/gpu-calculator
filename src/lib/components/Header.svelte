<header>
  <div id="banner-container">
    <div id="beta-banner">BETA</div>
  </div>
  <div id="header-logo">
    <a class="logo" href="https://hubblo.org/en/" aria-label="Navigate to the Hubblo website">
      <img src="/media/logo.svg" alt="Hubblo logo" />
      <span>Hubblo</span>
    </a>
  </div>
  <p>Want to know more about the environmental <br /> evaluation of cloud services?</p>
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
  p {
    display: none;
    color: var(--color-gray-500);
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
  }
  #beta-banner {
    width: 300px;
    padding: 4px;
    padding-right: 42px;
    background-color: var(--color-secondary-30);
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    transform: rotateZ(-45deg);
    text-align: center;
    transform-origin: 150px 180px;
  }
  @media (min-width: 800px) {
    p {
      margin-left: auto;
      display: initial;
    }
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
