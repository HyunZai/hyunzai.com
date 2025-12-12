"use client";

import Container from "./Container";
import Image from "next/image";
import React, { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { FaUser } from "react-icons/fa";
import GitHubContributions from "./GitHubContributions";

export default function About() {
  const { user } = useUserStore();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative z-10 min-h-screen bg-dark-bg text-white py-20">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-foreground">About Me</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-3/5 space-y-6 text-lg md:text-xl leading-relaxed text-gray-300 order-2 md:order-1 bg-background rounded-xl">
            <p>
              안녕하세요, 저는 <span className="text-white font-semibold">풀스택 웹 개발자 김현재</span>입니다.
            </p>
            <p>
              새로운 기술을 배우고 적용하는 것을 즐기며, 사용자에게 최고의 경험을 제공하기 위해 끊임없이 고민합니다.
              단순히 코드를 작성하는 것을 넘어, 비즈니스 가치를 창출하고 문제를 해결하는 개발자가 되고자 합니다.
            </p>
            <p>
              현재는 웹 프론트엔드와 백엔드 전반에 걸친 기술 스택을 다루고 있으며, 
              특히 React, Next.js, Node.js 생태계에 깊은 관심을 가지고 있습니다.
            </p>
          </div>

          <div className="w-full md:w-2/5 flex justify-center order-1 md:order-2">
            <div className="relative w-60 h-60 md:w-84 md:h-84 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-800 flex items-center justify-center">
              {user?.imageUrl && !imageError ? (
                <Image
                  src={user.imageUrl}
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <FaUser className="w-1/2 h-1/2 text-gray-400" />
              )}
            </div>
          </div>
        </div>
        
        {user?.gitUsername && <GitHubContributions username={user.gitUsername} />}
      </Container>
    </div>
  );
}
