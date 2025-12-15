"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLink, FiGithub, FiMail, FiX } from "react-icons/fi";
import { SiVelog } from "react-icons/si";

interface LinkItem {
  icon: React.ElementType;
  href: string;
  label: string;
  isExternal?: boolean;
}

const links: LinkItem[] = [
  {
    icon: SiVelog,
    href: "https://velog.io/@khj980211/posts",
    label: "Blog",
    isExternal: true,
  },
  {
    icon: FiGithub,
    href: "https://github.com/HyunZai",
    label: "GitHub",
    isExternal: true,
  },
  {
    icon: FiMail,
    href: "mailto:khj980211@naver.com",
    label: "Email",
    isExternal: true,
  },
];

export default function FloatingLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Fallback for Velog icon if SiVelog is not available or if we want to use a standard icon
  // Note: SiVelog might need 'react-icons/si' package. If it fails, I'll switch to FiBookOpen.

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-center gap-1.5 md:gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col items-center gap-4 mb-2"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2, staggerChildren: 0.1 }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.isExternal && !link.href.startsWith("mailto") ? "_blank" : undefined}
                rel={link.isExternal && !link.href.startsWith("mailto") ? "noopener noreferrer" : undefined}
                className="relative w-9 h-9 md:w-14 md:h-14 bg-background/80 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center shadow-lg hover:bg-foreground hover:text-background hover:scale-110 transition-all group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-4 h-4 md:w-6 md:h-6" />
                
                {/* Tooltip */}
                <span className="absolute right-full mr-4 px-3 py-1 bg-black/80 backdrop-blur text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={toggleOpen}
        className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(3,195,255,0.3)] border border-white/20 backdrop-blur-xl transition-colors z-50 ${
            isOpen ? "bg-white text-black" : "bg-background/90 text-white hover:bg-foreground hover:text-black"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? <FiX className="w-4 h-4 md:w-7 md:h-7" /> : <FiLink className="w-4 h-4 md:w-7 md:h-7" />}
      </motion.button>
    </div>
  );
}
