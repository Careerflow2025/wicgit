import React, { useState, useRef } from 'react';
import { PaperClipIcon, UserIcon, EnvelopeIcon, PhoneIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

const permanentRoles = [
  'Media Manager', 'Event Planner', 'Youth Leader', 'Matrimonial Coordinator', 'Excursions / Offsite Events Manager', 'Jummah Salah Manager', 'Volunteer Manager', 'Parent & Child Programme Manager', 'Young Adults Manager', 'Adults Manager', 'Revert Manager', '60+ Manager'
];
const adhocRoles = [
  'Videographer', 'Event Day Helper', 'Event Babysitter', 'Pre-event Helper', 'Event Speaker or Host', 'Qur\'an & Nasheed Reciters'
];

export default function ContactPage() {
  // General Enquiry form state
  const [enquiry, setEnquiry] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  // Volunteer form state
  const [volunteer, setVolunteer] = useState({ name: '', email: '', phone: '', cv: null, roles: [], message: '' });
  const [permDropdownOpen, setPermDropdownOpen] = useState(false);
  const [adhocDropdownOpen, setAdhocDropdownOpen] = useState(false);
  const permDropdownRef = useRef(null);
  const adhocDropdownRef = useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (permDropdownRef.current && !permDropdownRef.current.contains(event.target)) setPermDropdownOpen(false);
      if (adhocDropdownRef.current && !adhocDropdownRef.current.contains(event.target)) setAdhocDropdownOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full py-16 px-4 text-center bg-gradient-to-br from-primary/10 to-blue-100">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Contact Watford Islamic Centre</h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-2">We're here to help – send us a message or volunteer with us.</p>
      </section>
      {/* Forms Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* General Enquiry Form */}
          <form className="flex-1 bg-white rounded-xl shadow-lg p-8 space-y-6" onSubmit={e => { e.preventDefault(); }}>
            <h2 className="text-2xl font-bold mb-4 text-primary">General Enquiry</h2>
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2"><UserIcon className="w-5 h-5 text-primary" /> Name</label>
              <input type="text" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" value={enquiry.name} onChange={e => setEnquiry({ ...enquiry, name: e.target.value })} />
            </div>
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2"><EnvelopeIcon className="w-5 h-5 text-primary" /> Email</label>
              <input type="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" value={enquiry.email} onChange={e => setEnquiry({ ...enquiry, email: e.target.value })} />
            </div>
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2"><PhoneIcon className="w-5 h-5 text-primary" /> Phone</label>
              <input type="tel" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" value={enquiry.phone} onChange={e => setEnquiry({ ...enquiry, phone: e.target.value })} />
            </div>
            <div>
              <label className="block font-medium mb-1">Subject</label>
              <input type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" value={enquiry.subject} onChange={e => setEnquiry({ ...enquiry, subject: e.target.value })} />
            </div>
            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" value={enquiry.message} onChange={e => setEnquiry({ ...enquiry, message: e.target.value })} />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">Send Enquiry</button>
          </form>
          {/* Volunteer/Role Interest Form */}
          <form className="flex-1 bg-white rounded-xl shadow-lg p-8 space-y-6" onSubmit={e => { e.preventDefault(); }}>
            <h2 className="text-2xl font-bold mb-4 text-primary">Volunteer / Role Interest</h2>
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2"><UserIcon className="w-5 h-5 text-primary" /> Name</label>
              <input type="text" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" value={volunteer.name} onChange={e => setVolunteer({ ...volunteer, name: e.target.value })} />
            </div>
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2"><EnvelopeIcon className="w-5 h-5 text-primary" /> Email</label>
              <input type="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" value={volunteer.email} onChange={e => setVolunteer({ ...volunteer, email: e.target.value })} />
            </div>
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2"><PhoneIcon className="w-5 h-5 text-primary" /> Phone</label>
              <input type="tel" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" value={volunteer.phone} onChange={e => setVolunteer({ ...volunteer, phone: e.target.value })} />
            </div>
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2"><PaperClipIcon className="w-5 h-5 text-primary" /> Upload CV</label>
              <input type="file" accept=".pdf,.doc,.docx" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" onChange={e => setVolunteer({ ...volunteer, cv: e.target.files[0] })} />
            </div>
            {/* Permanent Roles Dropdown */}
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2"><ClipboardDocumentCheckIcon className="w-5 h-5 text-primary" /> Permanent Voluntary Job Roles</label>
              <div ref={permDropdownRef} className="relative">
                <button type="button" onClick={() => setPermDropdownOpen(o => !o)} className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm">
                  <span className="truncate text-gray-700">
                    {volunteer.roles.filter(role => permanentRoles.includes(role)).length > 0
                      ? volunteer.roles.filter(role => permanentRoles.includes(role)).map(role => (
                          <span key={role} className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mr-2 mb-1">{role}</span>
                        ))
                      : 'Select Permanent Roles'}
                  </span>
                  <svg className={`w-5 h-5 ml-2 transition-transform ${permDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {permDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto p-2">
                    {permanentRoles.map((role) => (
                      <label key={role} className="flex items-center space-x-2 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={volunteer.roles.includes(role)}
                          onChange={e => {
                            const checked = e.target.checked;
                            setVolunteer(prev => ({
                              ...prev,
                              roles: checked
                                ? [...prev.roles, role]
                                : prev.roles.filter(r => r !== role)
                            }));
                          }}
                          className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary border-gray-300"
                        />
                        <span className="text-gray-700 font-medium">{role}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Adhoc Roles Dropdown */}
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2"><ClipboardDocumentCheckIcon className="w-5 h-5 text-primary" /> Adhoc Voluntary Job Roles</label>
              <div ref={adhocDropdownRef} className="relative">
                <button type="button" onClick={() => setAdhocDropdownOpen(o => !o)} className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm">
                  <span className="truncate text-gray-700">
                    {volunteer.roles.filter(role => adhocRoles.includes(role)).length > 0
                      ? volunteer.roles.filter(role => adhocRoles.includes(role)).map(role => (
                          <span key={role} className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mr-2 mb-1">{role}</span>
                        ))
                      : 'Select Adhoc Roles'}
                  </span>
                  <svg className={`w-5 h-5 ml-2 transition-transform ${adhocDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {adhocDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto p-2">
                    {adhocRoles.map((role) => (
                      <label key={role} className="flex items-center space-x-2 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={volunteer.roles.includes(role)}
                          onChange={e => {
                            const checked = e.target.checked;
                            setVolunteer(prev => ({
                              ...prev,
                              roles: checked
                                ? [...prev.roles, role]
                                : prev.roles.filter(r => r !== role)
                            }));
                          }}
                          className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary border-gray-300"
                        />
                        <span className="text-gray-700 font-medium">{role}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" value={volunteer.message} onChange={e => setVolunteer({ ...volunteer, message: e.target.value })} />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">Submit Volunteer Form</button>
          </form>
        </div>
      </section>
    </div>
  );
} 