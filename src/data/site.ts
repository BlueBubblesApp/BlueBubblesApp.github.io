/** Site-wide constants. Single source of truth for links duplicated across the
 *  old hand-written pages (where they had silently drifted apart). */

export const SITE = {
  name: 'BlueBubbles',
  url: 'https://bluebubbles.app',
  tagline: 'Bringing iMessage to Windows, Linux, and Android.',
  description:
    'BlueBubbles is an open-source, community-driven ecosystem of apps used to get iMessage on Android, Windows, and Linux.',
  keywords:
    'iMessage, Windows, Linux, PC, Android, BlueBubbles, Blue Bubbles, Messages',
} as const;

export const LINKS = {
  discord: 'https://discord.gg/6nrGRHT',
  github: 'https://github.com/BlueBubblesApp',
  reddit: 'https://www.reddit.com/r/BlueBubbles/',
  docs: 'https://docs.bluebubbles.app',
  webApp: 'https://bluebubbles.app/web',
  sponsors: 'https://github.com/sponsors/BlueBubblesApp',
  clientReleases: 'https://github.com/BlueBubblesApp/BlueBubbles-App/releases',
  serverReleases: 'https://github.com/BlueBubblesApp/BlueBubbles-server/releases',
  serverReleasesLatest:
    'https://github.com/BlueBubblesApp/bluebubbles-server/releases/latest',
  playStore:
    'https://play.google.com/store/apps/details?id=com.bluebubbles.messaging',
  msStore: 'https://www.microsoft.com/store/productId/9P3XF8KJ0LSM',
  snapStore: 'https://snapcraft.io/bluebubbles',
  flathub: 'https://flathub.org/apps/app.bluebubbles.BlueBubbles',
} as const;

export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

/** Header navigation.
 *  Behavior change from the old site: it *removed* the current page's own link
 *  (which is why each page shipped a different nav, and why three pages had
 *  silently lost the Donate link). Every link now appears on every page and the
 *  current one is marked with aria-current. */
export const NAV_LINKS: readonly NavItem[] = [
  { href: '/downloads/', label: 'Downloads' },
  { href: '/install/', label: 'Install' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/donate/', label: 'Donate' },
  // Absolute on purpose: /web is a *separate* Pages deploy
  // (the BlueBubblesApp/web repo), not a route in this site.
  { href: LINKS.webApp, label: 'Web App', external: true },
] as const;

export const FOOTER_LINKS: readonly NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/downloads/', label: 'Downloads' },
  { href: '/install/', label: 'Install' },
  { href: '/is-it-for-me/', label: 'Is it for me?' },
  { href: '/faq/', label: 'FAQ' },
  { href: LINKS.webApp, label: 'Web App', external: true },
  { href: '/donate/', label: 'Donate' },
  { href: '/privacy.html', label: 'Privacy Policy' },
  // Previously orphaned -- the document existed but nothing linked to it.
  { href: '/tos.html', label: 'Terms of Service' },
] as const;

export interface SocialLink {
  href: string;
  label: string;
  icon: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { href: LINKS.playStore, label: 'Google Play', icon: 'simple-icons:googleplay' },
  { href: LINKS.msStore, label: 'Microsoft Store', icon: 'simple-icons:windows' },
  { href: LINKS.github, label: 'GitHub', icon: 'simple-icons:github' },
  { href: LINKS.discord, label: 'Discord', icon: 'simple-icons:discord' },
  { href: LINKS.reddit, label: 'Reddit', icon: 'simple-icons:reddit' },
] as const;

/** Public, non-secret PayPal client id -- it is already published in the
 *  current site's markup and is safe in client code by design. */
export const PAYPAL_CLIENT_ID =
  'Ad0ZQ_9WlFAQQ7KEYqX4IxuvLcp51X6MdINA7crdCGRYgesVQrefxQv0HdIZpXb_fwIzYYQPerRuELWq';

export const DONATION_PRESETS = [1, 5, 10, 25] as const;
export const DEFAULT_DONATION = 5;
