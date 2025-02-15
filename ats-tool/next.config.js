/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental.serverActions entirely
  output: 'standalone' // Recommended for Render deployments
};

module.exports = nextConfig;
