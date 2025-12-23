import path from "path";
import type { NextConfig } from "next";
import { execSync } from "child_process";

const nextConfig: NextConfig = {
  generateBuildId: async () => {
    try {
      // 최신 커밋 해시값으로 빌드 ID 설정
      const gitRev = execSync("git rev-parse HEAD").toString().trim();
      return gitRev;
    } catch (error) {
      // 실패 시 현재 시간을 ID로 반환 (캐시 문제 방지)
      console.warn(`Git hash failed, using timestamp as build ID [${error}]`);
      return `build-${new Date().getTime()}`;
    }
  },
  outputFileTracingRoot: path.join(__dirname),
  output: "standalone",
  reactCompiler: true,
};

export default nextConfig;
