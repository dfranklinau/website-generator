---
title: Pages and sections
sidebar_position: 1
---

website-generator arranges content into pages and sections:

* "pages", which are standalone pieces of content; and
* "sections", which are used to group pages together.

An example of a **page** would be `/content/blog/my-first-post.md`, which would
generate `/build/blog/my-first-post.html`.

An example of a **section** would be `/content/blog/_index.md`, which would
generate `/build/blog/index.html` and contain a listing of all pages within
`/content/blog/`

## Creating a page

A page is a Markdown file within `content`. Markdown files can be named
`index.md` or any other valid file name.

For example, the following folder structure&hellip;

```
content
├── about.md
└── page
    ├── index.md
    └── image.png
```

&hellip;will output the following HTML:

```
build
├── about
│   └── index.html
└── page
    ├── index.html
    └── image.png
```

:::note
There is only one reserved file name: `_index.md`. This is a "section", and is
explained further.
:::

## Creating a section

A section is a Markdown file within `content` with the name `_index.md`. A
section can be used to:

* display a listing of child pages and sections; and
* define front-matter for child pages and sections.

While an `_index.md` does not need to contain Markdown, the contents of the file
can be rendered when generating a HTML file.

For example, the following folder structure (which contains a section)&hellip;

```
content
└── section
    ├── _index.md
    └── page.md
```

&hellip;will output the following HTML:

```
build
└── section
    ├── index.html
    └── page
        └── index.html
```
