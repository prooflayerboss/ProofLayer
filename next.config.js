/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: true, // This prevents 307 redirects for trailing slashes
  experimental: {
    // Allow larger body size for video uploads (100MB)
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
};

module.exports = nextConfig;
