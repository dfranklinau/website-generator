import Handlebars from 'handlebars';

export const sortHelper: Handlebars.HelperDelegate = (
  list,
  property,
  options: Handlebars.HelperOptions
) => {
  const sorted = list.sort((a: unknown, b: unknown) => {
    const aDate = property
      .split('.')
      .reduce((p: Record<string, unknown>, prop: string) => {
        return p[prop];
      }, a);

    const bDate = property
      .split('.')
      .reduce((p: Record<string, unknown>, prop: string) => {
        return p[prop];
      }, b);

    if (aDate > bDate) {
      return -1;
    } else if (aDate < bDate) {
      return 1;
    }

    return 0;
  });

  let value = '';

  sorted.forEach((item: unknown) => {
    value += options.fn(item);
  });

  return value;
};
