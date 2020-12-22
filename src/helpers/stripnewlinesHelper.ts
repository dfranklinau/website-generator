import Handlebars from 'handlebars';

export const stripnewlinesHelper: Handlebars.HelperDelegate = (value) => {
  return new Handlebars.SafeString(value.replace(/[\r\n]+/g, ' '));
};
