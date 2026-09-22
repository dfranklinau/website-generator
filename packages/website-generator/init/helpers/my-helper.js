/**
 * This example helper is used in `templates/section.hbs`.
 *
 * @example 
 * // returns "001"
 * {{my-helper 1 3}}
 */
module.exports = function(value, pad) {
  if (typeof pad === "number" && pad > 0) {
    const padding = pad - (value + 1).toString().length;

    if (padding > 0) {
      return `${"0".repeat(padding)}${value + 1}`;
    }
  }

  return value.toString();
};
