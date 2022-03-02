<script lang="ts">
  import type Card from '$model/card';
  import { pageLayout } from '../../stores';
  import CardContent from './card-content.svelte';

  export let card: Card;
</script>

<div
  class="rpg-card-wrapper"
  style="
    --card-color: {card.color};
    --card-text-size: {card.layout?.text_font_size ?? '10px'};
    --card-width: {$pageLayout.cardSize.width}mm;
    --card-height: {$pageLayout.cardSize.height}mm;
    --card-title-size: {card.layout?.title_font_size || '14px'};
  "
>
  <div class="rpg-card">
    <div class="title-wrapper">
      <h1>{card.title}</h1>
    </div>
    <div class="card-content">
      {#each card.contents as content}
        <CardContent {content} />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  $border-width: 0.3cm;

  h1 {
    margin: 0;
  }

  .title-wrapper {
    height: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .rpg-card-wrapper {
    width: var(--card-width);
    height: var(--card-height);

    box-sizing: border-box;
    border: $border-width solid var(--card-color);
    border-radius: 0.25cm;
    background-color: var(--card-color);
  }

  .rpg-card {
    display: flex;
    flex-direction: column;
    // gap: 0.2rem;
    height: 100%;

    font-size: 10px;

    border-radius: 0.1cm;
    background-color: white;
    overflow: show;

    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
      sans-serif;

    h1 {
      font-size: var(--card-title-size);
      text-transform: uppercase;
      font-weight: normal;
      font-family: Draconis;

      transform: scaleX(1.4);
    }

    .card-content {
      display: flex;
      flex-direction: column;
      flex: 1;

      :global(p) {
        padding: 0 0.5em;
        margin-bottom: 0.2em;
        line-height: 1em;
      }

      > :global(h2) {
        padding: 0 0.5em;
        font-size: 1.2em;
        font-style: italic;
        color: var(--card-color);
        font-family: Draconis;
      }
    }
  }
</style>
