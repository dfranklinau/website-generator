---
title: Static files
sidebar_position: 6
---

Any files required by the website (that do not require [asset
transformation](/website-generator/assets/)) should be placed in the `static`
directory. Common files include icons and fonts.

Any directories within `static` are copied across as-is.

Static files are copied _after_ generating Markdown, so any files in existing
directories can be override when copying static files.
