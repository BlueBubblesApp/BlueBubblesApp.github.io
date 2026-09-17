import type { ImageMetadata } from 'astro';
import { LINKS } from './site';

import googlePlay from '@assets/badges/google-play.png';
import msStore from '@assets/badges/ms-store.svg';
import snapStore from '@assets/badges/snap-store.svg';
import flathub from '@assets/badges/flathub.png';

export interface StoreBadgeItem {
  href: string;
  src: ImageMetadata;
  alt: string;
  /** Rendered height in px.
   *  These are tuned so the badges look optically equal, not so their boxes
   *  measure equal: Google Play's official artwork bakes in padding of 1/10 the
   *  image height on every side, so it needs ~25% more box height to match the
   *  others. The old site rendered all four at their natural sizes, which is
   *  why the row looked ragged. */
  height: number;
}

export const STORE_BADGES: readonly StoreBadgeItem[] = [
  { href: LINKS.playStore, src: googlePlay, alt: 'Get it on Google Play', height: 55 },
  { href: LINKS.msStore, src: msStore, alt: 'Get it from Microsoft', height: 44 },
  { href: LINKS.snapStore, src: snapStore, alt: 'Get it from the Snap Store', height: 44 },
  { href: LINKS.flathub, src: flathub, alt: 'Download on Flathub', height: 44 },
] as const;
