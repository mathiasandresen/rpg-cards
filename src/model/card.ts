import type { CardContentTypeV2 } from '$lib/card-content-types';
import type ColorResolvable from './color-resolvable';

export default interface Card {
  count: number;
  color: ColorResolvable;
  title: string;
  icon: string;
  icon_back: string;
  text_back?: string;
  contents: CardContent[];
  tags: string[];
  layout: CardLayout;
}

export interface CardContent {
  type: CardContentTypeV2;
  content: string;
  id?: string;
}

export interface CardLayout {
  base_font_size?: string;
  text_font_size?: string;
  title_font_size?: string;
  custom_css?: string;
}
