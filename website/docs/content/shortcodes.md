---
title: Shortcodes
sidebar_position: 5
---

Shortcodes are written in the Handlebars template language. They are similar to
partials in that they are reusable blocks of HTML, the difference being that
partials are referenced in templates and shortcodes are referenced in Markdown
files.

Shortcodes come in two variants, inline and block.

## Inline shortcodes

Inline shortcodes look like:

```markdown
{{%shortcode/%}}
```

## Block shortcodes

Block shortcodes can contain content and other shortcodes within them. They must
**always** have open and closing tags on their own lines. Block shortcodes look
like:

```markdown
{{%shortcode%}}
Content
{{%/shortcode%}}
```

Use the `content` variable in a shortcode's Handlebars template to access the
nested content within a shortcode, e.g.:

```handlebars
<div class="shortcode">
  {{&content}}
</div>
```

**WARNING:** block shortcodes **do not** work on a single line, e.g.:

```markdown
<!-- This is invalid. -->
{{%shortcode%}}Content{{%/shortcode%}}
```

## Shortcode attributes

### Single value attributes

Attributes can be passed to inline shortcodes and the opening tags of
block shortcodes:

```markdown
{{%shortcode key="value"/%}}
```

```markdown
{{%shortcode key="value"%}}
Content
{{%/shortcode%}}
```

Use the `params` variable in a shortcode's Handlebars template to access the
attributes, e.g.:

```handlebars
<div id="{{params.id}}" class="shortcode">
  {{&content}}
</div>
```

### Array attributes

To pass an array to a shortcode, use the same attribute name multiple times,
e.g.:

```markdown
{{%shortcode key="one" key="two"/%}}
```

This will create the following array on the `params` variable:

```json
{
  "params": {
    "key": ["one", "two"]
  }
}
```

Use the `#each` block in Handlebars to loop over the `key` array:

```handlebars
<ul>
  {{#each params.key}}
    <li>{{&this}}</li>
  {{/each}}
</ul>
```
