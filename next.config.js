/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kfnicsarxykxwcllyxgz.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
