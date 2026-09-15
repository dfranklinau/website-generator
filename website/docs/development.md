---
title: Development
sidebar_position: 9
---

website-generator can be developed and tested locally using `npm link`.

Assume the following two local packages exists:

1. `/home/user/projects/website-generator`; and
2. `/home/user/projects/my-website`.

First, establish a link to `@website-generator/website-generator`:

```shell
cd /home/user/projects/website-generator/packages/website-generator
npm link
```

Second, in `my-website`, ensure that website-generator is listed as a dependency
or devDependency in its `package.json`. Instead of using a [release archive,
like when
installing](http://localhost:3000/website-generator/getting-started/installation),
specify the version outlined in
`website-generator/packages/website-generator/package.json` instead:

```json
{
  "name": "my-website",
  "version": 0.0.0",
  "private": true,
  "dependencies": {
    "@website-generator/website-generator": "1.0.0"
  }
}
```

Third, establish the link in `my-website`:

```shell
cd /home/user/projects/my-website
npm link @website-generator/website-generator
```

npm will create a symbolic link so that
`/home/user/projects/my-website/node_modules/@website-generator/website-generator`
will instead point to `/home/user/projects/website-generator/packages/website-generator`.

Modify website-generator as desired and rebuild the package by running `npm run
build` in `/home/user/projects/website-generator/packages/website-generator`.
