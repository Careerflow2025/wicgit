import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { projectsData } from '../data/projectsData';

// Import all project images from src/assets/images
import libraryImg from '../assets/images/WIC LIBRARY.png';
import wicFcImg from '../assets/images/WIC FC.png';
import businessBarakahImg from '../assets/images/WIC BUSINESS AND BARAKAH.png';
import over60sImg from '../assets/images/WIC OVER 60s.png';
import youthImg from '../assets/images/WIC YOUTH.png';
import babyMumImg from '../assets/images/WIC BABY AND MUM.png';
import quranBreakfastImg from '../assets/images/WIC Quran Breakfast Circle.png';

// Image mapping object
const projectImages = {
  'library': libraryImg,
  'wic-fc': wicFcImg,
  'business-and-barakah': businessBarakahImg,
  'over-60s': over60sImg,
  'youth-club': youthImg,
  'baby-and-mum': babyMumImg,
  'quran-breakfast-circle': quranBreakfastImg
};

const categories = ['All']; // You can add categories if you want to filter

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // For now, no category filtering, just show all
  const filteredProjects = projectsData;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Our Projects</h1>

        {/* Category Filter (optional) */}
        {/*
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        */}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={projectImages[project.slug]}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                {/* <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">
                    {project.category}
                  </span>
                </div> */}
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.subtitle}</p>
                <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                  <span>Learn More</span>
                  <ChevronRightIcon className="w-5 h-5 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Want to Get Involved?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community and make a difference. Whether you want to volunteer,
            participate, or support our projects, we welcome your involvement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/enrol" className="btn btn-primary">
              Enroll Now
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 