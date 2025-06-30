import React, { useState, useEffect, useRef } from 'react';
import businessesData, { businessCategories } from '../data/businesses';
import BusinessCard from '../components/common/BusinessCard';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

export default function DirectoryPage() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [allBusinesses, setAllBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownContainerRef = useRef(null);

  // Load and combine businesses from data file and localStorage on mount
  useEffect(() => {
    const approvedBusinesses = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
    const combined = [...businessesData, ...approvedBusinesses].sort((a, b) => a.name.localeCompare(b.name));
    setAllBusinesses(combined);
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
        business.address?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categories.length > 0) {
      filtered = filtered.filter(business => categories.includes(business.category));
    }

    setFilteredBusinesses(filtered);
  }, [search, categories, allBusinesses]);

  // Calculate business counts for each category
  const getCategoryCounts = () => {
    const counts = {};
    allBusinesses.forEach(business => {
      counts[business.category] = (counts[business.category] || 0) + 1;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  // Generate A-Z filter options (by category first letter)
  const alphabetFilter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return letters.map(letter => {
      const count = filteredBusinesses.filter(business => 
        business.category && business.category.toUpperCase().startsWith(letter)
      ).length;
      return { letter, count };
    });
  };

  const [selectedLetter, setSelectedLetter] = useState('');

  // Apply A-Z filter (by category first letter)
  const applyAlphabetFilter = (letter) => {
    setSelectedLetter(letter === selectedLetter ? '' : letter);
  };

  const finalFilteredBusinesses = selectedLetter 
    ? filteredBusinesses.filter(business => 
        business.category && business.category.toUpperCase().startsWith(selectedLetter)
      )
    : filteredBusinesses;

  // Toggle category selection
  const toggleCategory = (cat) => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Remove a selected category
  const removeCategory = (cat) => {
    setCategories(prev => prev.filter(c => c !== cat));
  };

  // Clear all selected categories
  const clearCategories = () => setCategories([]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search businesses by name, description, or address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-w-[260px]"
              >
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  {categories.length === 0 ? 'All Categories' : `${categories.length} Selected`}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showCategoryDropdown && (
                <div 
                  ref={dropdownContainerRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-[600px] overflow-y-auto min-w-[260px]"
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
                  {businessCategories.map(cat => (
                    <button
                      key={cat}
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
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Selected Categories as tags */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map(cat => (
                <span key={cat} className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                  {cat}
                  <button onClick={() => removeCategory(cat)} className="ml-2 text-primary-700 hover:text-primary-900 focus:outline-none">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button onClick={clearCategories} className="ml-2 text-xs text-gray-500 underline">Clear All</button>
            </div>
          )}

          {/* A-Z Filter */}
          <div className="mt-4 flex flex-wrap gap-1">
            {alphabetFilter().map(({ letter, count }) => (
              <button
                key={letter}
                onClick={() => applyAlphabetFilter(letter)}
                className={`px-2 py-1 text-xs font-medium rounded ${
                  selectedLetter === letter
                    ? 'bg-primary-500 text-white'
                    : count > 0
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={count === 0}
              >
                {letter} ({count})
              </button>
            ))}
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
    </div>
  );
} 