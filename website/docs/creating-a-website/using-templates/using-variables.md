---
title: Using variables
sidebar_position: 3
---

Templates have access to a range of variables at runtime. These variables can be
used to customise the output of HTML.

## Types of variables

### `config`

The `website-generator.config.json` contents are made available in the `config`
variable. See [Configuration](../../getting-started/configuration.md) for more
information.

### `head`

The `head` variable is an object containing data commonly included in the
`<head>` tag of a website.

| Name | Description |
| --- | --- |
| `head.title` | The title of the Markdown file, defined in front matter. |

### `runtime`

The `runtime` variable is an object containing data relevant to the time of
generation.

| Name | Description |
| --- | --- |
| `runtime.date.year` | The year that the website was generated. |

### `page`

The `page` variable is an object containing front matter that has been defined
on a Markdown file. Despite its name, both page _and_ section templates have
access to the `page` variable.

For example, the following front-matter&hellip;

```markdown
+++
title: My Title
description: My description.
+++
```

&hellip;will create the following properties on the `page` object:

- `page.title`; and
- `page.description`.

Some front matter keys are reserved to enable specific features (see [Reserved
front matter](../writing-content/using-markdown.md#reserved-front-matter)).

### `section`

The `section` variable is an object containing front matter that has been
defined by all sections that a page or section is in.

#### Within page templates

For pages, the `section` variable contains any front matter that has been
defined in `_index.md`.

For example, with a section and page&hellip;

```
content/my-section/_index.md
content/my-section/my-post.md
```

&hellip;where `_index.md` contains the following front matter&hellip;

```markdown title="content/my-section/_index.md"
+++
title = "My Section"
+++
```

&hellip;the `templates/section/my-post.hbs` template will have access to:

```json
{
  section: {
    title: "My Section",
  }
}
```

#### Within section templates

For sections, in addition to the front matter, an array of each child page's
front matter and Markdown is accessible.

```
content/my-section/_index.md
content/my-section/my-post.md
```

&hellip;where `my-post.md` contains the following front matter&hellip;

```markdown title="content/my-section/my-post.md"
+++
title = "My Section"
+++
```

&hellip;the `templates/my-section/section.hbs` template will have access to
detailed information about each child page within the section:

```json
{
  section: {
    title: "My Section",
    children: [
      {
        markdown: {
          content: "",
          matter: {},
          options: {}, // Options referenced internally by website-generator.
        },
        name: "my-post.md",
        filePath: "./content/my-section/my-post.md",
        outputPath: "./build/my-section/my-post/index.html",
        outputURL: "/my-section/my-post/"
      }
    ]
  }
}
```

Nested sections inherit all section matter from their parent section but can
also override values with their own front matter, which will in turn be made
available to any children of that section via `section`.

### `data`

The `data` variable is populated whenever a JSON file exists in the same
directory as the page or section (see [Including
JSON](../writing-content/including-json.md)).

For example, the following JSON data file&hellip;

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
