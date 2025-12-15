"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMail } from "react-icons/fi";
import Container from "./Container";
import AlertModal from "./AlertModal";

export default function Contact() {
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
  });

  const handleInputInteraction = (e: React.MouseEvent | React.FocusEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).blur();
    setAlertState({
      isOpen: true,
      title: "기능 개발 중",
      message: "메일 전송 기능은 현재 개발 중입니다.\n이메일로 직접 연락 부탁드립니다!",
      type: "error",
    });
  };

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <section id="contact" className="relative py-20 bg-dark-bg text-white overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] z-0 pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 md:p-10 shadow-2xl"
        >
          <form className="space-y-2 md:space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="이름을 입력하세요"
                className="w-full px-5 py-2 md:py-3 text-white bg-black/20 rounded-xl border border-white/10 focus:outline-none focus:border-foreground focus:bg-white/5 transition-all placeholder-white/20 cursor-pointer"
                onClick={handleInputInteraction}
                readOnly
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="이메일을 입력하세요"
                className="w-full px-5 py-2 md:py-3 text-white bg-black/20 rounded-xl border border-white/10 focus:outline-none focus:border-foreground focus:bg-white/5 transition-all placeholder-white/20 cursor-pointer"
                onClick={handleInputInteraction}
                readOnly
              />
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="내용을 입력하세요"
                className="w-full px-5 py-2 md:py-3 text-white bg-black/20 rounded-xl border border-white/10 focus:outline-none focus:border-foreground focus:bg-white/5 transition-all placeholder-white/20 resize-none cursor-pointer"
                onClick={handleInputInteraction}
                readOnly
              />
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2">
              {/* Submit Button */}
              <button
                type="button"
                className="w-full py-3 md:py-4 bg-foreground text-background font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 group relative overflow-hidden"
                onClick={handleInputInteraction}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Send Message <FiSend className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/30 text-md font-medium">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Direct Email Button */}
              <a
                href="mailto:contact@hyunzai.com"
                className="w-full py-3 md:py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 hover:text-foreground transition-all flex items-center justify-center gap-2 group border border-white/10"
              >
                Send Email <FiMail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </form>
        </motion.div>
      </Container>


      <AlertModal
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
      />
    </section>
  );
}
