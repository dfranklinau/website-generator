---
title: Assets
sidebar_position: 5
---

Including CSS, JavaScript, images and other static files is as easy as placing
them in the relevant directory.

There are two asset directories available:

1. `assets`, which is used for parsing specific content at build time; and
2. `static`, which copies all files at build time without any processing.

CSS files are currently the only supported asset.

## Supported parsers

### CSS 

CSS can be included via the `static` directory. Alternatively, placing CSS
within the `assets` directory allows the CSS to be processed by PostCSS.

Any plugins defined by `postcss.config.js` will be loaded by website-generator
at build time and used across any CSS files within the `assets/css` directory.
