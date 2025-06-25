import { useParams, Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const projects = {
  'wic-library': {
    title: 'WIC Library',
    description: 'A comprehensive collection of Islamic literature and resources for all ages.',
    longDescription: `The WIC Library is a treasure trove of Islamic knowledge, housing thousands of books, manuscripts, and digital resources. Our collection spans various topics including Quranic studies, Hadith, Islamic history, Arabic language, and contemporary Islamic thought.

The library is open to all community members and provides a quiet space for study and research. We regularly update our collection with new publications and maintain a special section for children's Islamic literature.`,
    image: '/images/library.jpg',
    category: 'Education',
    features: [
      'Extensive collection of Islamic books',
      'Digital resources and e-books',
      'Study spaces and reading rooms',
      'Children\'s section',
      'Regular book clubs and discussions',
    ],
    schedule: {
      days: 'Monday to Friday',
      hours: '10:00 AM - 8:00 PM',
      weekend: 'Saturday: 10:00 AM - 4:00 PM',
    },
  },
  'wic-fc': {
    title: 'WIC FC',
    description: 'Sports and physical activities promoting health and teamwork.',
    longDescription: `WIC FC is our community's sports initiative, promoting physical fitness and team spirit through various sports activities. We organize regular football matches, tournaments, and training sessions for different age groups.

Our facilities include a well-maintained football pitch, changing rooms, and equipment for various sports. We emphasize both physical fitness and Islamic values in our sports programs.`,
    image: '/images/fc.jpg',
    category: 'Sports',
    features: [
      'Regular football matches',
      'Youth training programs',
      'Tournaments and competitions',
      'Professional coaching',
      'Family sports days',
    ],
    schedule: {
      days: 'Tuesday and Thursday',
      hours: '6:00 PM - 8:00 PM',
      weekend: 'Sunday: 10:00 AM - 12:00 PM',
    },
  },
  'quran-circle': {
    title: 'Quran Circle',
    description: 'Learn and memorize the Holy Quran with qualified teachers.',
    longDescription: `The Quran Circle is a dedicated program for learning and memorizing the Holy Quran. Our qualified teachers provide personalized attention to students of all ages and levels.

The program includes tajweed rules, proper pronunciation, and understanding of the Quranic text. We also offer specialized courses for those interested in becoming Quran teachers.`,
    image: '/images/quran.jpg',
    category: 'Education',
    features: [
      'One-on-one Quran recitation',
      'Tajweed classes',
      'Memorization program',
      'Quranic Arabic',
      'Teacher training',
    ],
    schedule: {
      days: 'Monday to Friday',
      hours: '4:00 PM - 7:00 PM',
      weekend: 'Saturday: 10:00 AM - 1:00 PM',
    },
  },
};

export default function SingleProject() {
  const { slug } = useParams();
  const project = projects[slug];

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link to="/projects" className="btn btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="relative container mx-auto h-full flex items-center">
          <div className="max-w-2xl text-white">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/80 text-white text-sm font-medium mb-4">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-xl">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">
                  {project.longDescription}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Schedule</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Weekdays</h3>
                  <p className="text-gray-600">{project.schedule.days}</p>
                  <p className="text-gray-600">{project.schedule.hours}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Weekend</h3>
                  <p className="text-gray-600">{project.schedule.weekend}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Get Involved</h2>
              <p className="text-gray-600 mb-6">
                Interested in participating in this project? Join us today!
              </p>
              <div className="space-y-4">
                <Link to="/enrol" className="btn btn-primary w-full">
                  Enroll Now
                </Link>
                <Link to="/contact" className="btn btn-outline w-full">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 