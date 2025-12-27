"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Container from "../layout/Container";
import GuestbookModal from "../features/guestbook/GuestbookModal";

export default function ThankYou() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <>
      <section id="guestbook" className="py-32 relative overflow-hidden">
        
        <Container className="relative z-10 flex flex-col items-center justify-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Thank You <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                for Visiting
              </span>
            </h2>
            
            <p className="text-gray-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
              제 포트폴리오를 끝까지 살펴봐 주셔서 감사합니다. <br />
              협업 제안부터 가벼운 피드백까지 모든 연락을 환영합니다. <br />
              아래의 <span className="text-foreground font-medium">Contact</span>를 통해 연락주세요.
            </p>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                className="relative px-8 py-3 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-lg font-medium min-w-[180px] h-[48px] overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isButtonHovered ? (
                    <motion.span
                      key="hover"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center w-full h-full"
                    >
                      Write Guestbook
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center w-full h-full"
                    >
                      방명록 작성하기
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
            
            <div className="mt-12 w-[1px] h-20 bg-gradient-to-b from-transparent via-gray-700 to-transparent mx-auto" />

          </motion.div>

        </Container>
        
        {/* Contact 섹션과 자연스럽게 이어지는 하단 빛 효과 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-blue-900/20 rounded-full blur-[100px] z-0 pointer-events-none" />
      </section>

      {/* 방명록 모달 */}
      <GuestbookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
