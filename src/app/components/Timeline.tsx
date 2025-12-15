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
    year: "2023.03 ~ ",
    title: "서일대학교 소프트웨어공학과",
    description: "전문학사 (GPA: 4.46 / 4.5)",
  },
  {
    year: "2025.03 ~ 2025.08",
    title: "SOLBIT 인턴쉽",
    description:
      "Node.js / React 기반의 Kiosk BackOffice web application 개발 및 유지보수, Spring / JPA 기반의 e-IRB 시스템 web application 유지보수",
  },
  {
    year: "2023.12 ~ 2024.12",
    title: "대학교 전공동아리 W.I.S 활동",
    description: "팀장으로 팀을 꾸려 캡스톤 디자인 경진대회 출전(우수상 입상)",
  },
  {
    year: "2020.05 ~ 2023.02",
    title: "M&J Soft 근무",
    description:
      "Windows Forms / C# 기반의 Desktop application 개발 및 ASP.NET Core 기반의 Web application 개발",
  },
  {
    year: "2018.03 ~ 2019.11",
    title: "육군 15사단 군복무",
    description: "대대탄약병 만기제대",
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

      <div className="relative max-w-4xl mx-auto flex flex-col gap-10 md:gap-20 md:pl-0">
        {/* Vertical Line Background */}
        <div ref={lineRef} className="absolute left-[39px] top-0 bottom-0 w-1 bg-gray-700 -translate-x-1/2 rounded-full" />

        {/* Animated Vertical Line */}
        <motion.div
          style={{ height }}
          className="absolute left-[39px] top-0 w-1 bg-gradient-to-b from-white/50 to-foreground/70 -translate-x-1/2 rounded-full origin-top z-10 shadow-[0_0_15px_var(--color-foreground)]"
        />

        {timelineData.map((event, index) => (
          <TimelineItem key={index} event={event} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ event }: { event: TimelineEvent }) {
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
      className="relative flex items-center w-full z-20"
    >
      {/* Node Circle */}
      <motion.div
        style={{
          borderColor,
          boxShadow,
          scale,
        }}
        className="absolute left-[39px] top-1/2 w-4 h-4 rounded-full border-4 -translate-x-1/2 -translate-y-1/2 z-30 bg-background"
      />

      {/* Content Box */}
      <div className="w-[calc(100%-80px)] ml-[80px] p-6 bg-background rounded-xl border border-gray-700 hover:border-foreground/50 transition-all duration-300 text-left hover:bg-background/80 hover:backdrop-blur-md hover:shadow-[0_0_20px_rgba(3,195,255,0.1)] group">
        <span className="inline-block px-3 py-1 mb-2 text-sm font-bold text-background bg-foreground rounded-full">
          {event.year}
        </span>
        <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
        <p className="text-gray-300 leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
}
