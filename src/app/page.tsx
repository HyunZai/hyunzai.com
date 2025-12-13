"use client";

import { useEffect } from "react";
import Intro from "./components/Intro";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
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

      {/* 3. Projects Section (Placeholder for future) */}
      <section id="projects">
        <Projects />
      </section>
    </main>
  );
}