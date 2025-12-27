"use client";

import Container from "../layout/Container";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { FaUser } from "react-icons/fa";
import GitHubContributions from "../ui/GitHubContributions";
import Timeline from "../ui/Timeline";

export default function About() {
  const { store } = usePortfolioStore();
  const user = store?.user;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative z-10 min-h-screen bg-dark-bg text-white py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-foreground">
            About Me
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-3/5 space-y-6 text-lg md:text-xl leading-relaxed text-gray-300 order-2 md:order-1 bg-background rounded-xl">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: (user?.aboutIntro || "").replace(/className/g, "class") 
                }} 
              />
            </div>

            <div className="w-full md:w-2/5 flex justify-center order-1 md:order-2">
              <div className="relative w-60 h-60 md:w-84 md:h-84 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-800 flex items-center justify-center">
                {user?.imageUrl && !imageError ? (
                  <Image
                    src={user.imageUrl}
                    alt="Profile Picture"
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <FaUser className="w-1/2 h-1/2 text-gray-400" />
                )}
              </div>
            </div>
          </div>
          
          {/* 수상 및 자격증 섹션 */}
          <div className="py-20">
            <h3 className="text-2xl font-bold text-center mb-12 text-white">Awards & Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Awards */}
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-foreground/50 transition-colors">
                <h4 className="text-xl font-bold mb-6 text-foreground flex items-center gap-2">
                  🏆 Awards
                </h4>
                <ul className="space-y-6">
                  {store?.achievements
                    .filter((item) => item.type === "AWARD")
                    .map((award) => (
                      <li key={award.id}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-white text-lg">{award.title}</span>
                          {/* Desktop Date Badge */}
                          <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded">
                            {new Date(award.startDate).toLocaleDateString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }).replace(/\./g, ".").slice(0, -1)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm text-gray-400 font-medium">{award.organization}</p>
                        </div>

                        {award.description && (
                          <div 
                            className="text-gray-100 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                              __html: award.description.replace(/className/g, "class") 
                            }}
                          />
                        )}
                      </li>
                    ))}
                </ul>
              </div>

              {/* Certifications */}
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-foreground/50 transition-colors">
                <h4 className="text-xl font-bold mb-6 text-foreground flex items-center gap-2">
                  📜 Certifications
                </h4>
                <ul className="space-y-6">
                  {store?.achievements
                    .filter((item) => item.type === "CERTIFICATION")
                    .map((cert) => (
                      <li key={cert.id} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                        <div>
                          <span className="font-bold text-white block mb-1">{cert.title}</span>
                          <span className="text-sm text-gray-400">{cert.organization}</span>
                        </div>
                        <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded">
                          {new Date(cert.startDate).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }).replace(/\./g, ".").slice(0, -1)}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {user?.gitUsername && <GitHubContributions username={user.gitUsername} />}
          <div className="mt-20">
            <Timeline />
          </div>
        </motion.div>
      </Container>
    </div>
  );
}