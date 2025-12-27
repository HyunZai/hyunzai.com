import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full py-8 text-center text-gray-400 text-sm bg-background">
      <a
        href="https://github.com/HyunZai/hyunzai.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-foreground transition-colors cursor-pointer"
      >
        © {new Date().getFullYear()} Made by Hyunzai
      </a>
    </footer>
  );
}
