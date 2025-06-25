import React from 'react';
import { Mail, Phone, ExternalLink, Facebook, Instagram, Linkedin, MapPin } from 'lucide-react';

const defaultImages = [
  '/assets/images/slide 1.png',
  '/assets/images/slide 2.png',
  '/assets/images/slide 3.png',
];

function encodeAddress(address) {
  return encodeURIComponent(address);
}

export default function BusinessCard({
  name,
  category,
  description,
  address,
  phone,
  email,
  website,
  logo,
  heroImage,
  services = [],
  socialMedia = {},
  images = defaultImages,
}) {

  // Use logo if available, otherwise hero image, otherwise a placeholder.
  const displayImage = logo || heroImage || '/assets/images/placeholder.png';

  // Truncate description to fit smaller card
  const truncatedDescription = description?.length > 80 ? `${description.substring(0, 80)}...` : description;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Category Badge */}
      <div className="px-3 py-1 bg-primary-100">
        <span className="text-xs font-medium text-primary-700 uppercase tracking-wide">
          {category}
        </span>
      </div>

      {/* Business Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/assets/images/placeholder.png';
          }}
        />
      </div>

      {/* Business Info */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Business Name */}
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        {truncatedDescription && (
          <p className="text-gray-600 text-xs mb-2 line-clamp-2">
            {truncatedDescription}
          </p>
        )}

        {/* Address */}
        {address && (
          <div className="flex items-start gap-1 mb-1">
            <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-500 text-xs line-clamp-1">
              {address}
            </p>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-1 mt-auto">
          {phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-gray-400" />
              <a href={`tel:${phone}`} className="text-gray-600 text-xs hover:text-primary-600">
                {phone}
              </a>
            </div>
          )}

          {email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-gray-400" />
              <a href={`mailto:${email}`} className="text-gray-600 text-xs hover:text-primary-600 truncate">
                {email}
              </a>
            </div>
          )}
        </div>

        {/* Social Media & Website Links */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                title="Visit Website"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {socialMedia.facebook && (
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-3 h-3" />
              </a>
            )}
            {socialMedia.instagram && (
              <a
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-gray-400 hover:text-pink-600 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-3 h-3" />
              </a>
            )}
            {socialMedia.linkedin && (
              <a
                href={socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-gray-400 hover:text-blue-700 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 