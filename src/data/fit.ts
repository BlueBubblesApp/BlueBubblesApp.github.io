/** Questions for "Is BlueBubbles a good fit for me?".
 *
 *  Every constraint here is real and traceable to the FAQ or the install guide:
 *  a Mac is required (a VM counts), the server only relays while that Mac is
 *  awake, Full Disk Access is mandatory, and SMS is not supported. The tone is
 *  light; the answers are not.
 */

export type Tone = 'good' | 'info' | 'warn';

export interface Choice {
  id: string;
  label: string;
  /** Ends the quiz immediately. Used only where the answer is genuinely fatal. */
  disqualifies?: boolean;
  /**
   * Steers the result to "probably not" without ending the quiz. For answers
   * that are a serious problem but not a hard impossibility -- a managed Mac,
   * say, where the block is policy and permissions rather than physics.
   */
  blocks?: boolean;
  /** Carried through to the result. */
  note?: string;
  /**
   * A clause naming why this answer counts, used to compose the result
   * sentence. Written to read after "the sticking point:" or in a list, so it
   * starts lowercase and carries no full stop.
   */
  reason?: string;
  tone?: Tone;
}

export interface Question {
  id: string;
  question: string;
  /** A line of context under the question. */
  help?: string;
  choices: Choice[];
}

export const QUESTIONS: readonly Question[] = [
  {
    id: 'mac',
    question: 'Do you have a Mac, or a way to get one?',
    help: "This is the big one. BlueBubbles needs a Mac signed in to iMessage to do the actual talking — there's no way around it.",
    choices: [
      { id: 'have', label: 'Yes, I have a Mac', tone: 'good' },
      {
        id: 'buy',
        label: 'I could pick up a cheap old one',
        tone: 'good',
        note: 'A second-hand Mac mini is the usual route. It does not need to be fast — it only relays messages.',
      },
      {
        id: 'vm',
        label: "I'd run macOS in a virtual machine",
        tone: 'info',
        note: 'Running macOS in a VM works, and there are guides for it in the docs and on the subreddit. Expect a fiddlier setup than real Apple hardware, and be aware it is a grey area under macOS licensing.',
      },
      {
        id: 'none',
        label: 'No, and I have no plans to',
        reason: "you do not have a Mac",
        disqualifies: true,
        note: 'Without a Mac there is nothing to connect to. This is the one requirement with no workaround.',
      },
    ],
  },
  {
    id: 'macos',
    question: 'What macOS version is that Mac on?',
    help: 'The current server needs Sonoma or newer. Older Macs are not shut out, but they are on an older server.',
    choices: [
      { id: 'tahoe', label: 'Tahoe (26)', tone: 'good' },
      { id: 'sequoia', label: 'Sequoia (15)', tone: 'good' },
      {
        id: 'sonoma',
        label: 'Sonoma (14)',
        tone: 'good',
        note: 'Sonoma runs the current server. A handful of the newer Private API features need Sequoia or Tahoe, but the core of BlueBubbles is all there.',
      },
      {
        id: 'older',
        label: 'Ventura (13) or older',
        reason: 'the Mac is on a macOS too old for the current server',
        tone: 'warn',
        note: 'BlueBubbles still works, but on the 1.x server rather than the current 2.x one, and 1.x is in maintenance rather than active development. If that Mac can take a newer macOS, upgrading is the simplest fix. If Apple has dropped it, OpenCore Legacy Patcher will often get an older Mac onto Sonoma or later. Failing both, a newer second-hand Mac is the other way out.',
      },
      {
        id: 'unsure',
        label: 'I am not sure',
        tone: 'info',
        note: 'Check the Apple menu, then About This Mac. Sonoma or newer runs the current server; Ventura or older runs the 1.x server, which is no longer actively developed.',
      },
    ],
  },
  {
    id: 'uptime',
    question: 'Can that Mac stay awake and online?',
    help: 'Your Mac is the bridge. When it sleeps, the bridge is out.',
    choices: [
      { id: 'always', label: 'It can run 24/7', tone: 'good' },
      {
        id: 'mostly',
        label: 'Most of the time',
        tone: 'info',
        note: 'Messages sent while the Mac is asleep arrive once it wakes, rather than being lost.',
      },
      {
        id: 'sometimes',
        label: 'Only when I happen to be using it',
        reason: 'your Mac will not be awake much',
        tone: 'warn',
        note: 'BlueBubbles will still work, but only while that Mac is awake. If it spends most of the day shut, you will miss notifications until you open it. Worth setting the Mac to stay awake and to restart after a power cut.',
      },
    ],
  },
  {
    id: 'managed',
    question: 'Is the Mac managed by a school, an employer, or an MDM?',
    help: 'Managed Macs tend to lock down exactly the things BlueBubbles needs.',
    choices: [
      { id: 'personal', label: "No, it's mine", tone: 'good' },
      { id: 'unsure', label: "I'm not sure", tone: 'info', note: 'If it was handed to you by an IT department, assume it is managed and check before installing anything.' },
      {
        id: 'managed',
        label: 'Yes, it belongs to a school or employer',
        reason: 'the Mac belongs to a school or employer',
        tone: 'warn',
        blocks: true,
        note: 'Probably not for you. BlueBubbles needs Full Disk Access and, for the extra features, a helper installed into Messages. Managed Macs usually block both — and doing it anyway may well breach the device policy you agreed to. Use a personal Mac instead.',
      },
    ],
  },
  {
    id: 'client',
    question: "Where do you want to read your messages?",
    help: 'This is the whole point, so it is worth being clear about it.',
    choices: [
      { id: 'android', label: 'Android', tone: 'good' },
      { id: 'desktop', label: 'Windows or Linux', tone: 'good' },
      { id: 'web', label: 'In a browser', tone: 'good' },
      {
        id: 'apple',
        label: 'Only on an iPhone or iPad',
        reason: 'you only read messages on Apple devices',
        tone: 'warn',
        blocks: true,
        note: 'You already have iMessage on those. BlueBubbles exists to get iMessage onto things Apple does not cover, so there is not much here for you.',
      },
    ],
  },
  {
    id: 'sms',
    question: 'Do you want green-bubble SMS and RCS as well?',
    help: 'BlueBubbles carries these too, but they reach your Mac by way of an iPhone, so a phone number is involved.',
    choices: [
      { id: 'no', label: 'No, iMessage is all I need', tone: 'good' },
      {
        id: 'iphone',
        label: 'Yes, and I have an iPhone with a SIM in it',
        tone: 'good',
        note: 'With the iPhone and the Mac signed in to the same Apple ID, texts forward to the Mac on their own. If they do not show up, check Text Message Forwarding under Settings then Messages on the iPhone. Once they land in Messages, BlueBubbles picks them up alongside iMessage.',
      },
      {
        id: 'no-iphone',
        label: 'Yes, but I have no iPhone with a number',
        reason: 'SMS and RCS need an iPhone with a phone number',
        tone: 'warn',
        note: 'SMS and RCS arrive by Text Message Forwarding from an iPhone, so a phone number is required. The usual workaround is a cheap prepaid SIM in an old iPhone, kept on the same Apple ID purely to relay texts. Without one you still get iMessage -- just not the green bubbles.',
      },
    ],
  },
  {
    id: 'setup',
    question: 'How do you feel about a bit of setup?',
    help: 'Installing a server app, granting permissions, connecting a Google account for notifications. Roughly twenty minutes.',
    choices: [
      { id: 'fine', label: 'Happy to tinker', tone: 'good' },
      { id: 'guided', label: "I'll manage if there are instructions", tone: 'good', note: 'The install guide walks through every step, with screenshots.' },
      {
        id: 'none',
        label: 'I want it to just work with no configuration',
        reason: 'you would rather not configure anything',
        tone: 'warn',
        note: 'This is self-hosted software: you run the server yourself, so there is some assembly. Nothing hard, but it is not nothing.',
      },
    ],
  },
] as const;

export interface Verdict {
  id: 'yes' | 'maybe' | 'no';
  title: string;
  blurb: string;
}

export const VERDICTS: Record<Verdict['id'], Verdict> = {
  yes: {
    id: 'yes',
    title: 'Yes — this is built for you',
    blurb: 'You have what BlueBubbles needs, and none of the usual blockers. Install the server on your Mac, then the app wherever you want to read your messages.',
  },
  maybe: {
    id: 'maybe',
    title: 'Yes, with a couple of caveats',
    blurb: 'BlueBubbles will work for you.',
  },
  no: {
    id: 'no',
    title: 'Honestly? Probably not',
    blurb: 'We would rather tell you now than after an hour of setup.',
  },
};
