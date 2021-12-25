import sanitize from 'sanitize-html';

export function renderText(input: string): string {
  return sanitizeHtml(input?.replace('\\|', '|') ?? '');
}

export const sanitizeHtml = (input: string): string =>
  sanitize(input, {
    allowedSchemes: ['http', 'https']
  });
