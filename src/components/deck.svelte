<script lang="ts">
  import { ListGroup, ListGroupItem } from 'sveltestrap';
  import type Card from '../model/card';
  import { currentCard, deck } from '../stores';

  let cards: Card[];
  $: cards = $deck;

  const handleClick = (index: number) => {
    currentCard.set(index);
  };
</script>

<div class="deck-list">
  {#if cards}
    <ListGroup>
      {#each cards as card, index}
        <ListGroupItem
          active={index === $currentCard}
          tag="button"
          action
          on:click={() => handleClick(index)}>{card.title}</ListGroupItem
        >
      {/each}
    </ListGroup>
  {:else}
    There are no cards in your deck!
  {/if}
</div>

<style>
  .deck-list {
    max-height: 20em;
    overflow-y: scroll;
  }
</style>
