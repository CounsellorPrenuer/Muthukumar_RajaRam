/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Muthukumar_RajaRam',
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
