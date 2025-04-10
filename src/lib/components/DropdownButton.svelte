<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import { fly, fade } from "svelte/transition";
  interface Props {
    direction: string;
    label: string;
    visibilityFunction?: MouseEventHandler<HTMLButtonElement>;
  }

  let arrowStyle = $state("");

  const { direction, label, visibilityFunction }: Props = $props();

  function setArrowCharacter() {
    if (direction === "up") {
      arrowStyle = "margin-top: -8px";
      return "▲";
    } else if (direction === "down") {
      arrowStyle = "";
      return "▼";
    }
  }
  const arrowCharacter = setArrowCharacter();
</script>

<div class="drop-down">
  <button class="btn-drop-down" aria-label={label} onclick={visibilityFunction}>
    <div in:fly={{ y: 200 }} out:fade={{ duration: 600 }} style={arrowStyle}>{arrowCharacter}</div>
  </button><span>{label}</span>
</div>

<style>
  .drop-down {
    margin-top: 12px;
    display: flex;
    gap: 12px;
    width: 240px;
  }
  .drop-down span {
    align-self: center;
  }
  @media (min-width: 480px) {
    .drop-down {
      padding-top: initial;
      width: initial;
    }
  }
</style>
