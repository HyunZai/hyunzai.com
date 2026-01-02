import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiLock, FiX } from "react-icons/fi";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => Promise<boolean>;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
  onLogin,
}: AdminLoginModalProps) {
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else {
      document.body.style.overflow = "unset";
      setPassword("");
      setError("");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const success = await onLogin(password);
      if (!success) {
        setError("비밀번호가 올바르지 않습니다.");
      }
    } catch {
      setError("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isLoading ? onClose : undefined}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-[#1C1C22] border border-white/10 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="p-8 flex flex-col items-center">
              {/* Icon */}
              <div className="mb-6 p-4 rounded-full bg-[#03C3FF]/10 text-[#03C3FF]">
                <FiLock className="w-8 h-8" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">
                관리자 로그인
              </h3>
              <p className="text-gray-400 text-sm mb-6 text-center">
                관리자 페이지로 이동하려면<br />패스워드를 입력해주세요.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="space-y-2">
                  <input
                    ref={inputRef}
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="패스워드 입력"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#03C3FF] focus:ring-1 focus:ring-[#03C3FF] transition-all"
                    disabled={isLoading}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs text-center font-medium"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !password.trim()}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all transform active:scale-[0.98] ${
                    isLoading
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-[#03C3FF] hover:bg-[#03C3FF]/90 shadow-lg shadow-[#03C3FF]/25"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>확인 중...</span>
                    </div>
                  ) : (
                    "로그인"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
