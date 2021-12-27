<script lang="ts">
  import type Card from '$model/card';
  import { currentCard, deck } from '../../stores';
  import CardBack from './card-back.svelte';
  import CardComponent from './card.svelte';

  let card: Card;

  $: card = $deck[$currentCard];
</script>

<div>
  <h4>Preview</h4>
  {#if card}
    <div class="current-card">
      <CardComponent {card} />
      <CardBack {card} />
    </div>
  {/if}
</div>

<style lang="scss">
  .current-card {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
  }
</style>
