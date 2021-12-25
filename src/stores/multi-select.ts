import { writable } from 'svelte/store';
import { currentCard } from '.';

function createMultiSelect() {
  const { subscribe, set, update } = writable<Set<number>>(new Set<number>());

  return {
    subscribe,
    add: (...values: number[]) =>
      update((set) => {
        values.forEach((v) => set.add(v));
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
  } else if (set.size === 0) {
    currentCard.set(-1);
  }
});

currentCard.subscribe((current) => {
  if (current > -1) {
    multiSelect.clear();
    multiSelect.add(current);
  }
});
