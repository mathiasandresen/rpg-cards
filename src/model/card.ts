import type ColorResolvable from "./color-resolvable";

export default interface Card {
    count: number;
    color: ColorResolvable;
    title: string;
    icon: string;
    icon_back: string;
    contents: CardContent[];
    tags: string[];
}

export interface CardContent {
    type: CardContentType;
    content: string;
}

const cardContentTypes = [
    "subtitle",
    "rule",
    "property",
    "description",
    "text",
    "section",
    "boxes",
    "dndstats",
    "fill",
    "bullet",
    "picture",
] as const;

export type CardContentType = typeof cardContentTypes[number];


export function isCardContentType(x: string): x is CardContentType {
    return cardContentTypes.some(t => t === x);
}