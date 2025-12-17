"use client";

import Container from "./Container";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import { FaUser } from "react-icons/fa";
import GitHubContributions from "./GitHubContributions";
import Timeline from "./Timeline";

export default function About() {
  const { user } = useUserStore();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative z-10 min-h-screen bg-dark-bg text-white py-20">
      <Container>
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-10 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:w-3/5 space-y-6 text-lg md:text-xl leading-relaxed text-gray-300 order-2 md:order-1 bg-background rounded-xl"
          >
            <p>
              저의 가치관은 <span className="text-white font-semibold">아쉬워하되, 후회는 말자</span>입니다.
              과거에 머무르기보다 미래를 위해 현재를 투자하는 삶을 지향하며, 모든 결과는 스스로의 선택에서 비롯된다고 믿습니다.
              그래서 어떤 상황에서도 책임감을 가지고 끝까지 해내는 태도를 중요하게 생각합니다.
            </p>
            <p>
              비전공자로 코딩을 처음 접했지만, 개발의 매력에 깊이 빠져 더 배우고 성장하기 위해 비교적 늦은 나이에 대학교 진학이라는 <span className="text-white font-semibold">도전</span>을 선택했습니다.
              즐거움에서 시작된 이 선택은 지금도 저를 계속해서 성장하게 만드는 원동력이 되고 있습니다.
            </p>
            <p>
              현재는 웹 프론트엔드와 백엔드 전반에 걸친 기술 스택을 다루고 있으며,
              특히 React, Next.js, Node.js 생태계에 깊은 관심을 가지고 있습니다.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:w-2/5 flex justify-center order-1 md:order-2"
          >
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
          </motion.div>
        </div>
        
        {/* 스킬 스택 섹션 */}
        {/* 스킬 스택 섹션 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-white">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Java", "C#", "TypeScript", "JavaScript", "HTML", "CSS", "SQL", 
              "Spring Boot", "ASP.NET Core", "Node.js", "Next.js", "React", 
              "TailwindCSS", "Git"
            ].map((skill, index) => (
              <motion.span 
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-foreground/30 text-gray-300 text-sm md:text-base hover:scale-110 transition-transform duration-300 hover:text-foreground hover:border-foreground shadow-[0_0_10px_rgba(3,195,255,0.1)] cursor-default select-none"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        {/* 수상 및 자격증 섹션 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="py-10 border-t border-white/10"
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-white">Awards & Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Awards */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-foreground/50 transition-colors">
              <h4 className="text-xl font-bold mb-6 text-foreground flex items-center gap-2">
                🏆 Awards
              </h4>
              <ul className="space-y-6">
                <li>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-white text-lg">캡스톤디자인 경진대회 우수상</span>
                    {/* Desktop Date Badge */}
                    <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded">2024. 12. 20</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-400 font-medium">(사)한국산학기술학회</p>
                  </div>

                  <p className="text-gray-100 text-sm leading-relaxed">
                    대학교 전공동아리 <span className="text-white">W.I.S</span>에서 팀장으로 참여. 
                    팀원들과 &apos;미아 방지 교육 캐주얼 게임보드판&apos;을 제작하고 
                    Unity 기반의 캐주얼 게임을 개발해 출품.
                  </p>
                </li>
              </ul>
            </div>

            {/* Certifications */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-foreground/50 transition-colors">
              <h4 className="text-xl font-bold mb-6 text-foreground flex items-center gap-2">
                📜 Certifications
              </h4>
              <ul className="space-y-6">
                <li className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div>
                    <span className="font-bold text-white block mb-1">SQL 개발자 (SQLD)</span>
                    <span className="text-sm text-gray-400">한국데이터산업진흥원</span>
                  </div>
                  <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded">2025. 04. 04</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div>
                    <span className="font-bold text-white block mb-1">정보처리기사</span>
                    <span className="text-sm text-gray-400">한국산업인력공단</span>
                  </div>
                  <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded">2024. 12. 11</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {user?.gitUsername && <GitHubContributions username={user.gitUsername} />}
        <div className="mt-20">
          <Timeline />
        </div>
      </Container>
    </div>
  );
}
