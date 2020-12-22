# website-generator

A static-site generator written in Node.js.


## Table of contents

- [Overview](#overview)
- [How it works](#how-it-works)
- [Content](#content)
    - [Sections](#sections)
    - [Pages](#pages)
    - [Markdown](#markdown)
    - [Front matter](#front-matter)
      - [`toc`](#toc)
      - [`url`](#url)
    - [Data](#data)
- [Templates](#templates)
    - [Base template](#base-template)
    - [404 template](#404-template)
    - [Content templates](#content-templates)
      - [Section templates](#section-templates)
      - [Page templates](#page-templates)
      - [Template lookup](#template-lookup)
      - [Variables](#variables)
    - [Partials](#partials)
- [Shortcodes](#shortcodes)
- [Assets](#assets)
- [Static](#static)


## Overview

website-generator can:

- generate HTML files from Markdown using templates written in
  [Handlebars](https://handlebarsjs.com);
- copy static assets to the build folder;
- parse CSS using PostCSS and copy the output to the build folder; and
- generate a `404.html` page.

Features include:

- a [template lookup](#template-lookup) based on the folder structure of the
  content;
- support for Markdown footnotes and description lists;
- [custom Markdown shortcodes](#shortcodes); and
- [template variables](#variables) using front-matter and global configuration.


## How it works

website-generator works by parsing files within the following directories:

- `content`;
- `templates` (with `_partials`);
- `shortcodes`;
- `assets`; and
- `static`.

| Directory    | Explanation                                                               |
| ------------ | ------------------------------------------------------------------------- |
| `content`    | The content of the website, written in Markdown.                          |
| `templates`  | HTML templates written in Handlebars and used at build time.              |
| `shortcodes` | HTML templates written in Handlebars and used directly in Markdown.       |
| `assets`     | CSS and JavaScript files that are processed (e.g. PostCSS) at build time. |
| `static`     | Files that are copied at build time without any transformations.          |

When website-generator runs, the compiled website is output to a `build`
directory.


## Content

All website content should be placed in the `content` folder. Content refers to:

- Markdown files; and
- page-specific assets, such as images or other files.

Markdown files are categorised as one of two types:

- sections; and
- pages.

### Sections

Sections are used to define front-matter that is inherited by its child pages
and sections. While they can render a standalone HTML page, they are commonly
used for rendering a HTML page that displays a lists of sub pages, e.g. a page
listing blog posts.

A section is defined by creating a file named `_index.md` file in a directory.
Any front-matter in this file is passed down to any pages and child sections.
The content of `_index.md` is also used to generate an `index.html` file for the
directory.

Example:

```
content/
├─ section/
│  ├─ _index.md
```

### Pages

A page is a standalone file, defined by creating a Markdown file that **is not**
named `_index.md`. They inherit any front-matter defined in sections. They are
used for rendering a standalone HTML page.

There are two kinds of pages:

- named pages; and
- index pages.

A named page (e.g. `./content/section/post.md`) will create the following file:

```
./build/section/page/index.html
```

An index page, which must always be named `index.md` (e.g.
`./content/section/post/index.md`), will also create the same file:

```
./build/section/page/index.html
```

Note that an index page **does not** have an underscore prefix.

Where named and index pages differ is that index pages are useful when a page
has assets that should be copied across with it. Think of named pages as
shorthand for index pages, i.e.: `./content/section/post.md` is the same as
`./content/section/post/index.md`.

The following files:

```
./content/section/post/index.md
./content/section/post/asset.jpg
```

...will be generated as:

```
./build/section/post/index.html
./build/section/post/asset.jpg
```

Example:

```
content/
├─ section/
│  ├─ _index.md
│  ├─ page1.md
│  ├─ page2.md
│  ├─ page3/
│  │  ├─ index.md
│  │  ├─ photo.jpg
```

The above example will generate the following HTML:

```
build/
├─ section/
│  ├─ index.html
│  ├─ page1/
│  │  ├─ index.html
│  ├─ page2/
│  │  ├─ index.html
│  ├─ page3/
│  │  ├─ index.html
│  │  ├─ photo.jpg
```

### Markdown

Markdown is rendered using the [remarkable
library](https://github.com/jonschlinkert/remarkable) and supports front-matter
written in TOML using
[gray-matter](https://github.com/jonschlinkert/gray-matter/).

Front-matter uses the `+++` delimiter.

Markdown files support custom shortcodes which are defined in the `shortcodes`
directory. (see [Shortcodes](#shortcodes))

### Front matter

Any front matter within a Markdown file is available for use within templates.

There are also special values that can be added to front matter which will allow
website-generator to perform special tasks. These are:

- `toc`; and
- `url`.

#### `toc`

Generate a table of contents on the section or page.

```markdown
+++
toc: true
+++
```

When set to `true` a table of contents will be generated and accessible in
templates in the `page.toc` variable as the rendered Markdown.

For the following Markdown:

```
+++
toc: true
+++

## Heading
Content

### Subheading
Content

## Another heading
Content
```

The generated `page.toc` variable will look like:

```
1. [Heading](#heading)
    - [Subheading](#subheading)
2. [Another heading](#another-heading)
```

The table of contents is generated via the
[`markdown-toc`](https://github.com/jonschlinkert/markdown-toc) library.

#### `url`

**WARNING:** URL overrides are in an experimental stage. They will work
correctly when used at the root section level but multiple, nested URL overrides
may produce unexpected results.

Override the output URL for the section or page.

```markdown
+++
url: override
+++
```

The supplied URL will rename the current directory. All URL overrides are
relative to the current directory.

If the following URL override is defined in `./content/section/_index.md`:

```markdown
+++
url: override
+++
```

The output file will be `./build/override/index.html`. If there are other pages
and assets such as `./content/section/page.md` and
`./content/section/asset.jpg`, they will also be output to `./build/override/`.

To remove the directory altogether use `/`:

```markdown
+++
url: /
+++
```

This would make the output URL for `./content/section/_index.md` to become
`./build/index.html`.

### Data

JSON data can be made accessible to templates by defining a `_data.json` file in
a section.

The JSON data is accessible in a `data` variable on both section and page
templates.


## Templates

Templates are written in the Handlebars template language.

There are several kinds of templates that website-generator looks for:

- a base template;
- a 404 template;
- content templates, which are split into two categories:
    - section templates; and
    - page templates; and
- partial templates.

Templates have access to variables that contain data from the website
configuration, runtime information and content.

### Base template

The base template is defined at `./templates/_base.hbs`. It is applied to
**every** page and serves as the base HTML document of the entire site.

A base template is required for website-generator to run.

### 404 template

The 404 template is defined at `./templates_404.hbs'. It is used to
generate a `404.html` page.

### Content templates

Content templates are written in the Handlebars language using the `hbs`
extension. They are used to wrap additional HTML around the content of a
Markdown file. All content templates need to include the following variable or
else Markdown content will not be rendered:

```
{{&content}}
```

#### Section templates

Section templates are named `section.hbs`. Their location within `./templates/`
is then used in the template lookup. (see [Template lookup](#template-lookup)

#### Page templates

Page templates are named `page.hbs`. Like with section templates, their location
within `./templates/` is then used in the template lookup. (see [Template
lookup](#template-lookup)

#### Template lookup

Content templates can be defined for specific sections, and the pages of those
sections, in the website. This is done using what is called the template lookup.

For example, a Markdown file at `./content/section/nested-section/_index.md`
will have the following template lookup:

```
./templates/section/nested-section/section.hbs
./templates/section/section.hbs
./templates/section.hbs
./templates/_base.hbs
```

Each template is checked to see if it exists. If it does, it is applied but if
not the lookup continues to the next possible template in the list.

#### Variables

All templates have access to a `config` variable, which is the JSON contents of
a `website-generator.config.json` file at the root of the directory.

Templates also have access to a `runtime` variable with the following
properties:

- `runtime.date.year`: the year that the website was generated.

Finally, templates have access to a `page` variable containing any front matter
that has been defined. For example, the following front-matter:

```markdown
+++
title: "..."
description: "..."
+++
```

...will generate the following properties in `page`:

- `page.title`; and
- `page.description`.

Section templates also have access to a `section` variable which includes an
array of each page's front-matter in the directory.

The following directory:

```
_index.md
post-one.md
post-two.md
post-three.md
```

...will generate the following array in `section.pages`, accessible only to the
section template:

```json
{
  "section": {
    "pages": [
      {
        "fileName": "post-one",
        "title": "...",
        "description": "..."
      },
      {
        "fileName": "post-two",
        "title": "...",
        "description": "..."
      },
      {
        "fileName": "post-three",
        "title": "...",
        "description": "..."
      }
    ]
  }
}
```

Nested sections inherit all section matter from their parent section but can
also override values with their own front matter, which will be passed to any
children of that section.

### Partials

Partials are written in the Handlebars template language. They are defined
within the templates folder under a `_partials` folder. They are blocks of
templates that can be referenced in the base, 404 and content templates that
inject snippets of HTML into the page. Partials may be nested inside other
partials.

Partials are written as Handlebars files, e.g.:

```
templates/
├─ _partials/
│  ├─ header.hbs
│  ├─ footer.hbs
│  ├─ socials/
│  │  ├─ facebook.hbs
```

The corresponding partial code for Handlebars would look like:

```
{{> header}}
{{> footer}}
{{> socials-facebook}}
```


## Shortcodes

Shortcodes are written in the Handlebars template language. They are similar to
partials in that they are reusable blocks of HTML, the difference being that
partials are referenced in templates and shortcodes are referenced in Markdown
files.

Shortcodes come in two variants, inline and block. Inline shortcodes look like:

```markdown
{{%shortcode/%}}
```

Block shortcodes can contain content and other shortcodes within them. They must
**always** have open and closing tags on their own lines:

```markdown
{{%shortcode%}}
  Content
{{%/shortcode%}}
```

Block shortcodes **do not** work on a single line, e.g.:

```markdown
{{%shortcode%}}Content{{%/shortcode%}}
```

Attributes can be passed to inline shortcodes and the opening tags of
block shortcodes:

```markdown
{{%shortcode key="value"/%}}

{{%shortcode key="value"%}}
  Content
{{%/shortcode%}}
```

Shortcodes have access to the following variables:

- `content`; and
- `params`, an object containing all of the shortcode attributes.

To pass an array to a shortcode, use the same attribute multiple times, e.g.:

```markdown
{{%shortcode key="one" key="two"/%}}
```

This will create the following parameter object accessible to templates:

```json
{
  "params": {
    "key": ["one", "two"]
  }
}
```


## Assets

Assets are special files that receive transformations when being copied to the
`./build/` directory.

The following assets are supported:

- `*.css` files within will be processed with PostCSS.

The `./assets/` directory supports nesting with folders.


## Static

Any files within `./static/` will be copied across to `./build/` without any
transformation.

The `./static/` directory supports nesting with folders.
