import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const root = new URL("..", import.meta.url).pathname;
const tmp = mkdtempSync(join(tmpdir(), "docs-refresh-skill-pack-"));

execFileSync("npm", ["pack", "--pack-destination", tmp], { cwd: root, stdio: "inherit" });
const tarball = readdirSync(tmp).find((name) => /^docs-refresh-skill-.*\.tgz$/.test(name));
if (!tarball) throw new Error("npm pack did not create a docs-refresh-skill tarball");

const app = join(tmp, "app");
mkdirSync(app);
execFileSync("npm", ["init", "-y"], { cwd: app, stdio: "ignore" });
execFileSync("npm", ["install", join(tmp, tarball)], { cwd: app, stdio: "inherit" });

const repo = join(app, "repo");
mkdirSync(repo);
writeFileSync(join(repo, "package.json"), JSON.stringify({ scripts: { test: "node --test" } }));
writeFileSync(join(repo, "README.md"), "# Fixture\n\n```bash\nnpm run test\n```\n\nSee [guide](guide.md).\n");
writeFileSync(join(repo, "guide.md"), "# Guide\n");

const help = execFileSync("npx", ["docs-refresh-skill", "--help"], { cwd: app, encoding: "utf8" });
if (!help.includes("docs-refresh-skill <repo-dir>")) {
  throw new Error("installed CLI help did not match expected usage");
}

const out = execFileSync("npx", ["docs-refresh-skill", repo], { cwd: app, encoding: "utf8" });
if (!out.includes('"ok": true')) {
  throw new Error("installed CLI audit smoke failed");
}

const api = execFileSync("node", ["--input-type=module", "-e", `import { auditDocs } from 'docs-refresh-skill'; const r = auditDocs(${JSON.stringify(repo)}); console.log(JSON.stringify(r));`], { cwd: app, encoding: "utf8" });
if (!api.includes('"ok":true')) {
  throw new Error("installed package export smoke failed");
}

console.log("package smoke ok");
