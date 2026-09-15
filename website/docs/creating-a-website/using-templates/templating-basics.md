---
title: Templating Basics
sidebar_position: 1
---

## Template structure

An example structure of the template directory is below:

```
templates/
├─ blog/
│  ├─ page.hbs
│  └─ section.hbs
├─ _partials/
│  ├─ header.hbs
│  ├─ footer.hbs
│  └─ socials/
│     └─ facebook.hbs
├─ _404.hbs
├─ _base.hbs
├─ _index.hbs
├─ page.hbs
└─ section.hbs
```

## Rendering content

To render content in a template, use the `&content` variable, e.g.:

```handlebars
<div class="container">
  {{&content}}
</div>
```

Regardless of the template type, `&content` is how all nested content is
rendered. The base and content templates **will not** render any content without
this variable.

