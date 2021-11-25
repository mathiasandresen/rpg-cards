import { isCardContentType } from "../model/card";
import type Card from "../model/card";
import type { CardContent } from "../model/card";

export function parseCard(json: string): Card {
    return JSON.parse(json, transformer);
}

function transformer(key: string, value: any) {
    if (key === "contents") {

        let subtitleIndex = -1;
        const subtitleToSectionList: number[] = [];

        const mapped: CardContent[] = value.map((element: string, index: number) => {
            const [type, ...content] = element.split(" | ");

            if (!isCardContentType(type)) {
                throw new CardContentError(`'${type}' is not a valid content type`)
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

    return value;
}

export class CardContentError extends Error {}