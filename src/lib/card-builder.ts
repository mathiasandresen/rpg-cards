import type { CardContent, CardContentType } from "../model/card";
import type Card from "../model/card";
import { uuid4 } from "./uuid";

export const createNewCard = (): Card => ({
    color: "#4a6898",
    contents: [],
    count: 1, 
    icon: "magic-swirl",
    icon_back: "magic-swirl",
    tags: [],
    title: "New Card",
    layout: {},
})

export function createNewCardContent(type: CardContentType): CardContent {
  const content = {
    id: uuid4(),
    type,
    content: undefined,
  } as CardContent;

  switch (type) {
    case "subtitle":
    case "section":
    case "bullet":
    case "text":
      content.content = "";
      break;
    case "description":
    case "property":
      content.content = " | "
      break;
    case "boxes":
      content.content = "3 | "
      break;
  }

  return content;
}