import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const images = [
  '/images/slide 1.png',
  '/images/slide 2.png',
  '/images/slide 3.png',
  '/images/slide 4.png',
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 600); // fade out duration (match transition)
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[600px] w-full overflow-hidden flex items-stretch">
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full z-0">
        {images.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 ${
              idx === current && fade ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url('${img}')` }}
            aria-hidden={idx !== current}
          />
        ))}
      </div>
      {/* Full-section dark overlay for background, 20% darker and above images */}
      <div className="absolute inset-0 z-20 bg-black/70 pointer-events-none" />
      {/* Gradient Overlay (left 40%) */}
      <div className="absolute inset-y-0 left-0 z-20 w-2/5 max-sm:w-full pointer-events-none">
        <div className="h-full w-full bg-gradient-to-r from-black/60 to-transparent" />
      </div>
      {/* Content (above overlay) */}
      <div className="relative z-30 flex items-center h-full w-full">
        <div className="w-full sm:w-2/5 h-full flex flex-col justify-center px-6 sm:px-12 py-10 sm:py-0">
          <div className="max-w-xl mx-auto flex flex-col items-start justify-center h-full text-white">
            <img src="/images/logopacivon.png" alt="Watford Islamic Centre Logo" className="h-32 w-auto mb-8 drop-shadow-xl" />
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Pioneering Quality & Excellence in Islamic Education
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Join our vibrant community and experience the best in Islamic education and community services.
            </p>
            {/* MOBILE HERO WIC ACADEMY SECTION (below main buttons) */}
            <div className="block md:hidden w-full mt-6">
              {/* Join WIC Academy heading */}
              <div className="flex justify-center mb-1">
                <span className="text-white text-2xl font-bold drop-shadow-lg text-center">Join WIC Academy</span>
              </div>
              {/* WIC Academy description */}
              <div className="flex justify-center mb-3">
                <p className="text-white text-center text-base leading-snug max-w-xs">
                  WIC Academy offers a nurturing environment for children, teens, and adults to learn, grow, and thrive.<br/>
                  Our programmes combine Islamic values, academic excellence, and personal development.<br/>
                  Join us to build strong faith, character, and community.
                </p>
              </div>
              {/* 4 round buttons for mobile */}
              <div className="flex flex-wrap justify-center gap-2 w-full">
                <Link to="/contact" className="px-4 py-2 rounded-full font-bold text-sm bg-white text-primary shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border-2 border-primary text-center min-w-[90px]">
                  5-7
                </Link>
                <Link to="/contact" className="px-4 py-2 rounded-full font-bold text-sm bg-white text-primary shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border-2 border-primary text-center min-w-[90px]">
                  8-10
                </Link>
                <Link to="/contact" className="px-4 py-2 rounded-full font-bold text-sm bg-white text-primary shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border-2 border-primary text-center min-w-[90px]">
                  11-15
                </Link>
                <Link to="/contact" className="px-4 py-2 rounded-full font-bold text-sm bg-white text-primary shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border-2 border-primary text-center min-w-[90px]">
                  Adults (16+)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* DESKTOP HERO BUTTONS & ACADEMY SECTION */}
      <div className="hidden md:flex absolute bottom-16 left-0 w-full z-40 flex-row justify-between items-center gap-4 flex-wrap px-6 sm:px-12">
        <div className="flex flex-row gap-4 items-center ml-4 sm:ml-12" style={{marginTop: 'auto'}}>
          <a
            href="https://chat.whatsapp.com/GEiY5uHzRHEBZpKLKelTfR"
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#25D366] text-white font-bold hover:bg-[#1ebe5d] transition-colors duration-200 border-2 border-[#25D366] hover:border-[#1ebe5d]"
          >
            Join WhatsApp Group
          </a>
          <Link to="/contact" className="btn btn-outline text-white border-white hover:bg-white hover:text-primary transition-colors duration-200">
            Volunteer
          </Link>
        </div>
        <div className="flex flex-col items-center mr-4 sm:mr-12">
          <span className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg mb-3 text-center">Join WIC Academy</span>
          {/* WIC Academy description for desktop */}
          <p className="text-white text-center text-lg leading-snug max-w-md mb-3">
            WIC Academy offers a nurturing environment for children, teens, and adults to learn, grow, and thrive.<br/>
            Our programmes combine Islamic values, academic excellence, and personal development.<br/>
            Join us to build strong faith, character, and community.
          </p>
          <div className="flex flex-row gap-4 items-center">
            <Link to="/contact" className="px-4 py-2 rounded-full font-bold text-base bg-white text-primary shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border-2 border-primary">
              5-7
            </Link>
            <Link to="/contact" className="px-4 py-2 rounded-full font-bold text-base bg-white text-primary shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border-2 border-primary">
              8-10
            </Link>
            <Link to="/contact" className="px-4 py-2 rounded-full font-bold text-base bg-white text-primary shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border-2 border-primary">
              11-15
            </Link>
            <Link to="/contact" className="px-4 py-2 rounded-full font-bold text-base bg-white text-primary shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border-2 border-primary">
              Adults (16+)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 