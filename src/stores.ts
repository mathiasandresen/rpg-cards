import { browser } from "$app/env";
import { writable } from "svelte/store";
import type Card from "./model/card";

function createDeck() {
  let defaultValue = [];
  if (browser) {
    defaultValue = JSON.parse(localStorage?.getItem("deck")) ?? [];
  }
  const { subscribe, set, update } = writable<Card[]>(defaultValue)

  return {
    subscribe,
    addCards: (...card: Card[]) => {
      let index = -1;
      update(deck => {
        index = deck.length;
        return [...deck, ...card];
      })
      return index;
    },
    removeCard: (index: number) => update(deck => deck.filter((_, i) => i !== index)),
    set,
  }
}

let currentCardDefaultValue = 0;
if (browser) {
  currentCardDefaultValue = Number.parseInt(localStorage?.getItem("currentCard")) ?? 0;
}

export const deck = createDeck();
export const currentCard = writable<number>(currentCardDefaultValue)


deck.subscribe((deck) => {
  if (browser) {
    localStorage.setItem("deck", JSON.stringify(deck))
  }
})

currentCard.subscribe((currentCard) => {
  if (browser) {
    localStorage.setItem("currentCard", currentCard.toString())
  }
})
