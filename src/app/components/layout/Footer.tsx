import React, { useRef, useState } from "react";
import AdminLoginModal from "../ui/AdminLoginModal";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    timerRef.current = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000); // 1초로 단축 (UX 개선)
  };

  const handleEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleGithubClick = () => {
    window.open('https://github.com/hyunzai/hyunzai.com', '_blank');
  };

  const handleLogin = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      
      if (data.success) {
        window.location.href = '/admin';
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <>
      <footer className="relative z-10 w-full py-8 text-center text-gray-400 text-sm bg-background">
        <div
          className="inline-block hover:text-foreground transition-colors cursor-pointer select-none"
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onClick={handleGithubClick}
        >
          © {new Date().getFullYear()} Made by Hyunzai
        </div>
      </footer>

      <AdminLoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
