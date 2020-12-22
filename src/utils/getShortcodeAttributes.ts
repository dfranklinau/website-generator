import type { MarkdownParser } from '../MarkdownParser';

export const getShortcodeAttributes = (
  name: string,
  match: string,
  markdownParser: MarkdownParser
): Record<string, unknown> => {
  const pattern = new RegExp(`${name}((?=\\s).+)[%>]}}`);
  const attributes = match.match(pattern);
  const params: Record<string, string | string[]> = {};

  if (!attributes?.[1]) {
    return params;
  }

  /**
   * [1] Remove a trailing forward slash if there is one.
   *
   * [2] Split the matched attribute string into an array by spaces, e.g.:
   *     `id="value" class="css"`
   *
   *     ...by spaces, to get:
   *     `['id="value"', 'class="css"']`
   */
  attributes[1]
    .replace(/\/$/, '') // [1]
    .trim()
    .split(/ +(?=[\w]+=)/) // [2]
    .forEach((attribute) => {
      const parts = attribute.split('=');
      const key = parts?.[0] || null;
      let value = parts?.[1]?.replace(/['"]/g, '') || null;

      if (key && value) {
        // Support inline Markdown in attribute values.
        value = markdownParser.parseInline(value);

        /**
         * If the key already exists then we should create an array of values
         * under the one key, e.g.:
         *
         * `{{%shortcode key="one" key="two"/%}}`
         *
         * ...should be interpreted as:
         *
         * ```
         * {
         *   key: ['one', 'two']
         * }
         * ```
         */
        if (params[key]) {
          const existingParam = params[key];

          if (Array.isArray(existingParam)) {
            existingParam.push(value);
          } else {
            params[key] = [existingParam, value];
          }
        } else {
          params[key] = value;
        }
      }
    });

  return params;
};
