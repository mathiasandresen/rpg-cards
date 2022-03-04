export interface LegacyCard {
  count: number;
  color: string;
  title: string;
  icon: string;
  icon_back: string;
  contents: string[];
  tags: string[];
}

export function isLegacyCard(object: unknown): object is LegacyCard {
  const obj = object as LegacyCard;

  return (
    typeof obj.count === 'number' &&
    typeof obj.color === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.icon === 'string' &&
    typeof obj.icon_back === 'string' &&
    Array.isArray(obj.contents) &&
    Array.isArray(obj.tags)
  );
}
