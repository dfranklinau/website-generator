---
title: Creating helpers
sidebar_position: 2
---

In addition to the [built-in helpers that website-generator
provides](./built-in-helpers.md), website-specific helpers can also be defined
and automatically loaded at render time for use in templates.

Helpers are placed in the `helpers` folder, and their file name is converted to
pascal case when selecting a name to register them as in Handlebars, i.e. a file
named `my-helper` will be available as `{{my-helper}}` in a Handlebars template.

Helpers are written as CommonJS modules with an exported function. The function
will be passed to `Handlebars.registerHelper` at runtime. For more information
and examples on how to create Handlebars helpers, see [Block
helpers](https://handlebarsjs.com/guide/block-helpers.html).

An example of a helper that pads a number with a set number of zeroes is below:

```javascript title="helpers/pad-zeroes.js"
module.exports = function(value, pad) {
  if (typeof pad === "number" && pad > 0) {
    const padding = pad - value.toString().length;

    if (padding > 0) {
      return `${"0".repeat(padding)}${value}`;
    }
  }

  return value.toString();
};
```

This can be referenced in a template as:

```handlebars title="templates/section.hbs"
<h1>{{page.title}}</h1>

<ul>
  {{#each section.children}}
    <li>{{pad-zeroes @index 3}}</li>
  {{/each}}
</ul>
```

For a section with three children, this would be rendered as:

```html title="build/section/index.html"
<h1>My Section</h1>

<ul>
  <li>000</li>
  <li>001</li>
  <li>002</li>
</ul>
```
