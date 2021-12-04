import { isCardContentType } from "../model/card";
import type Card from "../model/card";
import type { CardContent } from "../model/card";
import { SPLIT_REGEX } from "./constants";

export function parseCards(json: string): Card[] {
    const cards = JSON.parse(json, transformer) as Card[];

    cards.forEach((card) => {
        if (!card.layout) {
            card.layout = {};
        }
    })

    return cards;
}

export function parseCard(json: string): Card {
    const card = JSON.parse(json, transformer) as Card;

    if (!card.layout) {
        card.layout = {};
    }

    return card;
}

function transformer(key: string, value: never) {
    if (key === "contents") {
        return parseCardContents(value);
    }

    return value;
}

export function parseCardContents(value: string[]): CardContent[] {
    let subtitleIndex = -1;
    const subtitleToSectionList: number[] = [];

    const mapped: CardContent[] = value?.map((element: string, index: number) => {
        // eslint-disable-next-line prefer-const
        let [type, ...content] = element.split(SPLIT_REGEX);

        if (!isCardContentType(type)) {
            // throw new CardContentError(`'${type}' is not a valid content type`)
            type = 'text';
        }

        if (type === "subtitle") {
            subtitleIndex = index
        } else if (type === "rule" && (subtitleIndex + 1) === index) {
            subtitleToSectionList.push(subtitleIndex)
        }

        return {
            type: type,
            content: content.join(" | "),
        } as CardContent;
    });

    subtitleToSectionList.forEach((index) => {
        mapped[index].type = "section";
        mapped.splice(index+1, 1)
    })

    return mapped;
}

export class CardContentError extends Error {}