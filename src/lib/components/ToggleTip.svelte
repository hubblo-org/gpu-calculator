<script lang="ts">
  interface Props {
    info: string;
    source: string;
  }

  const { info, source }: Props = $props();

  function openToggleTip(nodeId: string) {
    const buttonWithContent = document.getElementById(nodeId);
    const description = buttonWithContent?.getAttribute("data-toggletip-content");
    const liveRegion = buttonWithContent?.nextElementSibling;
    liveRegion!.innerHTML = "";
    window.setTimeout(() => {
      liveRegion!.innerHTML = '<span class="toggletip-bubble">' + description;
    }, 100);

    document.addEventListener("click", function (event) {
      if (buttonWithContent !== event.target) {
        liveRegion!.innerHTML = "";
      }
    });

    buttonWithContent?.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        liveRegion!.innerHTML = "";
      }
    });
  }
</script>

<span class="toggletip-container"
  ><button
    type="button"
    id="{source}-toggletip-button"
    data-toggletip-content={info}
    onclick={() => openToggleTip(`${source}-toggletip-button`)}
    aria-label="More information">?</button
  ><span role="status"></span></span
>

<style>
  .toggletip-container {
    margin-left: auto;
  }
  button {
    appearance: none;
    background-color: var(--color-secondary-30);
    border: var(--border);
    margin: initial;
  }
</style>
