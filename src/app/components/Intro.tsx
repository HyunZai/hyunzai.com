"use client";

import ParticlesBackground from "./ParticlesBackground";
import TypingIntro from "./TypingIntro";
import HoverText from "./HoverText";
import ChatInterface from "./ChatInterface";
import Container from "./Container";
import ScrollIndicator from "./ScrollIndicator";
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
          <HoverText
            defaultContent={user.subTitleKo}
            hoverContent={user.subTitleEn}
          />
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

