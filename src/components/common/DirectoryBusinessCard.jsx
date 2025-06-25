import React from 'react';

export default function DirectoryBusinessCard({ business }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg animate-fadeInUp">
      <div className="flex items-center gap-4 mb-2">
        <div className="bg-burgundy text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl">
          {/* Placeholder icon */}
          <span role="img" aria-label="Business">🏢</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-burgundy">{business.name}</h3>
          <p className="text-gray-600 text-sm">{business.description}</p>
        </div>
      </div>
      <div className="text-gray-700 text-sm mt-2">
        <div><strong>Address:</strong> {business.address}</div>
        <div><strong>Phone:</strong> <a href={`tel:${business.phone}`} className="text-burgundy underline">{business.phone}</a></div>
        <div><strong>Email:</strong> <a href={`mailto:${business.email}`} className="text-burgundy underline">{business.email}</a></div>
        {business.website && (
          <div><strong>Website:</strong> <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-burgundy underline">{business.website}</a></div>
        )}
      </div>
    </div>
  );
} 