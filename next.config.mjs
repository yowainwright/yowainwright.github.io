/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '',
  assetPrefix: './',
  images: {
    loader: 'imgix',
    path: 'https://yowainwright.imgix.net',
  },
  sassOptions: {
    includePaths: [],
  },
};

export default nextConfig
