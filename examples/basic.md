# Basic Docs Audit

```bash
docs-refresh-skill fixtures/repo
```

The fixture intentionally reports one missing script and one missing document reference.

For a passing fixture, create a small repository with a matching script and
local reference:

```bash
mkdir -p /tmp/docs-refresh-demo
cat > /tmp/docs-refresh-demo/package.json <<'JSON'
{"scripts":{"test":"node --test"}}
JSON
cat > /tmp/docs-refresh-demo/README.md <<'MD'
# Demo

Run `npm run test`.
MD
docs-refresh-skill /tmp/docs-refresh-demo
```
