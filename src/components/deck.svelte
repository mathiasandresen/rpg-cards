<script lang="ts">
  import { Button, Icon, Input, ListGroup, ListGroupItem } from 'sveltestrap';
  import type Card from '../model/card';
  import { createNewCard } from '../lib/card-builder';
  import { currentCard, deck, multiSelect } from '../stores';
  import ConfirmationDialog from './confirmation-dialog.svelte';

  let cards: Card[];
  $: {
    cards = $deck;
    if (cards && cards.length === 0) {
      currentCard.set(-1);
    }
  }

  const handleClick = (index: number) => {
    currentCard.set(-1);
    currentCard.set(index);
  };

  const handleAddCard = () => {
    const index = deck.addCards(createNewCard());
    currentCard.set(index);
  };

  const handleClearDeck = () => {
    deck.set([]);
    $multiSelect.clear();
  };

  const handleDeleteCard = (index: number) => {
    deck.removeCards(index);
    if ($currentCard > $deck.length - 1) {
      currentCard.set($deck.length - 1);
    }
  };

  const handleDeleteSelected = () => {
    deck.removeCards(...$multiSelect.values());
    multiSelect.clear();
  };

  const handleSelectAll = () => {
    if ($deck.every((_, index) => $multiSelect.has(index))) {
      currentCard.set(-2); // Set to -2 in order to trigger change
      multiSelect.clear();
      return;
    }

    multiSelect.add(...$deck.map((_, index) => index));

    currentCard.set(-1);
  };

  const handleCheckBox = (index: number, value: boolean): void => {
    if (value) {
      multiSelect.add(index);
    } else {
      multiSelect.remove(index);
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
          <ListGroupItem color="secondary" class="list-item-w-buttons">
            <div class="list-item-content">
              <input
                on:click={(e) => e.stopPropagation()}
                on:change={handleSelectAll}
                checked={$multiSelect.size === $deck.length}
                type="checkbox"
                class="form-check-input"
              />
              Card
              {#if $multiSelect.size > 1}
                ({$multiSelect.size})
              {/if}
            </div>
            {#if $multiSelect.size > 1}
              <Button
                color="link"
                size="sm"
                class="link-danger"
                on:click={() =>
                  confirmThis({
                    func: handleDeleteSelected,
                    title: `Delete ${$multiSelect.size} cards?`,
                    body: `Are you sure you want to delete ${$multiSelect.size} cards?`
                  })}
              >
                <Icon name="trash-fill" />
              </Button>
            {/if}
          </ListGroupItem>
          {#each cards as card, index}
            <ListGroupItem
              active={($multiSelect.size === 0 && index === $currentCard) ||
                $multiSelect.has(index)}
              tag="button"
              action
              on:click={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClick(index);
              }}
              class="list-item-w-buttons"
            >
              <div class="list-item-content">
                <input
                  on:click={(e) => e.stopPropagation()}
                  on:change={(e) => handleCheckBox(index, e.currentTarget.checked)}
                  checked={$multiSelect.has(index)}
                  type="checkbox"
                  class="form-check-input"
                />
                {card.title}
              </div>
              <Button
                color="link"
                size="sm"
                class="link-danger"
                on:click={(e) => {
                  e.stopPropagation();
                  confirmThis({
                    func: () => handleDeleteCard(index),
                    title: `Delete ${card.title}`,
                    body: `Are you sure you want to delete ${card.title}?`
                  });
                }}
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
    :global(.list-group-item) {
      height: 3.25em;
      min-height: 3.25em;
    }

    :global(.list-group-item.active) {
      margin: 0;
      border-top-width: 0px;
    }
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
    display: flex !important;
    justify-content: space-between;
    align-items: center;
  }

  .list-item-content {
    display: flex;
    gap: 1em;
  }

  .empty-deck {
    display: flex;
    justify-content: center;
  }
</style>
