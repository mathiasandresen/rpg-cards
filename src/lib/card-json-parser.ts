import { isCardContentType } from "../model/card";
import type Card from "../model/card";
import type { CardContent } from "../model/card";
import { SPLIT_REGEX } from "./constants";
import { uuid4 } from "./uuid";

export function parseCards(json: string, convertTopSubtitleToSection = false): Card[] {
    const cards = JSON.parse(json, (key, value: never) => transformer(key, value, convertTopSubtitleToSection)) as Card[];

    cards.forEach((card) => {
        if (!card.layout) {
            card.layout = {};
        }
    })

    return cards;
}

export function parseCard(json: string, convertTopSubtitleToSection = false): Card {
    const card = JSON.parse(json, (key, value: never) => transformer(key, value, convertTopSubtitleToSection)) as Card;

    if (!card.layout) {
        card.layout = {};
    }

    return card;
}

function transformer(key: string, value: never, convertTopSubtitleToSection = false) {
    if (key === "contents") {
        return parseCardContents(value, convertTopSubtitleToSection);
    }

    return value;
}

export function parseCardContents(value: string[], convertTopSubtitleToSection = false): CardContent[] {
    let subtitleIndex = -1;
    const subtitleToSectionList: number[] = [];

    const mapped: CardContent[] = value?.map((element: string, index: number) => {
        // eslint-disable-next-line prefer-const
        let [type, ...content] = element.split(SPLIT_REGEX);

        if (!isCardContentType(type)) {
            // throw new CardContentError(`'${type}' is not a valid content type`)
            type = 'text';
        }

        if (convertTopSubtitleToSection && type === "subtitle") {
            subtitleIndex = index
        } else if (type === "rule" && (subtitleIndex + 1) === index) {
            subtitleToSectionList.push(subtitleIndex)
        }

        return {
            type: type,
            content: content.join(" | "),
            id: uuid4(),
        } as CardContent;
    });

    if (convertTopSubtitleToSection) {
        subtitleToSectionList.forEach((index) => {
            mapped[index].type = "section";
            mapped.splice(index+1, 1)
        })
    }

    return mapped;
}

export class CardContentError extends Error {}