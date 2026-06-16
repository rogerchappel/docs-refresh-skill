# API

- `auditDocs(repoDir)`: scan Markdown docs against package scripts and local file references.
- `extractNpmScripts(text)`: extract documented `npm run` commands.
- `extractMarkdownRefs(text)`: extract local Markdown links.

## Report Shape

`auditDocs(repoDir)` returns deterministic JSON:

```json
{
  "ok": false,
  "docsChecked": 2,
  "findings": [
    {
      "type": "missing-script",
      "file": "fixtures/repo/README.md",
      "script": "missing"
    },
    {
      "type": "missing-file",
      "file": "fixtures/repo/README.md",
      "ref": "docs/GONE.md"
    }
  ]
}
```

Finding types are intentionally small for v1:

- `missing-script`: a Markdown file mentions `npm run <name>` but `package.json` does not define that script.
- `missing-file`: a local Markdown link points at a file that is absent from the repository.

HTTP links, mail links, same-page anchors, and fragment-only references are outside the local drift check.
