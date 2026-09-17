// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Org Pages site on a custom domain, served at the root.
  // NOTE: no `base` — that is project-site advice and would prefix every URL.
  site: 'https://bluebubbles.app',

  output: 'static',

  // The most important line in this file.
  // 'preserve' mirrors src/pages/ 1:1 into dist/, which reproduces every legacy
  // URL exactly -- including the literal files /privacy.html and /tos.html.
  //   'directory' would emit privacy.html/index.html (a *directory*) -- wrong.
  //   'file'      would emit downloads.html and break /downloads/   -- wrong.
  // Consequence: every page must be `<dir>/index.astro`, never `<dir>.astro`.
  build: { format: 'preserve' },

  // Matches GitHub Pages, which already 301s /downloads -> /downloads/.
  trailingSlash: 'ignore',

  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },

  // Replaces the Apple-proprietary self-hosted SF UI Display files.
  // Astro downloads, subsets and self-hosts Inter at build time, and computes
  // fallback metric overrides so swapping to system-ui causes no layout shift.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],

  integrations: [
    icon({ iconDir: 'src/icons' }),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        // Under build.format 'preserve', @astrojs/sitemap does not append a
        // trailing slash to directory-index routes. Normalize so canonical URLs
        // in the sitemap match what GitHub Pages actually serves.
        const url = new URL(item.url);
        const isFile = /\.[a-z0-9]+$/i.test(url.pathname);
        if (!isFile && !url.pathname.endsWith('/')) {
          url.pathname += '/';
          item.url = url.href;
        }
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
