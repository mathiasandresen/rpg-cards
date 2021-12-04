import type ColorResolvable from "./color-resolvable";

export default interface Card {
    count: number;
    color: ColorResolvable;
    title: string;
    icon: string;
    icon_back: string;
    contents: CardContent[];
    tags: string[];
    layout?: CardLayout;
}

export interface CardContent {
    type: CardContentType;
    content: string;
    id?: string;
}

export const CardContentTypes = [
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

export type CardContentType = typeof CardContentTypes[number];

export function getCardContentType(content: string): CardContentType {
    const [type] = content.split(' | ');

    if (isCardContentType(type)) {
        return type;
    }

    return undefined;
}

export function isCardContentType(x: string): x is CardContentType {
    return CardContentTypes.some(t => t === x);
}

export interface CardLayout {
    base_font_size?: string;
    text_font_size?: string;
}