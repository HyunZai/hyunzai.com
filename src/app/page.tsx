"use client";

import { useEffect } from "react";
import Intro from "./components/Intro";
import About from "./components/About";
import Navbar from "./components/Navbar";
import WorkExperience from "./components/WorkExperience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import FloatingLinks from "./components/FloatingLinks";
import Footer from "./components/Footer";
import { useUserStore } from "@/store/useUserStore";

export default function HomePage() {
  const { fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <main className="w-full bg-dark-bg text-white">
      <Navbar />
      {/* 1. Intro Section (Full Height) */}
      <section id="intro" className="h-screen">
        <Intro />
      </section>

      {/* 2. About Section */}
      <section id="about" className="min-h-screen">
        <About />
      </section>

      {/* 2.5. Work Experience Section */}
      <section id="work-experience">
        <WorkExperience />
      </section>

      {/* 3. Projects Section */}
      <section id="projects">
        <Projects />
      </section>

      {/* 4. Contact Section */}
      <section id="contact" className="bg-gradient-to-t from-black to-transparent">
        <Contact />
      </section>

      {/* Floating Action Button */}
      <FloatingLinks />
      <Footer />
    </main>
  );
}