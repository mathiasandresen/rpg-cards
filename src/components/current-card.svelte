<script lang="ts">
  import type Card from '../model/card';
  import { currentCard, deck } from '../stores';
  import CardComponent from './card.svelte';

  let card: Card;

  $: card = $deck[$currentCard];
</script>

{#if card}
  <CardComponent {card} />
{/if}
