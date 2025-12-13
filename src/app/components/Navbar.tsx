"use client";


import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      // 1. Navbar Visibility Check
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // 2. Active Section Check
      const sections = ["intro", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3; // 뷰포트 상단 1/3 지점 기준

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break; 
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // setActiveSection(id); // 스크롤 이벤트에서 처리되므로 굳이 중복 설정 안 해도 됨 (부드러운 전환 위해 놔둘 수도 있음)
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/10 shadow-lg"
        >
          <Container className="flex justify-between items-center py-4">
            {/* Logo or Brand Name */}
            <div
              className="cursor-pointer"
              onClick={() => scrollToSection("intro")}
            >
              <Image
                src="/images/logo.png"
                alt="Hyunzai.com Logo"
                width={150}
                height={40}
                className="object-contain h-8 w-auto md:h-10"
              />
            </div>

            {/* Navigation Links */}
            <ul className="flex space-x-6 md:space-x-8 text-sm md:text-base font-medium text-gray-300">
              {["intro", "about", "projects", "contact"].map((item) => (
                <li key={item} className="relative">
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`transition-colors capitalize py-1 ${
                      activeSection === item
                        ? "text-white font-bold"
                        : "hover:text-white text-gray-300"
                    }`}
                  >
                    {item === "intro" ? "Home" : item}
                  </button>
                  {activeSection === item && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-foreground"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
