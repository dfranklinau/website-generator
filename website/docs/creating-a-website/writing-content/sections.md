---
title: Sections
sidebar_position: 3
---

A section is a Markdown file within the content folder, or within another
section folder, with the file name `_index.md`. The underscore is **important**,
to distinguish a section from an index page.

A section can be used to:

* display a listing of child pages and sections; and
* define front-matter for child pages and sections.

While an `_index.md` does not need to contain Markdown, the contents of the file
can be rendered when generating a HTML file.

For example, the following section structure&hellip;

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
