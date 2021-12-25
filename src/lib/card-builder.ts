import type { CardContent } from '../model/card';
import type Card from '../model/card';
import type { CardContentTypeV2 } from './card-content-types.svelte';
import { uuid4 } from './uuid';

export const createNewCard = (): Card => ({
  color: '#4a6898',
  contents: [],
  count: 1,
  icon: 'magic-swirl',
  icon_back: 'magic-swirl',
  tags: [],
  title: 'New Card',
  layout: {}
});

export function createNewCardContent(type: CardContentTypeV2): CardContent {
  const content = {
    id: uuid4(),
    type,
    content: ''
  } as CardContent;

  return content;
}

/**
 * Create a multicard based on the cards passed.
 * This creates a partial card, where all values that are equal in all cards
 * are set to that value, and all values that are inequal are undefined.
 *
 * @param cards The cards to create a multicard from
 * @returns The created multicard
 */
export function createMultiCard(cards: Card[]): Partial<Card> {
  function setValues<T>(checkValues: T[], object: T): T {
    const newObj: Partial<T> = {};

    Object.entries(object).forEach(([key, value]) => {
      if (key === 'contents') {
        return;
      }

      if (typeof value === 'object' && !Array.isArray(value)) {
        newObj[key] = setValues(
          checkValues.map((v) => v[key]),
          object[key]
        );
        return;
      }

      if (checkValues.every((c) => c[key] === object[key])) {
        newObj[key] = object[key];
      } else {
        newObj[key] = null;
      }
    });

    return newObj as T;
  }

  const card = setValues<Partial<Card>>(cards, cards[0]);

  return card;
}

export function removeEmpty(obj: unknown): unknown {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) => v != null)
      .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
  );
}
