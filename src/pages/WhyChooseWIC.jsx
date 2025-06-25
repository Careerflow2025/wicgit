import { Link } from 'react-router-dom';

export default function WhyChooseWIC() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/mosque.jpg')" }}
        />
        <div className="relative container mx-auto h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Watford Islamic Centre?
            </h1>
            <p className="text-xl">
              Discover what makes WIC the best choice for Islamic education and community.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Reasons List */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">What Sets Us Apart</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Qualified & Caring Teachers</h3>
                    <p className="text-gray-600">Our staff are experienced, certified, and passionate about nurturing every student's growth.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Modern Facilities</h3>
                    <p className="text-gray-600">We offer a safe, welcoming, and well-equipped environment for learning and worship.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Comprehensive Curriculum</h3>
                    <p className="text-gray-600">Our programs blend traditional Islamic knowledge with contemporary skills and values.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Community Spirit</h3>
                    <p className="text-gray-600">We foster a sense of belonging, support, and unity among all members.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Youth & Family Focus</h3>
                    <p className="text-gray-600">Special programs for youth and families to grow together in faith and character.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Interfaith & Outreach</h3>
                    <p className="text-gray-600">We actively promote understanding and positive relations with the wider community.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Ready to Join Us?</h2>
              <p className="text-gray-600 mb-6">
                Experience the difference at Watford Islamic Centre. Whether you're looking to enroll, volunteer, or simply learn more, we welcome you!
              </p>
              <div className="space-y-4">
                <Link to="/enrol" className="btn btn-primary w-full">
                  Enroll Now
                </Link>
                <Link to="/contact" className="btn btn-outline w-full">
                  Contact Us
                </Link>
                <Link to="/projects" className="btn btn-outline w-full">
                  Explore Our Projects
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Testimonials</h2>
              <blockquote className="text-gray-700 italic mb-4">"WIC has been a second home for our family. The teachers truly care and the programs are excellent."</blockquote>
              <p className="text-primary font-semibold mb-2">— Fatima A., Parent</p>
              <blockquote className="text-gray-700 italic mb-4">"I've made lifelong friends and learned so much about my faith."</blockquote>
              <p className="text-primary font-semibold">— Yusuf R., Student</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 