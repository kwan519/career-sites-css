/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    minimumCacheTTL: 864000, //10 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "career-sites.cdn.snagajob.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.hiringtoday.com",
        port: "",
      }
    ],
  },
}

module.exports = nextConfig
