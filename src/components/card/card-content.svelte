<script lang="ts">
  import { getContentTypeDescriptor } from '$lib/card-content-types.svelte';
  import type { CardContent } from '$model/card';

  export let content: CardContent;
  $: typeDescriptor = getContentTypeDescriptor(content.type);
</script>

<svelte:component this={typeDescriptor.renderComponent} {content} />
