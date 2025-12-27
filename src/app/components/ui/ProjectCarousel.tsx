"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, PanInfo } from "framer-motion";

interface ProjectCarouselProps {
  images: string[];
}

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (info.offset.x < -50 && currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-full h-[300px] md:h-[480px] flex items-center justify-center overflow-hidden">
      {/* Slide Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {images.map((src, index) => {
          const diff = index - currentIndex;
          // Determine position state: center, right (next), left (prev), or hidden
          let position = "hidden";
          if (diff === 0) position = "center";
          else if (diff === 1) position = "right";
          else if (diff === -1) position = "left";
          else if (diff > 1) position = "far-right"; // Optional: keep them ready
          else if (diff < -1) position = "far-left";

          return (
            <motion.div
              key={index}
              className="absolute w-full md:w-[90%] h-full flex items-center justify-center"
              initial={false}
              animate={position}
              variants={{
                center: { x: "0%", scale: 1, opacity: 1, zIndex: 10 },
                left: { x: "-90%", scale: 0.9, opacity: 0.4, zIndex: 5 },
                right: { x: "90%", scale: 0.9, opacity: 0.4, zIndex: 5 },
                "far-left": { x: "-180%", scale: 0.7, opacity: 0, zIndex: 0 },
                "far-right": { x: "180%", scale: 0.7, opacity: 0, zIndex: 0 },
                hidden: { opacity: 0, scale: 0.5, zIndex: -1 },
              }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              }}
              drag={diff === 0 ? "x" : false} // Only draggable if center
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              <Image
                src={src}
                alt={`Project Image ${index + 1}`}
                fill
                className="object-contain rounded-xl cursor-grab active:cursor-grabbing"
                sizes="(max-width: 768px) 100vw, 90vw"
                draggable={false}
                priority={index === currentIndex}
                unoptimized
              />
              {/* Overlay for non-center images to indicate they are clickable/inactive */}
              {diff !== 0 && (
                <div 
                    className="absolute inset-0 rounded-xl cursor-pointer" 
                    onClick={() => setCurrentIndex(index)}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              index === currentIndex ? "bg-foreground w-4" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
