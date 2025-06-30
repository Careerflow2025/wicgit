import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ExternalLink, Mail, Phone, MapPin, Globe, Facebook, Instagram, Linkedin, Eye, Check, X } from 'lucide-react';

const ADMIN_EMAIL = 'info@watfordislamiccentre.com';
const ADMIN_PASSWORD = 'WIC2025';

function getPendingBusinesses() {
  return JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
}
function setPendingBusinesses(businesses) {
  localStorage.setItem('submittedBusinesses', JSON.stringify(businesses));
}
function getApprovedBusinesses() {
  return JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
}
function setApprovedBusinesses(businesses) {
  localStorage.setItem('approvedBusinesses', JSON.stringify(businesses));
}

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      setPending(getPendingBusinesses());
    }
  }, [loggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      toast.success('Logged in as admin');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleAccept = (id) => {
    const business = pending.find(b => b.id === id);
    if (!business) return;
    const approved = getApprovedBusinesses();
    setApprovedBusinesses([...approved, business]);
    const updatedPending = pending.filter(b => b.id !== id);
    setPendingBusinesses(updatedPending);
    setPending(updatedPending);
    toast.success('Business approved and added to directory');
  };

  const handleDeny = (id) => {
    const updatedPending = pending.filter(b => b.id !== id);
    setPendingBusinesses(updatedPending);
    setPending(updatedPending);
    toast('Business denied and deleted', { icon: '❌' });
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded" required />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded" required />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded font-bold">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Review and approve business submissions</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Pending Submissions</p>
            <p className="text-2xl font-bold text-primary">{pending.length}</p>
          </div>
        </div>

        {pending.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <div className="text-gray-400 mb-4">
              <Check className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">No pending business submissions to review.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pending.map(business => (
              <div key={business.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header with Logo and Basic Info */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      {business.logo ? (
                        <img 
                          src={business.logo} 
                          alt={`${business.name} logo`}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🏢</span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{business.name}</h3>
                        <p className="text-sm text-gray-500">{business.category}</p>
                        <p className="text-xs text-gray-400">Submitted: {new Date(business.addedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleAccept(business.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-1"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button 
                        onClick={() => handleDeny(business.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Deny</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="p-6 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Contact Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${business.email}`} className="text-blue-600 hover:underline">{business.email}</a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">{business.phone}</a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{business.address}</span>
                    </div>
                    {business.website && (
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <a 
                          href={business.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center space-x-1"
                        >
                          <span>Visit Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Media Links */}
                {(business.socialMedia?.facebook || business.socialMedia?.instagram || business.socialMedia?.linkedin) && (
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Social Media</h4>
                    <div className="flex space-x-4">
                      {business.socialMedia?.facebook && (
                        <a 
                          href={business.socialMedia.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-600 hover:underline"
                        >
                          <Facebook className="w-4 h-4" />
                          <span className="text-sm">Facebook</span>
                        </a>
                      )}
                      {business.socialMedia?.instagram && (
                        <a 
                          href={business.socialMedia.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-pink-600 hover:underline"
                        >
                          <Instagram className="w-4 h-4" />
                          <span className="text-sm">Instagram</span>
                        </a>
                      )}
                      {business.socialMedia?.linkedin && (
                        <a 
                          href={business.socialMedia.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-700 hover:underline"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span className="text-sm">LinkedIn</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Business Description */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Business Description</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {business.description ? (
                      <p className="text-gray-700 whitespace-pre-line">{business.description}</p>
                    ) : (
                      <p className="text-gray-500 italic">No description provided</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 