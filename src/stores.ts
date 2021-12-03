import { writable } from "svelte/store";
import type Card from "./model/card";

function createDeck() {
  const { subscribe, set, update } = writable<Card[]>([])

  return {
    subscribe,
    addCard: (card: Card) => {
      let index = -1;
      update(deck => {
        index = deck.length;
        return [...deck, card];
      })
      return index;
    },
    removeCard: (index: number) => update(deck => deck.filter((_, i) => i !== index)),
    set,
  }
}

export const deck = createDeck();
export const currentCard = writable<number>(0)