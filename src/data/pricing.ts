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
 *  Sourced from the server's capability catalogue -- every entry below is a
 *  capability carrying `minimumTier: .pro` in
 *  `swift/Sources/BBPrivateAPICatalog/CapabilityCatalog.swift`. Titles,
 *  summaries and macOS minimums are copied from it rather than written here, so
 *  this page and the server agree. If a capability's tier changes there, change
 *  it here too.
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
    id: 'pinning',
    title: 'Pinning conversations',
    summary: 'Pin a conversation to the top, in the same order as your other devices.',
    macos: 14,
  },
  {
    id: 'muting',
    title: 'Muting conversations',
    summary: 'Silence a conversation, permanently or until a time you choose.',
    macos: 14,
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
    id: 'facetime',
    title: 'FaceTime from a client',
    summary: 'Answer or end a call, and create a link someone can join from anywhere.',
    macos: 14,
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
