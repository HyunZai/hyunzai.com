"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useState, useEffect, useRef } from "react";
import { FiMaximize2, FiSend, FiX, FiMessageSquare } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useChatStore } from "@/store/useChatStore";

const RECOMMENDED_QUESTIONS = [
    "어떤 기술 스택을 사용하시나요?",
    "진행했던 프로젝트에 대해 알려주세요.",
    "연락할 수 있는 방법은 무엇인가요?",
];

const ChatInterface = () => {
    const { 
        isOpen, 
        openChat, 
        closeChat, 
        messages, 
        inputValue, 
        setInputValue, 
        sendMessage, 
        isTyping 
    } = useChatStore();
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // 모달이 열려있을 때 ESC 키 입력 시 닫기 및 스크롤 잠금 (강력한 잠금)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeChat();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            // html, body 둘 다 잠금 및 important 적용
            document.documentElement.style.setProperty('overflow', 'hidden', 'important');
            document.body.style.setProperty('overflow', 'hidden', 'important');
        } else {
            document.documentElement.style.removeProperty('overflow');
            document.body.style.removeProperty('overflow');
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.documentElement.style.removeProperty('overflow');
            document.body.style.removeProperty('overflow');
        };
    }, [isOpen, closeChat]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            sendMessage(inputValue);
        }
    };

    const [width, setWidth] = useState(480);
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        // 초기 너비 설정 (화면의 33%, 최대 1200px)
        const updateWidth = () => {
            if (typeof window !== 'undefined') {
                const initialWidth = Math.min(window.innerWidth * 0.33, 1200);
                if (initialWidth > 320) setWidth(initialWidth);
            }
        };
        updateWidth();
    }, []);

    useEffect(() => {
        const resize = (e: MouseEvent) => {
            if (isResizing) {
                // 오른쪽 패딩(40px)을 고려하여 너비 계산
                const paddingRight = window.innerWidth >= 768 ? 40 : 0;
                const newWidth = window.innerWidth - paddingRight - e.clientX;
                
                if (newWidth > 320 && newWidth < window.innerWidth * 0.9) {
                    setWidth(newWidth);
                }
            }
        };

        const stopResizing = () => setIsResizing(false);

        if (isResizing) {
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResizing);
        }

        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [isResizing]);

    return (
        <>
            {/* Main Page Input Area */}
            <div className="mt-8 relative w-full">
                <input
                    type="text"
                    placeholder="Ask me anything..."
                    className="w-full px-16 py-4 md:py-5 text-white bg-white/10 backdrop-blur-md rounded-full opacity-80 border border-white/20 focus:outline-none focus:border-foreground focus:bg-white/20 transition-all placeholder-white/50 select-text text-sm md:text-xl cursor-default"
                    onClick={() => openChat()}
                    readOnly
                />

                <button
                    onClick={() => openChat()}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
                    aria-label="Open chat modal"
                >
                    <FiMaximize2 className="w-6 h-6" />
                </button>

                <button
                    onClick={() => openChat()}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
                    aria-label="Open chat modal"
                >
                    <FiSend className="w-6 h-6" />
                </button>
            </div>

            {/* Chatbot Modal */}
            <AnimatePresence>
                {isOpen && (
                    <Portal>
                        <motion.div
                            className="fixed inset-0 z-[100] flex items-center justify-center md:justify-end bg-black/60 backdrop-blur-sm p-4 md:p-10 pointer-events-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <motion.div
                                className="relative h-[90vh] bg-background border-l border-white/10 overflow-hidden flex flex-col shadow-2xl rounded-2xl w-full md:w-auto"
                                style={{ width: typeof window !== 'undefined' && window.innerWidth >= 768 ? width : '100%' }}
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Resize Handle */}
                                <div
                                    className="hidden md:block absolute left-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-foreground/50 transition-colors z-50 active:bg-foreground"
                                    onMouseDown={() => setIsResizing(true)}
                                />
                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-white/5">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <div className="relative">
                                            <span className="block w-2 h-2 rounded-full bg-foreground" />
                                            <span className="absolute inset-0 rounded-full bg-foreground animate-ping opacity-75" />
                                        </div>
                                        HyunzAI
                                    </h3>
                                    <button 
                                        onClick={() => closeChat()}
                                        className="text-white/50 hover:text-white transition-colors p-1"
                                    >
                                        <FiX className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Chat Content Area */}
                                <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-transparent to-black/20 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                    {messages.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center space-y-8">
                                            <div className="text-center space-y-4">
                                                <h4 className="text-2xl md:text-3xl font-bold text-white">무엇이든 물어보세요!</h4>
                                                <p className="text-gray-400 text-sm md:text-base">
                                                    저에 대해 궁금한 점을 자연스럽게 물어보세요.
                                                </p>
                                            </div>
                                            
                                            <div className="w-full max-w-lg space-y-3">
                                                {RECOMMENDED_QUESTIONS.map((question, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => sendMessage(question)}
                                                        className="w-full text-left px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-foreground/30 transition-all group flex items-center justify-between"
                                                    >
                                                        <span className="text-gray-300 group-hover:text-white text-base">{question}</span>
                                                        <FiMessageSquare className="w-5 h-5 text-gray-500 group-hover:text-foreground opacity-0 group-hover:opacity-100 transition-all" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                                >
                                                    <div
                                                        className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm md:text-base leading-relaxed ${
                                                            msg.role === "user"
                                                                ? "bg-foreground text-black font-medium rounded-tr-sm"
                                                                : "bg-white/10 text-gray-100 rounded-tl-sm border border-white/5"
                                                        }`}
                                                    >
                                                        {msg.role === "assistant" ? (
                                                            <div className="markdown-content space-y-2">
                                                                <ReactMarkdown
                                                                    remarkPlugins={[remarkGfm]}
                                                                    components={{
                                                                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                                        ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                                                                        ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                                                                        li: ({ children }) => <li className="pl-1">{children}</li>,
                                                                        a: ({ href, children }) => (
                                                                            <a 
                                                                                href={href} 
                                                                                target="_blank" 
                                                                                rel="noopener noreferrer" 
                                                                                className="text-foreground hover:underline break-all"
                                                                            >
                                                                                {children}
                                                                            </a>
                                                                        ),
                                                                        code: ({ className, children, ...props }) => {
                                                                            const isInline = !String(children).includes('\n');
                                                                            return isInline ? (
                                                                                <code className="bg-white/20 px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props}>
                                                                                    {children}
                                                                                </code>
                                                                            ) : (
                                                                                <div className="bg-black/30 rounded-lg p-3 my-2 overflow-x-auto border border-white/10">
                                                                                    <code className="block text-sm font-mono text-gray-200 whitespace-pre" {...props}>
                                                                                        {children}
                                                                                    </code>
                                                                                </div>
                                                                            );
                                                                        },
                                                                        blockquote: ({ children }) => (
                                                                            <blockquote className="border-l-4 border-foreground/50 pl-4 py-1 my-2 bg-white/5 rounded-r">
                                                                                {children}
                                                                            </blockquote>
                                                                        ),
                                                                        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                                                                        table: ({ children }) => (
                                                                            <div className="overflow-x-auto my-4">
                                                                                <table className="w-full border-collapse border border-white/20 text-sm">
                                                                                    {children}
                                                                                </table>
                                                                            </div>
                                                                        ),
                                                                        thead: ({ children }) => <thead className="bg-white/10">{children}</thead>,
                                                                        tbody: ({ children }) => <tbody>{children}</tbody>,
                                                                        tr: ({ children }) => <tr className="border-b border-white/10 last:border-0">{children}</tr>,
                                                                        th: ({ children }) => <th className="px-4 py-2 text-left font-bold text-white border-r border-white/20 last:border-0">{children}</th>,
                                                                        td: ({ children }) => <td className="px-4 py-2 text-gray-300 border-r border-white/20 last:border-0">{children}</td>,
                                                                    }}
                                                                >
                                                                    {msg.content}
                                                                </ReactMarkdown>
                                                            </div>
                                                        ) : (
                                                            msg.content
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            {isTyping && (
                                                <div className="flex justify-start">
                                                    <div className="bg-white/10 rounded-2xl rounded-tl-sm px-5 py-4 flex gap-1.5 items-center">
                                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                                    </div>
                                                </div>
                                            )}
                                            <div ref={messagesEndRef} />
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="p-6 border-t border-white/10 bg-background">
                                    <div className="relative w-full group">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="메시지를 입력하세요..."
                                            className="w-full pl-6 pr-16 py-4 text-white bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 focus:outline-none focus:border-foreground focus:bg-white/20 transition-all placeholder-white/50 text-[16px]"
                                        />
                                        <button 
                                            onClick={() => sendMessage(inputValue)}
                                            disabled={!inputValue.trim()}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors disabled:opacity-50"
                                        >
                                            <FiSend className="w-6 h-6" />
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

// Portal Component
const Portal = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (typeof window === "undefined" || !mounted) return null;

    return createPortal(children, document.body);
};

export default ChatInterface;
