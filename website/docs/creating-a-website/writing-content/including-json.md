---
title: Including JSON
sidebar_position: 3
---

A page or section might benefit from referencing an external data source.
website-generator supports reading JSON at generation time and making its
contents available in templates.

Create a JSON file with the file name `_data_.json` and its contents will be
accessible to any page or section in the same folder. The JSON data will be
accessible in a `data` variable (see [Using
variables](../using-templates/using-variables#data)).
