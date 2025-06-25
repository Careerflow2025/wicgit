import React from 'react';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/projects/ProjectCard';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans">
      {/* SECTION 1: HERO */}
      <section className="py-16 px-4 text-center flex flex-col items-center justify-center bg-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">WIC Community Projects</h1>
        <p className="text-lg md:text-xl text-gray-700">Ongoing initiatives supported by the Watford Islamic Centre</p>
      </section>

      {/* SECTION 2: PROJECT CARDS */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 