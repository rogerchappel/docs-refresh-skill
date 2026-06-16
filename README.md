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

```sh
npx docs-refresh-skill --help
```
```sh
npm test
```

## Verify

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
