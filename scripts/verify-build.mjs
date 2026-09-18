/**
 * Post-build guard. Turns the two failure modes that would be silent and
 * expensive into a red build:
 *
 *   1. A URL that exists on the live site stops resolving.
 *   2. A file that something external depends on goes missing --
 *      CNAME (the custom domain unbinds and the site goes down) or the
 *      Flathub verification token (the app quietly loses its verified badge
 *      weeks later, with no signal).
 *
 * SCOPE: this checks dist/, which is the build output, NOT what finally reaches
 * GitHub Pages. Those differ. actions/upload-pages-artifact tars with
 * `--exclude=.[^/]*` and drops every dot-entry, so .well-known/ passed this
 * check and still 404'd in production. The deploy workflow therefore packages
 * the tar itself and asserts the dot-entries survived into the artifact. If you
 * add anything else hidden to public/, assert it in both places.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

/** Every path the old hand-written site served, as a real file in dist/. */
const REQUIRED_PAGES = [
  'index.html',
  'downloads/index.html',
  'downloads/android/index.html',
  'downloads/desktop/index.html',
  'downloads/server/index.html',
  'install/index.html',
  'faq/index.html',
  'donate/index.html',
  // Exact casing matters: GitHub Pages is case-sensitive and this path is in
  // the old sitemap.
  'install/privateAPI/index.html',
  // These two keep their .html URLs. They only land at these exact paths
  // because astro.config.mjs sets build.format: 'preserve'.
  'privacy.html',
  'tos.html',
  '404.html',
];

const REQUIRED_STATIC = [
  'CNAME',
  '.nojekyll',
  '.well-known/org.flathub.VerifiedApps.txt',
  'robots.txt',
  'og-default.png',
  'favicon.ico',
  'sitemap-index.xml',
];

/** /web is a separate Pages deploy (the BlueBubblesApp/web repo) served under
 *  this org's custom domain. Anything we emit at that path would shadow it. */
const MUST_NOT_EXIST = ['web', 'web/index.html'];

const EXPECTED_CONTENT = [
  ['CNAME', 'bluebubbles.app'],
  ['.well-known/org.flathub.VerifiedApps.txt', '34a47c70-ee94-40bc-9bb3-14eea3dd141a'],
];

const errors = [];

for (const path of [...REQUIRED_PAGES, ...REQUIRED_STATIC]) {
  if (!existsSync(join(DIST, path))) errors.push(`missing from dist/: ${path}`);
}

for (const path of MUST_NOT_EXIST) {
  if (existsSync(join(DIST, path))) {
    errors.push(`dist/${path} would shadow the separate /web Pages deploy`);
  }
}

for (const [path, expected] of EXPECTED_CONTENT) {
  const full = join(DIST, path);
  if (existsSync(full) && !readFileSync(full, 'utf8').includes(expected)) {
    errors.push(`dist/${path} no longer contains ${expected}`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(`::error::${error}`);
  console.error(`\n${errors.length} problem(s) found in the build output.`);
  process.exit(1);
}

console.log(
  `✓ ${REQUIRED_PAGES.length} pages and ${REQUIRED_STATIC.length} static files present; ` +
    `/web not shadowed; CNAME and Flathub token intact.`
);
