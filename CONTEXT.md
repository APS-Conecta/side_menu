# side_menu

The suite's side menu, as a vendored fork of Simon Vieille's Custom menu. This glossary fixes
the words; decisions live in the instalador repo's [ADRs](https://github.com/APS-Conecta/instalador/tree/main/docs/adr).

**Vendored fork**:
An app whose source of truth is a tarball we fetched and now own, because upstream is
unreachable. Not a git fork — there is nothing to track — and not a store app: the bytes are
ours to change, released from this repo.
_Avoid_: mirror (this repo changes, not reflects), fork of record

**Shipped bundle**:
The `js/` directory, committed. Upstream's tarball carries it built and carries no build
manifest, so the release ships those bytes instead of building them; the shared workflow
accepts it only for this repo's `shipped-bundle: true`, and never beside a `package.json`.
_Avoid_: committed bundle, vendored dist

**The freeze**:
The period upstream was unreachable (since 2026-08-13, instalador #169), during which the suite
carried the 6.0.1 tarball baked into its images. This repo ends the freeze's cost: the app now
updates by release from here, whether or not gitnet.fr returns.

**Branding as configuration**:
The suite's violet menu background, written by the installer as app configuration
(`background-color` / `background-color-to`) on every install. It survives app updates because
it lives in the database, and it never enters this tree as a patch.
_Avoid_: brand patch, fork customisation
