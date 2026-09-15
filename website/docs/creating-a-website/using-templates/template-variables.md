---
title: Template Variables
sidebar_position: 4
---

Templates have access to a range of variables at runtime, which can be used by
Handlebars to customise the output of HTML.

Template variables can be referenced in Handlebars by using the variable name
they are assigned, e.g. to access page data, use the `page` variable:

```handlebars
{{page.title}}
```

## Configuration

The `website-generator.config.json` contents are made available in the `config`
variable. All key-value pairs are accessible.

## Head

The `head` variable acts as a helper object that contains data commonly included
in the `<head>` tag.

| Name         | Description                      |
| ------------ | -------------------------------- |
| `head.title` | The title of the page or section |

## Runtime

The `runtime` variable contains data that may be useful when generating the HTML
output.

| Name                | Description                              |
| ------------------- | ---------------------------------------- |
| `runtime.date.year` | The year that the website was generated. |

## Page

The `page` variable contains any front matter that has been defined. For
example, the following front-matter:

```markdown
+++
title: Post
description: A short description.
+++
```

&hellip;will generate the following properties in `page`:

- `page.title`; and
- `page.description`.

Some front-matter keys are reserved to enable specific features (see
[Front-matter](/website-generator/content/markdown#front-matter)).


## Section

Section templates have access to a `section` variable which:

* contains any front matter that has been defined in the `_index.md` file; and
* includes an array of each child page's front-matter and file information.

For example, the following file structure of a section with two posts:

```
content/section/_index.md
content/section/post-one.md
content/section/post-two.md
```

&hellip;where the front-matter for `_index.md` is:

```markdown
+++
title: Section
description: A short description.
+++
```

&hellip;will generate the following data in the `section` variable:

```json
{
  "section": {
    "title": "Section",
    "description": "A short description.",
    "children": [
      {
        "markdown": {
          "content": "",
          "matter": {},
          "options": {}
        },
        "name": "post-one.md",
        "filePath": "content/section/post-one.md",
        "outputPath": "build/section/post-one/index.html",
        "outputURL": "/section/post-one/"
      },
      {
        "markdown": {
          "content": "",
          "matter": {},
          "options": {}
        },
        "name": "post-two.md",
        "filePath": "content/section/post-two.md",
        "outputPath": "build/section/post-two/index.html",
        "outputURL": "/section/post-two/"
      }
    ]
  }
}
```

Nested sections inherit all section matter from their parent section but can
also override values with their own front matter, which will in turn be made
available to any children of that section via `section`.

## Data

Any sections or pages with a [JSON data file](/website-generator/content/json/)
can reference the file's contents with the `data` variable.

For example, the following JSON data file:

```json title="_data.json"
{
  "items": [
    {
      "title": "A"
    },
    {
      "title": "B"
    }
  ],
  "total": 5
}
```

&hellip;can be referenced using `data.items` or `data.total` in templates.
