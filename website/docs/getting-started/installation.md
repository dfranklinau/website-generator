---
title: Installation
description: How to install website-generator.
---

Install website-generator by adding a dependency to `package.json` that points
to a release archive, making sure to update `<version>` with the desired
[release](https://github.com/dfranklinau/website-generator/releases):

```json
{
  "dependencies": {
    "website-generator": "https://github.com/dfranklinau/website-generator/releases/download/<version>/website-generator.tar.gz"
  }
}
```

With the dependency listed in `package.json`, run `npm install` to install.

website-generator is not published on npm as it is not intended to be used in a
production environment, which is why it must be installed with a repository URL.

Once installed, website-generator can be called with an npm script:

```json
{
  "scripts": {
    "build": "website-generator"
  }
}
```
