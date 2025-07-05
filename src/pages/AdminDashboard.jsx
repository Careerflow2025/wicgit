import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ExternalLink, Mail, Phone, MapPin, Globe, Facebook, Instagram, Linkedin, Eye, Check, X, Building2 } from 'lucide-react';

const ADMIN_EMAIL = 'info@watfordislamiccentre.com';
const ADMIN_PASSWORD = 'WIC2025';

function getPendingBusinesses() {
  try {
    return JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
  } catch (e) {
    console.error('Error reading submittedBusinesses:', e);
    return [];
  }
}

function setPendingBusinesses(businesses) {
  try {
    // Clean up the data before saving to reduce size
    const cleanedBusinesses = businesses.map(business => ({
      id: business.id,
      name: business.name,
      category: business.category,
      subcategory: business.subcategory,
      email: business.email,
      phone: business.phone,
      address: business.address,
      website: business.website,
      description: business.description,
      addedDate: business.addedDate,
      logo: business.logo,
      socialMedia: business.socialMedia,
      ownerInfo: business.ownerInfo
    }));
    
    localStorage.setItem('submittedBusinesses', JSON.stringify(cleanedBusinesses));
  } catch (e) {
    console.error('Error saving submittedBusinesses:', e);
    if (e.name === 'QuotaExceededError') {
      // Clear some old data and try again
      localStorage.removeItem('debug_data');
      localStorage.removeItem('temp_data');
      try {
        localStorage.setItem('submittedBusinesses', JSON.stringify(businesses.slice(0, 50))); // Limit to 50 businesses
        console.warn('Saved only first 50 businesses due to storage limit');
      } catch (e2) {
        console.error('Still failed after cleanup:', e2);
      }
    }
  }
}

function getApprovedBusinesses() {
  try {
    return JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
  } catch (e) {
    console.error('Error reading approvedBusinesses:', e);
    return [];
  }
}

function setApprovedBusinesses(businesses) {
  try {
    // Clean up the data before saving to reduce size
    const cleanedBusinesses = businesses.map(business => ({
      id: business.id,
      name: business.name,
      category: business.category,
      subcategory: business.subcategory,
      email: business.email,
      phone: business.phone,
      address: business.address,
      website: business.website,
      description: business.description,
      addedDate: business.addedDate,
      logo: business.logo,
      socialMedia: business.socialMedia
    }));
    
    localStorage.setItem('approvedBusinesses', JSON.stringify(cleanedBusinesses));
  } catch (e) {
    console.error('Error saving approvedBusinesses:', e);
    if (e.name === 'QuotaExceededError') {
      // Try to free up space
      const currentApproved = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
      localStorage.removeItem('debug_data');
      localStorage.removeItem('temp_data');
      
      try {
        // Keep only the most recent 100 approved businesses
        const recentApproved = currentApproved.slice(-100);
        const newBusinesses = businesses.filter(b => !currentApproved.find(existing => existing.id === b.id));
        const finalList = [...recentApproved, ...newBusinesses].slice(-100);
        
        localStorage.setItem('approvedBusinesses', JSON.stringify(finalList));
        console.warn('Storage limit reached. Kept only recent 100 businesses.');
      } catch (e2) {
        console.error('Still failed after aggressive cleanup:', e2);
        alert('Storage is full. Please contact administrator to clear old data.');
      }
    }
  }
}

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pendingBusinesses, setPendingBusinesses] = useState([]);

  // Auto-fix duplicates when component loads
  useEffect(() => {
    const fixDuplicateBusinesses = () => {
      try {
        console.log('🔧 Auto-fixing business duplicates...');
        
        const approvedBusinesses = getApprovedBusinesses();
        
        if (approvedBusinesses.length === 0) {
          console.log('ℹ️ No businesses to fix');
          return;
        }

        // Remove duplicates by name combination
        const uniqueBusinesses = [];
        const seenBusinessKeys = new Set();

        approvedBusinesses.forEach((business, index) => {
          const key = `${business.name.toLowerCase()}-${business.id || index}`;
          
          if (!seenBusinessKeys.has(key)) {
            seenBusinessKeys.add(key);
            
            // Ensure unique ID
            if (!business.id) {
              business.id = `business-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
            }
            
            uniqueBusinesses.push(business);
          } else {
            console.log('🗑️ Removing duplicate business:', business.name);
          }
        });

        // Save cleaned data if duplicates were found
        if (uniqueBusinesses.length < approvedBusinesses.length) {
          console.log(`✅ Removed ${approvedBusinesses.length - uniqueBusinesses.length} duplicate businesses`);
          setApprovedBusinesses(uniqueBusinesses);
        }
        
      } catch (error) {
        console.error('Error fixing duplicates:', error);
      }
    };

    if (loggedIn) {
      fixDuplicateBusinesses();
    }
  }, [loggedIn]);

  // Load pending data when logged in
  useEffect(() => {
    if (loggedIn) {
      loadPendingData();
    }
  }, [loggedIn]);

  const loadPendingData = () => {
    try {
      const businesses = getPendingBusinesses();
      console.log('📋 Loaded pending businesses:', businesses.length);
      setPendingBusinesses(businesses);
    } catch (error) {
      console.error('Error loading pending data:', error);
      toast.error('Error loading pending data');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      toast.success('Welcome to the admin dashboard!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleApproveBusiness = (businessId) => {
    try {
      console.log('✅ Approving business:', businessId);
      
      const currentPending = getPendingBusinesses();
      const currentApproved = getApprovedBusinesses();
      
      // Find the business to approve
      const businessToApprove = currentPending.find(b => b.id === businessId);
      if (!businessToApprove) {
        toast.error('Business not found');
        return;
      }

      // Remove from pending
      const updatedPending = currentPending.filter(b => b.id !== businessId);
      
      // Add to approved (clean the data)
      const approvedBusiness = {
        id: businessToApprove.id,
        name: businessToApprove.name,
        category: businessToApprove.category,
        subcategory: businessToApprove.subcategory,
        email: businessToApprove.email,
        phone: businessToApprove.phone,
        address: businessToApprove.address,
        website: businessToApprove.website,
        description: businessToApprove.description,
        addedDate: businessToApprove.addedDate,
        logo: businessToApprove.logo,
        socialMedia: businessToApprove.socialMedia
      };
      
      const updatedApproved = [...currentApproved, approvedBusiness];
      
      // Save updates
      setPendingBusinesses(updatedPending);
      setApprovedBusinesses(updatedApproved);
      
      // Update state
      setPendingBusinesses(updatedPending);
      
      toast.success(`✅ Business "${businessToApprove.name}" approved and added to directory!`);
      
    } catch (error) {
      console.error('Error approving business:', error);
      toast.error('Failed to approve business');
    }
  };

  const handleDenyBusiness = (businessId) => {
    try {
      console.log('❌ Denying business:', businessId);
      
      const currentPending = getPendingBusinesses();
      
      // Find the business to deny
      const businessToDeny = currentPending.find(b => b.id === businessId);
      if (!businessToDeny) {
        toast.error('Business not found');
        return;
      }

      // Remove from pending (delete it)
      const updatedPending = currentPending.filter(b => b.id !== businessId);
      
      // Save updates
      setPendingBusinesses(updatedPending);
      
      // Update state
      setPendingBusinesses(updatedPending);
      
      toast.success(`❌ Business "${businessToDeny.name}" denied and removed.`);
      
    } catch (error) {
      console.error('Error denying business:', error);
      toast.error('Failed to deny business');
    }
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

  const totalPending = pendingBusinesses.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Review and approve business submissions</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-gray-500">Pending Submissions</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">{totalPending}</p>
          </div>
        </div>

        {totalPending === 0 ? (
          <div className="bg-white p-8 sm:p-12 rounded-lg shadow text-center">
            <div className="text-gray-400 mb-4">
              <Check className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600 text-sm sm:text-base">No pending business submissions to review.</p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            
            {/* INDIVIDUAL BUSINESSES SECTION */}
            {pendingBusinesses.length > 0 && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3" />
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Individual Business Submissions</h2>
                  </div>
                  <span className="ml-0 sm:ml-3 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit">
                    {pendingBusinesses.length} pending
                  </span>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                  {pendingBusinesses.map(business => (
                    <div key={business.id} className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-blue-500">
                      {/* Header */}
                      <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            {business.logo ? (
                              <img 
                                src={business.logo} 
                                alt={`${business.name} logo`}
                                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border flex-shrink-0"
                              />
                            ) : (
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-lg sm:text-2xl">🏢</span>
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{business.name}</h3>
                              <p className="text-sm text-gray-500">{business.category}</p>
                              <p className="text-xs text-gray-400">Submitted: {new Date(business.addedDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('🟢 BUTTON CLICKED - Approve Business:', business.id);
                                handleApproveBusiness(business.id);
                              }}
                              className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-1 text-sm sm:text-base"
                            >
                              <Check className="w-4 h-4" />
                              <span>Approve</span>
                            </button>
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('🔴 BUTTON CLICKED - Deny Business:', business.id);
                                handleDenyBusiness(business.id);
                              }}
                              className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-1 text-sm sm:text-base"
                            >
                              <X className="w-4 h-4" />
                              <span>Deny</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="p-4 sm:p-6">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <a href={`mailto:${business.email}`} className="text-blue-600 hover:underline text-sm sm:text-base break-all">{business.email}</a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline text-sm sm:text-base">{business.phone}</a>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm sm:text-base">{business.address}</span>
                          </div>
                          {business.website && (
                            <div className="flex items-center space-x-2">
                              <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <a 
                                href={business.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm sm:text-base break-all"
                              >
                                Visit Website
                              </a>
                            </div>
                          )}
                        </div>
                        
                        {business.description && (
                          <div className="mt-4">
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Description</h4>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-gray-700 text-sm">{business.description}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
