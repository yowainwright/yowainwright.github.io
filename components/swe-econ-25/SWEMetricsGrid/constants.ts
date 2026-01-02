// Chart 1: CS Grads vs Job Postings
export const gradsVsJobsData = [
  {
    label: "CS Graduates (thousands)",
    data: [
      { primary: "2018", secondary: 65 },
      { primary: "2019", secondary: 71 },
      { primary: "2020", secondary: 73 },
      { primary: "2021", secondary: 79 },
      { primary: "2022", secondary: 85 },
      { primary: "2023", secondary: 89 }
    ]
  },
  {
    label: "Job Postings Index",
    data: [
      { primary: "2018", secondary: 85 },
      { primary: "2019", secondary: 95 },
      { primary: "2020", secondary: 100 },
      { primary: "2021", secondary: 150 },
      { primary: "2022", secondary: 200 },
      { primary: "2023", secondary: 65 }
    ]
  }
];

// Chart 2: Big Tech Layoffs vs Stock Price (indexed to 100 at start of 2022)
export const layoffsVsStockData = [
  {
    label: "Headcount Index",
    data: [
      { primary: "Jan 2022", secondary: 100 },
      { primary: "Jul 2022", secondary: 102 },
      { primary: "Jan 2023", secondary: 88 },
      { primary: "Jul 2023", secondary: 85 },
      { primary: "Jan 2024", secondary: 82 },
      { primary: "Jul 2024", secondary: 80 }
    ]
  },
  {
    label: "Stock Price Index",
    data: [
      { primary: "Jan 2022", secondary: 100 },
      { primary: "Jul 2022", secondary: 72 },
      { primary: "Jan 2023", secondary: 68 },
      { primary: "Jul 2023", secondary: 95 },
      { primary: "Jan 2024", secondary: 120 },
      { primary: "Jul 2024", secondary: 145 }
    ]
  }
];

// Chart 3: Entry-Level Jobs
export const entryLevelData = [
  {
    label: "Entry-Level Postings",
    data: [
      { primary: "2020", secondary: 100 },
      { primary: "2021", secondary: 145 },
      { primary: "2022", secondary: 180 },
      { primary: "2023", secondary: 85 },
      { primary: "2024", secondary: 66 }
    ]
  }
];

// Chart 4: Profits vs Headcount (Big 4: Meta, Google, Amazon, Microsoft)
export const profitsVsHeadcountData = [
  {
    label: "Combined Profits ($B)",
    data: [
      { primary: "2021", secondary: 197 },
      { primary: "2022", secondary: 156 },
      { primary: "2023", secondary: 247 },
      { primary: "2024", secondary: 327 }
    ]
  },
  {
    label: "Combined Headcount (thousands)",
    data: [
      { primary: "2021", secondary: 556 },
      { primary: "2022", secondary: 604 },
      { primary: "2023", secondary: 542 },
      { primary: "2024", secondary: 518 }
    ]
  }
];

export const sources = [
  {
    link: "https://ncses.nsf.gov/pubs/nsb202332/trends-in-s-e-degree-awards",
    author: "National Science Foundation",
    publication: "Trends in S&E Degree Awards"
  },
  {
    link: "https://fred.stlouisfed.org/series/IHLIDXUSTPSOFTDEVE",
    author: "Federal Reserve Bank of St. Louis",
    publication: "Indeed Job Postings Data"
  },
  {
    link: "https://news.crunchbase.com/startups/tech-layoffs/",
    author: "Crunchbase",
    publication: "Tech Layoffs Tracker"
  },
  {
    link: "https://www.levels.fyi/2024/",
    author: "Levels.fyi",
    publication: "2024 End of Year Pay Report"
  }
];
