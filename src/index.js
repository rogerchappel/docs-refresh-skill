import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";

export function auditDocs(repoDir) {
  const docs = findDocs(repoDir);
  const pkg = readPackage(repoDir);
  const findings = [];
  for (const file of docs) {
    const text = readFileSync(file, "utf8");
    for (const script of extractNpmScripts(text)) {
      if (!pkg.scripts?.[script]) findings.push({ type: "missing-script", file, script });
    }
    for (const ref of extractMarkdownRefs(text)) {
      const target = join(dirname(file), ref);
      if (!existsSync(target)) findings.push({ type: "missing-file", file, ref });
    }
  }
  return { ok: findings.length === 0, docsChecked: docs.length, findings };
}

export function extractNpmScripts(text) {
  return [...text.matchAll(/npm run ([a-z0-9:_-]+)/gi)].map((m) => m[1]);
}

export function extractMarkdownRefs(text) {
  return [...text.matchAll(/\[[^\]]+\]\((?!https?:)([^)#]+)(?:#[^)]+)?\)/gi)].map((m) => m[1]).filter((ref) => !ref.startsWith("#"));
}

function readPackage(repoDir) {
  const path = join(repoDir, "package.json");
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : {};
}

function findDocs(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) findDocs(path, out);
    else if (/\.md$/i.test(name)) out.push(path);
  }
  return out;
}
