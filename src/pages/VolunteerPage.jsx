import React, { useState, useRef } from 'react';

const permanentRoles = [
  {
    title: 'Media Manager',
    location: 'Remote/In-Person',
    description: 'Manage social media, content creation, and digital presence'
  },
  {
    title: 'Event Planner',
    description: 'Coordinate and organize community events and activities'
  },
  {
    title: 'Youth Leader',
    description: 'Lead and mentor youth aged 11-18 in Islamic activities'
  },
  {
    title: 'Matrimonial Coordinator',
    description: 'Facilitate and manage matrimonial services and events'
  },
  {
    title: 'Excursions / Offsite Events Manager',
    description: 'Plan and execute offsite activities and educational trips'
  },
  {
    title: 'Jummah Salah Manager',
    description: 'Coordinate and manage Friday prayer services',
    gender: 'Male'
  },
  {
    title: 'Volunteer Manager',
    description: 'Recruit, train, and coordinate volunteer activities'
  },
  {
    title: 'Parent & Child Programme Manager',
    description: 'Develop and manage programs for parents and children'
  },
  {
    title: 'Young Adults Manager',
    description: 'Lead programs for ages 18-25',
    ageGroup: '18-25'
  },
  {
    title: 'Adults Manager',
    description: 'Coordinate activities for ages 26-59',
    ageGroup: '26-59'
  },
  {
    title: 'Revert Manager',
    description: 'Support and guide new Muslims in their journey'
  },
  {
    title: '60+ Manager',
    description: 'Organize activities and support for senior community members',
    ageGroup: '60+'
  }
];

const adhocRoles = [
  {
    title: 'Videographer',
    description: 'Capture and edit video content for events and programs'
  },
  {
    title: 'Event Day Helper',
    description: 'Assist with event setup, management, and cleanup'
  },
  {
    title: 'Event Babysitter',
    description: 'Provide childcare during events and programs'
  },
  {
    title: 'Pre-event Helper',
    description: 'Assist with event preparation and setup'
  },
  {
    title: 'Event Speaker or Host',
    description: 'Lead sessions or host community events'
  },
  {
    title: 'Qur\'an & Nasheed Reciters',
    description: 'Lead recitations during events and programs'
  }
];

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roles: [],
    message: ''
  });
  const [permDropdownOpen, setPermDropdownOpen] = useState(false);
  const [adhocDropdownOpen, setAdhocDropdownOpen] = useState(false);
  const permDropdownRef = useRef(null);
  const adhocDropdownRef = useRef(null);

  // Handle click outside to close dropdowns
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (permDropdownRef.current && !permDropdownRef.current.contains(event.target)) {
        setPermDropdownOpen(false);
      }
      if (adhocDropdownRef.current && !adhocDropdownRef.current.contains(event.target)) {
        setAdhocDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Be the Change YOU want to see in The Ummah
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Register Your CV / Volunteer Now! Permanent, Managerial, Ad-hoc
          </p>
          <a
            href="#application-form"
            className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Register Your CV
          </a>
        </div>
      </section>

      {/* Permanent Roles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Permanent Voluntary Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {permanentRoles.map((role, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col h-full items-center text-center">
                <div className="flex justify-center mb-4 w-full">
                  <img src="/images/LOGO.png" alt="WIC Logo" className="h-16 w-auto mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-2 w-full">{role.title}</h3>
                {role.location && (
                  <p className="text-gray-600 mb-2 w-full">({role.location})</p>
                )}
                <p className="text-gray-700 mb-4 flex-grow w-full">{role.description}</p>
                <button
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors mt-auto mx-auto"
                  style={{ maxWidth: '200px' }}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad-hoc Roles Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ad-hoc Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adhocRoles.map((role, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col h-full items-center text-center">
                <div className="flex justify-center mb-4 w-full">
                  <img src="/images/LOGO.png" alt="WIC Logo" className="h-16 w-auto mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-2 w-full">{role.title}</h3>
                <p className="text-gray-700 mb-4 flex-grow w-full">{role.description}</p>
                <button
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors mt-auto mx-auto"
                  style={{ maxWidth: '200px' }}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Voluntary Job Application</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Permanent Roles Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Permanent Voluntary Job Roles</label>
                <div ref={permDropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setPermDropdownOpen((open) => !open)}
                    className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm"
                  >
                    <span className="truncate text-gray-700">
                      {formData.roles.filter(role => permanentRoles.some(r => r.title === role)).length > 0
                        ? formData.roles.filter(role => permanentRoles.some(r => r.title === role)).map(role => (
                            <span key={role} className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mr-2 mb-1">{role}</span>
                          ))
                        : 'Select Permanent Roles'}
                    </span>
                    <svg className={`w-5 h-5 ml-2 transition-transform ${permDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {permDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto p-2">
                      {permanentRoles.map((role) => (
                        <label key={role.title} className="flex items-center space-x-2 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.roles.includes(role.title)}
                            onChange={e => {
                              const checked = e.target.checked;
                              setFormData(prev => ({
                                ...prev,
                                roles: checked
                                  ? [...prev.roles, role.title]
                                  : prev.roles.filter(r => r !== role.title)
                              }));
                            }}
                            className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary border-gray-300"
                          />
                          <span className="text-gray-700 font-medium">{role.title}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Adhoc Roles Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Adhoc Voluntary Job Roles</label>
                <div ref={adhocDropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setAdhocDropdownOpen((open) => !open)}
                    className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm"
                  >
                    <span className="truncate text-gray-700">
                      {formData.roles.filter(role => adhocRoles.some(r => r.title === role)).length > 0
                        ? formData.roles.filter(role => adhocRoles.some(r => r.title === role)).map(role => (
                            <span key={role} className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mr-2 mb-1">{role}</span>
                          ))
                        : 'Select Adhoc Roles'}
                    </span>
                    <svg className={`w-5 h-5 ml-2 transition-transform ${adhocDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {adhocDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto p-2">
                      {adhocRoles.map((role) => (
                        <label key={role.title} className="flex items-center space-x-2 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.roles.includes(role.title)}
                            onChange={e => {
                              const checked = e.target.checked;
                              setFormData(prev => ({
                                ...prev,
                                roles: checked
                                  ? [...prev.roles, role.title]
                                  : prev.roles.filter(r => r !== role.title)
                              }));
                            }}
                            className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary border-gray-300"
                          />
                          <span className="text-gray-700 font-medium">{role.title}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
} 