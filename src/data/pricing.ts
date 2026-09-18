/** BlueBubbles Pro plans.
 *
 *  Purchases are handled by Creem and managed by the server, not the client
 *  apps, so nothing here links to an app store or an in-app purchase flow.
 */

export interface Plan {
  id: 'monthly' | 'yearly' | 'lifetime';
  name: string;
  /** Price in USD. */
  price: number;
  /** Rendered after the price, e.g. "/month". Omitted for one-off purchases. */
  cadence?: string;
  description: string;
  /** Small note under the price, e.g. annual equivalent or saving. */
  note?: string;
  featured?: boolean;
}

const MONTHLY = 3;
const YEARLY = 30;

export const PLANS: readonly Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: MONTHLY,
    cadence: '/month',
    description: 'Billed monthly. Cancel any time.',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: YEARLY,
    cadence: '/year',
    // 12 x $3 = $36, so the yearly plan saves $6 -- derived, not a claim.
    note: `Save $${MONTHLY * 12 - YEARLY} a year versus monthly`,
    description: 'Billed once a year. Cancel any time.',
    featured: true,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 55,
    description: 'One payment. Yours for good, with no recurring charge.',
  },
] as const;

/** What Pro unlocks.
 *
 *  Every entry is a capability carrying `minimumTier: .pro` in
 *  `swift/Sources/BBPrivateAPICatalog/CapabilityCatalog.swift`. The `id` and
 *  `macos` fields are copied from it verbatim and are the link back to the
 *  server -- if a capability's tier or macOS floor changes there, change it
 *  here too.
 *
 *  `title` and `summary` are deliberately NOT copied. The catalogue's strings
 *  are UI labels for the server's own features card; these are the marketing
 *  line for someone deciding whether to pay, and they lead with what the tier
 *  actually buys. Pinning and muting are the clearest case: the capability is
 *  not pinning a chat, which the apps already do, but having that state sync
 *  across every device.
 */
export interface ProFeature {
  /** Catalogue id, for cross-referencing the server. */
  id: string;
  title: string;
  summary: string;
  /** Minimum macOS major version on the server Mac. */
  macos: number;
}

export const PRO_FEATURES: readonly ProFeature[] = [
  {
    id: 'facetime',
    title: 'FaceTime Calling',
    summary:
      "Answer, end and start FaceTime calls from a client, and create a link someone can join from anywhere.",
    macos: 14,
  },
  {
    id: 'pinning',
    title: 'Pinned Chat Syncing',
    summary:
      "Pin conversations from a client and have them stay in sync across all your devices, in the same order everywhere.",
    macos: 14,
  },
  {
    id: 'muting',
    title: 'Mute & Snooze Syncing',
    summary:
      "Silence a conversation permanently or snooze it until a time you choose, kept in sync across your devices.",
    macos: 14,
  },
  {
    id: 'stickers',
    title: 'Stickers',
    summary: 'Send a sticker, and place it on a message the way Messages does.',
    macos: 14,
  },
  {
    id: 'sticker-reactions',
    title: 'Sticker reactions',
    summary: 'Send a sticker as a reaction to a message, the way a tapback attaches to it.',
    macos: 15,
  },
  {
    id: 'junk-reporting',
    title: 'Spam and junk',
    summary:
      'Report a conversation as junk, mark it as spam, and move it out of Unknown Senders.',
    macos: 14,
  },
  {
    id: 'screen-unknown-senders',
    title: 'Screen unknown senders',
    summary: 'See whether a sender is known, and accept one into your contacts.',
    macos: 26,
  },
  {
    id: 'send-later',
    title: 'Send Later',
    summary:
      "Hand a message to iMessage to deliver later. Apple sends it whether or not this Mac is running, unlike the server's own scheduled messages.",
    macos: 15,
  },
  {
    id: 'polls',
    title: 'Polls',
    summary: 'Create a poll in a group and collect votes from everyone in it.',
    macos: 26,
  },
  {
    id: 'chat-backgrounds',
    title: 'Conversation backgrounds',
    summary: 'Set a background image for a conversation, shared with everyone in it.',
    macos: 26,
  },
] as const;

/** Capabilities that stay free, by title, for the "still free" note. */
export const FREE_FEATURES: readonly string[] = [
  'Improved message sending',
  'Bubble and screen effects',
  'Threaded replies',
  'Mentions',
  'Edit a sent message',
  'Unsend a message',
  'Typing indicators',
  'Mark as read or unread',
  'Reactions',
  'Emoji reactions',
  'Text formatting',
  'Managing groups',
  'Find My',
] as const;

/** macOS releases the Swift server runs on.
 *
 *  Names and numbers come from the server's own `docs/MACOS_COMPATIBILITY.md`.
 *  The floor is 14: `Package.swift` declares `.macOS(.v14)`, so there is nothing
 *  below it to offer. Note the numbering jumps 15 -> 26; Apple moved to
 *  year-based versions, and 16 through 25 do not exist.
 */
export interface MacOSRelease {
  version: number;
  name: string;
}

export const MACOS_RELEASES: readonly MacOSRelease[] = [
  { version: 14, name: 'Sonoma' },
  { version: 15, name: 'Sequoia' },
  { version: 26, name: 'Tahoe' },
] as const;
