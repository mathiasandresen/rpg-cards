<script lang="ts">
  import { SPLIT_REGEX } from '$lib/constants';
  import type { CardContent } from '$model/card';

  export let content: CardContent;

  $: [amountStr, size] = content.content.split(SPLIT_REGEX);
  $: amount = Number.parseInt(amountStr, 10) as number;
</script>

<div class="boxes">
  {#if amount !== 0}
    {#each Array(amount || 1) as _}
      <div class="box" style="width: {size || 2}em; height: {size || 2}em;" />
    {/each}
  {/if}
</div>

<style lang="scss">
  .boxes {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.5em;
    gap: 0.5em;
    margin-bottom: 0.2em;

    .box {
      border: 0.35em solid var(--card-color);
    }
  }
</style>
