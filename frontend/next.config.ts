import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "sparkbridge.onrender.com",
      port: "",
      pathname: "/**"
    }
  ]
}

};

export default nextConfig;
