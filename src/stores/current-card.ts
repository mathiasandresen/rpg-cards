import { browser } from '$app/env';
import { writable } from 'svelte/store';

function createCurrentCard() {
  let currentCardDefaultValue = 0;
  if (browser) {
    currentCardDefaultValue = Number.parseInt(localStorage?.getItem('currentCard')) ?? 0;
  }

  const { subscribe, set, update } = writable<number>(currentCardDefaultValue);

  return {
    subscribe,
    set,
    update
  };
}

export const currentCard = createCurrentCard();

currentCard.subscribe((currentCard) => {
  if (browser) {
    localStorage.setItem('currentCard', currentCard.toString());
  }
});
