"use client";

import { useState, useEffect } from "react";
import { FiMaximize2, FiSend, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ChatInterface = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 모달이 열려있을 때 ESC 키 입력 시 닫기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isModalOpen]);

    return (
        <>
            {/* Main Page Input Area */}
            <div className="mt-8 relative w-full">
                <input
                    type="text"
                    placeholder="Ask me anything..."
                    className="w-full px-16 py-3 text-white bg-white/10 backdrop-blur-md rounded-full opacity-80 border border-white/20 focus:outline-none focus:border-foreground focus:bg-white/20 transition-all placeholder-white/50 select-text text-sm md:text-base"
                />

                {/* Left: Maximize Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
                    aria-label="Open chat modal"
                >
                    <FiMaximize2 className="w-6 h-6" />
                </button>

                {/* Right: Send Button */}
                <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
                    aria-label="Send message"
                >
                    <FiSend className="w-6 h-6" />
                </button>
            </div>

            {/* Chatbot Modal - Using Portal to render at body level */}
            <AnimatePresence>
                {isModalOpen && (
                    <Portal>
                        <motion.div
                            className="fixed inset-0 z-[100] flex items-center justify-center md:justify-end bg-black/60 backdrop-blur-sm p-4 md:p-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)} // 배경 클릭 시 닫기
                        >
                            {/* Modal Container */}
                            <motion.div
                                className="relative w-full max-w-xl h-full bg-[#1c1c22]/95 backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫기 방지
                            >

                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-foreground animate-pulse shadow-[0_0_10px_var(--color-foreground)]" />
                                        Hyunzai AI
                                    </h3>
                                    <button 
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-white/50 hover:text-white transition-colors p-1"
                                    >
                                        <FiX className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Chat Content Area */}
                                <div className="flex-1 p-6 text-white overflow-y-auto flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-black/20">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
                                            <span className="text-3xl">🤖</span>
                                        </div>
                                        <p className="text-2xl font-bold">무엇이든 물어보세요!</p>
                                        <p className="text-gray-400 text-sm max-w-xs mx-auto">
                                            포트폴리오, 기술 스택, 또는 저에 대한 궁금한 점을 자유롭게 질문해주세요.
                                        </p>
                                    </div>
                                </div>

                                {/* Input Area in Modal */}
                                <div className="p-4 border-t border-white/5 bg-transparent">
                                    <div className="relative w-full group">
                                        <input
                                            type="text"
                                            placeholder="메시지를 입력하세요..."
                                            className="w-full pl-6 pr-12 py-3 text-white bg-white/5 backdrop-blur-md rounded-full border border-white/10 focus:outline-none focus:border-foreground focus:bg-white/10 transition-all placeholder-white/40 shadow-inner text-sm md:text-base"
                                        />
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors hover:bg-white/10 rounded-full">
                                            <FiSend className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </Portal>
                )}
            </AnimatePresence>
        </>
    );
};

// Simple Portal Component inside file or separate
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Hydration mismatch 방지: 마운트 후 렌더링하도록 딜레이 적용
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (typeof window === "undefined" || !mounted) return null;

    return createPortal(children, document.body);
};

export default ChatInterface;
