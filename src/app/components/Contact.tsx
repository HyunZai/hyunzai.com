"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import Container from "./Container";
import AlertModal from "./AlertModal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "메시지 전송에 실패했습니다.");
      }

      setAlertState({
        isOpen: true,
        title: "전송 완료",
        message: "메시지가 성공적으로 전송되었습니다!",
        type: "success",
      });

      // 폼 초기화
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      setAlertState({
        isOpen: true,
        title: "전송 실패",
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <section id="contact" className="relative py-20 bg-dark-bg text-white overflow-hidden">
      <Container className="relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 100 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ type: "spring", bounce: 0.5, duration: 1.0 }}
           className="w-full"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
          </div>

          <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 md:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력하세요"
                  required
                  className="w-full px-5 py-2 md:py-3 text-white bg-black/20 rounded-xl border border-white/10 focus:outline-none focus:border-foreground focus:bg-white/5 transition-all placeholder-white/20"
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력하세요"
                  required
                  className="w-full px-5 py-2 md:py-3 text-white bg-black/20 rounded-xl border border-white/10 focus:outline-none focus:border-foreground focus:bg-white/5 transition-all placeholder-white/20"
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
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="내용을 입력하세요"
                  required
                  className="w-full px-5 py-2 md:py-3 text-white bg-black/20 rounded-xl border border-white/10 focus:outline-none focus:border-foreground focus:bg-white/5 transition-all placeholder-white/20 resize-none"
                />
              </div>

              {/* Bottom Actions */}
              <div className="space-y-2">
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 md:py-4 bg-foreground text-background font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? "Sending..." : "Send Message"} 
                    {!isLoading && <FiSend className="group-hover:translate-x-1 transition-transform" />}
                  </span>
                  {!isLoading && (
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  )}
                </button>
              </div>
            </form>
          </div>
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
