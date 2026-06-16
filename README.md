# docs-refresh-skill

Detect documentation drift against package scripts, CLI bins, examples, and local files.

## Status

This repository is early-stage. Use it for local automation and review workflows, and verify the output before relying on it in production.

## Install

```sh
npm install
npm run build
```

## Use

Start with the built-in help or the smallest local check:

The package is local-first: it reads fixtures or project files and emits deterministic JSON/Markdown output. It does not publish, post, sync, or write to external accounts.

```sh
npx docs-refresh-skill --help
```
```sh
npm test
```

## Examples

See [examples/basic.md](examples/basic.md) and the fixture-backed tests in [tests/core.test.js](tests/core.test.js).

## Limitations

- V1 uses local fixtures and static checks only.
- Network URLs are ignored as external references, and network repository inputs are rejected.
- It checks script names and file existence; it does not validate shell semantics or remote link health.
- Generated reports are review artifacts, not authorization to edit files.

## Verification

```bash
npm test
npm run check
npm run build
npm run smoke
bash scripts/validate.sh
```

## Release Verification

Run the local validation command before opening a pull request:

```sh
npm test
```

For release hygiene, confirm the package contents before publishing:

```sh
npm run package:smoke
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution expectations. Keep changes small, reviewable, and backed by the verification command above.

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting guidance. Do not include secrets, private logs, or customer data in issues or fixtures.

## License

MIT
