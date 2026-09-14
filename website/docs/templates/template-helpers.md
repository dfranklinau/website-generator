---
title: Template Helpers
sidebar_position: 5
---

website-generator includes some of its own helpers in addition to the [built-in
helpers of Handlebars](https://handlebarsjs.com/guide/builtin-helpers.html).

Some of the below examples reference front matter to demonstrate their
functionality but any [template
variable](/website-generator/templates/template-variables/) can be passed to
these additional helpers.

## `dateformat`

Formats a date string into a given format, provided that it is supported.
Supported formats are:

* `D MMMM YYYY`, e.g. 1 January 2000.

### Usage

Define a date in the front matter to reference in a template.

```toml title="content/index.md"
+++
date = "2020-01-01"
+++
```

```handlebars title="templates/page.hbs"
<p>{{dateformat page.date 'D MMMM YYYY'}}.</p>
```

```html title="build/index.html"
<p>1 January 2000.</p>
```

## `equal`

Performs a strict equality check in JavaScript (`===`) against two values.
Supports else sections.

### Usage

#### Without else section

```handlebars title="templates/page.hbs"
{{#equal true true}}
<p>true is equal to true.</p>
{{/equal}}
```

```html title="build/index.html"
<p>true is equal to true.</p>
```

#### With else section

```handlebars title="templates/page.hbs"
{{#equal true false}}
<p>true is equal to true.</p>
{{else}}
<p>true is not equal to false.</p>
{{/equal}}
```

```html title="build/index.html"
<p>true is not equal to false.</p>
```

## `markdownify`

Parses the supplied value as Markdown.

### Usage

```handlebars title="templates/page.hbs"
<p>{{markdownify **This is bold text.**}}</p>
```

```html title="build/index.html"
<p><strong>This is bold text.</strong></p>
```

## `isarray`

Performs an array check in JavaScript using the `Array.isArray` method. Supports
else sections.

### Usage

Define an array in the front matter to reference in a template.

```toml title="content/index.md"
+++
array = [1, 2, 3]
+++
```

#### Without else section

```handlebars title="templates/page.hbs"
{{#isarray page.array}}
<p>This value is an array.</p>
{{/isarray}}
```

```html title="build/index.html"
<p>This value is an array.</p>
```

#### With else section

```handlebars title="templates/page.hbs"
{{#isarray false}}
<p>This value is an array.</p>
{{else}}
<p>This value is not an array.</p>
{{/isarray}}
```

```html title="build/index.html"
<p>This value is not an array.</p>
```

## `sort`

Sorts an array of JavaScript objects using a specified key.

### Usage

Define an array of items in the front matter to reference in a template.

```toml title="content/index.md"
+++
object = [{ id = 1 }, { id = 2 }, { id = 3 }]
+++
```

#### With default sort order

A descending sort order is applied by default:

```handlebars title="templates/page.hbs"
<ul>
{{#sort page.object 'id'}}
  <li>{id}</li>
{{/isarray}}
</ul>
```

```html title="build/index.html"
<ul>
  <li>3</li>
  <li>2</li>
  <li>1</li>
</ul>
```

#### With ascending sort order

Pass `ascending=true` for ascending sort order:

```handlebars title="templates/page.hbs"
<ul>
{{#sort page.object 'id' ascending=true}}
  <li>{id}</li>
{{/isarray}}
</ul>
```

```html title="build/index.html"
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

## `stripnewlines`

Removes all newlines from a string.

### Usage

```handlebars title="templates/page.hbs"
<p>{{stripnewlines "This paragraph contains
no newlines."}}</p>
```

```html title="build/index.html"
<p>This paragraph contains no newlines.</p>
