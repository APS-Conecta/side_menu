# side_menu

The suite's side menu — Custom menu, the Nextcloud app by [Simon Vieille][deblan] — as an
APS Conecta repo of its own, released and installed like every other app of the suite
([ADR-0017][adr17]).

## Why a repo, and not a fork

Upstream lives on [gitnet.fr][gitnet], deblan's self-hosted forge — the app's only source: no
GitHub mirror, no app-store tarball we could trace. That forge has been unreachable since
2026-08-13 (measured in [instalador #169][169]: DNS resolves, both ports blackhole the SYN), so
there is nothing to fork and nothing to track. The suite pinned the last tarball it could fetch,
6.0.1, and the decision then was to **mirror the tarball somewhere we control**. This repo is
that mirror, grown into the app's source of truth: it starts from upstream's AGPL 6.0.1 tarball
and carries the app forward from there.

The tree is therefore the app **as shipped, not as built**: upstream's tarball carries no build
manifest (no `package.json`), and reconstructing one would produce bundles nobody could verify
against upstream's. So the `js/` bundle ships as committed bytes — the one caller of the shared
release workflow's `shipped-bundle: true`, which accepts exactly that and refuses a
`package.json` beside it (a buildable app builds). `src/` stays for reading; nothing builds it.

## What differs from upstream's 6.0.1

Nothing in the app bytes. The release drops `appinfo/signature.json` (upstream's code signature
would describe files it did not verify, and a release never carries one), and the repo adds its
licence file and release tooling. The suite's branding — the violet menu background — is
configuration the installer writes on every install (`occ config:app:set side_menu
background-color`), never a patch inside this tree.

## Releases

Push a `v<version>` tag equal to `appinfo/info.xml`'s version. The [shared release
workflow][shared] packs deterministically, signs `SHA256SUMS` with the app key inside this
repo's protected `release` environment, proves it against the suite's `apps.pub`, and publishes
`side_menu.tar.gz`, `info.xml`, `SHA256SUMS` and `SHA256SUMS.minisig`. A pull request builds and
packs only.

## Licence and credit

AGPL-3.0-or-later, as upstream: see [`LICENSE`](LICENSE). Custom menu is [Simon Vieille's
work][deblan]; its documentation, issue tracker and translations remain at [his
site][docs] and on [translate.codeberg.org][weblate]. This repo keeps his attribution in
`appinfo/info.xml` and his changelog in [`CHANGELOG.md`](CHANGELOG.md).

[deblan]: https://www.deblan.fr/
[gitnet]: https://gitnet.fr/deblan/side_menu
[169]: https://github.com/APS-Conecta/instalador/issues/169
[adr17]: https://github.com/APS-Conecta/instalador/blob/main/docs/adr/0017-apps-install-from-their-own-releases.md
[shared]: https://github.com/APS-Conecta/.github/blob/main/.github/workflows/app-release.yml
[docs]: https://deblan.gitnet.page/side_menu_doc/
[weblate]: https://translate.codeberg.org/projects/custom-menu/application/
