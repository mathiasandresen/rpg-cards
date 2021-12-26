import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const getCurrentCardFromLocalStorage = (): number => {
  let currentCardDefaultValue = 0;
  if (browser) {
    currentCardDefaultValue = Number.parseInt(localStorage?.getItem('currentCard')) ?? 0;
  }

  return currentCardDefaultValue;
};

export const currentCard = writable<number>(getCurrentCardFromLocalStorage());

currentCard.subscribe((currentCard) => {
  if (browser) {
    localStorage.setItem('currentCard', currentCard.toString());
  }
});
