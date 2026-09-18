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
        note: 'That works, and there are guides for it in the docs and on the subreddit. Expect a fiddlier setup than real Apple hardware, and be aware it is a grey area under macOS licensing.',
      },
      {
        id: 'none',
        label: 'No, and I have no plans to',
        disqualifies: true,
        note: 'Without a Mac there is nothing to connect to. This is the one requirement with no workaround.',
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
        note: 'Fine. Messages sent while it is asleep will arrive once it wakes, rather than being lost.',
      },
      {
        id: 'sometimes',
        label: 'Only when I happen to be using it',
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
        tone: 'warn',
        blocks: true,
        note: 'You already have iMessage on those. BlueBubbles exists to get iMessage onto things Apple does not cover, so there is not much here for you.',
      },
    ],
  },
  {
    id: 'sms',
    question: 'Do you need green-bubble SMS and RCS as well?',
    choices: [
      { id: 'no', label: 'No, iMessage is what I am after', tone: 'good' },
      {
        id: 'yes',
        label: 'Yes, I want all my texts in one place',
        tone: 'warn',
        note: 'BlueBubbles does not support SMS at this time. It carries iMessage only, so your SMS will stay wherever they are now.',
      },
    ],
  },
  {
    id: 'setup',
    question: 'How do you feel about a bit of setup?',
    help: 'Installing a server app, granting permissions, connecting a Google account for notifications. Roughly twenty minutes.',
    choices: [
      { id: 'fine', label: 'Happy to tinker', tone: 'good' },
      { id: 'guided', label: "I'll manage if there are instructions", tone: 'good', note: 'There are. The install guide walks through every step with screenshots.' },
      {
        id: 'none',
        label: 'I want it to just work with no configuration',
        tone: 'warn',
        note: 'Then set expectations accordingly. This is self-hosted software: you run the server, so there is some assembly. Nothing hard, but it is not nothing.',
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
    blurb: 'You have what BlueBubbles needs and none of the usual blockers. Grab the server for your Mac and a client for whatever you actually carry around.',
  },
  maybe: {
    id: 'maybe',
    title: 'Yes, with a couple of caveats',
    blurb: 'BlueBubbles will work for you, but a few things are worth knowing before you start. None of them are dealbreakers on their own.',
  },
  no: {
    id: 'no',
    title: 'Honestly? Probably not',
    blurb: 'Something in your answers is a genuine blocker rather than an inconvenience. We would rather tell you now than after an hour of setup.',
  },
};
