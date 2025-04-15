<script lang="ts">
  interface Props {
    info: string;
    source: string;
  }

  const { info, source }: Props = $props();

  let descriptionVisible = $state(false);

  function openToggleTip(nodeId: string) {
    const buttonWithContent = document.getElementById(nodeId);
    window.setTimeout(() => {
      descriptionVisible = true;
    }, 100);

    document.addEventListener("click", function (event) {
      if (buttonWithContent !== event.target) {
        descriptionVisible = false;
      }
    });

    buttonWithContent?.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        descriptionVisible = false;
      }
    });
  }

  function closeToggleTip() {
    descriptionVisible = false;
  }
</script>

<span class="toggletip-container"
  ><button
    type="button"
    id="{source}-toggletip-button"
    data-toggletip-content={info}
    onclick={() => openToggleTip(`${source}-toggletip-button`)}
    aria-label="More information">?</button
  ><span role="status">
    {#if descriptionVisible}<div class="toggletip-bubble">
        <span>{info}</span><button
          aria-label="Close characteristic description"
          onclick={() => closeToggleTip()}>x</button
        >
      </div>
    {/if}
  </span></span
>
