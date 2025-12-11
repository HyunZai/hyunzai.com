import Intro from "./components/Intro";
import About from "./components/About";
import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <main className="w-full bg-dark-bg text-white">
      <Navbar />
      {/* 1. Intro Section (Full Height) */}
      <section id="intro" className="h-screen">
        <Intro />
      </section>

      {/* 2. About Section */}
      <section id="about" className="h-screen">
        <About />
      </section>

      {/* 3. Projects Section (Placeholder for future) */}
      {/* <section id="projects"><Projects /></section> */}
    </main>
  );
}