export const TITLE = "What Pastoralist Records";

export const STEPS = [
  {
    title: "Appendix",
    note: "The Appendix is an object which records the reasoning for your overrides.",
    lines: [3],
  },
  {
    title: "Override",
    note: "This record maps to the specified versions of an override.",
    lines: [4],
  },
  {
    title: "Dependents",
    note: "This defines the packages that rely on this range of this override.",
    lines: [5, 6, 7, 8],
  },
  {
    title: "Ledger",
    anchor: "Security vulnerability CVE-2021-23337",
    note: "The ledger tracks details for the override, such as security findings and context supplied by a maintainer.",
    lines: [9, 10, 11, 12, 13],
  },
  {
    title: "Added",
    note: "The addedDate tracks when this Override was first recorded with the exact data listed. The override itself may be older.",
    lines: [12],
  },
];
