---
title: Template Lookup
sidebar_position: 3
---

When a page or section template is being generated, website-generator will do a
series of checks to see which template should be loaded, based on the currenty
directory.

For example, a Markdown file located under
`/content/section/nested-section/_index.md` will have the following template
lookup:

1. `templates/section/nested-section/_index.hbs`
2. `templates/section/nested-section/section.hbs`
3. `templates/section/_index.hbs`
4. `templates/section/section.hbs`
5. `templates/_index.hbs`
6. `templates/section.hbs`
7. `templates/_base.hbs`

Each template is checked in order to see if it exists. If it does it is applied,
but if not the lookup will continue down the list until it finds a template that
does. The `_base.hbs` template is used as the default template for every lookup.
