---
title: Folder structure
description: How to structure directories and where to place content.
---

website-generator works by parsing files within the following folders at the
root of the project it is installed in:

* `content`;
* `templates`;
* `shortcodes`;
* `assets`; and
* `static`.

An example of a website-generator project structure is below:

```
project
├── content
│   ├── section
│   │   ├── _index.md
│   │   └── page.md
│   └── page.md
├── templates
│   ├── _partials
│   │   ├── header.hbs
│   │   ├── nav.hbs
│   │   └── footer.hbs
│   ├── _index.hbs
│   └── _base.hbs
├── shortcodes
│   └── blockquote.hbs
├── assets
│   └── css
│       └── style.css
└── static
   ├── script.js
   └── image.png
```

## Folders

:::info
See [Creating a website](/website-generator/category/creating-a-website/) for a
detailed overview of each folder's purpose.
:::

### `content`

The `content` folder is where website content is stored. Markdown files and
nested directories define the page structure and output URLs.

website-generator categorises content as either a page or a section based on the
file name.

Assets that may be displayed within the content, such as images, can also be
placed here.

### `templates`

The `templates` folder contains files which are used to define the HTML
structure of the entire website, as well as sections and individual pages.
Templates are written in [Handlebars](https://handlebarsjs.com).

website-generator offers a template lookup and inheritance based on the folder
structure within the `template` folder.

Partials (reusable template snippets) are also supported.

### `shortcodes`

The `shortcodes` folder contains reusable snippets that can referenced within
Markdown content. Like templates, they are also written in
[Handlebars](https://handlebarsjs.com).

They can be used to insert reusable snippets of HTML or wrap Markdown within
HTML, with support for some logic handling.

### `assets`

The `assets` folder contains files that get processed at the build stage.

### `static` 

The `static` folder are any files that should be copied across without any
transformations. This is where files like favicons are placed.
