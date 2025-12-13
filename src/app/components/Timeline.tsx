"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timelineData: TimelineEvent[] = [
  {
    year: "2025",
    title: "풀스택 개발자로 도약",
    description:
      "Next.js와 Node.js를 활용한 대규모 프로젝트를 주도하며, 안정적이고 확장 가능한 아키텍처를 설계하고 구현합니다. 사용자 경험을 극대화하기 위한 성능 최적화와 DB 설계를 깊이 있게 연구하고 있습니다.",
  },
  {
    year: "2024",
    title: "프론트엔드 역량 심화",
    description:
      "React 생태계에 대한 깊은 이해를 바탕으로 복잡한 UI/UX를 구현했습니다. 상태 관리 최적화 및 컴포넌트 재사용성을 높이는 디자인 시스템 구축에 기여했습니다.",
  },
  {
    year: "2023",
    title: "웹 개발의 시작",
    description:
      "HTML, CSS, JavaScript의 기초를 다지며 웹 개발의 매력에 빠졌습니다. 첫 개인 프로젝트를 통해 클라이언트와 서버의 통신 과정을 이해하고, 문제 해결 능력을 키웠습니다.",
  },
];

export default function Timeline() {
  
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative w-full py-10 md:py-20">
      <h3 className="text-2xl font-bold text-white text-center mb-6">My Journey</h3>

      <div className="relative max-w-4xl mx-auto flex flex-col gap-10 md:gap-20 pl-4 md:pl-0">
        <div ref={lineRef} className="absolute left-[19px] top-0 bottom-0 w-1 bg-gray-700 -translate-x-1/2 rounded-full" />

        <motion.div
          style={{ height }}
          className="absolute left-[19px] top-0 w-1 bg-gradient-to-b from-white/50 to-foreground/70 -translate-x-1/2 rounded-full origin-top z-10 shadow-[0_0_15px_var(--color-foreground)]"
        />

        {timelineData.map((event, index) => (
          <TimelineItem key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const borderColor = useTransform(scrollYProgress, [0, 1], ["#ffffff", "#03C3FF"]);
  const boxShadow = useTransform(scrollYProgress, [0, 1], ["0 0 10px rgba(255,255,255,0.5)", "0 0 10px #03C3FF"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <div
      ref={ref}
      className="relative flex items-start w-full z-20"
    >
      <motion.div
        style={{
          borderColor,
          boxShadow,
          scale,
        }}
        className="absolute left-[19px] top-1/2 w-4 h-4 rounded-full border-4 -translate-x-1/2 -translate-y-1/2 z-30 bg-background"
      />

      <div
        className="w-[calc(100%-50px)] ml-[50px] p-6 bg-background rounded-xl border border-gray-700 hover:border-foreground/50 transition-all duration-300 text-left hover:bg-background/80 hover:backdrop-blur-md hover:shadow-[0_0_20px_rgba(3,195,255,0.1)] group"
      >
        <span className="inline-block px-3 py-1 mb-2 text-sm font-bold text-background bg-foreground rounded-full">
          {event.year}
        </span>
        <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
        <p className="text-gray-300 leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
}
