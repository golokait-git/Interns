/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.devtool = "eval-source-map";
    }

    config.resolve.alias["~"] = path.resolve(__dirname);
    return config;
  },

  eslint: {
    // Warning: This disables the `no-console` rule
    ignoreDuringBuilds: true,
  },

  // Add the "images" configuration here
  images: {
    // domains: ["localhost", "testcode.pro", "admin.testcode.pro"], // Add any other allowed domains as needed
    remotePatterns: [
      {
        hostname: "localhost",
        hostname: "admin.testcode.pro",
        hostname: "testcode.pro",
      },
    ],
  },
  // Other configuration options for Next.js

  basePath: "", // Note: This is deprecated in newer versions of Next.js. Use "basePath" instead.
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "POST, GET, OPTIONS, DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },
};
