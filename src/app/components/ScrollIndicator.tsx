"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[30px] h-[50px] rounded-3xl border-2 border-white/30 flex justify-center p-2">
        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="w-2 h-2 rounded-full bg-white mb-1"
        />
      </div>
    </div>
  );
}
