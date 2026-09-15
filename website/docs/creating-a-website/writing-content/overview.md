---
title: Overview
sidebar_position: 1
---

website-generator generates a HTML output by reading the contents of Markdown
files. All content is placed within the `content` folder.

The files and folders within `content` are parsed to create the same structure
in the `build` folder, which will contain the static-site.

website-generator approaches content without any preference to structure, and is
not geared towards any specific use case. It categorises content as being
either:

1. a page; or
2. a section.

A blog is a classic example of this structure.

The URL `/blog/`, which lists all available blog posts, would be considered a
**section**, and the URL `/blog/my-first-post/`, which renders a single blog
post, would be considered a **page**.

As an example, the following `content` structure&hellip;

```
content
├── blog
│   ├── _index.md
│   └── post.md
└── about.md
```

&hellip;will output the following HTML:

```
build
├── blog
│   ├── index.html
│   └── post
│       └── index.html
└── about
    └── index.html
```
