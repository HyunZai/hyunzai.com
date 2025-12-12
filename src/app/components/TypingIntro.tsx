"use client";

import { TypeAnimation } from "react-type-animation";

interface TypingIntroProps {
  nameKo?: string;
  nameEn?: string;
}

const TypingIntro = ({
  nameKo = "김현재",
  nameEn = "Hyunjae Kim",
}: TypingIntroProps) => {
  return (
    <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 h-[1.2em] inline-block text-left min-w-[24ch]">
      <TypeAnimation
        sequence={[
          `안녕하세요, ${nameKo}입니다.`, // 한국어 출력
          2000, // 2초 대기
          `Hello, I'm ${nameEn}.`, // 영어로 변경
          2000, // 2초 대기
        ]}
        wrapper="span"
        speed={40}
        repeat={Infinity} // 무한 반복
        cursor={true}
      />
    </h1>
  );
};

export default TypingIntro;
