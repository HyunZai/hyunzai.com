"use client";

import React from "react";
import { motion } from "framer-motion";
import ProjectCarousel from "./ProjectCarousel";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Container from "./Container";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export default function Projects() {
  const { store } = usePortfolioStore();
  const projects = store?.projects || [];

  if (!projects || projects.length === 0) {
    return null;
  }

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
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col gap-4">
                {/* Image Carousel */}
                <div className="w-full">
                  <ProjectCarousel images={project.images || []} />
                </div>

                {/* Project Info */}
                <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-3xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed bg-background">
                    {project.description}
                  </p>

                  {/* Skills */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3">
                      {project.techStack.map((skill, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white hover:border-foreground/50 hover:bg-white/10 transition-all font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-4 mt-2">
                    {project.gitLink && (
                      <a
                        href={project.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-semibold"
                      >
                        <FiGithub className="w-5 h-5" />
                        GitHub
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
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
