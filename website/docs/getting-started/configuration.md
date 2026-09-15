---
title: Configuration
description: How to define and use gobal configuration across all templates.
sidebar_position: 3
---

Create a `website-generator.config.json` file in the root of the directory to
define global settings:

```json title="website-generator.config.json"
{
  "baseURL": "https://www.example.com",
  "title": "My Website"
}
```

## Referencing in a template

Any key-value pair in this file will be made available under a `config`
variable. There are no limitations on what property names or values are used,
as long as the file is valid JSON.

The `config` variable can be referenced in any template:

```handlebars title="templates/_base.hbs"
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>{{config.title}}</title>
  </head>
  <body>
    <main id="main">
      {{&content}}
    </main>
  </body>
</html>
```


## Reserved keys

There are reserved keys that website-generator has internal references to that
can be used to change its behaviour.

Below is a table of all reserved keys and their function:

| Key                     | Function                                              |
| ----------------------- | ----------------------------------------------------- |
| `errorDocument404Title` | Used for the `<title>` tag of the 404 error document. |
