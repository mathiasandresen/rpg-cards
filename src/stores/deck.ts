import { browser } from '$app/env';
import { writable } from 'svelte/store';
import type Card from '../model/card';

function createDeck() {
  let defaultValue = [];
  if (browser) {
    defaultValue = JSON.parse(localStorage?.getItem('deck')) ?? [];
  }
  const { subscribe, set, update } = writable<Card[]>(defaultValue);

  return {
    subscribe,
    addCards: (...card: Card[]) => {
      let index = -1;
      update((deck) => {
        index = deck.length;
        return [...deck, ...card];
      });
      return index;
    },
    removeCards: (...indexes: number[]) =>
      update((deck) => deck.filter((_, i) => !indexes.includes(i))),
    setCard: (index: number, card: Card) =>
      update((deck) => {
        deck.splice(index, 1, card);
        return deck;
      }),
    set
  };
}

export const deck = createDeck();

deck.subscribe((deck) => {
  if (browser) {
    localStorage.setItem('deck', JSON.stringify(deck));
  }
});
