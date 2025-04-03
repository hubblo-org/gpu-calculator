<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import { fly, fade } from "svelte/transition";
  interface Props {
    direction: string;
    label: string;
    visibilityFunction?: MouseEventHandler<HTMLButtonElement>;
  }

  const { direction, label, visibilityFunction }: Props = $props();

  function setArrowCharacter() {
    if (direction === "up") {
      return "▲";
    } else if (direction === "down") {
      return "▼";
    }
  }
  const arrowCharacter = setArrowCharacter();
</script>

<div class="drop-down">
  <button class="btn-drop-down" aria-label={label} onclick={visibilityFunction}>
    <div in:fly={{ y: 200 }} out:fade={{ duration: 600 }}>{arrowCharacter}</div>
  </button><span>{label}</span>
</div>

<style>
  .drop-down span {
    padding-left: 12px;
  }
</style>
