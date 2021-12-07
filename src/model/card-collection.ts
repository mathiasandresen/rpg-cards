import type Card from './card';

export interface CardCollection {
  version: string;
  cards: Card[];
}

export function isCardCollection(collection: CardCollection): collection is CardCollection {
  return typeof collection.cards === 'object' && typeof collection.version === 'string';
}
