import React from "react";

declare global {
  interface Window {
    adminTimer?: NodeJS.Timeout;
  }
}

export default function Footer() {
  const handleStart = () => {
    const timer = setTimeout(() => {
      const password = prompt("Enter Admin Password:");
      if (password) {
        fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            window.location.href = '/admin';
          } else {
            alert('Access Denied');
          }
        })
        .catch(err => console.error(err));
      }
    }, 5000);
    window.adminTimer = timer;
  };

  const handleEnd = () => {
    if (window.adminTimer) {
      clearTimeout(window.adminTimer);
    }
  };

  const handleGithubClick = () => {
    window.open('https://github.com/hyunzai/hyunzai.com', '_blank');
  };

  return (
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
  );
}
