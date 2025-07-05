import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Timetable', href: '/timetable' },
  { name: 'Enrol Now', href: '/enrol-now' },
  { name: 'Projects', href: '/projects' },
  { name: 'What is WIC', href: '/what-is-wic' },
  { name: 'Volunteer', href: '/volunteer' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <Disclosure as="nav" className="bg-white shadow-md sticky top-0 z-50">
      {({ open }) => (
        <>
          {/* Top header row for mobile and desktop */}
          <div className="container mx-auto flex items-center justify-between h-16 px-0 md:px-2">
            {/* Logo on far left */}
            <div className="flex-shrink-0 flex items-center h-16 mr-4 ml-0">
              <Link to="/" className="flex items-center h-full">
                <img src="/images/TOPMENULOGO.png" alt="Watford Islamic Centre Logo" className="h-16 w-auto" />
              </Link>
            </div>
            {/* Desktop navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4 flex-1 justify-center">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={
                      `px-2 py-2 text-sm font-medium rounded transition-colors duration-200 ` +
                      (isActive
                        ? 'bg-yellow-300 text-black shadow'
                        : 'text-gray-700 hover:text-black hover:bg-yellow-300')
                    }
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            {/* Desktop Summer and Directory buttons */}
            <div className="hidden md:flex items-center justify-end ml-2 space-x-2">
              <Link
                to="/directory"
                className="px-3 py-1.5 rounded-full font-bold text-sm bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300 animate-pulse border-2 border-green-500"
                style={{ minWidth: '120px', textAlign: 'center', whiteSpace: 'nowrap' }}
              >
                WIC DIRECTORY
              </Link>
              <Link
                to="/summer"
                className="px-3 py-1.5 rounded-full font-bold text-sm bg-yellow-400 text-black shadow-lg hover:bg-yellow-300 transition-all duration-300 animate-pulse border-2 border-yellow-400"
                style={{ minWidth: '120px', textAlign: 'center', whiteSpace: 'nowrap' }}
              >
                SUMMER AT WIC
              </Link>
            </div>
            {/* Mobile hamburger menu on far right */}
            <div className="flex md:hidden ml-auto">
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          {/* Mobile-only Summer and Directory buttons bar */}
          <div className="block md:hidden w-full bg-white shadow-sm">
            <div className="flex justify-center items-center py-2 space-x-2">
              <Link
                to="/directory"
                className="px-4 py-2 rounded-full font-bold text-sm bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300 animate-pulse border-2 border-green-500"
                style={{ minWidth: '120px', textAlign: 'center', whiteSpace: 'nowrap' }}
              >
                WIC DIRECTORY
              </Link>
              <Link
                to="/summer"
                className="px-4 py-2 rounded-full font-bold text-sm bg-yellow-400 text-black shadow-lg hover:bg-yellow-300 transition-all duration-300 animate-pulse border-2 border-yellow-400"
                style={{ minWidth: '120px', textAlign: 'center', whiteSpace: 'nowrap' }}
              >
                SUMMER AT WIC
              </Link>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
                return (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={
                      `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ` +
                      (isActive
                        ? 'bg-yellow-300 text-black shadow'
                        : 'text-gray-700 hover:text-black hover:bg-yellow-300')
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 