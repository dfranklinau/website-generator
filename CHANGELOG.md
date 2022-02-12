# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

--------------------------------------------------------------------------------

## [Unreleased]

### Added

- Added improvements to project documentation in the README.

### Fixed

- Fixed a missing dependency to `postcss` by adding it in `package.json`

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

[Unreleased]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.4...HEAD
[1.0.0-alpha.4]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.3...v1.0.0-alpha.4
[1.0.0-alpha.3]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha.2...v1.0.0-alpha.3
[1.0.0-alpha.2]: https://github.com/dfranklinau/website-generator/compare/v1.0.0-alpha...v1.0.0-alpha.2
[1.0.0-alpha]: https://github.com/dfranklinau/website-generator/releases/tag/v1.0.0-alpha
