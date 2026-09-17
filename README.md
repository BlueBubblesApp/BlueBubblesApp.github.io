# bluebubbles.app

The BlueBubbles website: a static [Astro](https://astro.build) site deployed to
GitHub Pages.

## Requirements

Node **>= 22.12** (Astro 7). The repo pins a version in `.nvmrc`, which both
fnm and nvm read:

```bash
fnm use && npm install    # or: nvm use && npm install
```

With `fnm env --use-on-cd` in your shell profile, `cd`-ing into the repo
switches Node automatically and you can skip `fnm use` entirely.

If Node is too old you get `Node.js vX is not supported by Astro!` rather than
a running server.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:4321 |
| `npm run build` | Type check, then build to `dist/` |
| `npm run preview` | Serve the built `dist/` |
| `npm run check` | Type check only |
| `npm run verify` | Assert the build output is deployable and that no original copy was lost (also runs in CI) |

## Where things live

```
src/
  data/site.ts          Nav, footer, social and store links -- edit here, not in components
  data/downloads.ts     Everything the four download pages render
  content/faq/          One Markdown file per FAQ question
  content/install/      The install guide, one file per section
  content/legal/        Privacy policy and ToS, as raw generator HTML
  pages/                One directory per URL
public/                 Copied verbatim: CNAME, .well-known, robots.txt, favicons, media
```

### Adding a FAQ entry

Drop a Markdown file in `src/content/faq/`. The filename becomes the URL
anchor, so keep it readable:

```markdown
---
question: "Does BlueBubbles work with RCS?"
category: features   # setup | features | security | issues | other
order: 4             # position within the category
---

<p>Answer HTML or Markdown goes here.</p>
```

Answers may be plain HTML — these files are Markdown, not MDX, precisely so
that raw HTML passes through untouched.

## Two rules that are easy to break

**1. Every page must be `<dir>/index.astro`, never `<dir>.astro`.**

`astro.config.mjs` sets `build.format: 'preserve'`, which mirrors `src/pages/`
straight into `dist/`. That is what keeps every legacy URL working, including
the two literal files `/privacy.html` and `/tos.html` (which are
`src/pages/privacy.astro` and `src/pages/tos.astro`).

The catch: `src/pages/downloads.astro` would emit `downloads.html`, which
serves `/downloads` but 404s `/downloads/` — and `/downloads/` is the form most
inbound links use. Dynamic routes have the same problem, which is why the three
platform download pages are three explicit files rather than one `[platform]`
route.

`npm run verify` fails the build if any known URL stops resolving.

## Content fidelity

`scripts/verify-content.mjs` compares the visible text of every page of the old
hand-written site against its rebuilt counterpart, phrase by phrase (646 of
them), and fails if anything went missing. It runs in CI and skips
automatically once the legacy `.html` files are deleted.

Two deliberate differences are declared in the script rather than hidden:
the FAQ's old `"Q: "` question prefix (redundant now that questions are
`<summary>` elements) and `"Click to copy"` (replaced by a real button labelled
`Copy`).

**2. Never create a `/web` path here.**

`https://bluebubbles.app/web` is *not* part of this site. It is the separate
[`BlueBubblesApp/web`](https://github.com/BlueBubblesApp/web) repository, which
has its own GitHub Pages deploy and is served under this org's custom domain.
Anything emitted at `dist/web` would shadow it. `npm run verify` checks for this.

### A dev-only difference

`astro dev` serves the legal pages at `/privacy` and `/tos`. The **built** site
serves them at `/privacy.html` and `/tos.html`, which is what production uses
and what the footer links to. To check them as they will really be served, use
`npm run build && npm run preview`.

## Deploying

Pushes to `master` build and deploy via `.github/workflows/deploy.yml`.

**One-time setup:** in Settings → Pages, set *Build and deployment → Source* to
**GitHub Actions**. Until that is done, deploys fail and the old branch-based
site keeps being served.

Cutover order matters, because branch-based Pages is currently serving the old
hand-written files from the repository root:

1. Merge this work to `master`. The old files are still present, so the live
   site is unchanged.
2. Switch Settings → Pages → Source to **GitHub Actions**.
3. Run the *Deploy to GitHub Pages* workflow (`workflow_dispatch`).
4. Confirm: the site loads, Settings → Pages still shows `bluebubbles.app` with
   Enforce HTTPS on, `/privacy.html` and `/tos.html` resolve,
   `/.well-known/org.flathub.VerifiedApps.txt` returns 200, and
   `https://bluebubbles.app/web/` still loads.
5. Only then run `scripts/remove-legacy-site.sh` and commit, to delete the old
   site.

To roll back at any point, switch Source back to *Deploy from a branch → master*.

**`public/CNAME` is load-bearing.** If it is missing from `dist/`, the custom
domain unbinds and the site goes down. Same for
`public/.well-known/org.flathub.VerifiedApps.txt`, which Flathub reads to keep
the app verified. `npm run verify` asserts both on every build.
