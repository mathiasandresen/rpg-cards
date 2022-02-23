import sanitize from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true });

export function renderText(input: string): string {
  const html = md.render(input);
  return sanitizeHtml(html?.replace('\\|', '|') ?? '');
}

export const sanitizeHtml = (input: string): string =>
  sanitize(input, {
    allowedSchemes: ['http', 'https']
  });
