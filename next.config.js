/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["rickandmortyapi.com"],
    formats: ["image/avif", "image/webp"],
    unoptimized:true
  },
  // webpack: (config, { isServer }) => {
    
  //   // If client-side, don't polyfill `fs`
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       fs: false,
  //     };
  //   }

  //   return config;
  // },
}
module.exports = nextConfig
