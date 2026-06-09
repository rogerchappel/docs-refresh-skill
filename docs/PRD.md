# PRD: docs-refresh-skill

Status: release-candidate

## Pitch

Detect README/docs drift against package scripts, CLI help, examples, and current files.

## Goals

- Provide a local-first CLI and library API.
- Keep external writes out of scope for v1.
- Make outputs deterministic enough for fixture-backed tests.

## Non-goals

- Live provider writes.
- Secret storage.
- Publishing packages or releases from this repo.
