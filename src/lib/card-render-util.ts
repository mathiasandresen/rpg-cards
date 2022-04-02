import sanitize from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true });

type RenderTextMarkdownOptions = {
  disabled?: boolean;
  inline?: boolean;
};

export type RenderTextOptions = {
  markdown?: RenderTextMarkdownOptions;
};

export function renderText(input?: string, options?: RenderTextOptions): string {
  if (!input) {
    return '';
  }

  let html: string;

  if (!options?.markdown?.disabled) {
    if (options?.markdown?.inline ?? true) {
      html = md.renderInline(input);
    } else {
      html = md.render(input);
    }
  } else {
    html = input;
  }

  return sanitizeHtml(html?.replace('\\|', '|') ?? '');
}

export const sanitizeHtml = (input: string): string =>
  sanitize(input, {
    allowedSchemes: ['http', 'https']
  });
