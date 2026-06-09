import test from "node:test";
import assert from "node:assert/strict";
import { auditDocs, extractMarkdownRefs, extractNpmScripts } from "../src/index.js";

test("extracts npm scripts from docs", () => {
  assert.deepEqual(extractNpmScripts("Run npm run test and npm run smoke."), ["test", "smoke"]);
});

test("extracts local markdown references", () => {
  assert.deepEqual(extractMarkdownRefs("[Guide](docs/GUIDE.md) [Web](https://example.com)"), ["docs/GUIDE.md"]);
});

test("reports stale scripts and missing files", () => {
  const report = auditDocs("fixtures/repo");
  assert.equal(report.ok, false);
  assert.ok(report.findings.some((f) => f.type === "missing-script" && f.script === "missing"));
  assert.ok(report.findings.some((f) => f.type === "missing-file" && f.ref === "docs/GONE.md"));
});
