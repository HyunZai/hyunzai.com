"use client";

import Intro from "./components/Intro";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Career from "./components/Career";
import FloatingLinks from "./components/FloatingLinks";
import ChatFloatingButton from "./components/ChatFloatingButton";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export default function Home() {
  const { fetchPortfolioData } = usePortfolioStore();

  useEffect(() => {
    fetchPortfolioData();

    // Hash(#) navigation
    const hash = window.location.hash;
    if (hash) {
      const targetId = decodeURIComponent(hash.substring(1)).toLowerCase();
      
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 20,
            behavior: "smooth",
          });
        }
      }, 100);
    }
    
  }, [fetchPortfolioData]);

  return (
    <main className="w-full bg-dark-bg text-white">
      <Navbar />
      <section id="intro" className="h-screen">
        <Intro />
      </section>

      <section id="about" className="min-h-screen">
        <About />
      </section>

      <section id="career">
        <Career />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact" className="bg-gradient-to-t from-black to-transparent">
        <Contact />
      </section>

      {/* Floating Action Button */}
      <ChatFloatingButton />
      <FloatingLinks />
      <Footer />
    </main>
  );
}