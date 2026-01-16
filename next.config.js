/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: true, // This prevents 307 redirects for trailing slashes
};

module.exports = nextConfig;
