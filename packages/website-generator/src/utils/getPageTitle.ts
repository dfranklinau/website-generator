import type { PreparedContentType } from '../prepareContent';

export const getPageTitle = (content: PreparedContentType): string => {
  const title: string | unknown = content.markdown.matter?.title;

  if (title && typeof title === 'string') {
    return title
  }

  return '';
};
