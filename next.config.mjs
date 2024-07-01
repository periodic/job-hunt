/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['knex', 'sqlite3'],
  },
  // Build stand-alone app for docker deployment
  output: "standalone",
};

export default nextConfig;
