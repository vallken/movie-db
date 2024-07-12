/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: Array.from({ length: 10 }, (_, i) => ({
        protocol: "https",
        hostname: `s${i}.lk21static.buzz`,
      })),
    },
  };
  
  export default nextConfig;
  