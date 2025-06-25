import React from 'react';
import { Link } from 'react-router-dom';

export default function DirectoryCategoryCard({ icon, label, to, accentColor }) {
  const bgClass = accentColor === 'green' ? 'bg-green-500' : 'bg-burgundy';
  const textClass = accentColor === 'green' ? 'text-green-700' : 'text-burgundy';
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[160px]"
      aria-label={label}
    >
      <div className={`${bgClass} text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl mb-4`}>
        {icon}
      </div>
      <span className={`text-lg font-semibold ${textClass} text-center`}>{label}</span>
    </Link>
  );
} 