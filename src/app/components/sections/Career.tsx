"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../layout/Container";
import { FiCalendar, FiBriefcase, FiCheckCircle } from "react-icons/fi";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export default function Career() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { store } = usePortfolioStore();
  const careers = store?.careers || [];

  if (!careers || careers.length === 0) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}. ${month}.`;
  };

  return (
    <section id="career" className="relative z-10 py-20 text-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-left text-foreground">
            Career
          </h2>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:min-h-[500px]">
            {/* Left Side: Company Tabs */}
            <div className="w-full md:w-1/4 flex flex-col md:flex-col gap-2 pb-2 md:pb-0">
              {/* Mobile: Segmented Control Style */}
              <div className="md:hidden flex p-1 bg-white/5 rounded-xl border border-white/10 relative overflow-x-auto">
                {careers.map((career, index) => (
                  <button
                    key={career.id}
                    onClick={() => setSelectedTab(index)}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg relative z-10 transition-colors duration-300 min-w-[100px] whitespace-nowrap ${
                      selectedTab === index ? "text-white" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <span className="relative">
                      {career.company}
                      {selectedTab === index && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </span>
                    {selectedTab === index && (
                      <motion.div
                        layoutId="activeTabMobile"
                        className="absolute inset-0 bg-white/10 rounded-lg shadow-sm border border-white/5"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Desktop: Vertical List Style */}
              <div className="hidden md:flex flex-col gap-2">
                {careers.map((career, index) => (
                  <button
                    key={career.id}
                    onClick={() => setSelectedTab(index)}
                    className={`py-4 px-6 text-left rounded-r-xl transition-all duration-300 relative whitespace-nowrap text-base ${
                      selectedTab === index 
                        ? "bg-white/10 text-foreground font-bold shadow-lg border border-foreground/30" 
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"
                    }`}
                  >
                    <span className="relative z-10">{career.company}</span>
                    {selectedTab === index && (
                      <motion.div 
                        layoutId="activeTabDesktop"
                        className="absolute inset-0 bg-white/5 rounded-r-xl border-l-4 border-foreground"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side: Content Details */}
            <div className="w-full md:w-3/4 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 min-h-[400px] md:min-h-auto relative overflow-hidden backdrop-blur-sm">
               {/* Background glow for right panel */}
               <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-foreground/5 rounded-full blur-[60px] md:blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
               
               <AnimatePresence mode="wait">
                <motion.div
                  key={careers[selectedTab].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 md:space-y-8"
                >
                  {/* Header Info */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex flex-col md:flex-row md:items-end gap-1 md:gap-2">
                      {careers[selectedTab].company}
                      {careers[selectedTab].department && (
                        <span className="text-base md:text-lg font-medium text-foreground py-1">
                          @{careers[selectedTab].department}
                        </span>
                      )}
                    </h3>
                    <div className="text-gray-400 text-xs md:text-base mb-4 flex flex-wrap gap-x-4 gap-y-2 items-center">
                      <span className="flex items-center gap-1">
                        <FiBriefcase className="flex-shrink-0" /> {careers[selectedTab].jobTitle}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiCalendar className="flex-shrink-0" />{" "}
                        {formatDate(careers[selectedTab].startDate)} ~ {formatDate(careers[selectedTab].endDate)}
                      </span>
                    </div>
                    {careers[selectedTab].description && (
                      <p className="text-gray-300 text-sm md:text-base font-medium border-l-2 border-foreground/50 pl-4 py-1 italic">
                        {careers[selectedTab].description}
                      </p>
                    )}
                  </div>

                  <div className="h-px bg-white/10 w-full" />

                  {/* Projects */}
                  {careers[selectedTab].projects && careers[selectedTab].projects.length > 0 && (
                    <div className="space-y-8">
                      <h4 className="text-xl font-bold text-white mb-4">Key Projects & Achievements</h4>
                      <div className="space-y-6">
                        {careers[selectedTab].projects.map((project) => (
                          <div key={project.id} className="bg-black/20 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex flex-col gap-4">
                              <div>
                                <h5 className="text-lg font-bold text-foreground mb-3 flex items-start gap-2">
                                  <FiCheckCircle className="mt-1 flex-shrink-0" />
                                  {project.title}
                                </h5>

                                {project.role && (
                                  <div className="mb-3 pl-8"> 
                                    <div 
                                        className="text-sm font-medium text-gray-300 border-l-2 border-foreground/70 pl-3 py-0.5"
                                        dangerouslySetInnerHTML={{ __html: project.role.replace(/className/g, "class") }} 
                                    />
                                  </div>
                                )}

                                {/* Tech Stack per Project */}
                                {project.techStack && project.techStack.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-3 pl-6">
                                    {project.techStack.map((tech) => (
                                      <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 hover:text-white hover:border-foreground/50 hover:bg-white/10 transition-all font-medium">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {project.description && (
                              <div className="text-gray-300 leading-relaxed text-sm md:text-base pl-6 mt-2">
                                <div 
                                  dangerouslySetInnerHTML={{ 
                                    __html: project.description.replace(/className/g, "class") 
                                  }} 
                                />
                              </div>
                            )}


                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
               </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
