/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_API: process.env.NEXT_PUBLIC_SERVER_API,
  },
};

export default nextConfig;
