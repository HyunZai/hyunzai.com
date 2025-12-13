"use client";

import React from "react";
import Container from "./Container";
import { FaGithub, FaExternalLinkAlt, FaFolder } from "react-icons/fa";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Next.js 15와 Tailwind CSS로 제작한 개인 포트폴리오 웹사이트입니다. 반응형 디자인과 인터랙티브한 애니메이션을 구현했습니다.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/hyunzai",
    liveUrl: "https://hyunzai.com",
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description: "데이터 시각화 및 상품 관리를 위한 관리자 대시보드입니다. 차트 라이브러리를 활용하여 매출 데이터를 직관적으로 보여줍니다.",
    techStack: ["React", "Chart.js", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/hyunzai",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "실시간 협업이 가능한 할 일 관리 애플리케이션입니다. WebSocket을 사용하여 팀원 간의 상태 동기화를 지원합니다.",
    techStack: ["Vue.js", "Firebase", "Vuex"],
    githubUrl: "https://github.com/hyunzai",
    liveUrl: "https://example.com",
  },
];

export default function Projects() {
  return (
    <div className="py-20 bg-dark-bg text-white relative z-10">
      <Container>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-foreground text-start"
        >
          Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-background rounded-xl overflow-hidden border border-gray-700 hover:border-foreground transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full"
    >
      {/* Thumbnail Area (Placeholder) */}
      <div className="h-48 bg-gray-800 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-700 transition-colors">
        <FaFolder className="text-6xl text-gray-600 group-hover:text-foreground/50 transition-colors duration-300" />
        {/* If image exists, it would go here */}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-foreground transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-3">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub Link"
              >
                <FaGithub size={20} />
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Live Demo Link"
              >
                <FaExternalLinkAlt size={18} />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-300 mb-6 line-clamp-3 text-sm flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800 text-foreground border border-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
