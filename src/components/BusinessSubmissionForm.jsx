import React, { useState, useRef, useEffect } from 'react';
import { businessCategories } from '../data/businesses';
import toast from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';

export default function BusinessSubmissionForm() {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    email: '',
    phone: '',
    category: '',
    description: '',
    address: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      linkedin: ''
    }
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownContainerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
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
      category: category
    }));
    setShowCategoryDropdown(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setLogoFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setLogoPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        toast.error('Please select an image file');
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.category || !formData.address || !formData.phone || !formData.email) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Check for duplicate business
      const existingBusinesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
      const isDuplicate = existingBusinesses.some(business => 
        business.name.toLowerCase() === formData.name.toLowerCase() ||
        business.website === formData.website
      );

      if (isDuplicate) {
        toast.error('A business with this name or website already exists');
        return;
      }

      // Create new business object
      const newBusiness = {
        id: `business-${Date.now()}`,
        ...formData,
        logo: logoPreview || null,
        heroImage: null,
        services: [],
        addedDate: new Date().toISOString().split('T')[0]
      };

      // Save to localStorage
      const updatedBusinesses = [...existingBusinesses, newBusiness];
      localStorage.setItem('submittedBusinesses', JSON.stringify(updatedBusinesses));

      // Reset form
      setFormData({
        name: '',
        website: '',
        email: '',
        phone: '',
        category: '',
        description: '',
        address: '',
        socialMedia: {
          instagram: '',
          facebook: '',
          linkedin: ''
        }
      });
      setLogoFile(null);
      setLogoPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      toast.success('Business added successfully! It will appear in the directory immediately.');
      
      // Trigger a page reload to update the directory
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error('Error submitting business:', error);
      toast.error('Failed to add business. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">List Your Business</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
              className="input-style"
              required
            />
          </div>

          {/* Category */}
          <div className="relative" ref={dropdownRef}>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Business Category *
            </label>
            <button
              type="button"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className={`w-full px-4 py-2 text-left border rounded-lg bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200 flex justify-between items-center ${
                !formData.category ? 'border-red-300' : 'border-gray-300'
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
            {!formData.category && (
              <p className="mt-1 text-sm text-red-600">Please select a business category</p>
            )}
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="input-style"
              placeholder="https://example.com"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Full Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="input-style"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input-style"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-style"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Business Description
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
              Business Logo/Image
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

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding Business...' : 'Add Business to Directory'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Add this to your index.css or a global stylesheet
// .input-style {
//   @apply block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200;
// } 