import { writable } from 'svelte/store';
import { currentCard } from '.';

function createMultiSelect() {
  const { subscribe, set, update } = writable<Set<number>>(new Set<number>());

  return {
    subscribe,
    add: (value: number) =>
      update((set) => {
        set.add(value);
        return set;
      }),
    remove: (value: number) =>
      update((set) => {
        set.delete(value);
        return set;
      }),
    clear: () =>
      update((set) => {
        set.clear();
        return set;
      }),
    set
  };
}

export const multiSelect = createMultiSelect();

multiSelect.subscribe((set) => {
  if (set.size === 1) {
    currentCard.set(set.values().next().value);
  }
});

currentCard.subscribe((current) => {
  multiSelect.clear();
  multiSelect.add(current);
});
