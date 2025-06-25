import React, { useState, useEffect } from 'react';
import businessesData, { businessCategories } from '../data/businesses';
import BusinessCard from '../components/common/BusinessCard';
import { Search, Filter, ChevronDown } from 'lucide-react';

export default function DirectoryPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [allBusinesses, setAllBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Load and combine businesses from data file and localStorage on mount
  useEffect(() => {
    const submittedBusinesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
    const combined = [...businessesData, ...submittedBusinesses].sort((a, b) => a.name.localeCompare(b.name));
    setAllBusinesses(combined);
  }, []);

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

    if (category) {
      filtered = filtered.filter(business => business.category === category);
    }

    setFilteredBusinesses(filtered);
  }, [search, category, allBusinesses]);

  // Calculate business counts for each category
  const getCategoryCounts = () => {
    const counts = {};
    allBusinesses.forEach(business => {
      counts[business.category] = (counts[business.category] || 0) + 1;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  // Generate A-Z filter options
  const alphabetFilter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return letters.map(letter => {
      const count = filteredBusinesses.filter(business => 
        business.name.toUpperCase().startsWith(letter)
      ).length;
      return { letter, count };
    });
  };

  const [selectedLetter, setSelectedLetter] = useState('');

  // Apply A-Z filter
  const applyAlphabetFilter = (letter) => {
    setSelectedLetter(letter === selectedLetter ? '' : letter);
  };

  const finalFilteredBusinesses = selectedLetter 
    ? filteredBusinesses.filter(business => 
        business.name.toUpperCase().startsWith(selectedLetter)
      )
    : filteredBusinesses;

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
                  {category || 'All Categories'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-[400px] overflow-y-auto min-w-[260px]">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCategory('');
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
                        onClick={() => {
                          setCategory(cat);
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex justify-between items-center"
                      >
                        <span>{cat}</span>
                        <span className="text-gray-500 text-xs">({categoryCounts[cat] || 0})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

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
            {category && ` in ${category}`}
            {selectedLetter && ` starting with "${selectedLetter}"`}
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