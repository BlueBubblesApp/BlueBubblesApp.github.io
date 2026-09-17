import { LINKS } from './site';

export interface StoreTarget {
  href: string;
  /** Small line above the name, matching each vendor's own badge wording. */
  kicker: string;
  name: string;
  /** astro-icon name (Simple Icons). */
  icon: string;
  /** Accessible label; the visible two-line text is decorative-ish. */
  label: string;
}

export const STORES: readonly StoreTarget[] = [
  {
    href: LINKS.playStore,
    kicker: 'Get it on',
    name: 'Google Play',
    icon: 'simple-icons:googleplay',
    label: 'Get it on Google Play',
  },
  {
    href: LINKS.msStore,
    kicker: 'Download from',
    name: 'Microsoft Store',
    icon: 'simple-icons:microsoftstore',
    label: 'Download from the Microsoft Store',
  },
  {
    href: LINKS.snapStore,
    kicker: 'Get it from the',
    name: 'Snap Store',
    icon: 'simple-icons:snapcraft',
    label: 'Get it from the Snap Store',
  },
  {
    href: LINKS.flathub,
    kicker: 'Download on',
    name: 'Flathub',
    icon: 'simple-icons:flathub',
    label: 'Download on Flathub',
  },
] as const;
