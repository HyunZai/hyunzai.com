"use client";

import ParticlesBackground from "./ParticlesBackground";
import TypingIntro from "./TypingIntro";
import HoverText from "./HoverText";
import ChatInterface from "./ChatInterface";
import Container from "./Container";
import ScrollIndicator from "./ScrollIndicator";
// import { useUserStore } from "@/store/useUserStore";

export default function Intro() {
  // const { user } = useUserStore();
  
  // 임시 하드코딩 데이터 (배포용)
  const user = {
    nameKo: "김현재",
    nameEn: "Hyunjae Kim",
    //subTitleKo: "제 사이트에 오신걸 <span className='text-foreground'>환영합니다</span>.",
    subTitleKo: "저는 <span className='text-foreground'>효율을 추구하고 도전을 망설이지 않는 개발자</span>입니다.",
    subTitleEn: "I’m a <span className='text-foreground'>developer who values efficiency and embraces new challenges</span>.",
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900">
      <ParticlesBackground />

      <Container className="relative z-10 flex flex-col justify-center h-full text-left text-white">
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
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <ScrollIndicator />
      </div>
    </div>
  );
}

