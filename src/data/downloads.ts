import { LINKS } from './site';

export type PlatformSlug = 'android' | 'desktop' | 'server';

export interface DownloadLink {
  label: string;
  href: string;
  icon?: string;
  /** Rendered after the main link, e.g. "- Installation Instructions". */
  secondary?: { label: string; href: string };
}

export interface CommandSnippet {
  heading?: string;
  /** What the user sees. */
  display: string;
  /**
   * What lands on the clipboard. Defaults to `display`.
   *
   * The Snap entry deliberately differs: the old site displays
   *   sudo snap install bluebubbles (--beta) (--edge)
   * but copies only `sudo snap install bluebubbles`. The parenthesised flags
   * are documentation of optional channels, not shell syntax -- copying them
   * verbatim would produce a command that fails. Modelled explicitly so nobody
   * "fixes" it into a broken paste.
   */
  copy?: string;
}

/** A titled block inside a section. Blocks render in declared order, which is
 *  what preserves the old Linux layout (Flathub, then Snap, then "Zip"). */
export type DownloadBlock =
  | { kind: 'links'; heading?: string; links: DownloadLink[] }
  | { kind: 'command'; heading?: string; command: CommandSnippet };

export interface DownloadSection {
  heading: string;
  blocks: DownloadBlock[];
}

export interface PlatformPage {
  slug: PlatformSlug;
  /** Card label on the downloads hub. */
  label: string;
  /** Which group the card sits under on the hub. */
  group: 'Client' | 'Server';
  icon: string;
  /** <h1>, verbatim from the old page. */
  title: string;
  seoTitle: string;
  seoDescription: string;
  sections: DownloadSection[];
}

export const PLATFORMS: readonly PlatformPage[] = [
  {
    slug: 'android',
    label: 'Android',
    group: 'Client',
    icon: 'simple-icons:android',
    title: 'Android Downloads',
    seoTitle: 'BlueBubbles - iMessage on Android',
    seoDescription:
      'Download the BlueBubbles Android app to get iMessage on your Android device.',
    sections: [
      {
        heading: 'Pre-compiled Binaries',
        blocks: [
          {
            kind: 'links',
            links: [
              { label: 'Google Play', href: LINKS.playStore, icon: 'simple-icons:googleplay' },
              { label: 'Github Releases', href: LINKS.clientReleases, icon: 'simple-icons:github' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'desktop',
    label: 'Desktop',
    group: 'Client',
    icon: 'lucide:monitor',
    title: 'Windows / Linux Downloads',
    seoTitle: 'BlueBubbles - iMessage on Windows & Linux',
    seoDescription:
      'Download the BlueBubbles desktop app to get iMessage on Windows and Linux.',
    sections: [
      {
        heading: 'Windows Pre-Compiled Binaries',
        blocks: [
          {
            kind: 'links',
            links: [
              { label: 'Microsoft Store', href: LINKS.msStore, icon: 'simple-icons:windows' },
              {
                label: 'Github Releases',
                href: LINKS.clientReleases,
                icon: 'simple-icons:github',
                secondary: {
                  label: 'Installation Instructions',
                  href: 'https://docs.bluebubbles.app/client/desktop-app-installation#standalone-executable-windows',
                },
              },
            ],
          },
        ],
      },
      {
        heading: 'Linux Pre-Compiled Binaries',
        blocks: [
          {
            kind: 'command',
            heading: 'Flathub',
            command: { display: 'flatpak install flathub app.bluebubbles.BlueBubbles' },
          },
          {
            kind: 'command',
            heading: 'Snap',
            command: {
              display: 'sudo snap install bluebubbles (--beta) (--edge)',
              copy: 'sudo snap install bluebubbles',
            },
          },
          {
            kind: 'links',
            heading: 'Zip',
            links: [
              {
                label: 'Github Releases',
                href: LINKS.clientReleases,
                icon: 'simple-icons:github',
                secondary: {
                  label: 'Installation Instructions',
                  href: 'https://docs.bluebubbles.app/client/desktop-app-installation#standalone-executable-linux',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'server',
    label: 'MacOS',
    group: 'Server',
    icon: 'simple-icons:apple',
    title: 'Server Downloads',
    seoTitle: 'BlueBubbles - Server Downloads',
    seoDescription:
      'Download the BlueBubbles macOS server, the bridge between iMessage and your other devices.',
    sections: [
      {
        heading: 'DMG - GitHub',
        blocks: [
          {
            kind: 'links',
            links: [
              { label: 'Github Releases', href: LINKS.serverReleases, icon: 'simple-icons:github' },
            ],
          },
        ],
      },
      {
        heading: 'Homebrew',
        blocks: [
          { kind: 'command', command: { display: 'brew install --cask bluebubbles' } },
        ],
      },
    ],
  },
] as const;

export const getPlatform = (slug: PlatformSlug): PlatformPage =>
  PLATFORMS.find((p) => p.slug === slug)!;

export const BUILD_FROM_SOURCE = {
  client: 'https://docs.bluebubbles.app/client/build-yourself-contribution-guide',
  server: 'https://docs.bluebubbles.app/server/build-yourself-contribution-guide',
} as const;
