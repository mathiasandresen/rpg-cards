import type Card from '$model/card';
import { writable } from 'svelte/store';

function createMultiCard() {
  const { set, subscribe } = writable<Partial<Card>>({});

  return {
    subscribe,
    set
  };
}

export const multiCard = createMultiCard();
