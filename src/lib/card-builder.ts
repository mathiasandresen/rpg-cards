import type { CardContent, CardContentType } from '../model/card';
import type Card from '../model/card';
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

export function createNewCardContent(type: CardContentType): CardContent {
  const content = {
    id: uuid4(),
    type,
    content: undefined
  } as CardContent;

  switch (type) {
    case 'subtitle':
    case 'section':
    case 'bullet':
    case 'text':
      content.content = '';
      break;
    case 'description':
    case 'property':
      content.content = ' | ';
      break;
    case 'boxes':
      content.content = '3 | ';
      break;
  }

  return content;
}

export const createMultiCard = (cards: Card[]): Partial<Card> => {
  const firstCard = cards[0];

  const card: Partial<Card> = {};

  if (cards.every((c) => c.count === firstCard.count)) card.count = firstCard.count;
  if (cards.every((c) => c.color === firstCard.color)) card.color = firstCard.color;
  if (cards.every((c) => c.icon === firstCard.icon)) card.icon = firstCard.icon;
  if (cards.every((c) => c.icon_back === firstCard.icon_back)) card.icon_back = firstCard.icon_back;
  if (cards.every((c) => c.layout === firstCard.layout)) card.layout = firstCard.layout;
  if (cards.every((c) => c.title === firstCard.title)) card.title = firstCard.title;
  if (cards.every((c) => c.text_back === firstCard.text_back)) card.text_back = firstCard.text_back;

  return card;
};
