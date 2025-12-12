// app/components/ParticlesBackground.tsx
"use client";

//import { useCallback, useEffect, useState } from "react";
import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
//import type { Container, Engine } from "@tsparticles/engine";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { particlesOptions } from "@/lib/particles-config";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);
  const [particleCount, setParticleCount] = useState(300);
  const [isIntro, setIsIntro] = useState(true);

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

  // 800px 이상 스크롤 시 파티클 개수 줄이기 + onClick 이벤트 비활성화
  useEffect(() => {
    const handleScroll = () => {
      const isIntroSection = window.scrollY <= 800;
      setIsIntro(isIntroSection);
      setParticleCount(isIntroSection ? 300 : 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 동적 옵션 생성
  const dynamicParticlesOptions: ISourceOptions = useMemo(() => {
    return {
      ...particlesOptions,
      particles: {
        ...particlesOptions.particles,
        number: {
          ...particlesOptions.particles?.number,
          value: particleCount,
        },
      },
      interactivity: {
        ...particlesOptions.interactivity,
        events: {
          ...particlesOptions.interactivity?.events,
          onClick: {
            ...particlesOptions.interactivity?.events?.onClick,
            enable: isIntro,
          },
        },
      },
    };
  }, [particleCount, isIntro]);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          options={dynamicParticlesOptions}
          className="absolute inset-0 z-0" // 배경으로 깔리도록 스타일 설정
        />
      )}
    </>
  );
}
