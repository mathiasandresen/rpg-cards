<script lang="ts">
  import { renderText } from '$lib/card-render-util';

  import { SPLIT_REGEX } from '$lib/constants';
  import type { CardContent } from '$model/card';

  export let content: CardContent;

  $: [title, rightTitle] = content.content.split(SPLIT_REGEX);
</script>

<h2 class="subtitle">
  <div>
    {@html renderText(title, { markdown: { inline: true } })}
  </div>
  {#if rightTitle}
    <div>
      {@html renderText(rightTitle, { markdown: { inline: true } })}
    </div>
  {/if}
</h2>

<style>
  .subtitle {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2em;
    font-family: Draconis;
  }
</style>
