"use client";

import { useState, useEffect } from "react";
import { FiMaximize2, FiSend } from "react-icons/fi";
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

            {/* Chatbot Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center md:justify-end bg-black/60 backdrop-blur-sm p-4 md:p-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)} // 배경 클릭 시 닫기
                    >
                        {/* Modal Container */}
                        <motion.div
                            className="relative w-full max-w-xl h-full bg-background rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫기 방지
                        >

                            {/* Header */}
                            <div className="flex items-center justify-between p-2 border-b border-white/10 bg-white/5">
                                <div className="flex items-center gap-2 ml-2">
                                    <span className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <span className="w-3 h-3 rounded-full bg-green-500" />
                                    <h3 className="ml-3 text-lg font-bold text-white">Hyunzai AI</h3>
                                </div>
                            </div>

                            {/* Chat Content Area (Placeholder) */}
                            <div className="flex-1 p-6 text-white/80 overflow-y-auto flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-2xl font-bold mb-2">안녕하세요!</p>
                                    <p className="text-white/50">무엇이든 물어보세요.</p>
                                </div>
                            </div>

                            {/* Input Area in Modal */}
                            <div className="p-4 border-t border-white/10 bg-white/5">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="w-full px-5 py-3 pr-12 text-white bg-black/20 rounded-xl border border-white/10 focus:outline-none focus:border-foreground/30 transition-all placeholder-white/30"
                                    />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors">
                                        <FiSend className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatInterface;
