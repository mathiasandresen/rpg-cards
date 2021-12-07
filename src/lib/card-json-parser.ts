import { isCardContentType } from '../model/card';
import type Card from '../model/card';
import type { CardContent } from '../model/card';
import { SPLIT_REGEX } from './constants';
import { uuid4 } from './uuid';
import type { CardCollection } from '../model/card-collection';
import { isCardCollection } from '../model/card-collection';

export function parseCards(json: string, shouldConvertSubtitlePlusRuleToSection = false): Card[] {
  const importObject = JSON.parse(json);
  let cards: Card[];

  if (isCardCollection(importObject)) {
    cards = importObject.cards;
  } else if (Array.isArray(importObject)) {
    cards = JSON.parse(json, (key, value: never) => transformer(key, value)) as Card[];
  } else {
    console.warn('Uknown import format!');
    return [];
  }

  cards.forEach((card) => {
    if (!card.layout) {
      card.layout = {};
    }

    if (shouldConvertSubtitlePlusRuleToSection) {
      card.contents = convertSubtitlePlusRuleToSection(card.contents);
    }
  });

  return cards;
}

function convertSubtitlePlusRuleToSection(contents: CardContent[]): CardContent[] {
  let subtitleIndex = -1;
  const subtitleToSectionList: number[] = [];

  const newContents = [...contents];

  newContents.forEach((content, index) => {
    if (content.type === 'subtitle') {
      subtitleIndex = index;
    } else if (content.type === 'rule' && subtitleIndex + 1 === index) {
      subtitleToSectionList.push(subtitleIndex);
    }
  });

  subtitleToSectionList.forEach((index) => {
    newContents[index].type = 'section';
    newContents.splice(index + 1, 1);
  });

  return newContents;
}

function transformer(key: string, value: never) {
  if (key === 'contents') {
    return parseCardContents(value);
  }

  return value;
}

export function parseCardContents(value: string[]): CardContent[] {
  const mapped: CardContent[] = value?.map((element: string) => {
    // eslint-disable-next-line prefer-const
    let [type, ...content] = element.split(SPLIT_REGEX);

    if (!isCardContentType(type)) {
      // throw new CardContentError(`'${type}' is not a valid content type`)
      type = 'text';
    }

    return {
      type: type,
      content: content.join(' | '),
      id: uuid4()
    } as CardContent;
  });

  return mapped;
}

export class CardContentError extends Error {}

export function generateExportObject(cards: Card[]): CardCollection {
  return {
    version: '1',
    cards
  };
}
