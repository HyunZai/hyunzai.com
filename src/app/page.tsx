"use client";

import { useEffect } from "react";
import Intro from "./components/Intro";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Career from "./components/Career";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import FloatingLinks from "./components/FloatingLinks";
import Footer from "./components/Footer";
import { useUserStore } from "@/store/useUserStore";

export default function HomePage() {
   const { fetchUser } = useUserStore();

   useEffect(() => {
     fetchUser();

    // Handle hash navigation on mount
    const hash = window.location.hash;
    if (hash) {
      // Decode hash (handling URL encoding) and normalize to lowercase for ID matching
      const targetId = decodeURIComponent(hash.substring(1)).toLowerCase();
      
      // Use a small timeout to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 20, // Match Navbar offset
            behavior: "smooth",
          });
        }
      }, 100);
    }

   }, [fetchUser]);

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
      <FloatingLinks />
      <Footer />
    </main>
  );
}