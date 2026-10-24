# AGENTS.md — side_menu

## What this repo is

A **vendored fork**: side_menu ("Custom menu"), Simon Vieille's Nextcloud app, seeded from
upstream's AGPL 6.0.1 tarball because its only source — gitnet.fr — is unreachable. There is no
build manifest and nothing here is built: the `js/` bundle ships as committed bytes (the shared
release workflow's one `shipped-bundle` caller), `src/` is upstream's frontend source kept for
reading, and the release tarball is the packer's default excludes over this tree.

- Change the app by committing to this tree; the suite installs only from this repo's signed
  releases (ADR-0017 in the instalador repo). Branding (the violet background) is configuration
  the installer writes — `occ config:app:set side_menu background-color` — never a patch here.
- Never add a `package.json`: it would turn the shipped bundle into a lie, and the packer
  refuses it beside `shipped-bundle`.
- Never add `appinfo/signature.json`: a release never carries an upstream code signature, and
  the installer refuses one that does.
- The tag must equal `v` + the `<version>` in `appinfo/info.xml`, dotted numbers, monotonically
  increasing (the installer recognises "newer" by version).

## Agent skills

### Issue tracker

GitHub Issues on `APS-Conecta/side_menu`, via the `gh` CLI.

### Domain docs

[`CONTEXT.md`](CONTEXT.md) for the vocabulary; decisions live in the instalador repo's ADRs.
