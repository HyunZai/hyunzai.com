import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiAlertTriangle } from "react-icons/fi";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error";
}

export default function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = "success",
}: AlertModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Handle Scroll Lock and Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
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

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-background/90 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_-10px_rgba(3,195,255,0.3)] ring-1 ring-white/20"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Background Gradient Blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-cyan-500/20 to-transparent blur-3xl pointer-events-none" />

            <div className="p-8 flex flex-col items-center text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring" }}
                className={`mb-6 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${
                  type === "success"
                    ? "bg-gradient-to-br from-cyan-400 to-blue-600 shadow-cyan-500/30"
                    : "bg-gradient-to-br from-red-400 to-pink-600 shadow-red-500/30"
                }`}
              >
                {type === "success" ? (
                  <FiCheck className="w-10 h-10 text-white drop-shadow-md" />
                ) : (
                  <FiAlertTriangle className="w-10 h-10 text-white drop-shadow-md" />
                )}
              </motion.div>

              {/* Text */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                {title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                {message}
              </p>

              {/* Action Button */}
              <button
                onClick={onClose}
                className="mt-8 w-full py-3 bg-foreground text-background font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-1 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  확인
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
