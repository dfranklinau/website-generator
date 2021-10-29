import Handlebars from 'handlebars';

export const isarrayHelper: Handlebars.HelperDelegate = (
  value: string,
  options: Handlebars.HelperOptions
): string => {
  if (Array.isArray(value)) {
    return options.fn(options.data.root);
  }

  return options.inverse(options.data.root);
};
