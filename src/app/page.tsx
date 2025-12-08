// app/page.tsx
import ParticlesBackground from "./components/ParticlesBackground";
import TypingIntro from "./components/TypingIntro";
import HoverText from "./components/HoverText";
import ChatInterface from "./components/ChatInterface";

export default function HomePage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900">
      {/* 1. 분리된 Particles 배경 컴포넌트 사용 */}
      <ParticlesBackground />

      {/* 2. 메인 페이지 콘텐츠 영역 (Z-Index를 높여 Particles 위에 배치) */}
      <div className="relative z-10 text-left text-white p-6 md:p-16 bg-[#1C1C22]/40 rounded-lg select-none w-full max-w-5xl mx-0 md:mx-auto">
        {/* 메인 제목 (H1) - 타이핑 애니메이션 적용 */}
        <TypingIntro />

        <h2 className="text-2xl md:text-4xl font-extrabold mb-6 animate-fadeIn text-left mt-4">
          <HoverText
            defaultContent={
              <>
                저는 <span className="text-[#03C3FF]">풀스택 웹 개발자</span>입니다.
              </>
            }
            hoverContent={
              <>
                I&apos;m a <span className="text-[#03C3FF]">Full Stack Web Developer</span>.
              </>
            }
          />
        </h2>

        {/* 서브 문구 (P) */}
        <p className="text-base md:text-xl font-light animate-slideInUp delay-500 text-left leading-relaxed">
          <span className="md:hidden">
            <HoverText
              defaultContent="저에 대해 궁금한 점이 있다면 물어보세요."
              hoverContent="Feel free to ask anything about me."
            />
          </span>
          <span className="hidden md:block">
            <HoverText
              defaultContent="아래 입력란에 저에 대해 궁금한 점을 물어보시면 제 챗봇이 답변해줄거에요."
              hoverContent="Ask any questions below, and my chatbot will answer them."
            />
          </span>
        </p>

        {/* Chat Input Interface (Componentized) */}
        <ChatInterface />
      </div>
    </div>
  );
}