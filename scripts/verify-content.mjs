/**
 * Content-fidelity check: every phrase of body copy on the old hand-written
 * site must still appear on its rebuilt counterpart.
 *
 * Run after `npm run build`, while the legacy .html files are still in the
 * repository:  node scripts/verify-content.mjs
 *
 * Site chrome (nav and footer) is excluded on both sides: it changed on
 * purpose. The old nav dropped the current page's own link, which is why no
 * two pages listed the same items and three pages had silently lost Donate.
 */
import { readFileSync, existsSync } from 'node:fs';

const PAGES = [
  ['index.html', 'dist/index.html'],
  ['downloads/index.html', 'dist/downloads/index.html'],
  ['downloads/android/index.html', 'dist/downloads/android/index.html'],
  ['downloads/desktop/index.html', 'dist/downloads/desktop/index.html'],
  ['downloads/server/index.html', 'dist/downloads/server/index.html'],
  ['install/index.html', 'dist/install/index.html'],
  ['faq/index.html', 'dist/faq/index.html'],
  ['donate/index.html', 'dist/donate/index.html'],
  ['privacy.html', 'dist/privacy.html'],
  ['tos.html', 'dist/tos.html'],
];

/** Copy that is intentionally gone, with the reason. */
const INTENTIONALLY_REMOVED = new Map([
  ['Click to copy', 'replaced by a real <button> labelled "Copy"'],
]);

/** Deliberate transformations applied to old copy before comparing.
 *  The old FAQ prefixed every question with "Q: " because the questions were
 *  plain <div>s with nothing to mark them as questions. They are <summary>
 *  elements now, so the prefix is redundant. */
const TRANSFORMS = [(text) => text.replace(/^Q:\s*/, '')];

const applyTransforms = (text) => TRANSFORMS.reduce((acc, fn) => fn(acc), text);

/** Chrome text that legitimately differs: the old nav dropped the current
 *  page's own link, so no two pages listed the same items, and three pages had
 *  silently lost Donate. The footer also gains a Terms of Service link. */
const CHROME = new Set(
  ['Home', 'Downloads', 'Install', 'FAQ', 'Web App', 'Donate', 'Privacy Policy',
   'Terms of Service', 'BlueBubbles', '|'].map((s) => s.toLowerCase())
);

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&apos;/g, "'");

/**
 * Each HTML text node becomes one phrase. Splitting on sentence punctuation
 * instead would run the nav links straight into the first heading, because the
 * old markup has no punctuation between them.
 */
const textNodes = (file) => {
  const html = readFileSync(file, 'utf8')
    .replace(/<(script|style|head)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  return html
    .split(/<[^>]+>/)
    .map((t) => decode(t).replace(/\s+/g, ' ').trim())
    .filter(Boolean);
};

/** Compare on letters and digits only: tag-stripping leaves stray spaces
 *  around punctuation that carry no meaning. */
const squash = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '');

let failures = 0;

for (const [oldPath, newPath] of PAGES) {
  if (!existsSync(oldPath)) {
    console.log(`  skipped  ${oldPath} (legacy file already removed)`);
    continue;
  }
  if (!existsSync(newPath)) {
    console.error(`::error::${newPath} was not built`);
    failures += 1;
    continue;
  }

  const newSquashed = squash(textNodes(newPath).join(' '));

  const phrases = textNodes(oldPath).filter(
    (p) => p.length > 6 && !CHROME.has(p.toLowerCase())
  );

  const missing = phrases.filter((p) => {
    if (INTENTIONALLY_REMOVED.has(p)) return false;
    const wanted = squash(applyTransforms(p));
    return wanted && !newSquashed.includes(wanted);
  });

  if (missing.length === 0) {
    console.log(`       ok  ${oldPath}  (${phrases.length} phrases)`);
  } else {
    failures += missing.length;
    console.error(`::error::${missing.length} phrase(s) missing from ${newPath}`);
    for (const m of missing.slice(0, 10)) console.error(`            - ${m.slice(0, 160)}`);
  }
}

if (failures) {
  console.error(`\n${failures} phrase(s) of original copy are unaccounted for.`);
  process.exit(1);
}
console.log('\n✓ all original body copy accounted for on every rebuilt page');
