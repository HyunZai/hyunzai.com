import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: path.join(__dirname),
  output: "standalone",
  reactCompiler: true,
};

export default nextConfig;
