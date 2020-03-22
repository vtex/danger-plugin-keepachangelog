# danger-plugin-keepachangelog

[![npm version](https://badge.fury.io/js/danger-plugin-keepachangelog.svg)](https://badge.fury.io/js/danger-plugin-keepachangelog)

> Makes changes to CHANGELOG consistent with [keepachangelog](https://keepachangelog.com/en/1.0.0/) standard

## Usage

Install:

```sh
yarn add danger-plugin-keepachangelog --dev
```

At a glance:

```js
// dangerfile.js
import { keepachangelog } from 'danger-plugin-keepachangelog'

keepachangelog()
```

### Checks

> ℹ️ All checks will be skipped if #trivial is present in the title or body of the PR

Situation | Message demo
---|---
No changes to `CHANGELOG.md` were found | [Demo](https://github.com/klzns/test-repo/pull/11)
Missing a section line (eg: `### Fixed`) | [Demo](https://github.com/klzns/test-repo/pull/12)
Missing a new version line (eg: `## [1.0.1] - 2020-03-20`) | [Demo](https://github.com/klzns/test-repo/pull/14)
Having a new version line (when the option `changeVersion` is set to `false`) | [Demo](https://github.com/klzns/test-repo/pull/13)

### Options

You can pass options to `keepachangelog` function:

```js
keepachangelog({ changeVersion: true })
```

Option | Default | Description
---|---|---
**changeVersion** | `true` | - `true` it will fail if a version line is missing<br/>- `false` it will fail if a new version line is present

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
