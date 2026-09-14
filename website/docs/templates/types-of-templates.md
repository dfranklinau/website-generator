---
title: Types of Templates
sidebar_position: 2
---

There are several templates that website-generator uses when generating HTML
from Markdown files. These are:

* a base template;
* content templates;
* partial templates; and
* page templates.

## Base template

The base template is always named `_base.hbs`. This template is required for
website-generator to run, and only one base template is necessary.

It is applied to **every** page and serves as the base HTML document of the
entire site.

## Content templates

Content templates define the HTML that will wrap around page and section
Markdown files.

## Page templates

Page templates are named `page.hbs`. Page templates for specific pages can be
defined by copying the directory structure under `content` (see [Template
lookup](#template-lookup) for more information).

## Section templates

Section templates are named `section.hbs`. Section templates for specific
sections can be defined by copying the directory structure under `content` (see
[Template lookup](#template-lookup) for more information).

## Partial templates

Partial templates are reusable snippets of HTML that can be referenced by other
templates. Partials must be placed within the `templates/_partials` directory.

Partials are referenced in Handlebars templates with the following syntax:

```handlebars
{{> partial}}
```

As an example, for the following file structure:

```
templates/
└─ _partials/
   ├─ header.hbs
   ├─ footer.hbs
   └─ socials/
      └─ facebook.hbs
```

&hellip;the corresponding partial templates that can be used would be:

```handlebars
{{> header}}
{{> footer}}
{{> socials-facebook}}
```

Note that nested directories are handled by separating the directory and file
name with a hyphen (`-`).

## Special templates

Special templates define the HTML for specific pages or use cases.

### Home page template

The 404 page template is always named `_index.hbs`. It is **optional** and is
used to override any page or section templates for the page rendered at the root
of the website.

### 404 page template

The 404 page template is always named `_404.hbs`. It is **optional** and is used
to generate a `404.html` page.
