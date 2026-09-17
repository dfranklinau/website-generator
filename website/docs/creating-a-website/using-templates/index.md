---
title: Using templates
sidebar_position: 2
---
import DocCardList from '@theme/DocCardList';

Templates are what website-generator uses when generating HTML. They define the
base HTML that renders across all pages, as well as HTML for sections and pages.
Templates have access to variables that contain data about the current page,
section and website, as well as runtime data such as the date.

Templates are written in the [Handlebars](https://handlebarsjs.com) language and
are loaded from the `templates` directory. 

All templates have access to a `content` variable that contains the contents of
a Markdown file or nested template. When rendering content in a template, use
the `content` variable in a
[triple-stash](https://handlebarsjs.com/guide/expressions.html#html-escaping) to
render the output as non-escaped HTML:

```handlebars title="templates/_index.hbs"
{{{content}}}
```

<DocCardList />
