import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "3030",
      pathname: "/**"
    }
  ]
}

};

export default nextConfig;
