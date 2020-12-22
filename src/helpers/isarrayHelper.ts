import Handlebars from 'handlebars';

export const isarrayHelper: Handlebars.HelperDelegate = (
  value,
  options: Handlebars.HelperOptions
) => {
  if (Array.isArray(value)) {
    return options.fn(options.data.root);
  }

  return options.inverse(options.data.root);
};
