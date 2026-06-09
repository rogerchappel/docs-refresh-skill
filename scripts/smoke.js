import { execFileSync } from "node:child_process";
try { execFileSync("node", ["bin/cli.js", "fixtures/repo"], { encoding: "utf8" }); }
catch (err) { if (!String(err.stdout).includes("missing-script")) throw err; }
console.log("smoke ok");
