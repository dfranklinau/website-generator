// This example helper is used in `templates/section.hbs`.
module.exports = function(value, pad) {
  if (typeof pad === "number" && pad > 0) {
    const padding = pad - value.toString().length;

    if (padding > 0) {
      return `${"0".repeat(padding)}${value}`;
    }
  }

  return value.toString();
};
