---
title: Templates
sidebar_position: 4
---

Templates are what website-generator uses when generating HTML. They define the
base HTML that renders across all pages, as well as HTML for sections and pages.

Templates are written in the [Handlebars](https://handlebarsjs.com) template
language.

:::danger
The contents of this page may be incorrect or outdated because the underlying
templating API has been changed after the time of writing. Please use caution
when referencing this page.
:::

Templates have access to variables that contain data about the current page,
section and website, as well as runtime data such as the date.

All templates are loaded from the `templates` directory.


## Templating basics

### Template structure

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

### Rendering content

To render content in a template, use the `&content` variable, e.g.:

```handlebars
<div class="container">
  {{&content}}
</div>
```

Regardless of the template type, `&content` is how all nested content is
rendered. The base and content templates **will not** render any content without
this variable.

## Types of templates

There are several templates that website-generator uses when generating HTML
from Markdown files. These are:

* a base template;
* content templates;
* partial templates; and
* page templates.

### Base template

The base template is always named `_base.hbs`. This template is required for
website-generator to run, and only one base template is necessary.

It is applied to **every** page and serves as the base HTML document of the
entire site.

### Content templates

Content templates define the HTML that will wrap around page and section
Markdown files.

#### Page templates

Page templates are named `page.hbs`. Page templates for specific pages can be
defined by copying the directory structure under `content` (see [Template
lookup](#template-lookup) for more information).

#### Section templates

Section templates are named `section.hbs`. Section templates for specific
sections can be defined by copying the directory structure under `content` (see
[Template lookup](#template-lookup) for more information).

### Partial templates

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

### Page templates

Page templates define the HTML for specific pages.

#### Home page template

The 404 page template is always named `_index.hbs`. It is **optional** and is
used to override any page or section templates for the page rendered at the root
of the website.

#### 404 page template

The 404 page template is always named `_404.hbs`. It is **optional** and is used
to generate a `404.html` page.

## Template variables

Templates have access to a range of variables at runtime, which can be used by
Handlebars to customise the output of HTML.

Template variables can be referenced in Handlebars by using the variable name
they are assigned, e.g. to access page data, use the `page` variable:

```handlebars
{{page.title}}
```

### Configuration

The `website-generator.config.json` contents are made available in the `config`
variable. All key-value pairs are accessible.

### Head

The `head` variable acts as a helper object that contains data commonly included
in the `<head>` tag.

| Name         | Description                      |
| ------------ | -------------------------------- |
| `head.title` | The title of the page or section |

### Runtime

The `runtime` variable contains data that may be useful when generating the HTML
output.

| Name                | Description                              |
| ------------------- | ---------------------------------------- |
| `runtime.date.year` | The year that the website was generated. |

### Page

The `page` variable contains any front matter that has been defined. For
example, the following front-matter:

```markdown
+++
title: Post
description: A short description.
+++
```

&hellip;will generate the following properties in `page`:

- `page.title`; and
- `page.description`.

Some front-matter keys are reserved to enable specific features (see
[Front-matter](/website-generator/docs/writing-content/markdown#front-matter)).


### Section

Section templates have access to a `section` variable which:

* contains any front matter that has been defined in the `_index.md` file; and
* includes an array of each child page's front-matter and file information.

For example, the following file structure of a section with two posts:

```
content/section/_index.md
content/section/post-one.md
content/section/post-two.md
```

&hellip;where the front-matter for `_index.md` is:

```markdown
+++
title: Section
description: A short description.
+++
```

&hellip;will generate the following data in the `section` variable:

```json
{
  "section": {
    "title": "Section",
    "description": "A short description.",
    "children": [
      {
        "markdown": {
          "content": "",
          "matter": {},
          "options": {}
        },
        "name": "post-one.md",
        "filePath": "content/section/post-one.md",
        "outputPath": "build/section/post-one/index.html",
        "outputURL": "/section/post-one/"
      },
      {
        "markdown": {
          "content": "",
          "matter": {},
          "options": {}
        },
        "name": "post-two.md",
        "filePath": "content/section/post-two.md",
        "outputPath": "build/section/post-two/index.html",
        "outputURL": "/section/post-two/"
      }
    ]
  }
}
```

Nested sections inherit all section matter from their parent section but can
also override values with their own front matter, which will in turn be made
available to any children of that section via `section`.

### Data

Any sections or pages with a [JSON data file](/website-generator/content/json/)
can reference the file's contents with the `data` variable.

For example, the following JSON data file:

```json title="_data.json"
{
  "items": [
    {
      "title": "A"
    },
    {
      "title": "B"
    }
  ],
  "total": 5
}
```

&hellip;can be referenced using `data.items` or `data.total` in templates.

## Template lookup

When a page or section template is being generated, website-generator will do a
series of checks to see which template should be loaded, based on the currenty
directory.

For example, a Markdown file located under
`/content/section/nested-section/_index.md` will have the following template
lookup:

1. `templates/section/nested-section/_index.hbs`
2. `templates/section/nested-section/section.hbs`
3. `templates/section/_index.hbs`
4. `templates/section/section.hbs`
5. `templates/_index.hbs`
6. `templates/section.hbs`
7. `templates/_base.hbs`

Each template is checked in order to see if it exists. If it does it is applied,
but if not the lookup will continue down the list until it finds a template that
does. The `_base.hbs` template is used as the default template for every lookup.
