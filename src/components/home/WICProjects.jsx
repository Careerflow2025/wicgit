import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projectsData';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function WICProjects() {
  // Function to format titles - only remove WIC from WIC FC
  const formatTitle = (title) => {
    if (title === 'WIC FC') {
      return 'FC';
    }
    return title;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">WIC Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-full h-48 bg-gray-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full"
                  onError={e => { e.target.onerror = null; e.target.src = '/images/placeholder.jpg'; }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{formatTitle(project.title)}</h3>
                <p className="text-gray-600 mb-4">{project.subtitle}</p>
                <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                  <span>Learn More</span>
                  <ChevronRightIcon className="w-5 h-5 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 