import React from 'react';
import whatIsWicImg from '../assets/images/WHAT IS WIC.png';
import pdfFile from '../assets/images/documents/47584.pdf';

export default function WhatIsWIC() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url(${whatIsWicImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#fff',
          padding: '4rem 2rem',
          position: 'relative',
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1,
          }}
        />
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">What is WIC?</h1>
          <p className="text-lg md:text-2xl font-medium drop-shadow-lg">
            Discover our purpose, our mission, and our commitment to the community.
          </p>
          <a
            href={pdfFile}
            download
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              backgroundColor: "#157347",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Download Our Prospectus
          </a>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/4fHhMTYwwPc"
              title="WIC Introduction"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-xl"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Prospectus Preview Section */}
      <div className="hidden md:block mt-12 container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-primary text-center">Preview the Prospectus Below</h2>
        <div className="w-full h-[600px] bg-gray-100 rounded-lg shadow overflow-hidden">
          <iframe
            src={pdfFile}
            title="WIC Prospectus"
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
} 