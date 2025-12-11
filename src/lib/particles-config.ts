// config/particles-config.ts - 마우스 주변 연결선 스타일

import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  fullScreen: {
    enable: false, //인트로 화면에서만 사용
  },
  background: {
    color: {
      value: "#1C1C22",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "bubble",
      },
    },
    modes: {
      push: {
        quantity: 4,
      },
      // 'bubble' 모드: 더 넓은 범위에서 파티클 보이게 하기
      bubble: {
        distance: 800,
        opacity: 0.6,
        size: 3,
      },
    },
  },

  // 개별 파티클의 움직임 및 외형 설정

  particles: {
    color: {
      // 9:1 비율로 하늘색(#88CCFF)과 빨간색(#FF5555)을 섞어 10% 확률로 빨간 점 등장
      value: [
        "#88CCFF",
        "#88CCFF",
        "#88CCFF",
        "#88CCFF",
        "#88CCFF",
        "#88CCFF",
        "#88CCFF",
        "#88CCFF",
        "#88CCFF",
        "#FF5555",
      ],
    },
    // 파티클 간의 연결선 (전역): 완전 비활성화
    links: {
      enable: false,
    },
    // 이동 설정
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: true,
      speed: 1,
      straight: false,
    },
    // 파티클 개수 및 밀도
    number: {
      density: {
        enable: true,
      },
      value: 300,
    },
    // 파티클의 불투명도
    opacity: {
      value: 0,
    },
    // 파티클 모양
    shape: {
      type: "circle",
    },
    // 파티클 크기
    size: {
      value: { min: 1, max: 2 },
    },
  },

  detectRetina: true,
};
