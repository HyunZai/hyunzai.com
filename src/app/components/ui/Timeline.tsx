"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { MilestoneDto } from "@/dtos/MilestoneDto";

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { store } = usePortfolioStore();
  const milestones = store?.milestones || [];

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (milestones.length === 0) {
    return <div ref={lineRef} className="hidden" />;
  }

  return (
    <div className="relative w-full py-10 md:py-20">
      <h3 className="text-2xl font-bold text-white text-center mb-6">My Journey</h3>

      <div className="relative max-w-7xl mx-auto flex flex-col gap-10 md:gap-20 md:pl-0">
        {/* Vertical Line Background */}
        <div ref={lineRef} className="absolute left-[39px] top-0 bottom-0 w-1 bg-gray-700 -translate-x-1/2 rounded-full" />

        {/* Animated Vertical Line */}
        <motion.div
          style={{ height }}
          className="absolute left-[39px] top-0 w-1 bg-gradient-to-b from-white/50 to-foreground/70 -translate-x-1/2 rounded-full origin-top z-10 shadow-[0_0_15px_var(--color-foreground)]"
        />

        {milestones.map((milestone) => (
          <TimelineItem key={milestone.id} event={milestone} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ event }: { event: MilestoneDto }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const borderColor = useTransform(scrollYProgress, [0, 1], ["#ffffff", "#03C3FF"]);
  const boxShadow = useTransform(scrollYProgress, [0, 1], ["0 0 10px rgba(255,255,255,0.5)", "0 0 10px #03C3FF"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}. ${month}.`;
  };

  const period = event.endDate 
    ? `${formatDate(event.startDate)} ~ ${formatDate(event.endDate)}`
    : `${formatDate(event.startDate)}`;

  return (
    <div
      ref={ref}
      className="relative flex items-center w-full z-20 group"
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

      {/* Content Layout */}
      <div className="w-[calc(100%-80px)] ml-[80px] flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-4">
        
        {/* Date (Independent) */}
        <div className="flex-shrink-0 w-[140px] md:w-[260px]">
           <span className="text-2xl md:text-3xl font-black text-white/30 group-hover:text-foreground transition-colors duration-300 block whitespace-nowrap">
             {period}
           </span>
        </div>

        {/* Card (Title & Description) */}
        <div className="flex-1 w-full p-6 bg-background rounded-xl border border-gray-700 group-hover:border-foreground/50 transition-all duration-300 text-left group-hover:bg-background/80 group-hover:backdrop-blur-md group-hover:shadow-[0_0_20px_rgba(3,195,255,0.1)]">
          <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
          <p className="text-gray-300 leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  );
}
