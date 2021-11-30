import Handlebars from 'handlebars';

const getPrimitive = (value: unknown): string => {
  // @ts-expect-error: `value` is a primitive type, which will have `toString()`.
  return value?.toString() || '';
};

export const sortHelper: Handlebars.HelperDelegate = (
  list: unknown[],
  property: string,
  options: Handlebars.HelperOptions,
  ascending = false
): string => {
  const sorted = list.sort((a: unknown, b: unknown) => {
    const aItem: string = getPrimitive(
      property.split('.').reduce((object: unknown, prop: string) => {
        if (Object.prototype.toString.call(object) === '[object Object]') {
          return (object as Record<string, unknown>)[prop];
        }

        return '';
      }, a)
    );

    const bItem: string = getPrimitive(
      property.split('.').reduce((object: unknown, prop: string) => {
        if (Object.prototype.toString.call(object) === '[object Object]') {
          return (object as Record<string, unknown>)[prop];
        }

        return '';
      }, b)
    );

    if (aItem > bItem) {
      return ascending ? 1 : -1;
    } else if (aItem < bItem) {
      return ascending ? -1 : 1;
    }

    return 0;
  });

  let value = '';

  sorted.forEach((item: unknown) => {
    value += options.fn(item);
  });

  return value;
};
