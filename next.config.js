/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/DC_JOHN',
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
