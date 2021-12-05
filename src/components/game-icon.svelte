<script lang="ts">
  import { getIcon, Icon as IconModel } from '../lib/icons';
  import type ColorResolvable from '../model/color-resolvable';

  export let name: string;

  let icon: IconModel;
  $: icon = getIcon(name);

  export let color: ColorResolvable = '#ffffff';
  export let size: string = '1em';
</script>

<div class="icon" style="--icon-size: {size}; --icon-color: {color}">
  {#if icon}
    <!-- <img src="/icons/{path}" alt="icon" /> -->
    <!-- <span style="--icon-path: {path};" /> -->
    {@html icon.svg}
  {/if}
</div>

<style lang="scss">
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--icon-size);
    height: var(--icon-size);

    :global(path) {
      fill: var(--icon-color);
    }
  }
</style>
