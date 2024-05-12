# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

--------------------------------------------------------------------------------

## [Unreleased]

### Added

- Added `removeComments` to `tsconfig.json`.
- Added the `nyc` package to enable code coverage reporting.
- Installed the Docusaurus package to `website`
- Added source map support to `packages/website-generator`.

### Changed

- Updated `tsconfig.json` in `packages/website-generator` to use
  `@tsconfig/node20`.
- Upgraded `typescript` to `5.4.5` for `packages/website-generator` and `website`.
- Aligned the required node version across all packages to `^20.10.0`.
- Aligned the required npm version across all packages to `^10.2.3`.
- Moved the `generatorContent` method outside of `index.ts`.
- Moved the `generatorErrorDocuments` method outside of `index.ts`.
- Moved the `generateStaticFiles` method outside of `index.ts`.
- Moved the `clean` method in `index.ts` to its own utility.
- Upgraded Node.js to `20.10.0` and npm to `10.2.3`.
- Set up a monorepo structure.
- Set up a monorepo structure for the package.
- Moved documentation from `packages/website-generator/README.md` to `website`.
- Updated all instances of the `master` branch to `main`.
- Structured TypeScript module declarations in `packages/website-generator` as
  type packages.
- Improved code coverage reporting for `packages/website-generator` to use
  source maps.


### Removed

- The `callback` argument from `utils/readFile`.
- Unused `stylelint` dependency.

### Fixed

- Reset the `existsSync` stub in `utils/findFiles.test.ts`.

--------------------------------------------------------------------------------

## [1.0.0-alpha.8] - 2022-09-22

### Changed

- Upgraded Node.js to `16.17.0` and npm to `8.15.0`.
- Updated the `clean` method to ignore exceptions if the build path does not
  exist.
- Upgraded `postcss` to `8.4.16`.
- Upgraded `dompurify` to `2.3.4`.
- Upgraded `@ltd/j-toml` to `1.35.2`.
- Upgraded `jsdom` to `20.0.0`.
- Made the `proxyquire` dev dependency version static.
- Upgraded `typescript` to `4.8.3`.

--------------------------------------------------------------------------------

## [1.0.0-alpha.7] - 2022-09-18

### Fixed

- Fixed an unclosed `id` HTML attribute on footnote refs so that the `href`
  attribute will now work.


--------------------------------------------------------------------------------

## [1.0.0-alpha.6] - 2022-07-23

### Added

- Added support for named pages and a home page in the template lookup.

### Fixed

- Fixed the `ascending` argument for the `sort` Handlebars.js helper to use hash
  arguments, e.g. `{{#sort object 'property' ascending=true}}`.

--------------------------------------------------------------------------------

## [1.0.0-alpha.5] - 2022-02-12

### Added

- Added improvements to project documentation in the README.

### Fixed

- Fixed a missing dependency to `postcss` by adding it in `package.json`.
- Fixed an error in `findFiles` that is caused by certain directories not
  existing, e.g. `./helpers/`.

--------------------------------------------------------------------------------

## [1.0.0-alpha.4] - 2022-02-12

### Added

- Added a `markdownify` Handlebars.js helper.
- Added support for custom Handlebars.js helpers to be loaded from the
  `./helpers/` directory.

### Fixed

- Fixed footnote linking by including a `fnref` id on inline footnote links.

--------------------------------------------------------------------------------

## [1.0.0-alpha.3] - 2022-01-30

### Added

- Added improvements to project documentation in the README.

--------------------------------------------------------------------------------

## [1.0.0-alpha.2] - 2021-08-20

### Added

- Added support for configurable 404 page titles by setting a value for
  `errorDocument404Title` in `website-generator.config.json`.

### Security

- Added `npm@1.27.0` as the preferred npm engine.

--------------------------------------------------------------------------------

## [1.0.0-alpha] - 2021-06-07

### Added

- Everything.

[Unreleased]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.8...HEAD
[1.0.0-alpha.8]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.7...v1.0.0-alpha.8
[1.0.0-alpha.7]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.6...v1.0.0-alpha.7
[1.0.0-alpha.6]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.5...v1.0.0-alpha.6
[1.0.0-alpha.5]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.4...v1.0.0-alpha.5
[1.0.0-alpha.4]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.3...v1.0.0-alpha.4
[1.0.0-alpha.3]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.2...v1.0.0-alpha.3
[1.0.0-alpha.2]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha...v1.0.0-alpha.2
[1.0.0-alpha]: https://github.com/dfranklinau/website-generator/releases/tag/v1.0.0-alpha
