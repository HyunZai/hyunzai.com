"use client";

import { useChatStore } from "@/store/useChatStore";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";

const ChatFloatingButton = () => {
  const { isOpen, hasOpened, openChat } = useChatStore();

  return (
    <AnimatePresence>
      {hasOpened && !isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={openChat}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-foreground text-black shadow-lg shadow-foreground/30 border border-white/20 backdrop-blur-xl transition-colors hover:bg-white"
          aria-label="Open chat"
        >
          <FiMessageSquare className="w-5 h-5 md:w-7 md:h-7" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ChatFloatingButton;
