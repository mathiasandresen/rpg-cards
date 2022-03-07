import { browser } from '$app/env';
import { writable } from 'svelte/store';

function createRecentColors() {
  let defaultValue = [];
  if (browser) {
    defaultValue = JSON.parse(localStorage?.getItem('recentColors')) ?? [];
  }

  const { subscribe, set, update } = writable<string[]>(defaultValue);

  return {
    subscribe,
    set,
    update,
    add: (color: string) =>
      update((current) => {
        const newArray = current.slice(0, 9);
        const indexOf = newArray.indexOf(color);

        if (indexOf !== -1) {
          newArray.splice(indexOf, 1);
        }

        return [color, ...newArray];
      })
  };
}

export const recentColors = createRecentColors();

recentColors.subscribe((recentColors) => {
  if (browser) {
    localStorage.setItem('recentColors', JSON.stringify(recentColors));
  }
});
