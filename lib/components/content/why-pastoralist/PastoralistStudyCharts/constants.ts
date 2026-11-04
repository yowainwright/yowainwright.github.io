export type PastoralistCleanupMetric = {
  project: string;
  overrides: number;
  unused: number;
};

export const pastoralistCleanupMetrics: PastoralistCleanupMetric[] = [
  {
    project: "n8n",
    overrides: 58,
    unused: 56,
  },
  {
    project: "TanStack Router",
    overrides: 51,
    unused: 41,
  },
  {
    project: "Cal.com",
    overrides: 41,
    unused: 35,
  },
  {
    project: "Next.js",
    overrides: 16,
    unused: 3,
  },
  {
    project: "Prisma",
    overrides: 5,
    unused: 5,
  },
];
