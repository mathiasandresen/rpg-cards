import { browser } from "$app/env";
import { writable } from "svelte/store";

let currentCardDefaultValue = 0;
if (browser) {
  currentCardDefaultValue = Number.parseInt(localStorage?.getItem("currentCard")) ?? 0;
}

export const currentCard = writable<number>(currentCardDefaultValue)

currentCard.subscribe((currentCard) => {
  if (browser) {
    localStorage.setItem("currentCard", currentCard.toString())
  }
})
