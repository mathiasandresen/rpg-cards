<script lang="ts">
  import { renderText } from '$lib/card-render-util';
  import type { CardContent } from '$model/card';

  export let content: CardContent;
</script>

<ul class="bullet">
  <li>
    {@html renderText(content.content)}
  </li>
</ul>

<style lang="scss">
  .bullet {
    padding: 0;
    margin: 0 0.5em;
    list-style: inside;
    font-size: var(--card-text-size);
  }
</style>
