import React, { useState, useEffect, useRef } from 'react';
import businessesData, { businessCategories, categorySubcategories } from '../data/businesses';
import BusinessCard from '../components/common/BusinessCard';
import BusinessSubmissionForm from '../components/BusinessSubmissionForm';
import { Search, Filter, ChevronDown, X, Plus } from 'lucide-react';

export default function DirectoryPage() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [allBusinesses, setAllBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState('');
  const dropdownContainerRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  // Load and combine businesses from data file and localStorage on mount
  useEffect(() => {
    const loadBusinesses = () => {
      const approvedBusinesses = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
      console.log('🏢 Loading approved businesses:', approvedBusinesses.length);
      
      // Auto-fix duplicates before loading
      const uniqueBusinesses = [];
      const seenBusinessKeys = new Set();

      approvedBusinesses.forEach((business, index) => {
        const key = `${business.name.toLowerCase()}-${business.id || index}`;
        
        if (!seenBusinessKeys.has(key)) {
          seenBusinessKeys.add(key);
          uniqueBusinesses.push(business);
        } else {
          console.log('🗑️ Removing duplicate business:', business.name);
        }
      });

      // Save cleaned data if duplicates were found
      if (uniqueBusinesses.length < approvedBusinesses.length) {
        console.log(`✅ Removed ${approvedBusinesses.length - uniqueBusinesses.length} duplicate businesses`);
        localStorage.setItem('approvedBusinesses', JSON.stringify(uniqueBusinesses));
      }
      
      // Only load approved businesses for the directory - submitted businesses should only appear in admin dashboard
      const combined = [...businessesData, ...uniqueBusinesses].sort((a, b) => a.name.localeCompare(b.name));
      setAllBusinesses(combined);
    };

    loadBusinesses();
    
    // Listen for storage changes to update the list when new businesses are added
    const handleStorageChange = () => {
      loadBusinesses();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
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
          // Calculate scroll position (accounting for the "All Categories" button)
          const itemHeight = 40; // Approximate height of each option
          const scrollTop = (targetIndex + 1) * itemHeight; // +1 for "All Categories" button
          
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

  // Filter businesses whenever filters or the base list change
  useEffect(() => {
    let filtered = allBusinesses;

    if (search) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(search.toLowerCase()) ||
        business.description?.toLowerCase().includes(search.toLowerCase()) ||
        business.address?.toLowerCase().includes(search.toLowerCase()) ||
        business.subcategory?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply either category filter OR alphabet filter (they work independently)
    if (categories.length > 0) {
      // Show businesses in selected categories
      filtered = filtered.filter(business => categories.includes(business.category));
    } else if (selectedLetter) {
      // Show businesses whose categories start with the selected letter
      filtered = filtered.filter(business => 
        business.category && business.category.toUpperCase().startsWith(selectedLetter)
      );
    }

    // Apply subcategory filter if any subcategories are selected
    if (subcategories.length > 0) {
      filtered = filtered.filter(business => 
        business.subcategory && subcategories.includes(business.subcategory)
      );
    }

    setFilteredBusinesses(filtered);
  }, [search, categories, subcategories, selectedLetter, allBusinesses]);

  // Calculate business counts for each category
  const getCategoryCounts = () => {
    const counts = {};
    allBusinesses.forEach(business => {
      if (business.category) {
        counts[business.category] = (counts[business.category] || 0) + 1;
      }
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  // Generate alphabet filter with counts
  const alphabetFilter = () => {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
      letter,
      count: allBusinesses.filter(business => 
        business.category && business.category.toUpperCase().startsWith(letter)
      ).length
    }));
  };

  const applyAlphabetFilter = (letter) => {
    if (selectedLetter === letter) {
      setSelectedLetter(''); // Clear filter if same letter clicked
    } else {
      setSelectedLetter(letter);
      setCategories([]); // Clear category filter when alphabet filter is applied
      setSubcategories([]); // Clear subcategory filter when alphabet filter is applied
    }
  };

  const toggleCategory = (cat) => {
    setCategories(prev => 
      prev.includes(cat) 
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
    setSelectedLetter(''); // Clear alphabet filter when category filter is applied
  };

  const toggleSubcategory = (subcat) => {
    setSubcategories(prev => 
      prev.includes(subcat) 
        ? prev.filter(s => s !== subcat)
        : [...prev, subcat]
    );
    setSelectedLetter(''); // Clear alphabet filter when subcategory filter is applied
  };

  const removeCategory = (cat) => {
    setCategories(prev => prev.filter(c => c !== cat));
    // Remove all subcategories of this category
    const categorySubcats = categorySubcategories[cat] || [];
    setSubcategories(prev => prev.filter(s => !categorySubcats.includes(s)));
  };

  const removeSubcategory = (subcat) => {
    setSubcategories(prev => prev.filter(s => s !== subcat));
  };

  const clearCategories = () => {
    setCategories([]);
    setSubcategories([]);
  };

  const clearSubcategories = () => setSubcategories([]);

  const handleBusinessFormClose = () => {
    setShowBusinessForm(false);
    // Reload businesses when form is closed (in case new ones were added)
    const loadBusinesses = () => {
      const approvedBusinesses = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
      
      // Auto-fix duplicates before loading
      const uniqueBusinesses = [];
      const seenBusinessKeys = new Set();

      approvedBusinesses.forEach((business, index) => {
        const key = `${business.name.toLowerCase()}-${business.id || index}`;
        
        if (!seenBusinessKeys.has(key)) {
          seenBusinessKeys.add(key);
          uniqueBusinesses.push(business);
        }
      });

      // Save cleaned data if duplicates were found
      if (uniqueBusinesses.length < approvedBusinesses.length) {
        localStorage.setItem('approvedBusinesses', JSON.stringify(uniqueBusinesses));
      }
      
      const combined = [...businessesData, ...uniqueBusinesses].sort((a, b) => a.name.localeCompare(b.name));
      setAllBusinesses(combined);
    };
    
    loadBusinesses();
  };

  // For final filtering, ensure we show the filtered businesses
  const finalFilteredBusinesses = filteredBusinesses;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 lg:sticky lg:top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-center">
            {/* Search Bar - Flexible width */}
            <div className="flex-1 lg:flex-none lg:w-96 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
            </div>

            {/* Category Dropdown - Flexible width */}
            <div className="relative flex-1 lg:flex-none lg:min-w-[320px]" ref={categoryDropdownRef}>
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center justify-between gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full text-sm"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">
                    {categories.length === 0 && subcategories.length === 0 ? 'All Categories' : 
                     `${categories.length + subcategories.length} Selected`}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showCategoryDropdown && (
                <div 
                  ref={dropdownContainerRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-[600px] overflow-y-auto min-w-[320px]"
                >
                  <div className="p-2 text-xs text-gray-500 bg-gray-50 border-b border-gray-200">
                    💡 Tip: Press any letter (A-Z) to jump to categories starting with that letter
                  </div>
                  <button
                    onClick={() => {
                      clearCategories();
                      setShowCategoryDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex justify-between items-center"
                  >
                    <span>All Categories</span>
                    <span className="text-gray-500 text-xs">({allBusinesses.length})</span>
                  </button>
                  {businessCategories.map(cat => {
                    const hasSubcategories = categorySubcategories[cat];
                    const selectedSubcatsForCategory = hasSubcategories ? 
                      subcategories.filter(s => categorySubcategories[cat].includes(s)) : [];
                    
                    return (
                      <div key={cat}>
                        <button
                          onClick={() => toggleCategory(cat)}
                          className={`w-full px-4 py-2 text-left text-sm flex justify-between items-center hover:bg-gray-50 ${categories.includes(cat) ? 'bg-primary-50 font-bold text-primary-700' : ''}`}
                        >
                          <span>
                            <input
                              type="checkbox"
                              checked={categories.includes(cat)}
                              readOnly
                              className="mr-2 accent-primary-500"
                            />
                            {cat}
                          </span>
                          <span className="text-gray-500 text-xs">({categoryCounts[cat] || 0})</span>
                        </button>
                        
                        {/* Show subcategories if category is selected and has subcategories */}
                        {categories.includes(cat) && hasSubcategories && (
                          <div className="bg-gray-50 border-l-2 border-primary-200">
                            {categorySubcategories[cat].map(subcat => (
                              <button
                                key={subcat}
                                onClick={() => toggleSubcategory(subcat)}
                                className={`w-full pl-8 pr-4 py-2 text-left text-sm flex justify-between items-center hover:bg-gray-100 ${subcategories.includes(subcat) ? 'bg-primary-100 font-medium text-primary-800' : 'text-gray-600'}`}
                              >
                                <span>
                                  <input
                                    type="checkbox"
                                    checked={subcategories.includes(subcat)}
                                    readOnly
                                    className="mr-2 accent-primary-500"
                                  />
                                  {subcat}
                                </span>
                                <span className="text-gray-400 text-xs">
                                  ({allBusinesses.filter(b => b.subcategory === subcat).length})
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Register Your Business Button - Flexible width */}
            <div className="flex-1 lg:flex-none lg:min-w-[220px]">
              <button
                onClick={() => setShowBusinessForm(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors w-full text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Register Your Business</span>
              </button>
            </div>
          </div>

          {/* Selected Categories and Subcategories as tags */}
          {(categories.length > 0 || subcategories.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {/* Category tags */}
              {categories.map(cat => (
                <span key={cat} className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                  {cat}
                  <button onClick={() => removeCategory(cat)} className="ml-2 text-primary-700 hover:text-primary-900 focus:outline-none">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              
              {/* Subcategory tags */}
              {subcategories.map(subcat => (
                <span key={subcat} className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  🎯 {subcat}
                  <button onClick={() => removeSubcategory(subcat)} className="ml-2 text-green-700 hover:text-green-900 focus:outline-none">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              
              <button onClick={clearCategories} className="ml-2 text-xs text-gray-500 underline">Clear All</button>
            </div>
          )}

          {/* A-Z Filter - Responsive layout */}
          <div className="mt-6">
            <div className="flex items-center mb-3">
              <h3 className="text-sm font-medium text-gray-700">Filter by Business Category Letter:</h3>
              <p className="text-xs text-gray-500 ml-2">(Shows all businesses in categories starting with selected letter)</p>
            </div>
            {/* Mobile: 2-3 lines with larger buttons, Desktop: Single line with smaller buttons */}
            <div className="flex flex-wrap gap-2 lg:gap-1 lg:justify-between lg:flex-nowrap">
              {alphabetFilter().map(({ letter }) => (
                <button
                  key={letter}
                  onClick={() => applyAlphabetFilter(letter)}
                  className={`flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 lg:h-8 lg:flex-1 text-sm font-semibold rounded-lg lg:rounded transition-all duration-200 transform hover:scale-105 ${
                    selectedLetter === letter
                      ? 'bg-primary-500 text-white shadow-md ring-2 ring-primary-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm border border-gray-200'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {finalFilteredBusinesses.length} of {allBusinesses.length} businesses
            {categories.length > 0 && ` in ${categories.join(', ')}`}
            {subcategories.length > 0 && ` specializing in ${subcategories.join(', ')}`}
            {selectedLetter && ` in categories starting with "${selectedLetter}"`}
          </p>
        </div>

        {/* Business Grid */}
        {finalFilteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {finalFilteredBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                {...business}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all categories.
            </p>
          </div>
        )}
      </div>

       {/* Business Submission Form */}
       {showBusinessForm && (
         <BusinessSubmissionForm
           isOpen={showBusinessForm}
           onClose={handleBusinessFormClose}
         />
       )}
    </div>
  );
} 