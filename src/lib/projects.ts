import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;

// Vercel sets VERCEL_ENV to "production" only for the live site, so drafts
// are visible locally and on preview deploys (any branch other than main).
const showDrafts = process.env.VERCEL_ENV !== "production";

/** Published projects, newest first. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection("projects", ({ data }) => showDrafts || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** "01 / 2026" */
export function formatDate(date: Date): string {
  return `${String(date.getUTCMonth() + 1).padStart(2, "0")} / ${date.getUTCFullYear()}`;
}

/** "olist csv → duckdb → dbt → tableau" */
export function pipelineSummary(project: Project): string {
  return project.data.pipeline.map((p) => p.tool).join(" → ");
}
