<script lang="ts">
  import { renderText } from '$lib/card-render-util';
  import type { CardContent } from '$model/card';

  export let content: CardContent;
</script>

<p class="text">{@html renderText(content.content, { markdown: { inline: false } })}</p>

<style lang="scss">
  .text {
    font-size: var(--card-text-size);
  }
</style>
