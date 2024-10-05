/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // Wildcard to allow all hostnames
          },
          {
            protocol: 'http',
            hostname: '**', // Wildcard for HTTP as well
          },
        ],
    },
};

export default nextConfig;
