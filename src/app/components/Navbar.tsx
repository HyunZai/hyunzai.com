"use client";


import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Container from "./Container";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If menu is open and click is outside menu AND outside button
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Navbar Visibility Check
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      // 2. Active Section Check
      const sections = ["intro", "about", "career", "projects", "thankyou", "contact"];

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
      window.history.pushState(null, "", `#${id}`);
      window.scrollTo({
        top: element.offsetTop - 20,
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

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex space-x-6 md:space-x-8 text-sm md:text-base font-medium text-gray-300">
              {["intro", "about", "career", "projects", "contact"].map((item) => (
                <li key={item} className="relative">
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`transition-colors capitalize py-1 ${
                      activeSection === item
                        ? "text-white font-bold"
                        : "hover:text-white text-gray-300"
                    }`}
                  >
                    {item === "intro" ? "Home" : item === "career" ? "Career" : item}
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

            {/* Mobile Menu Button */}
            <button 
              ref={buttonRef}
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </Container>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-full right-4 mt-2 w-48 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="flex flex-col py-2">
                  {["intro", "about", "career", "projects", "guestbook", "contact"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        scrollToSection(item);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-6 py-3 text-center text-sm font-medium transition-colors hover:bg-white/5 ${
                        activeSection === item
                          ? "text-foreground"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {item === "intro" ? "Home" : item === "career" ? "Career" : item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.nav>
      )}
    </AnimatePresence>
  );
}
