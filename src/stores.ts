import { writable } from "svelte/store";
import type Card from "./model/card";

function createDeck() {
  const { subscribe, set, update } = writable<Card[]>([])

  return {
    subscribe,
    addCard: (card: Card) => update(deck => {
      deck.push(card)
      return deck;
    }),
    removeCard: (index: number) => update(deck => deck.splice(index, 1)),
    set,
  }
}

export const deck = createDeck();
export const currentCard = writable<number>(0)