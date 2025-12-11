// app/components/ParticlesBackground.tsx
"use client";

//import { useCallback, useEffect, useState } from "react";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
//import type { Container, Engine } from "@tsparticles/engine";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { particlesOptions } from "@/config/particles-config"; // 1단계에서 분리한 옵션 가져오기

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  // 파티클 엔진 초기화 및 로드 로직
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      // 필요한 모듈 (loadSlim) 로드
      await loadSlim(engine);
    }).then(() => {
      // 초기화가 완료되면 상태를 true로 변경
      setInit(true);
    });
  }, []);

  // 파티클 로드 완료 시 콜백 함수
  // const particlesLoaded = useCallback(
  //   async (container: Container | undefined) => {
  //     console.log("Particles loaded:", container);
  //   },
  //   []
  // );

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          //particlesLoaded={particlesLoaded}
          options={particlesOptions}
          className="absolute inset-0 z-0" // 배경으로 깔리도록 스타일 설정
        />
      )}
    </>
  );
}
