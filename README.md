# website-generator

A static-site generator written in Node.js.

## Installation

Install website-generator by adding a dependency to `package.json` that points
to a release archive, making sure to update `{version}` with the desired
[release](https://github.com/dfranklinau/website-generator/releases):

```json
{
  "dependencies": {
    "website-generator": "https://github.com/dfranklinau/website-generator/releases/download/v{version}/website-generator-{version}.tar.gz"
  }
}
```

For example, to install `v1.0.0` use the URL
`https://github.com/dfranklinau/website-generator/releases/download/v1.0.0/website-generator-1.0.0.tar.gz`.

With the dependency listed in `package.json`, run `npm install` to install.

website-generator is not published on npm which is why it must be installed with
a repository URL.

Once installed, website-generator can be called with an npm script:

```json
{
  "scripts": {
    "build": "website-generator"
  }
}
```

## Documentation

See the [documentation
website](https://dfranklinau.github.io/website-generator/) for more information
on getting started and how to use website-generator.
