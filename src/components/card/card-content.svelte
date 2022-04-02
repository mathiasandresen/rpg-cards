<script lang="ts">
  import { getContentTypeDescriptor } from '$lib/card-content-types';
  import type { CardContent } from '$model/card';

  export let content: CardContent;
  $: typeDescriptor = getContentTypeDescriptor(content.type);
</script>

<svelte:component this={typeDescriptor.renderComponent} {content} />

<style lang="scss">
  :global(.rpg-card * p, li) {
    font-weight: bold;
  }

  :global(.rpg-card * strong, b) {
    font-weight: bolder;
    color: var(--card-color);
  }

  :global(.rpg-card * ul) {
    margin-bottom: 0;
  }
</style>
