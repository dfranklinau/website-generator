# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

--------------------------------------------------------------------------------

## [Unreleased]

### Changed

- Upgraded Node.js to `16.17.0` and npm to `8.15.0`
- Updated the `clean` method to ignore exceptions if the build path does not
  exist.
- Upgraded `postcss` to `8.4.16`
- Upgraded `dompurify` to `2.3.4`
- Upgraded `@ltd/j-toml` to `1.35.2`
- Upgraded `jsdom` to `20.0.0`
- Made the `proxyquire` dev dependency version static
- Upgraded `typescript` to `4.8.3`

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

- Fixed a missing dependency to `postcss` by adding it in `package.json`
- Fixed an error in `findFiles` that is caused by certain directories not
  existing, e.g. `./helpers/`

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

[Unreleased]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.7...HEAD
[1.0.0-alpha.7]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.6...v1.0.0-alpha.7
[1.0.0-alpha.6]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.5...v1.0.0-alpha.6
[1.0.0-alpha.5]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.4...v1.0.0-alpha.5
[1.0.0-alpha.4]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.3...v1.0.0-alpha.4
[1.0.0-alpha.3]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.2...v1.0.0-alpha.3
[1.0.0-alpha.2]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha...v1.0.0-alpha.2
[1.0.0-alpha]: https://github.com/dfranklinau/website-generator/releases/tag/v1.0.0-alpha
