---
title: Using templates
sidebar_position: 4
---
import DocCardList from '@theme/DocCardList';

Templates are what website-generator uses when generating HTML. They define the
base HTML that renders across all pages, as well as HTML for sections and pages.

Templates are written in the [Handlebars](https://handlebarsjs.com) template
language.

:::danger
The contents of this page may be incorrect or outdated because the underlying
templating API has been changed after the time of writing. Please use caution
when referencing this page.
:::

Templates have access to variables that contain data about the current page,
section and website, as well as runtime data such as the date.

All templates are loaded from the `templates` directory.

<DocCardList />
