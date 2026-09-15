---
title: Including static files
sidebar_position: 7
---

Any files required by the website that do not require asset transformation (such
as CSS via PostCSS) should be placed in the `static` directory. Common files
include icons and fonts.

Any directories within `static` are also copied across as-is.

:::important
Static files are copied _after_ generating Markdown, so any files in existing
directories can be override when copying static files.
:::
