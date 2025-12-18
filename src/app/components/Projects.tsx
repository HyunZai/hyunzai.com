"use client";

import React from "react";
import { motion } from "framer-motion";
import ProjectCarousel from "./ProjectCarousel";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Container from "./Container";

interface Project {
  title: string;
  description: string;
  skills: string[];
  links: {
    github: string;
    live?: string;
  };
  images: string[];
}

const projects: Project[] = [
  {
    title: "PhoneLink",
    description:
      "PhoneLink는 전국 핸드폰 매장의 시세를 등록 및 관리할 수 있도록 판매자들을 지원하고, 사용자들은 쉽고 투명하게 최저가로 핸드폰을 구매할 수 있도록 돕는 B2B2C 플랫폼입니다. 핸드폰을 저렴하게 구매하는 방법에 대한 정보의 파편화를 해결하여 소비자와 판매자 모두에게 이익이 되는 생태계를 구축하는 것을 목표로 개발하게 되었습니다.",
    skills: ["Node.js", "React", "TypeScript", "TypeORM", "MySQL", "JWT"],
    links: {
      github: "https://github.com/phone-link-org/phone-link",
      //live: "https://example.com",
    },
    images: [
      "/uploads/projects/PhoneLink1.png",
      "/uploads/projects/PhoneLink2.png",
      "/uploads/projects/PhoneLink3.png",
      "/uploads/projects/PhoneLink4.png",
    ],
  },
  {
    title: "Youtube Cue Finder",
    description:
      "Youtube Cue Finder는 다시 보고 싶은 유튜브 영상의 기억나는 대사를 키워드로 검색하여 쉽게 찾아볼 수 있게 해줍니다.",
    skills: ["Node.js", "React", "JavaScript", "Flask", "Python"],
    links: {
      github: "https://github.com/HyunZai/youtube-cue-finder",
      //live: "https://example.com",
    },
    images: [
      "/uploads/projects/YoutubeCueFinder.png",
    ],
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-dark-bg text-white py-20">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-left text-foreground">
            Projects
          </h2>

          <div className="flex flex-col gap-24 mt-12">
            {projects.map((project, index) => (
              <div key={index} className="flex flex-col gap-4">
                {/* Image Carousel */}
                <div className="w-full">
                  <ProjectCarousel images={project.images} />
                </div>

                {/* Project Info */}
                <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-3xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed bg-background">
                    {project.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {project.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white hover:border-foreground/50 hover:bg-white/10 transition-all font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-2">
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-semibold"
                    >
                      <FiGithub className="w-5 h-5" />
                      GitHub
                    </a>
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-white transition-all rounded-xl font-bold"
                      >
                        <FiExternalLink className="w-5 h-5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
