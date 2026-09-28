// Single source of truth for personal details used across the site.
export const site = {
  name: "Liane Wong",
  handle: "liane.wong",
  role: "forward deployed data & analytics engineer",
  description:
    "Forward deployed data and analytics engineer. End-to-end projects from ingestion and dbt modelling to the dashboards on top.",
  email: "lwong@lfhi.com.au",
  links: {
    linkedin: "https://www.linkedin.com/in/liane-w777/",
    github: "https://github.com/celestesx",
  },
};

// Tech stack grouped by where it sits in a pipeline. Shown in full on /about;
// the homepage shows the same tools as a flat list of pills.
export const stack = [
  { category: "ingestion", tools: ["python", "rest apis"] },
  { category: "warehousing", tools: ["duckdb", "snowflake"] },
  { category: "transformation", tools: ["sql", "dbt"] },
  { category: "orchestration", tools: ["dagster", "github actions"] },
  { category: "infrastructure", tools: ["docker", "terraform", "aws"] },
  { category: "visualisation", tools: ["tableau", "power bi"] },
];

export const nav = [
  { href: "/", label: "work" },
  { href: "/about", label: "about" },
];
