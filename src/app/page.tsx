// app/page.tsx
import ParticlesBackground from "./components/ParticlesBackground";
// 참고: ParticlesBackground 컴포넌트에 'use client'가 있으므로, 이 파일은 서버 컴포넌트 유지 가능

export default function HomePage() {
  return (
    // ParticlesBackground는 클라이언트 컴포넌트이므로,
    // 전체 레이아웃을 다시 한번 클라이언트 컴포넌트 내부에 배치할 필요는 없습니다.
    // 하지만 콘텐츠에 상호작용(예: 버튼)이 필요하다면 콘텐츠 영역만 별도로 'use client' 컴포넌트로 분리합니다.

    // 전체 화면 컨테이너 및 배경 설정 (Tailwind CSS)
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900">
      {/* 1. 분리된 Particles 배경 컴포넌트 사용 */}
      <ParticlesBackground />

      {/* 2. 메인 페이지 콘텐츠 영역 (Z-Index를 높여 Particles 위에 배치) */}
      <div className="relative z-10 text-center text-white p-6 bg-black bg-opacity-40 rounded-lg shadow-2xl">
        {/* 메인 제목 (H1) */}
        <h1 className="text-5xl font-extrabold mb-2 animate-fadeIn">
          안녕하세요, 김현재입니다.
        </h1>
        <h2 className="text-3xl font-extrabold mb-4 animate-fadeIn">
          Hello, I&apos;m hyunjae.
        </h2>

        {/* 서브 문구 (P) */}
        <p className="text-xl font-light animate-slideInUp">
          I&apos;m a full stack web developer.
        </p>
        <p className="text-lg font-light animate-slideInUp delay-500">
          Where Code Meets Experience. Explore my journey and projects.
        </p>
      </div>
    </div>
  );
}

// 참고: 애니메이션(`animate-fadeIn`, `animate-slideInUp`) 정의는 `app/globals.css`에 그대로 유지되어야 합니다.
