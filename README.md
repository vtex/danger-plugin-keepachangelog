# danger-plugin-keepachangelog

[![npm version](https://badge.fury.io/js/danger-plugin-keepachangelog.svg)](https://badge.fury.io/js/danger-plugin-keepachangelog)

> Makes changes to CHANGELOG consistent with keepachangelog standard

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

This plugin will trigger a Danger `fail` when:

1. No changes to `CHANGELOG.md`
2. Missing a section line (example: `### Fixed`)
3. Missing a new version line (example: `## [1.0.1] - 2020-03-20`).
    - When the option `changeVersion` is set to `false`, the check changes to fail if a version line is present

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
