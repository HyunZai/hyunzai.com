"use client";

import ParticlesBackground from "../layout/ParticlesBackground";
import TypingIntro from "../ui/TypingIntro";
import HoverText from "../ui/HoverText";
import ChatInterface from "../features/chat/ChatInterface";
import Container from "../layout/Container";
import ScrollIndicator from "../layout/ScrollIndicator";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export default function Intro() {
  const { store } = usePortfolioStore();

  const user = store?.user;

  if (!user) {
    return (
      <div className="relative flex items-center justify-center min-h-screen">
        <ParticlesBackground />
      </div>
    );
  }
  
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <ParticlesBackground />

      <Container className="relative z-10 flex flex-col justify-center h-full text-left text-white select-none animate-fadeIn">
        <TypingIntro
          nameKo={user.nameKo}
          nameEn={user.nameEn}
        />

        <h2 className="text-xl md:text-3xl font-extrabold mb-4 animate-fadeIn text-left mt-2 md:mt-4">
          <span className="md:hidden">
            <HoverText
              defaultContent="저는 <span className='text-foreground'>결국 해내는 개발자</span>입니다"
              hoverContent="I'm a developer <span className='text-foreground'>who makes it happen</span>"
            />
          </span>
          <span className="hidden md:block">
            <HoverText
              defaultContent={user.subTitleKo}
              hoverContent={user.subTitleEn}
            />
          </span>
        </h2>

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
      
        <ChatInterface />
      </Container>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-fadeIn delay-1000">
        <ScrollIndicator />
      </div>
    </div>
  );
}

