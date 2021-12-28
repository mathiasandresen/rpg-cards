import { browser } from '$app/env';
import { writable } from 'svelte/store';

export default interface Settings {
  convertFirstSubtitle: boolean;
  convertDndSpellblock: boolean;
  previewZoom: number;
}

export const defaultSettings: Settings = {
  convertDndSpellblock: true,
  convertFirstSubtitle: true,
  previewZoom: 120
};

function createSettings() {
  let defaultValue = defaultSettings;
  if (browser) {
    defaultValue = {
      ...defaultValue,
      ...JSON.parse(localStorage?.getItem('settings'))
    };
  }
  const { subscribe, set } = writable<Settings>(defaultValue);

  return {
    subscribe,
    set
  };
}

export const settings = createSettings();

settings.subscribe((current) => {
  if (browser) {
    localStorage.setItem('settings', JSON.stringify(current));
  }
});
