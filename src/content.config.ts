// Content collections: each project is one Markdown file in src/content/projects/.
// Frontmatter holds the structured parts of a case study (the engagement facts, pipeline,
// outcome, handover); the Markdown body holds the narrative (scoping and key decisions).
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      // Headline stating the finding, e.g. "Late deliveries, not price, drive one-star reviews"
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      status: z.enum(["shipped", "in-progress"]).default("shipped"),
      // Drafts show in dev and Vercel previews, never on the production site.
      draft: z.boolean().default(false),

      // The engagement: who it was for and what they actually needed
      client: z.string(),
      problem: z.string(),
      stakeholders: z.array(z.string()).default([]),
      constraints: z.array(z.string()).default([]),
      timeToValue: z.string().optional(), // e.g. "first dashboard in 9 days"

      // The engineering
      pipeline: z.array(z.object({ stage: z.string(), tool: z.string() })).min(1),
      stack: z.array(z.string()).default([]),
      architecture: z.object({ src: image(), alt: z.string() }).optional(),
      thumbnail: z.object({ src: image(), alt: z.string() }).optional(),

      // The payoff
      links: z.object({ github: z.url().optional(), dashboard: z.url().optional() }).default({}),
      dashboardEmbed: z.url().optional(),
      outcome: z.string().optional(),
      results: z.array(z.string()).default([]),
      handover: z.array(z.string()).default([]),
      differently: z.array(z.string()).default([]),
    }),
});

export const collections = { projects };
