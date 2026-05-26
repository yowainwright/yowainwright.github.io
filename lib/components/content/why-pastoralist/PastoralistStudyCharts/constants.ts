export type PastoralistStudyMetric = {
  project: string;
  entries: number;
  packageManifests: number;
  appendixEntries: number;
  upstreamRef: string;
  prUrl: string;
};

export const pastoralistStudyMetrics: PastoralistStudyMetric[] = [
  {
    project: "Cal.com",
    entries: 89,
    packageManifests: 375,
    appendixEntries: 89,
    upstreamRef: "calcom/cal.diy@main",
    prUrl: "https://github.com/yowainwright/cal.com/pull/1",
  },
  {
    project: "n8n",
    entries: 79,
    packageManifests: 604,
    appendixEntries: 79,
    upstreamRef: "n8n-io/n8n@master",
    prUrl: "https://github.com/yowainwright/n8n/pull/3",
  },
  {
    project: "Grafana",
    entries: 26,
    packageManifests: 259,
    appendixEntries: 26,
    upstreamRef: "grafana/grafana@main",
    prUrl: "https://github.com/yowainwright/grafana/pull/1",
  },
  {
    project: "Storybook",
    entries: 18,
    packageManifests: 433,
    appendixEntries: 18,
    upstreamRef: "storybookjs/storybook@next",
    prUrl: "https://github.com/yowainwright/storybook/pull/1",
  },
  {
    project: "Next.js",
    entries: 16,
    packageManifests: 340,
    appendixEntries: 16,
    upstreamRef: "vercel/next.js@canary",
    prUrl: "https://github.com/yowainwright/next.js/pull/1",
  },
  {
    project: "Material UI",
    entries: 13,
    packageManifests: 161,
    appendixEntries: 13,
    upstreamRef: "mui/material-ui@master",
    prUrl: "https://github.com/yowainwright/material-ui/pull/1",
  },
  {
    project: "Prisma",
    entries: 10,
    packageManifests: 211,
    appendixEntries: 10,
    upstreamRef: "prisma/prisma@main",
    prUrl: "https://github.com/yowainwright/prisma/pull/1",
  },
  {
    project: "TanStack Store",
    entries: 7,
    packageManifests: 61,
    appendixEntries: 7,
    upstreamRef: "TanStack/store@main",
    prUrl: "https://github.com/yowainwright/store/pull/1",
  },
  {
    project: "TanStack Devtools",
    entries: 7,
    packageManifests: 116,
    appendixEntries: 7,
    upstreamRef: "TanStack/devtools@main",
    prUrl: "https://github.com/yowainwright/devtools/pull/1",
  },
  {
    project: "Nextra",
    entries: 5,
    packageManifests: 102,
    appendixEntries: 5,
    upstreamRef: "shuding/nextra@main",
    prUrl: "https://github.com/yowainwright/nextra/pull/1",
  },
  {
    project: "Nimbalyst",
    entries: 4,
    packageManifests: 2144,
    appendixEntries: 4,
    upstreamRef: "nimbalyst/nimbalyst@main",
    prUrl: "https://github.com/yowainwright/nimbalyst/pull/1",
  },
  {
    project: "es-check",
    entries: 1,
    packageManifests: 446,
    appendixEntries: 1,
    upstreamRef: "dollarshaveclub/es-check@master",
    prUrl: "https://github.com/yowainwright/es-check/pull/413",
  },
];

export const pastoralistStudyTotals = pastoralistStudyMetrics.reduce(
  (totals, metric) => ({
    entries: totals.entries + metric.entries,
    packageManifests: totals.packageManifests + metric.packageManifests,
    appendixEntries: totals.appendixEntries + metric.appendixEntries,
    pullRequests: totals.pullRequests + 1,
  }),
  {
    entries: 0,
    packageManifests: 0,
    appendixEntries: 0,
    pullRequests: 0,
  },
);
