---
title: Writing content
sidebar_position: 1
---

import DocCardList from '@theme/DocCardList';

website-generator creates HTML files by reading the contents of Markdown files.

Markdown files within `content` are parsed to create the same folder structure
in a `build` folder, which contains the publish-ready static-site.

As an example, the following `content` structure&hellip;

```
content
├── blog
│   ├── index.md
│   └── post.md
└── about.md
```

&hellip;will output the following HTML in `build`:

```
build
├── blog
│   ├── index.html
│   └── post
│       └── index.html
└── about
    └── index.html
```

<DocCardList />
