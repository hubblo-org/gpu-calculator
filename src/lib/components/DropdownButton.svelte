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
  .drop-down span {
    padding-left: 12px;
  }
</style>
