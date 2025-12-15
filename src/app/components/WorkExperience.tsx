"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import { FiCalendar, FiBriefcase, FiCheckCircle } from "react-icons/fi";

interface Experience {
  company: string;
  department: string;
  position: string;
  period: string;
  role: string;
  stack: string[];
  projects: {
    title: string;
    description?: string;
    troubleshooting?: string;
  }[];
}

const experiences: Experience[] = [
  {
    company: "SOLBIT",
    department: "솔루션개발팀",
    position: "인턴",
    period: "2025. 03. ~ 2025. 08.",
    role: "Full Stack Web Developer",
    stack: ["Node.js", "React", "JavaScript", "Spring", "JSP", "MariaDB", "Oracle"],
    projects: [
      {
        title: "University e-IRB System Web Application",
        troubleshooting: "특정 사용자의 대용량 데이터 조회로 인한 메인 페이지 로딩 Timeout 및 서비스 장애 이슈를 해결했습니다. 로그 분석을 통해 단순 쿼리 튜닝으로는 한계가 있음을 파악하고, 데이터 조회 로직을 AJAX 기반의 비동기 처리 방식으로 전면 전환했습니다. 그 결과 로딩 지연 문제를 근본적으로 해결하고, 대량 데이터 처리 시에도 전체 시스템에 영향을 주지 않도록 안정성을 확보했습니다."
      },
      {
        title: "Kiosk Backoffice Web Application",
        troubleshooting: "클라이언트의 반복적인 수동 데이터 조회 요청 업무를 개선했습니다. 매번 발생하는 유사한 요청을 처리하는 비효율을 해결하고자, 검색 및 필터링 기능이 포함된 사용자 정보 조회 어드민 기능을 제안하고 개발했습니다. 도입 이후 수동 요청 건수가 약 95% 감소하여 운영 팀이 핵심 업무에 집중할 수 있는 환경을 조성했습니다."
      }
    ]
  },
  {
    company: "M&J SOFT",
    department: "개발팀",
    position: "사원",
    period: "2020. 05. ~ 2023. 02.",
    role: "Full Stack Web Developer & Desktop Application Developer",
    stack: ["C#", "ASP.NET Core", "MSSQL", "JavaScript", "HTML/CSS", "WinForms", "Windows Server"],
    projects: [
      {
        title: "EMS (Engineering Management System) Web Application",
        description: "사내 유일한 웹 개발 담당자로서 ASP.NET Core 기반 웹 애플리케이션의 아키텍처 설계부터 프론트엔드, 백엔드 개발 전 과정을 주도했습니다. 초기 구축 단계에서 다양한 시행착오를 겪으며 코딩뿐만 아니라 서비스 기획과 설계의 중요성을 깊이 체감했습니다. 이 경험은 제가 웹 개발자로서의 확고한 커리어 방향성을 설정하는 중요한 계기가 되었습니다."
      },
      {
        title: "Intergraph S3D API Desktop Application",
        description: "Intergraph사의 Smart 3D API를 활용하여 설계 자동화 및 데이터 검증을 위한 데스크톱 애플리케이션을 개발 및 유지보수했습니다."
      }
    ]
  }
];

export default function WorkExperience() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <section id="work-experience" className="relative z-10 py-20 bg-background text-white">
      <Container>
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-left text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Work Experience
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:min-h-[500px]">
          {/* Left Side: Company Tabs */}
          <div className="w-full md:w-1/4 flex flex-col md:flex-col gap-2 pb-2 md:pb-0">
            {/* Mobile: Segmented Control Style */}
            <div className="md:hidden flex p-1 bg-white/5 rounded-xl border border-white/10 relative">
              {experiences.map((exp, index) => (
                <button
                  key={exp.company}
                  onClick={() => setSelectedTab(index)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg relative z-10 transition-colors duration-300 ${
                    selectedTab === index ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <span className="relative">
                    {exp.company}
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

            {/* Desktop: Vertical List Style (unchanged logic) */}
            <div className="hidden md:flex flex-col gap-2">
              {experiences.map((exp, index) => (
                <button
                  key={exp.company}
                  onClick={() => setSelectedTab(index)}
                  className={`py-4 px-6 text-left rounded-r-xl transition-all duration-300 relative whitespace-nowrap text-base ${
                    selectedTab === index 
                      ? "bg-white/10 text-foreground font-bold shadow-lg border border-foreground/30" 
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"
                  }`}
                >
                  <span className="relative z-10">{exp.company}</span>
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
                key={selectedTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 md:space-y-8"
              >
                {/* Header Info */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex flex-col md:flex-row md:items-end gap-1 md:gap-2">
                    {experiences[selectedTab].company}
                    <span className="text-base md:text-lg font-medium text-foreground py-1">@{experiences[selectedTab].department}</span>
                  </h3>
                  <div className="text-gray-400 text-xs md:text-base mb-4 flex flex-wrap gap-x-4 gap-y-2 items-center">
                    <span className="flex items-center gap-1"><FiBriefcase className="flex-shrink-0" /> {experiences[selectedTab].position}</span>
                    <span className="flex items-center gap-1"><FiCalendar className="flex-shrink-0" /> {experiences[selectedTab].period}</span>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base font-medium border-l-2 border-foreground/50 pl-4 py-1 italic">
                    {experiences[selectedTab].role}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {experiences[selectedTab].stack.map((tech) => (
                    <span key={tech} className="px-3 py-1 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm text-gray-300 hover:text-white hover:border-foreground/50 hover:bg-white/10 transition-all font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="h-px bg-white/10 w-full" />

                {/* Projects */}
                <div className="space-y-8">
                  <h4 className="text-xl font-bold text-white mb-4">Key Projects & Achievements</h4>
                  <div className="space-y-6">
                    {experiences[selectedTab].projects.map((project, i) => (
                      <div key={i} className="bg-black/20 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                        <h5 className="text-lg font-bold text-foreground mb-3 flex items-start gap-2">
                          <FiCheckCircle className="mt-1 flex-shrink-0" />
                          {project.title}
                        </h5>
                        
                        {project.description && (
                          <div className="text-gray-300 leading-relaxed text-sm md:text-base pl-6">
                            <p className="mb-2 font-semibold text-white/80">Description</p>
                            {project.description}
                          </div>
                        )}

                        {project.troubleshooting && (
                          <div className="text-gray-300 leading-relaxed text-sm md:text-base mt-3 pl-6">
                            <p className="mb-2 font-semibold text-white/80 text-orange-400/90">Troubleshooting & Impact</p>
                            {project.troubleshooting}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
