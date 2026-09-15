---
title: Creating shortcodes
sidebar_position: 5
---

Shortcodes, like templates, are reusable snippets of HTML that can be
referenced. Unlike templates, shortcodes are directly Markdown files.

Create a shortcode by creating a named file in the `shortcodes` folder:

```
shortcodes
└── my-shortcode.hbs
```

The shortcode can then be referenced in Markdown using either inline or block
shortcode syntax:

```markdown
An inline shortcode has a self-closing tag.
{{%my-shortcode/%}}

A block shortcode has open and closing tags.
{{%my-shortcode%}}
{{%/my-shortcode%}}
```

## Creating an inline shortcode

Create a Handlebars file, e.g. `inline.hbs`:

```handlebars title="shortcodes/inline.hbs"
<div class="inline">This is an inline shortcode.</div>
```

Then reference the shortcode in Markdown by using the file name as the shortcode
tag:

```markdown title="content/post.md"
# Hello
This is a paragraph in Markdown.
{{%inline/%}}
```

This will create the following output:

```html title="build/post.html"
<h1>Hello</h1>
<p>This is a paragraph in Markdown.</p>
<div class="inline">This is an inline shortcode.</div>
```

## Creating a block shortcode

Create a Handlebars file, e.g. `block.hbs`. Use the `{{&content}}` tag in the
shortcode to choose where the block shortcode's content should be placed: 

```handlebars title="shortcodes/block.hbs"
<div class="inline">{{&content}}</div>
```

Then reference the shortcode in Markdown by using the file name as the shortcode
tag:

```markdown title="content/post.md"
# Hello
{{%block%}}
This is a paragraph in Markdown.
{{%/block%}}
```

This will create the following output:

```html title="build/post.html"
<h1>Hello</h1>
<div class="inline">
  <p>This is a paragraph in Markdown.</p>
</div>
```

## Using shortcode parameters

Any shortcode can be given parameters:

```markdown
{{%shortcode value="shortcode"/%}}
```

These parameters can be accessed using the `params` variable in a shortcode's
Handlebars template:

```handlebars
<p>The parameter value is <span>{{params.value}}</span>.</p>
```

Which will output as:

```html
<p>The parameter value is <span>shortcode</span>.</p>
```

### Array-values

To pass an array to a shortcode, use the same parameter name multiple times,
e.g.:

```markdown
{{%shortcode value="One" value="Two"/%}}
```

This will create the following array on the `params` variable:

```json
{
  "params": {
    "value": ["One", "Two"]
  }
}
```

Use the `#each` block in Handlebars to loop over the `value` array:

```handlebars
<ul>
  {{#each params.value}}
    <li>{{&this}}</li>
  {{/each}}
</ul>
```

Which will output as:

```html
<ul>
  <li>One</li>
  <li>Two</li>
</ul>
```

## Example of a blockquote shortcode

The following shortcode demonstrates how a HTML blockquote can be inserted into
a Markdown file, allowing for a conditional author citation:

```handlebars title="shortcodes/blockquote.hbs"
<figure>

  <blockquote>
    {{&content}}
  </blockquote>

  {{#if params.citation}}
    <figcaption>
      <cite>{{params.citation}}</cite>
    </figcaption>
  {{/if}}

</figure>
```

The shortcode is referenced in Markdown as a block shortcode:

```markdown
{{%blockquote citation="Author"%}}
Lorem ipsum.
{{%/blockquote%}}
```

Which will output as:

```html
<figure>

  <blockquote>
    <p>Lorem ipsum.</p>
  </blockquote>

  <figcaption>
    <cite>Author</cite>
  </figcaption>

</figure>
```
