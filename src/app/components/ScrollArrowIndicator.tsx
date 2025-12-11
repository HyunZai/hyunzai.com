"use client";

import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export default function ScrollArrowIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <motion.div
        animate={{
          y: [0, 8, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center -space-y-6"
      >
        <FiChevronDown className="w-8 h-8 md:w-12 md:h-12" />
        <FiChevronDown className="w-8 h-8 md:w-12 md:h-12 opacity-60" />
      </motion.div>
    </motion.div>
  );
}
