---
title: Types of templates
sidebar_position: 1
---

There are four types of templates that website-generator recognises:

* a base template;
* content (page and section) templates;
* partial templates; and
* page templates.

There are also [reserved templates](#reserved-templates) for specific pages.

## The base template

The base template is named `_base.hbs`. This template is required for
website-generator to run.

It must be placed at the root of the `templates` directory and serves as the
base HTML document.

An example of a base template is below:

```handlebars title="templates/_base.hbs"
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Website</title>
  </head>

  <body>
    <main id="main">
      {{{content}}}
    </main>
  </body>
</html>
```

## Content templates

Content templates define the HTML that is wrapped Markdown files. As mentioned
in [Pages and sections](../writing-content/pages-and-sections.md), content is
categorised as either a page or a section, and templates can be created for both
content types.

All content templates inherit the base template.

Content templates can be generic or written for specific pages or sections. For
more information, see [The template lookup](./the-template-lookup.md).

## Partial templates

Partial templates contain snippets of HTML that can be referenced by other
templates. Partials must be placed within the `templates/_partials` directory.

Partials are referenced in any other template with the following syntax:

```handlebars
{{> partial}}
```

As an example, for the following file structure&hellip;

```
templates/
└─ _partials/
   ├─ header.hbs
   ├─ footer.hbs
   └─ socials/
      └─ facebook.hbs
```

&hellip;will create the following partials:

```handlebars
{{> header}}
{{> footer}}
{{> socials-facebook}}
```

:::note
Nested directories are handled by separating the directory and file name with a
hyphen.
:::

## Reserved templates

### The index (home page) template

The index template is named `_index.hbs` and is **optional**

It is used to define the template for the `index.html` file rendered at the root
of the website, often referred to as the home page.

### The 404 page template

The 404 page template is named `_404.hbs` and is **optional**, but recommended.

It is used to generate a `404.html` page, which can be used by web servers for
handling 404 status codes.
