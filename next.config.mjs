/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['knex', 'sqlite3'],
  },
};

export default nextConfig;
