"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling down 100px (or adjust threshold as needed)
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/10 shadow-lg"
        >
          <Container className="flex justify-between items-center py-4">
            {/* Logo or Brand Name */}
            <div
              className="text-xl font-bold text-white cursor-pointer hover:text-primary transition-colors"
              onClick={() => scrollToSection("intro")}
            >
              Hyunzai.com
            </div>

            {/* Navigation Links */}
            <ul className="flex space-x-6 md:space-x-8 text-sm md:text-base font-medium text-gray-300">
            <li>
              <button
                onClick={() => scrollToSection("intro")}
                className="hover:text-primary transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-primary transition-colors"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("projects")}
                className="hover:text-primary transition-colors"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-primary transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
          </Container>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
