import Handlebars from 'handlebars';

export const dateformatHelper: Handlebars.HelperDelegate = (
  value: string,
  format: string,
): Handlebars.SafeString => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(value);

  if (format === 'D MMMM YYYY') {
    value = `${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  return new Handlebars.SafeString(value);
};
