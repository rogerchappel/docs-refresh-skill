#!/usr/bin/env node
import { auditDocs } from "../src/index.js";
import { requireLocalPath } from "../src/safety.js";
const args = process.argv.slice(2);
if (args.includes("--help") || args.length === 0) {
  console.log("Usage: docs-refresh-skill <repo-dir>");
  process.exit(0);
}
const report = auditDocs(requireLocalPath(args[0], "repo directory"));
console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exitCode = 1;
