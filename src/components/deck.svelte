<script lang="ts">
  import {
    Button,
    ButtonToolbar,
    Icon,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
  } from 'sveltestrap';
  import type Card from '../model/card';
  import { createNewCard } from '../model/card';
  import { currentCard, deck } from '../stores';
  import ConfirmationDialog from './confirmation-dialog.svelte';

  let cards: Card[];
  $: {
    cards = $deck;
    if (cards.length === 0) {
      currentCard.set(-1);
    }
  }

  const handleClick = (index: number) => {
    currentCard.set(index);
  };

  const handleAddCard = () => {
    const index = deck.addCard(createNewCard());
    currentCard.set(index);
  };

  const handleClearDeck = () => {
    currentCard.set(-1);
    deck.set([]);
  };

  const handleDeleteCard = (e: MouseEvent, index: number) => {
    e.stopPropagation();

    deck.removeCard(index);
    if ($currentCard > $deck.length - 1) {
      currentCard.set($deck.length - 1);
    }
  };
</script>

<ConfirmationDialog let:confirm={confirmThis} danger>
  <div class="deck-wrapper">
    <div class="deck-list-buttons">
      <Button color="primary" on:click={handleAddCard}>
        <Icon name="file-plus-fill" />
        Add card
      </Button>
      <Button
        color="danger"
        disabled={!cards || cards.length === 0}
        on:click={() =>
          confirmThis({
            func: () => handleClearDeck(),
            title: 'Clear deck',
            body: 'Are you sure you want to clear the deck?'
          })}
      >
        <Icon name="trash-fill" />
        Clear deck
      </Button>
    </div>
    <div class="deck-list">
      {#if cards && cards.length > 0}
        <ListGroup>
          {#each cards as card, index}
            <ListGroupItem
              active={index === $currentCard}
              tag="button"
              action
              on:click={() => handleClick(index)}
              class="list-item-w-buttons"
            >
              {card.title}
              <Button
                color="link"
                size="sm"
                class="link-danger"
                on:click={(e) =>
                  confirmThis({
                    func: () => handleDeleteCard(e, index),
                    title: `Delete ${card.title}`,
                    body: `Are you sure you want to delete ${card.title}?`
                  })}
              >
                <Icon name="trash-fill" />
              </Button>
            </ListGroupItem>
          {/each}
        </ListGroup>
      {:else}
        <div class="empty-deck">There are no cards in your deck!</div>
      {/if}
    </div>
  </div>
</ConfirmationDialog>

<style lang="scss">
  .deck-list {
    max-height: 20em;
    overflow-y: scroll;
  }

  .deck-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  :global(.deck-list-buttons) {
    display: flex;
    gap: 0.2em;
    overflow: visible;
    :global(button) {
      flex: 1;
    }
  }

  :global(.list-item-w-buttons) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .empty-deck {
    display: flex;
    justify-content: center;
  }
</style>
