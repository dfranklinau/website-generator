---
title: Pages
sidebar_position: 2
---

A page is any Markdown file within the `content` folder or within a section
folder.

When built, pages output HTML files.

There are two kinds of pages:

* named pages; and
* index pages.

### Named pages

A named page is any Markdown file (excluding `index.md`, see [Index
pages](#index-pages)) where the file name is used to generate the URL.

For example, `content/post.md` will output a HTML file in the build folder at
`build/post/index.html`

### Index pages

An index page is a Markdown file with the file name `index.md`.

Index pages are for when you want to define a page as a folder so that assets
related to the post, such as images, can be grouped together.

For example, the following page structure&hellip;

```
content
└── page
    ├── index.md
    └── image.png
```

&hellip;will output the following HTML:

```
build
└── page
    ├── index.html
    └── image.png
```

Note that unlike sections, an index page **does not** have an underscore prefix.
