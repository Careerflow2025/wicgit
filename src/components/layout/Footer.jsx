import React from 'react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Enrol', href: '/enrol' },
  { name: 'Projects', href: '/projects' },
  { name: 'Volunteer', href: '/volunteer' },
];

const socialLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'YouTube', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <img src="/images/logopacivon.png" alt="WIC Logo" className="w-20 mb-4 md:mb-2 md:mx-0 mx-auto" />
            <Link to="/" className="inline-block">
              {/* Optionally remove the old logo if present */}
            </Link>
            <p className="mt-4 text-gray-300">
              Pioneering Quality & Excellence in Islamic Education
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <div>Leavesden Baptist Church, Watford WD24 5ER, United Kingdom</div>
              <div>Phone: 07748 318212</div>
              <div>Email: <a href="mailto:info@watfordislamiccentre.com" className="underline">info@watfordislamiccentre.com</a></div>
            </address>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">
              © {new Date().getFullYear()} Watford Islamic Centre — All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 space-x-4">
              <Link
                to="/policies/privacy"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/policies/terms"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 