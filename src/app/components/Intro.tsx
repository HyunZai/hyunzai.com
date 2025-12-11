import ParticlesBackground from "./ParticlesBackground";
import TypingIntro from "./TypingIntro";
import HoverText from "./HoverText";
import ChatInterface from "./ChatInterface";
import Container from "./Container";
import ScrollArrowIndicator from "./ScrollArrowIndicator";

export default function Intro() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900">
      {/* 1. 분리된 Particles 배경 컴포넌트 사용 */}
      <ParticlesBackground />

      {/* 2. 메인 페이지 콘텐츠 영역 (Z-Index를 높여 Particles 위에 배치) */}
      <Container className="relative z-10 flex flex-col justify-center h-full text-left text-white">
        {/* 메인 제목 (H1) - 타이핑 애니메이션 적용 */}
        <TypingIntro />

        <h2 className="text-xl md:text-3xl font-extrabold mb-4 animate-fadeIn text-left mt-4">
          <HoverText
            defaultContent={
              <>
                저는 <span className="text-foreground">풀스택 웹 개발자</span>입니다.
              </>
            }
            hoverContent={
              <>
                I&apos;m a <span className="text-foreground">Full Stack Web Developer</span>.
              </>
            }
          />
        </h2>

        {/* 서브 문구 (P) */}
        <p className="text-sm md:text-lg font-light animate-slideInUp delay-500 text-left leading-relaxed">
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
      </Container>
      
      {/* Scroll Indicator - Bottom Center */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <ScrollArrowIndicator />
      </div>
    </div>
  );
}
