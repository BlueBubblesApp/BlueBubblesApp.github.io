/** The Private API capability catalogue, for the compatibility page.
 *
 *  Copied from the server's `Sources/BBPrivateAPICatalog/CapabilityCatalog.swift`
 *  -- id, title, summary, macOS floor and category all come from there, so the
 *  page and the server describe the same thing. If a capability is added or its
 *  macOS floor moves, update it here too.
 *
 *  Deliberately no subscription tier: this page answers "does my Mac support
 *  it", which is a separate question from what a plan includes, and Pro is not
 *  announced yet. Adding a tier badge later is additive.
 */

export interface Capability {
  id: string;
  title: string;
  summary: string;
  /** Minimum macOS major version on the server Mac. */
  macos: number;
  category: CapabilityCategory;
}

export type CapabilityCategory =
  | 'messages'
  | 'reactions'
  | 'organising'
  | 'faceTime'
  | 'findMy';

/** Section headings, in the order they appear on the page. */
export const CAPABILITY_CATEGORIES: readonly { id: CapabilityCategory; label: string }[] = [
  { id: 'messages', label: 'Messaging' },
  { id: 'reactions', label: 'Reactions and stickers' },
  { id: 'organising', label: 'Organising conversations' },
  { id: 'faceTime', label: 'FaceTime' },
  { id: 'findMy', label: 'Find My' },
] as const;

export const CAPABILITIES: readonly Capability[] = [
  {
    id: 'rich-sending',
    title: 'Improved message sending',
    summary:
      'Send with a subject line, and more reliably than the scripting interface manages.',
    macos: 14,
    category: 'messages',
  },
  {
    id: 'message-effects',
    title: 'Bubble and screen effects',
    summary:
      'Send with slam, loud, gentle, invisible ink, confetti, fireworks and the rest.',
    macos: 14,
    category: 'messages',
  },
  {
    id: 'replies',
    title: 'Threaded replies',
    summary:
      'Reply to one specific message, so the conversation keeps the thread.',
    macos: 14,
    category: 'messages',
  },
  {
    id: 'mentions',
    title: 'Mentions',
    summary:
      'Mention someone by name in a group so they are notified even on Do Not Disturb.',
    macos: 14,
    category: 'messages',
  },
  {
    id: 'edit-message',
    title: 'Edit a sent message',
    summary:
      'Change the wording of a message you already sent, as Messages does.',
    macos: 14,
    category: 'messages',
  },
  {
    id: 'unsend-message',
    title: 'Unsend a message',
    summary:
      'Take back a message so it disappears for everyone in the conversation.',
    macos: 14,
    category: 'messages',
  },
  {
    id: 'typing-indicators',
    title: 'Typing indicators',
    summary:
      'See when someone is typing to you, and show them when you are.',
    macos: 14,
    category: 'messages',
  },
  {
    id: 'read-state',
    title: 'Mark as read or unread',
    summary:
      'Clear a conversation\'s badge, or put it back, from a client.',
    macos: 14,
    category: 'messages',
  },
  {
    id: 'send-later',
    title: 'Send Later',
    summary:
      'Hand a message to iMessage to deliver later. Apple sends it whether or not this Mac is running, unlike the server\'s own scheduled messages.',
    macos: 15,
    category: 'messages',
  },
  {
    id: 'text-formatting',
    title: 'Text formatting',
    summary:
      'Bold, italics, underline and strikethrough inside a message.',
    macos: 15,
    category: 'messages',
  },
  {
    id: 'polls',
    title: 'Polls',
    summary:
      'Create a poll in a group and collect votes from everyone in it.',
    macos: 26,
    category: 'messages',
  },
  {
    id: 'tapbacks',
    title: 'Reactions',
    summary:
      'Love, like, dislike, laugh, emphasise and question, on any message.',
    macos: 14,
    category: 'reactions',
  },
  {
    id: 'stickers',
    title: 'Stickers',
    summary:
      'Send a sticker, and place it on a message the way Messages does.',
    macos: 14,
    category: 'reactions',
  },
  {
    id: 'emoji-reactions',
    title: 'Emoji reactions',
    summary:
      'React with any emoji, not just the six built-in tapbacks.',
    macos: 15,
    category: 'reactions',
  },
  {
    id: 'sticker-reactions',
    title: 'Sticker reactions',
    summary:
      'Send a sticker as a reaction to a message, the way a tapback attaches to it.',
    macos: 15,
    category: 'reactions',
  },
  {
    id: 'group-management',
    title: 'Managing groups',
    summary:
      'Rename a group, add or remove people, change its photo, and leave it.',
    macos: 14,
    category: 'organising',
  },
  {
    id: 'pinning',
    title: 'Pinning conversations',
    summary:
      'Pin a conversation to the top, in the same order as your other devices.',
    macos: 14,
    category: 'organising',
  },
  {
    id: 'muting',
    title: 'Muting conversations',
    summary:
      'Silence a conversation, permanently or until a time you choose.',
    macos: 14,
    category: 'organising',
  },
  {
    id: 'junk-reporting',
    title: 'Spam and junk',
    summary:
      'Report a conversation as junk, mark it as spam, and move it out of Unknown Senders.',
    macos: 14,
    category: 'organising',
  },
  {
    id: 'chat-backgrounds',
    title: 'Conversation backgrounds',
    summary:
      'Set a background image for a conversation, shared with everyone in it.',
    macos: 26,
    category: 'organising',
  },
  {
    id: 'screen-unknown-senders',
    title: 'Screen unknown senders',
    summary:
      'See whether a sender is known, and accept one into your contacts.',
    macos: 26,
    category: 'organising',
  },
  {
    id: 'facetime',
    title: 'FaceTime from a client',
    summary:
      'Answer or end a call, and create a link someone can join from anywhere.',
    macos: 14,
    category: 'faceTime',
  },
  {
    id: 'find-my',
    title: 'Find My',
    summary:
      'See where your friends and devices are.',
    macos: 14,
    category: 'findMy',
  },
] as const;
