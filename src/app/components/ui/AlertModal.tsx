import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

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
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-sm md:max-w-md overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/5 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              {/* Icon */}
              <div
                className={`mb-4 md:mb-6 rounded-full flex items-center justify-center ${
                  type === "success"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {type === "success" ? (
                  <FiCheckCircle className="w-16 h-16 md:w-20 md:h-20" style={{ strokeWidth: 1.5 }} />
                ) : (
                  <FiXCircle className="w-16 h-16 md:w-20 md:h-20" style={{ strokeWidth: 1.5 }} />
                )}
              </div>

              {/* Text */}
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                {title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed whitespace-pre-line mb-6 md:mb-8">
                {message}
              </p>

              {/* Action Button */}
              <button
                onClick={onClose}
                className="w-full py-2.5 md:py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity text-sm md:text-base"
              >
                확인
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
