<script lang="ts">
  import { renderText } from '$lib/card-render-util';

  import { SPLIT_REGEX } from '$lib/constants';
  import type { CardContent } from '$model/card';

  export let content: CardContent;

  $: [title, rightTitle] = content.content.split(SPLIT_REGEX);
</script>

<h3 class="section" class:with-right={rightTitle}>
  <div>
    {@html renderText(title)}
  </div>
  {#if rightTitle}
    <div>
      {@html renderText(rightTitle)}
    </div>
  {/if}
</h3>

<style lang="scss">
  .section {
    display: grid;

    > * {
      grid-row: 1;
      grid-column: 1;
    }

    background-color: var(--card-color);
    color: white;
    height: 0.3cm;
    font-size: 0.8em;
    margin-bottom: 0.2em;
    margin-left: -5px;
    margin-right: -5px;
    padding: 0 0.5em;

    :first-child {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &.with-right {
      :last-child {
        display: flex;
        align-items: center;
        justify-content: end;
      }
    }
  }
</style>
