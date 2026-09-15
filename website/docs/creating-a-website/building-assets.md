---
title: Building assets
sidebar_position: 6
---

Assets are file types that benefit from pre or post processing. CSS files are
currently the only supported asset.

## Supported assets

### CSS 

Place CSS files within the `assets/css/` folder for them to be processed by
PostCSS.

Any plugins defined by `postcss.config.js` will be loaded by website-generator
at build time and applied across all CSS files within the folder.
