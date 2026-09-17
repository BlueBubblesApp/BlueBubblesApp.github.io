import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const FAQ_CATEGORIES = ['setup', 'features', 'security', 'issues', 'other'] as const;
export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

/** Heading text, exactly as it appeared on the old FAQ page. */
export const FAQ_CATEGORY_LABELS: Record<FaqCategory, string> = {
  setup: 'Setup',
  features: 'Features',
  security: 'Security',
  issues: 'Issues',
  other: 'Other',
};

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    /** Question text, verbatim, minus the old "Q: " prefix. */
    question: z.string(),
    category: z.enum(FAQ_CATEGORIES),
    /** Position within the category; preserves the original page order. */
    order: z.number().int().nonnegative(),
  }),
});

const install = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/install' }),
  schema: z.object({
    title: z.string(),
    /** Section order within the guide. */
    order: z.number().int().positive(),
  }),
});

export const collections = { faq, install };
