import Handlebars from 'handlebars';

export const equalHelper: Handlebars.HelperDelegate = (
  value,
  target,
  options: Handlebars.HelperOptions
): string => {
  if (value === target) {
    return options.fn(options.data.root);
  }

  return options.inverse(options.data.root);
};
