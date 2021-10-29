import Handlebars from 'handlebars';

export const stripnewlinesHelper: Handlebars.HelperDelegate = (
  value: string
): Handlebars.SafeString => {
  return new Handlebars.SafeString(value.replace(/[\r\n]+/g, ' '));
};
