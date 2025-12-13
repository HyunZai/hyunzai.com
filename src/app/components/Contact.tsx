"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import Container from "./Container";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email sending logic (e.g., using EmailJS or API)
    console.log("Form Data:", formData);
    alert("메시지가 전송되었습니다! (데모 기능)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full pt-30 pb-50 relative overflow-hidden">
      {/* Background Glow */}
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
          className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-10 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
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
                required
                placeholder="이름을 입력하세요"
                className="w-full px-5 py-3 text-white bg-black/20 rounded-xl border border-white/10 focus:outline-none focus:border-foreground focus:bg-white/5 transition-all placeholder-white/20"
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
                required
                placeholder="이메일을 입력하세요"
                className="w-full px-5 py-3 text-white bg-black/20 rounded-xl border border-white/10 focus:outline-none focus:border-foreground focus:bg-white/5 transition-all placeholder-white/20"
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
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="내용을 입력하세요"
                className="w-full px-5 py-3 text-white bg-black/20 rounded-xl border border-white/10 focus:outline-none focus:border-foreground focus:bg-white/5 transition-all placeholder-white/20 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-foreground text-background font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Send Message <FiSend className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </form>
        </motion.div>
      </Container>
    </div>
  );
}
