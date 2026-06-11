# docs-refresh-skill

Detect documentation drift against package scripts, CLI bins, examples, and local files.

## Quickstart

```bash
npm test
npm run smoke
docs-refresh-skill --help
```

## What It Does

Detect README/docs drift against package scripts, CLI help, examples, and current files.

The package is local-first: it reads fixtures or project files and emits deterministic JSON/Markdown output. It does not publish, post, sync, or write to external accounts.

## Examples

See [examples/basic.md](examples/basic.md) and the fixture-backed tests in [tests/core.test.js](tests/core.test.js).

## Limitations

- V1 uses local fixtures and static checks only.
- Live provider integrations require a separate approval and adapter layer.
- Generated plans are review artifacts, not authorization to perform external writes.

## Verification

```bash
npm test
npm run check
npm run build
npm run smoke
bash scripts/validate.sh
```

## Release verification

Run the same checks locally before opening a release PR:

```bash
npm run check
npm test
npm run build
npm run smoke
npm run package:smoke
npm run release:check
```
