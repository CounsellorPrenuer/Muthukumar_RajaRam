/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // No basePath for root hosting
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
