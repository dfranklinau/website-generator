---
title: Configuration
sidebar_position: 7
---

Create a `website-generator.config.json` file in the root of the directory to
pass in values that can be referenced in templates, partials and shortcodes. Any
key-value pair in this file will be made available under a `config` variable.

This could be used to define a website's `baseURL` or global page title.

Additionally, there are reserved keys that website-generator has internal
references to that can be used to change its behaviour.

Below is a table of all reserved keys and their function:

| Key                     | Function                                              |
| ----------------------- | ----------------------------------------------------- |
| `errorDocument404Title` | Used for the `<title>` tag of the 404 error document. |
