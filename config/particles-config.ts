// config/particles-config.ts - 마우스 주변 연결선 스타일

import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  // 캔버스 배경 설정
  background: {
    color: {
      value: "#000000", // 배경은 완전한 검은색
    },
  },
  fpsLimit: 120,

  // 사용자 상호 작용 (마우스) 관련 설정
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "connect", // 👈 핵심: 마우스 주변 파티클을 연결하는 'connect' 모드 사용
      },
    },
    modes: {
      push: {
        quantity: 4,
      },
      // 'connect' 모드 설정
      connect: {
        distance: 500, // 👈 마우스 주변 100px 이내의 파티클만 연결
        links: {
          opacity: 0.5, // 연결선 불투명도
        },
      },
      repulse: {
        distance: 200, // 사용하지 않으므로 비활성화해도 무방
        duration: 0.4,
      },
    },
  },

  // 개별 파티클의 움직임 및 외형 설정
  particles: {
    color: {
      value: "#88CCFF", // 밝은 하늘색
    },
    // 파티클 간의 연결선 (링크) 설정: 전역적으로 비활성화
    links: {
      enable: false,
      color: "#88CCFF",
      distance: 300, // 👈 마우스 connect distance(250)보다 크거나 같게 설정
      opacity: 0.5,
      width: 1,
    },
    // 이동 설정
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: true,
      speed: 1, // 👈 느리고 은은하게 움직이도록 속도를 낮춤
      straight: false,
    },
    // 파티클 개수 및 밀도
    number: {
      density: {
        enable: true,
      },
      value: 200, // 촘촘함을 유지
    },
    // 파티클의 불투명도
    opacity: {
      value: { min: 0.1, max: 0.4 },
    },
    // 파티클 모양
    shape: {
      type: "circle", // 원으로 회귀하여 깔끔함을 유지
    },
    // 파티클 크기
    size: {
      value: { min: 1, max: 2 }, // 작고 섬세한 느낌
    },
  },

  detectRetina: true,
};
