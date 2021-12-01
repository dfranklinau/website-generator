import type { PreparedContentType } from '../prepareContent';

export const getPageTitle = (
  content: PreparedContentType,
  section: PreparedContentType | null,
): string => {
  const pageTitle: string | unknown = content.markdown.matter?.title;
  const sectionTitle: string | unknown | undefined =
    section?.markdown.matter?.title;
  const sectionURL: string | false | undefined = section?.markdown.options.url;

  if (
    !pageTitle ||
    typeof pageTitle !== 'string' ||
    (pageTitle === sectionTitle && sectionURL === '/')
  ) {
    return '';
  }

  if (
    sectionTitle &&
    typeof sectionTitle === 'string' &&
    pageTitle !== sectionTitle &&
    sectionURL !== '/'
  ) {
    return `${pageTitle} / ${sectionTitle}`;
  }

  return pageTitle;
};
