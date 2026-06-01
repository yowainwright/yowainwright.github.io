import { withSentryConfig } from "@sentry/nextjs";
import createMDX from "@next/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const isProduction = process.env.NODE_ENV === "production";
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const productionConfig = isProduction ? { output: "export" } : {};

/** @type {import('next').NextConfig} */
const nextConfig = Object.assign(
  {},
  {
    typescript: {
      ignoreBuildErrors: true,
    },
    trailingSlash: true,
    basePath: "",
    sassOptions: {
      includePaths: [],
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    turbopack: {
      root: projectRoot,
    },
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  },
  productionConfig,
);

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const sentryConfig = {
  silent: true,
  hideSourceMaps: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

export default withSentryConfig(withMDX(nextConfig), sentryConfig);
