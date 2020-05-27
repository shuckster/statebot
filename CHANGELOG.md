# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.3.0] - 2020-05-27
### Added
- Enter/Emit can accept arguments that will curry into the functions
  they return.
- inState now fully documented.
- InState supports currying arguments into outputWhenTrue() argument.

## [2.2.1] - 2020-05-26
### Fixed
- A few JSDoc links weren't working
- VS Code autocomplete wasn't working fully

## [2.2.0] - 2020-05-25
### Changed
- Migrated from Webpack to Rollup; smaller min builds, UMD build
- Add "files" to package.json to reduce npm module size
- Reduce code-size a little

## [2.1.1] - 2020-05-23
### Changed
- README tweaks
- Upgrade dev-dependencies

## [2.1.0] - 2020-04-24
### Fixed
- Browser build now uses 'var' webpack option rather than 'umd'

### Changed
- Lua inspired 'coroutine' chart in the JSDocs

## [2.0.0] - 2020-04-20
### Changed
- Updated disallowed characters for cross-env compatibility of charts.

  This was a tiny change to Statebot, but will break any charts using
  the characters now excluded (probably none at this point!) Still,
  it's good to show semver willing, eh? ;)

### Added
- Include links to the shell-port, Statebot-sh

## [1.0.6] - 2020-04-13
### Fixed
- Various post-publishing documentation fixes

## [1.0.0] - 2020-04-13
### Added
- Statebot :)
