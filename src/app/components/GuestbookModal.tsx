"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect } from "react";
import { useGuestbookStore } from "@/stores/useGuestbookStore"; // DEMO_MESSAGES 제거
import { FiX, FiTerminal, FiCornerDownRight } from "react-icons/fi";
import { FaApple, FaWindows, FaAndroid, FaLinux, FaQuestion } from "react-icons/fa";

interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}



export default function GuestbookModal({ isOpen, onClose }: GuestbookModalProps) {
  const {
    inputMessage,
    nickname,
    sessionLogs,
    isLoading, // 로딩 상태 표시를 위해 추가
    setInputMessage,
    setNickname,
    submitMessage,
    resetSession,
    fetchMessages
  } = useGuestbookStore();

  const messagesEndRef = useRef<HTMLDivElement>(null); // bottomRef -> messagesEndRef 리네이밍

  // OS 아이콘 렌더링 헬퍼 (View 로직이므로 컴포넌트에 남김 or Store에서 가져온 OS 문자열로 맵핑)
  const getOSIcon = (os?: string) => {
    switch (os) {
      case "mac": return <FaApple className="mb-[2px]" />;
      case "ios": return <FaApple className="mb-[2px]" />;
      case "win": return <FaWindows className="mb-[2px]" />;
      case "android": return <FaAndroid className="mb-[2px]" />;
      case "linux": return <FaLinux className="mb-[2px]" />;
      default: return <FaQuestion className="mb-[2px]" size={10} />;
    }
  };

  // scrollToBottom 함수를 useEffect 위로 이동 (호이스팅 문제 해결)
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  // 모달 오픈 시 스크롤 제어 및 초기 데이터 로드
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // html 태그도 잠금
      fetchMessages(); // API 데이터 로드
      scrollToBottom();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      resetSession(); // 모달 닫을 때 세션 초기화 (Store Action)
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, resetSession, fetchMessages]);

  // 새 로그가 추가될 때마다 스크롤 맨 아래로 이동
  useEffect(() => {
    scrollToBottom();
  }, [sessionLogs]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(); // Store Action 호출
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />

          {/* Modal Content - Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <style jsx global>{`
              .terminal-scrollbar::-webkit-scrollbar {
                width: 10px;
                background-color: #1C1C22;
              }
              .terminal-scrollbar::-webkit-scrollbar-thumb {
                background-color: #333;
                border: 2px solid #1C1C22;
                border-radius: 9999px;
              }
              .terminal-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: #555;
              }
              .terminal-scrollbar::-webkit-scrollbar-track {
                background-color: #1C1C22;
              }
            `}</style>

            <div 
              className="bg-[#1C1C22]/95 border border-white/10 w-full max-w-4xl h-[80vh] rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-sm md:text-base relative backdrop-blur-md"
            >
              {/* Header */}
              <div className="h-10 bg-[#1C1C22] flex items-center px-4 border-b border-white/10 shrink-0 relative">
                <div className="flex gap-2 items-center">
                  <div className="relative">
                     <span className="block w-3 h-3 rounded-full bg-foreground" />
                     <span className="absolute inset-0 rounded-full bg-foreground animate-ping opacity-75" />
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 text-gray-500 text-xs flex items-center gap-2 font-mono">
                  <FiTerminal />
                  <span>guestbook — bash</span>
                </div>
                <button 
                  onClick={onClose}
                  className="absolute right-4 text-gray-500 hover:text-white transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Terminal Body */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 text-gray-300 terminal-scrollbar">
                
                {/* Welcome Message */}
                <div className="mb-6 opacity-70 border-b border-gray-800 pb-4">
                  <p>Last login: {new Date().toDateString()} on ttys001</p>
                  <p className="mb-2">Welcome to Hyunzai&apos;s Portfolio Guestbook System v2.0</p>
                  <p>Type &apos;help&apos; for more information.</p>
                </div>

                {/* Log List */}
                {/* Log List */}
                <div className="space-y-4 font-mono text-sm md:text-base">
                  
                  {/* 통합된 Session Logs (API Data + New Interactions) */}
                  {sessionLogs.map((msg) => (
                    <div key={msg.id} className="mb-3 leading-relaxed break-all">
                      {/* 사용자 입력 프롬프트 */}
                      <div className="flex justify-between items-baseline mb-1">
                        <div className="flex items-center gap-2">
                          {msg.type !== 'system' && (
                            <span className="text-gray-500 opacity-50 text-xs">
                              {getOSIcon(msg.os)}
                            </span>
                          )}
                          <span className={msg.type === 'system' ? "text-yellow-400" : "text-foreground"}>
                            {msg.type === 'system' ? 'root@system' : `${msg.nickname}@hyunzai.com`}
                          </span>
                          <span className="text-white">:</span>
                          <span className="text-gray-500">~</span>
                          <span className="text-white">$</span>
                        </div>
                        <span className="text-[10px] text-gray-600 shrink-0 ml-2">{msg.createdAt}</span>
                      </div>

                      {/* 메시지 내용 (Output) */}
                      <div className={`flex ${(msg.type === 'system' || msg.type === 'info') ? 'text-yellow-100/90' : 'text-gray-300'}`}>
                        <span className="text-gray-600 mr-2 select-none pt-1">
                          <FiCornerDownRight size={14} />
                        </span>
                        <span className="whitespace-pre-wrap">{msg.content}</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading Indicator */}
                  {isLoading && (
                     <div className="text-gray-500 text-xs italic">Fetching data...</div>
                  )}
                  
                  {/* Anchor for auto scroll */}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Footer (Fixed Input) */}
              <div className="p-4 bg-[#1C1C22] border-t border-white/10 shrink-0 font-mono text-sm md:text-base">
                 <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
                   {/* ... (입력 폼 유지) ... */}
                    <div className="flex items-center gap-1 shrink-0">
                      <input
                        type="text"
                        placeholder="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-24 bg-transparent border-b border-gray-700 focus:border-foreground outline-none text-foreground text-center placeholder-gray-700 transition-colors"
                      />
                      <span className="text-foreground">@hyunzai.com</span>
                    </div>
                    <span className="text-white">:</span>
                    <span className="text-gray-500">~</span>
                    <span className="text-white">$</span>
                   
                   <div className="flex-1 min-w-[200px] flex items-center">
                     <input
                       type="text"
                       value={inputMessage}
                       onChange={(e) => setInputMessage(e.target.value)}
                       className="w-full bg-transparent border-none outline-none text-white focus:ring-0 p-0 placeholder-gray-700"
                       placeholder="Enter your message..."
                       autoFocus
                     />
                     {/* Cursor */}
                     <span className="w-2 h-4 bg-white/50 animate-pulse ml-1" />
                   </div>
                   <button type="submit" className="hidden" />
                 </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
