/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://jeffry.in",
  generateRobotsTxt: true,
  outDir: "out",
  exclude: ["/404", "/keystatic", "/keystatic/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  transform: async (config, path) => {
    // Higher priority for homepage and archive
    const priority = path === "/" ? 1.0 : path === "/archive" ? 0.8 : 0.7;

    return {
      loc: path,
      changefreq: path === "/" ? "weekly" : "monthly",
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

export default config;
