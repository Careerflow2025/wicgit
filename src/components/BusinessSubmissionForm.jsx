import React, { useState, useRef, useEffect } from 'react';
import { businessCategories, categorySubcategories } from '../data/businesses';
import toast from 'react-hot-toast';
import { ChevronDown, X, Plus, Minus, Users, User, AlertCircle } from 'lucide-react';

export default function BusinessSubmissionForm({ isOpen = true, onClose = () => {} }) {
  const [submissionType, setSubmissionType] = useState('single'); // 'single' or 'group'
  
  // Error states for form validation
  const [errors, setErrors] = useState({});
  const [businessErrors, setBusinessErrors] = useState({});
  
  // Single business form data
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    email: '',
    phone: '',
    category: '',
    subcategory: '',
    description: '',
    address: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      linkedin: ''
    }
  });

  // Multiple businesses for groups
  const [businesses, setBusinesses] = useState([{
    id: 1,
    name: '',
    website: '',
    phone: '',
    email: '',
    category: '',
    subcategory: '',
    description: '',
    address: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      linkedin: ''
    },
    logo: null,
    logoPreview: null
  }]);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [activeBusinessDropdown, setActiveBusinessDropdown] = useState(null);
  const [showSubcategoryDropdown, setShowSubcategoryDropdown] = useState(false);
  const [activeBusinessSubcategoryDropdown, setActiveBusinessSubcategoryDropdown] = useState(null);
  
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownContainerRef = useRef(null);
  const subcategoryDropdownRef = useRef(null);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    return phone.length >= 5;
  };

  const validateWebsite = (website) => {
    return website.includes('.');
  };

  const clearFieldError = (fieldName, errorType = 'main') => {
    if (errorType === 'main') {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    } else if (errorType === 'business') {
      setBusinessErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Validate single business form - minimal validation
  const validateSingleBusiness = () => {
    const newErrors = {};

    // Only require business name
    if (!formData.name.trim()) {
      newErrors.name = 'Business name is required';
    }

    // Optional validation for other fields if they are provided
    if (formData.website && !validateWebsite(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate business group - minimal validation
  const validateBusinessGroup = () => {
    const newErrors = {};

    businesses.forEach((business, index) => {
      const businessKey = `business-${business.id}`;
      
      // Only require business name
      if (!business.name.trim()) {
        newErrors[`${businessKey}-name`] = 'Business name is required';
      }

      // Optional validation for other fields if they are provided
      if (business.website && !validateWebsite(business.website)) {
        newErrors[`${businessKey}-website`] = 'Please enter a valid website URL';
      }

      if (business.phone && !validatePhone(business.phone)) {
        newErrors[`${businessKey}-phone`] = 'Please enter a valid phone number';
      }

      if (business.email && !validateEmail(business.email)) {
        newErrors[`${businessKey}-email`] = 'Please enter a valid email address';
      }
    });

    setBusinessErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle category dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
        setActiveBusinessDropdown(null);
      }
      
      // Handle subcategory dropdown
      if (subcategoryDropdownRef.current && !subcategoryDropdownRef.current.contains(event.target)) {
        setShowSubcategoryDropdown(false);
        setActiveBusinessSubcategoryDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Keyboard navigation for category dropdown
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!showCategoryDropdown) return;
      
      const key = event.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        event.preventDefault();
        
        // Find the first category starting with this letter
        const targetIndex = businessCategories.findIndex(category => 
          category.toUpperCase().startsWith(key)
        );
        
        if (targetIndex !== -1 && dropdownContainerRef.current) {
          // Calculate scroll position
          const itemHeight = 40; // Approximate height of each option
          const scrollTop = targetIndex * itemHeight;
          
          // Smooth scroll to the target category
          dropdownContainerRef.current.scrollTo({
            top: Math.max(0, scrollTop - 100), // Offset by 100px to show some context above
            behavior: 'smooth'
          });
        }
      }
    };

    if (showCategoryDropdown) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showCategoryDropdown]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    clearFieldError(name, 'main');
    
    if (name.includes('socialMedia.')) {
      const socialPlatform = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialPlatform]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCategorySelect = (category) => {
    setFormData(prev => ({
      ...prev,
      category: category,
      subcategory: '' // Reset subcategory when category changes
    }));
    setShowCategoryDropdown(false);
    clearFieldError('category', 'main');
  };

  const handleSubcategorySelect = (subcategory) => {
    setFormData(prev => ({
      ...prev,
      subcategory: subcategory
    }));
    setShowSubcategoryDropdown(false);
    clearFieldError('subcategory', 'main');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          toast.error('Please select an image smaller than 5MB');
          e.target.value = '';
          return;
        }
        setLogoFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setLogoPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        toast.error('Please select an image file (JPG, PNG, etc.)');
        e.target.value = '';
      }
    }
  };

  // Business group handlers
  const handleBusinessInputChange = (businessId, field, value) => {
    clearFieldError(`business-${businessId}-${field}`, 'business');
    setBusinesses(prev => prev.map(business => 
      business.id === businessId 
        ? { ...business, [field]: value }
        : business
    ));
  };

  const handleBusinessSocialMediaChange = (businessId, platform, value) => {
    setBusinesses(prev => prev.map(business => 
      business.id === businessId 
        ? { 
            ...business, 
            socialMedia: { 
              ...business.socialMedia, 
              [platform]: value 
            }
          }
        : business
    ));
  };

  const handleBusinessCategorySelect = (businessId, category) => {
    setBusinesses(prev => prev.map(business => 
      business.id === businessId 
        ? { ...business, category, subcategory: '' } // Reset subcategory when category changes
        : business
    ));
    setActiveBusinessDropdown(null);
    clearFieldError(`business-${businessId}-category`, 'business');
  };

  const handleBusinessSubcategorySelect = (businessId, subcategory) => {
    handleBusinessInputChange(businessId, 'subcategory', subcategory);
    setActiveBusinessSubcategoryDropdown(null);
    clearFieldError(`business-${businessId}-subcategory`, 'business');
  };

  const handleBusinessLogoChange = (businessId, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          toast.error('Please select an image smaller than 5MB');
          e.target.value = '';
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          setBusinesses(prev => prev.map(business => 
            business.id === businessId 
              ? { ...business, logo: file, logoPreview: e.target.result }
              : business
          ));
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please select an image file (JPG, PNG, etc.)');
        e.target.value = '';
      }
    }
  };

  const addBusiness = () => {
    const newId = Math.max(...businesses.map(b => b.id)) + 1;
    setBusinesses(prev => [...prev, {
      id: newId,
      name: '',
      website: '',
      phone: '',
      email: '',
      category: '',
      subcategory: '',
      description: '',
      address: '',
      socialMedia: {
        instagram: '',
        facebook: '',
        linkedin: ''
      },
      logo: null,
      logoPreview: null
    }]);
  };

  const removeBusiness = (businessId) => {
    setBusinesses(prev => prev.filter(business => business.id !== businessId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('🔍 Form submission started');
    console.log('📝 Submission type:', submissionType);
    console.log('📊 Form data:', formData);
    console.log('🏢 Businesses:', businesses);
    
    try {
      // Simplified validation - only check for business name
      let isValid = true;
      
      if (submissionType === 'single') {
        if (!formData.name || !formData.name.trim()) {
          toast.error('Please enter a business name');
          setIsSubmitting(false);
        return;
      }
      } else {
        // Check if at least one business has a name
        const hasValidBusiness = businesses.some(business => business.name && business.name.trim());
        if (!hasValidBusiness) {
          toast.error('Please enter at least one business name');
          setIsSubmitting(false);
        return;
      }
      }

      console.log('✅ Validation passed');

      if (submissionType === 'single') {
        // Submit single business
        const businessData = {
        ...formData,
          id: Date.now() + Math.random(),
          submittedAt: new Date().toISOString(),
          status: 'pending',
        logo: logoPreview || null,
          logoPreview: logoPreview || null
        };

        console.log('💾 Saving single business:', businessData);

        try {
          const existingBusinesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
          existingBusinesses.push(businessData);
          localStorage.setItem('submittedBusinesses', JSON.stringify(existingBusinesses));
          console.log('✅ Single business saved successfully');
        } catch (storageError) {
          console.error('❌ Storage error:', storageError);
          if (storageError.name === 'QuotaExceededError') {
            // Clear old data and try again
            const existingBusinesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
            const recentBusinesses = existingBusinesses.slice(-2); // Keep only 2 most recent
            localStorage.setItem('submittedBusinesses', JSON.stringify(recentBusinesses));
            recentBusinesses.push(businessData);
            localStorage.setItem('submittedBusinesses', JSON.stringify(recentBusinesses));
            console.log('✅ Storage cleaned and business saved');
          } else {
            throw storageError;
          }
        }

        toast.success('Business submitted successfully! It will be reviewed by our admin team.');

      // Reset form
        setFormData({
          name: '',
          category: '',
          subcategory: '',
          description: '',
          website: '',
          phone: '',
          email: '',
          address: '',
          facebook: '',
          instagram: '',
          twitter: '',
          linkedin: '',
          youtube: '',
          tiktok: ''
        });
        setLogoFile(null);
        setLogoPreview(null);
        
        // Close modal after a short delay to let user see the success message
        setTimeout(() => {
          onClose();
        }, 1500);
        
      } else {
        // Submit business group - save each business individually
        const validBusinesses = businesses.filter(business => business.name && business.name.trim());
        
        console.log('💾 Saving business group:', validBusinesses.length, 'businesses');

        try {
          const existingBusinesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
          
          validBusinesses.forEach(business => {
            const businessData = {
              ...business,
              id: Date.now() + Math.random() + Math.random(), // Ensure unique ID
              submittedAt: new Date().toISOString(),
              status: 'pending',
              logo: business.logoPreview || null,
              logoPreview: business.logoPreview || null
            };
            existingBusinesses.push(businessData);
          });
          
          localStorage.setItem('submittedBusinesses', JSON.stringify(existingBusinesses));
          console.log('✅ Business group saved successfully');
        } catch (storageError) {
          console.error('❌ Storage error:', storageError);
          if (storageError.name === 'QuotaExceededError') {
            // Clear old data and try again
            const existingBusinesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
            const recentBusinesses = existingBusinesses.slice(-2); // Keep only 2 most recent
            
            validBusinesses.forEach(business => {
              const businessData = {
                ...business,
                id: Date.now() + Math.random() + Math.random(),
                submittedAt: new Date().toISOString(),
                status: 'pending',
                logo: business.logoPreview || null,
                logoPreview: business.logoPreview || null
              };
              recentBusinesses.push(businessData);
            });
            
            localStorage.setItem('submittedBusinesses', JSON.stringify(recentBusinesses));
            console.log('✅ Storage cleaned and business group saved');
          } else {
            throw storageError;
          }
        }

        toast.success(`${validBusinesses.length} businesses submitted successfully! They will be reviewed by our admin team.`);
        
        // Reset businesses array
        setBusinesses([createNewBusiness()]);
        
        // Close modal after a short delay to let user see the success message
        setTimeout(() => {
          onClose();
        }, 1500);
      }

      console.log('🎉 Form submission completed successfully');
      
    } catch (error) {
      console.error('❌ Form submission error:', error);
      toast.error('Failed to submit business. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForms = () => {
      setFormData({
        name: '',
        website: '',
        email: '',
        phone: '',
        category: '',
      subcategory: '',
        description: '',
        address: '',
        socialMedia: {
          instagram: '',
          facebook: '',
          linkedin: ''
        }
      });
    setBusinesses([{
      id: 1,
      name: '',
      website: '',
      phone: '',
      email: '',
      category: '',
      subcategory: '',
      description: '',
      address: '',
      socialMedia: {
        instagram: '',
        facebook: '',
        linkedin: ''
      },
      logo: null,
      logoPreview: null
    }]);
      setLogoFile(null);
      setLogoPreview(null);
    setErrors({});
    setBusinessErrors({});
    setShowCategoryDropdown(false);
    setShowSubcategoryDropdown(false);
    setActiveBusinessDropdown(null);
    setActiveBusinessSubcategoryDropdown(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
  };

  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return (
      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
        <AlertCircle className="w-4 h-4" />
        {error}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Register Your Business</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Submission Type Toggle */}
          <div className="mb-6">
            <div className="flex space-x-4 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setSubmissionType('single')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                  submissionType === 'single'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <User className="w-4 h-4" />
                Single Business
              </button>
              <button
                type="button"
                onClick={() => setSubmissionType('group')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                  submissionType === 'group'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="w-4 h-4" />
                Multiple Businesses
              </button>
            </div>
          </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
            {submissionType === 'single' ? (
              /* Single Business Form */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Name */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
                    className={`input-style ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
              required
            />
                  <ErrorMessage error={errors.name} />
          </div>

          {/* Category */}
                <div className="relative" ref={dropdownRef}>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Category (Optional)
            </label>
                  <button
                    type="button"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className={`w-full px-4 py-2 text-left border rounded-lg bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200 flex justify-between items-center ${
                      errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                    }`}
                  >
                    <span className={formData.category ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.category || 'Select a category'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {showCategoryDropdown && (
                    <div 
                      ref={dropdownContainerRef}
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-y-auto" 
                      style={{ maxHeight: '600px' }}
            >
                      <div className="p-2 text-xs text-gray-500 bg-gray-50 border-b border-gray-200">
                        💡 Tip: Press any letter (A-Z) to jump to categories starting with that letter
                      </div>
              {businessCategories.map(category => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => handleCategorySelect(category)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          {category}
                        </button>
              ))}
                    </div>
                  )}
                  <ErrorMessage error={errors.category} />
          </div>

                {/* Subcategory - Only show if category has subcategories */}
                {formData.category && categorySubcategories[formData.category] && (
                  <div className="relative" ref={subcategoryDropdownRef}>
                    <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                      Specialism (Optional)
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowSubcategoryDropdown(!showSubcategoryDropdown)}
                      className={`w-full px-4 py-2 text-left border rounded-lg bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200 flex justify-between items-center ${
                        errors.subcategory ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                      }`}
                    >
                      <span className={formData.subcategory ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.subcategory || 'Select a specialism'}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>

                    {showSubcategoryDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-y-auto max-h-60">
                        {categorySubcategories[formData.category].map(subcategory => (
                          <button
                            key={subcategory}
                            type="button"
                            onClick={() => handleSubcategorySelect(subcategory)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          >
                            {subcategory}
                          </button>
                        ))}
                      </div>
                    )}
                    <ErrorMessage error={errors.subcategory} />
                  </div>
                )}

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL (Optional)
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
                    className={`input-style ${errors.website ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder="https://example.com"
            />
                  <ErrorMessage error={errors.website} />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address (Optional)
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
                    className={`input-style ${errors.address ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            />
                  <ErrorMessage error={errors.address} />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
                    className={`input-style ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            />
                  <ErrorMessage error={errors.phone} />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
                    className={`input-style ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            />
                  <ErrorMessage error={errors.email} />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="input-style"
              placeholder="Brief description of your business and services..."
            />
          </div>

          {/* Logo Upload */}
          <div className="md:col-span-2">
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Logo/Image (Optional)
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="input-style"
            />
            {logoPreview && (
              <div className="mt-2">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-20 h-20 object-cover rounded border"
                />
              </div>
            )}
          </div>

          {/* Social Media Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Social Media Links (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook URL
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="socialMedia.facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleInputChange}
                  className="input-style"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="socialMedia.instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleInputChange}
                  className="input-style"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="socialMedia.linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={handleInputChange}
                  className="input-style"
                  placeholder="https://linkedin.com/..."
                />
              </div>
            </div>
          </div>
        </div>
            ) : (
              /* Business Group Form */
              <div className="space-y-8">
                {/* Businesses Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Your Businesses ({businesses.length})
                    </h3>
                    <button
                      type="button"
                      onClick={addBusiness}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Plus className="w-4 h-4" />
                      Add Another Business
                    </button>
                  </div>

                  {businesses.map((business, index) => (
                    <div key={business.id} className="bg-gray-50 p-6 rounded-lg mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          Business #{index + 1}
                        </h4>
                        {businesses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBusiness(business.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Business Name */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Name *
                          </label>
                          <input
                            type="text"
                            value={business.name}
                            onChange={(e) => handleBusinessInputChange(business.id, 'name', e.target.value)}
                            className={`input-style ${businessErrors['business-' + business.id + '-name'] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="Business name"
                          />
                          <ErrorMessage error={businessErrors['business-' + business.id + '-name']} />
                        </div>

                        {/* Category */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Category (Optional)
                          </label>
                          <button
                            type="button"
                            onClick={() => setActiveBusinessDropdown(
                              activeBusinessDropdown === business.id ? null : business.id
                            )}
                            className={`w-full px-4 py-2 text-left border rounded-lg bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200 flex justify-between items-center ${
                              businessErrors['business-' + business.id + '-category'] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                            }`}
                          >
                            <span className={business.category ? 'text-gray-900' : 'text-gray-500'}>
                              {business.category || 'Select a category'}
                            </span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </button>

                          {activeBusinessDropdown === business.id && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-y-auto max-h-60">
                              {businessCategories.map(category => (
                                <button
                                  key={category}
                                  type="button"
                                  onClick={() => handleBusinessCategorySelect(business.id, category)}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                >
                                  {category}
                                </button>
                              ))}
                            </div>
                          )}
                          <ErrorMessage error={businessErrors['business-' + business.id + '-category']} />
                        </div>

                        {/* Subcategory - Only show if category has subcategories */}
                        {business.category && categorySubcategories[business.category] && (
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Specialism (Optional)
                            </label>
                            <button
                              type="button"
                              onClick={() => setActiveBusinessSubcategoryDropdown(
                                activeBusinessSubcategoryDropdown === business.id ? null : business.id
                              )}
                              className={`w-full px-4 py-2 text-left border rounded-lg bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200 flex justify-between items-center ${
                                businessErrors['business-' + business.id + '-subcategory'] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                              }`}
                            >
                              <span className={business.subcategory ? 'text-gray-900' : 'text-gray-500'}>
                                {business.subcategory || 'Select a specialism'}
                              </span>
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>

                            {activeBusinessSubcategoryDropdown === business.id && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-y-auto max-h-60">
                                {categorySubcategories[business.category].map(subcategory => (
                                  <button
                                    key={subcategory}
                                    type="button"
                                    onClick={() => handleBusinessSubcategorySelect(business.id, subcategory)}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                  >
                                    {subcategory}
                                  </button>
                                ))}
                              </div>
                            )}
                            <ErrorMessage error={businessErrors['business-' + business.id + '-subcategory']} />
                          </div>
                        )}

                        {/* Website */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Website URL (Optional)
                          </label>
                          <input
                            type="url"
                            value={business.website}
                            onChange={(e) => handleBusinessInputChange(business.id, 'website', e.target.value)}
                            className={`input-style ${businessErrors['business-' + business.id + '-website'] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="https://example.com"
                          />
                          <ErrorMessage error={businessErrors['business-' + business.id + '-website']} />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number (Optional)
                          </label>
                          <input
                            type="tel"
                            value={business.phone}
                            onChange={(e) => handleBusinessInputChange(business.id, 'phone', e.target.value)}
                            className={`input-style ${businessErrors['business-' + business.id + '-phone'] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="Phone number"
                          />
                          <ErrorMessage error={businessErrors['business-' + business.id + '-phone']} />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address (Optional)
                          </label>
                          <input
                            type="email"
                            value={business.email}
                            onChange={(e) => handleBusinessInputChange(business.id, 'email', e.target.value)}
                            className={`input-style ${businessErrors['business-' + business.id + '-email'] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="Email address"
                          />
                          <ErrorMessage error={businessErrors['business-' + business.id + '-email']} />
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Address (Optional)
                          </label>
                          <input
                            type="text"
                            value={business.address}
                            onChange={(e) => handleBusinessInputChange(business.id, 'address', e.target.value)}
                            className={`input-style ${businessErrors['business-' + business.id + '-address'] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="Full address"
                          />
                          <ErrorMessage error={businessErrors['business-' + business.id + '-address']} />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Description (Optional)
                          </label>
                          <textarea
                            value={business.description}
                            onChange={(e) => handleBusinessInputChange(business.id, 'description', e.target.value)}
                            rows={3}
                            className="input-style"
                            placeholder="Brief description of your business and services..."
                          />
                        </div>

                        {/* Logo Upload */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Logo/Image (Optional)
                          </label>
                          <input
                            type="file"
                            onChange={(e) => handleBusinessLogoChange(business.id, e)}
                            accept="image/*"
                            className="input-style"
                          />
                          {business.logoPreview && (
                            <div className="mt-2">
                              <img
                                src={business.logoPreview}
                                alt="Logo preview"
                                className="w-20 h-20 object-cover rounded border"
                              />
                            </div>
                          )}
                        </div>

                        {/* Social Media Links */}
                        <div className="md:col-span-2">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Social Media Links (Optional)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Facebook URL
                              </label>
                              <input
                                type="url"
                                value={business.socialMedia.facebook}
                                onChange={(e) => handleBusinessSocialMediaChange(business.id, 'facebook', e.target.value)}
                                className="input-style"
                                placeholder="https://facebook.com/..."
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Instagram URL
                              </label>
                              <input
                                type="url"
                                value={business.socialMedia.instagram}
                                onChange={(e) => handleBusinessSocialMediaChange(business.id, 'instagram', e.target.value)}
                                className="input-style"
                                placeholder="https://instagram.com/..."
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                LinkedIn URL
                              </label>
                              <input
                                type="url"
                                value={business.socialMedia.linkedin}
                                onChange={(e) => handleBusinessSocialMediaChange(business.id, 'linkedin', e.target.value)}
                                className="input-style"
                                placeholder="https://linkedin.com/..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

        {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
          <button
            type="submit"
            disabled={isSubmitting}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
          </button>
        </div>
      </form>
        </div>
      </div>
    </div>
  );
}

// Add this to your index.css or a global stylesheet
// .input-style {
//   @apply block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200;
// } 
