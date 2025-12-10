import createMDX from "@next/mdx";

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(isProduction && { output: "export" }),
  basePath: "",
  assetPrefix: "./",
  sassOptions: {
    includePaths: [],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
