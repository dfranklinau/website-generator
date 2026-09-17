---
title: The template lookup
sidebar_position: 2
---

website-generator performs a check to see which template should be loaded for a
Markdown file.

The current directory, file name and content type (i.e. page or section) are
used to determine which template file to use.

The lookup is performed in reverse, checking for the existence of the most
specific template that would apply and working backwards until it either:

* finds a matching template; or
* uses the base template as the default.

A template lookup is performed for pages, sections and the home page.

## Examples of template lookup

### The home page

The home page Markdown file in `content/_index.md` will have the following
template lookup:

1. `templates/_index.hbs`
1. `templates/section.hbs`
2. `templates/base.hbs`

### Pages

A Markdown file in `content/my-page.md` will have the following template lookup:

1. `templates/my-page.hbs`
2. `templates/page.hbs`
3. `templates/_base.hbs`

:::warning
There is a known limitation where `content/page.md` will conflict with the
generic `templates/page.hbs` template. As a workaround, the [`url` front
matter](../writing-content/using-markdown.md#url) can be used to set the URL as
`build/page/index.html` while renaming the file to `content/_page.md`.
:::

A Markdown file in `content/section/my-page.md` will have the following template
lookup:

1. `templates/section/my-page.hbs`
2. `templates/section/page.hbs`
3. `templates/my-page.hbs`
4. `templates/page.hbs`
5. `templates/_base.hbs`

A Markdown file in `content/my-section/nested-section/my-page.md` will have the
following template lookup:

1. `templates/my-section/nested-section/my-page.hbs`
2. `templates/my-section/nested-section/page.hbs`
3. `templates/my-section/my-page.hbs`
4. `templates/my-section/page.hbs`
5. `templates/my-page.hbs`
6. `templates/page.hbs`
7. `templates/_base.hbs`

This process is repeated for all further nested sections.

### Sections

A Markdown file in `content/my-section/_index.md` will have the following
template lookup:

1. `templates/my-section/section.hbs`
2. `templates/section.hbs`
3. `templates/_base.hbs`

A Markdown file in `content/my-section/nested-section/_index.md` will have the
following template lookup:

1. `templates/my-section/nested-section/section.hbs`
2. `templates/my-section/section.hbs`
3. `templates/section.hbs`
4. `templates/_base.hbs`
