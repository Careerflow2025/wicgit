import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="w-full h-48 bg-gray-200">
        <img
          src={project.image}
          alt={project.title + ' image'}
          className="object-cover w-full h-full"
          onError={e => { e.target.onerror = null; e.target.src = '/images/placeholder.jpg'; }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
          <span>Learn More</span>
          <ChevronRightIcon className="w-5 h-5 ml-1" />
        </div>
      </div>
    </Link>
  );
} 