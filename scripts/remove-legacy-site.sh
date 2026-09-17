#!/usr/bin/env bash
# Removes the old hand-written site.
#
# Run this ONLY after GitHub Pages has been switched to "GitHub Actions" and
# the new site has been confirmed live. Until then these files are what
# branch-based Pages is still serving, and deleting them takes the site down.
#
# See README.md -> Deploying, step 5.
set -euo pipefail
cd "$(dirname "$0")/.."

git rm -r --quiet \
  index.html \
  privacy.html \
  tos.html \
  sitemap.xml \
  css \
  fonts \
  assets \
  downloads \
  faq \
  install \
  donate \
  CNAME \
  .nojekyll \
  .well-known

echo "Legacy site removed. CNAME, .nojekyll and .well-known now live in public/."
echo "Review with 'git status', then commit."
