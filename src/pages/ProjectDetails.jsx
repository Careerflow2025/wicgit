import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

// Import all project images from src/assets/images
import libraryImg from '../assets/images/WIC LIBRARY.png';
import wicFcImg from '../assets/images/WIC FC.png';
import businessBarakahImg from '../assets/images/WIC BUSINESS AND BARAKAH.png';
import over60sImg from '../assets/images/WIC OVER 60s.png';
import youthImg from '../assets/images/WIC YOUTH.png';
import babyMumImg from '../assets/images/WIC BABY AND MUM.png';
import quranBreakfastImg from '../assets/images/WIC Quran Breakfast Circle.png';

// Image mapping object
const projectImages = {
  'library': libraryImg,
  'wic-fc': wicFcImg,
  'business-and-barakah': businessBarakahImg,
  'over-60s': over60sImg,
  'youth-club': youthImg,
  'baby-and-mum': babyMumImg,
  'quran-breakfast-circle': quranBreakfastImg
};

const WHATSAPP_LINK = 'https://chat.whatsapp.com/LQe6EzlT4cO3xHVpC28WAf';
const LIBRARY_OPTIONS = ['Sign Up', 'Donate Books', 'Volunteer'];
const BARAKAH_OPTIONS = ['Send Your Profession', 'Become a Guest Speaker', 'Invest'];
const OVER60S_OPTIONS = ['Register', 'Volunteer', 'Sponsor'];

export default function ProjectDetails() {
  const { slug } = useParams();
  const formRef = useRef(null);
  const [selectedReason, setSelectedReason] = useState(LIBRARY_OPTIONS[0]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: LIBRARY_OPTIONS[0],
    message: ''
  });

  // Business and Barakah form state (must be at top level)
  const [showBarakahForm, setShowBarakahForm] = useState(false);
  const [barakahPurpose, setBarakahPurpose] = useState(BARAKAH_OPTIONS[0]);
  const [barakahFormData, setBarakahFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: BARAKAH_OPTIONS[0],
    message: ''
  });

  // Business and Barakah handlers (must be at top level)
  const handleBarakahButtonClick = (btn) => {
    if (btn === 'Join Our WhatsApp') {
      window.open('https://wa.me/447000000000', '_blank');
    } else {
      setBarakahPurpose(btn);
      setBarakahFormData(f => ({ ...f, purpose: btn }));
      setShowBarakahForm(true);
      setTimeout(() => {
        document.getElementById('barakah-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  const handleBarakahInputChange = (e) => {
    const { name, value } = e.target;
    setBarakahFormData(prev => ({ ...prev, [name]: value }));
  };

  // Over 60s form state (must be at top level)
  const [showOver60sForm, setShowOver60sForm] = useState(false);
  const [over60sPurpose, setOver60sPurpose] = useState(OVER60S_OPTIONS[0]);
  const [over60sFormData, setOver60sFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: OVER60S_OPTIONS[0],
    message: ''
  });
  const handleOver60sButtonClick = (btn) => {
    if (btn === 'Join Our WhatsApp') {
      window.open('https://wa.me/447000000000', '_blank');
    } else {
      setOver60sPurpose(btn);
      setOver60sFormData(f => ({ ...f, purpose: btn }));
      setShowOver60sForm(true);
      setTimeout(() => {
        document.getElementById('over60s-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  const handleOver60sInputChange = (e) => {
    const { name, value } = e.target;
    setOver60sFormData(prev => ({ ...prev, [name]: value }));
  };

  // Youth Club form state (must be at top level)
  const [showYouthForm, setShowYouthForm] = useState(false);
  const [youthFormData, setYouthFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: 'Volunteer',
    message: ''
  });
  const handleYouthButtonClick = (btn) => {
    if (btn === 'Volunteer') {
      setShowYouthForm(true);
      setTimeout(() => {
        document.getElementById('youth-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (btn === 'Join WhatsApp (Parents Only)') {
      window.open('https://wa.me/447000000000', '_blank');
    }
  };
  const handleYouthInputChange = (e) => {
    const { name, value } = e.target;
    setYouthFormData(prev => ({ ...prev, [name]: value }));
  };

  // Baby and Mum form state (must be at top level)
  const [babyMumFormData, setBabyMumFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: 'Volunteer',
    message: ''
  });
  const handleBabyMumInputChange = (e) => {
    const { name, value } = e.target;
    setBabyMumFormData(prev => ({ ...prev, [name]: value }));
  };

  // Quran Breakfast Circle form state (must be at top level)
  const [quranFormData, setQuranFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    purpose: 'Volunteer',
    message: ''
  });
  const handleQuranInputChange = (e) => {
    const { name, value } = e.target;
    setQuranFormData(prev => ({ ...prev, [name]: value }));
  };

  const project = projectsData.find(p => p.slug === slug);
  const projectImage = projectImages[slug]; // Get the imported image
  const isLibrary = slug === 'library';
  const isWicFc = slug === 'wic-fc';
  const isBusinessBarakah = slug === 'business-and-barakah';
  const isOver60s = slug === 'over-60s';
  const isYouthClub = slug === 'youth-club';
  const isBabyAndMum = slug === 'baby-and-mum';
  const isQuranBreakfast = slug === 'quran-breakfast-circle';

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
          <p className="text-gray-600 mt-2">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Button click logic
  const handleButtonClick = (button) => {
    if (button.toLowerCase().includes('whatsapp')) {
      window.open(WHATSAPP_LINK, '_blank');
    } else {
      setSelectedReason(button);
      setFormData(f => ({ ...f, reason: button }));
      setShowForm(true);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Form logic
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form submission logic here
    alert('Form submitted!');
    setFormData({ name: '', phone: '', email: '', reason: LIBRARY_OPTIONS[0], message: '' });
    setShowForm(false);
  };

  // --- HERO SECTION for Library ---
  if (isLibrary) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section
          style={{
            backgroundImage: `url(${projectImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 'auto',
            padding: '4rem 2rem',
            color: '#fff',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1,
          }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 className="font-bold text-3xl md:text-5xl mb-4 drop-shadow-lg">{project.title}</h1>
            <p className="text-lg md:text-2xl mb-8 font-medium drop-shadow-lg">{project.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4" style={{ justifyContent: 'center' }}>
              {LIBRARY_OPTIONS.map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleButtonClick(btn)}
                  className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {btn}
                </button>
              ))}
              <button
                onClick={() => handleButtonClick('Join Our WhatsApp')}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full shadow hover:bg-white hover:text-primary transition-colors bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Join Our WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="w-full flex justify-center mt-8 mb-12">
          <form ref={formRef} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl" style={{ maxWidth: 600 }}>
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">Get Involved</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <select
                name="purpose"
                required
                defaultValue="Sign Up"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white"
              >
                <option value="Sign Up">Sign Up</option>
                <option value="Donate Books">Donate Books</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    );
  }

  // --- HERO SECTION for WIC FC ---
  if (isWicFc) {
    const WIC_FC_OPTIONS = ['+22', 'Under 21', 'Under 16'];
    const WIC_FC_WHATSAPP = 'https://chat.whatsapp.com/Fk15q6coo87DvmeBX96BlG';
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section
          style={{
            backgroundImage: `url(${projectImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '4rem 2rem',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1,
          }} />
          <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <h1 className="font-bold text-3xl md:text-5xl mb-4 drop-shadow-lg">WIC FC</h1>
            <p className="text-lg md:text-2xl mb-8 font-medium drop-shadow-lg">Join WIC FC and make a difference on and off the pitch!</p>
            <div className="flex flex-wrap justify-center gap-4" style={{ justifyContent: 'center' }}>
              {WIC_FC_OPTIONS.map((btn) => (
                <button
                  key={btn}
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {btn}
                </button>
              ))}
              <button
                onClick={() => window.open(WIC_FC_WHATSAPP, '_blank')}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full shadow hover:bg-white hover:text-primary transition-colors bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Join Our WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* Contact Form Section - always visible */}
        <section className="w-full flex justify-center mt-8 mb-12">
          <form ref={formRef} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl" style={{ maxWidth: 600 }}>
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">Get Involved</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Category</label>
              <select
                name="ageCategory"
                required
                defaultValue={WIC_FC_OPTIONS[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white"
              >
                <option value="+22">+22</option>
                <option value="Under 21">Under 21</option>
                <option value="Under 16">Under 16</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    );
  }

  // --- HERO SECTION for Business and Barakah ---
  if (isBusinessBarakah) {
    const BARAKAH_WHATSAPP = 'https://chat.whatsapp.com/C6YsspCkxZ43MmxNVuRJe1';
    return (
      <div className="min-h-screen bg-gray-50">
        <section
          style={{
            backgroundImage: `url(${projectImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '4rem 2rem',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1,
          }} />
          <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <h1 className="font-bold text-3xl md:text-5xl mb-4 drop-shadow-lg">Business and Barakah</h1>
            <p className="text-lg md:text-2xl mb-8 font-medium drop-shadow-lg">Grow in Faith & Finance</p>
            <div className="flex flex-wrap justify-center gap-4" style={{ justifyContent: 'center' }}>
              {BARAKAH_OPTIONS.map((btn) => (
                <button
                  key={btn}
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {btn}
                </button>
              ))}
              <button
                onClick={() => window.open(BARAKAH_WHATSAPP, '_blank')}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full shadow hover:bg-white hover:text-primary transition-colors bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Join Our WhatsApp
              </button>
              <Link
                to="/directory"
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Explore Directory
              </Link>
            </div>
          </div>
        </section>
        {/* Contact Form Section - always visible */}
        <section className="w-full flex justify-center mt-8 mb-12">
          <form ref={formRef} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl" style={{ maxWidth: 600 }}>
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">Get Involved</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={barakahFormData.name}
                onChange={handleBarakahInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={barakahFormData.phone}
                onChange={handleBarakahInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={barakahFormData.email}
                onChange={handleBarakahInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <select
                name="purpose"
                value={barakahFormData.purpose}
                onChange={handleBarakahInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white"
              >
                {BARAKAH_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={barakahFormData.message}
                onChange={handleBarakahInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    );
  }

  // --- HERO SECTION for Over 60s ---
  if (isOver60s) {
    const OVER60S_WHATSAPP = 'https://chat.whatsapp.com/F7EtBIMRm0R09JRgVYYGnW';
    return (
      <div className="min-h-screen bg-gray-50">
        <section
          style={{
            backgroundImage: `url(${projectImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '4rem 2rem',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1,
          }} />
          <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <h1 className="font-bold text-3xl md:text-5xl mb-4 drop-shadow-lg">Over 60s</h1>
            <p className="text-lg md:text-2xl mb-8 font-medium drop-shadow-lg">Prosper with Purpose</p>
            <div className="flex flex-wrap justify-center gap-4" style={{ justifyContent: 'center' }}>
              {OVER60S_OPTIONS.map((btn) => (
                <button
                  key={btn}
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {btn}
                </button>
              ))}
              <button
                onClick={() => window.open(OVER60S_WHATSAPP, '_blank')}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full shadow hover:bg-white hover:text-primary transition-colors bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Join Our WhatsApp
              </button>
            </div>
          </div>
        </section>
        {/* Contact Form Section - always visible */}
        <section className="w-full flex justify-center mt-8 mb-12">
          <form ref={formRef} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl" style={{ maxWidth: 600 }}>
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">Get Involved</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={over60sFormData.name}
                onChange={handleOver60sInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={over60sFormData.phone}
                onChange={handleOver60sInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={over60sFormData.email}
                onChange={handleOver60sInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <select
                name="purpose"
                value={over60sFormData.purpose}
                onChange={handleOver60sInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white"
              >
                {OVER60S_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={over60sFormData.message}
                onChange={handleOver60sInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    );
  }

  // --- HERO SECTION for Youth Club ---
  if (isYouthClub) {
    const YOUTH_WHATSAPP = 'https://chat.whatsapp.com/GBpqzYazITC654D4PYpDBV';
    return (
      <div className="min-h-screen bg-gray-50">
        <section
          style={{
            backgroundImage: `url(${projectImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '4rem 2rem',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1,
          }} />
          <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <h1 className="font-bold text-3xl md:text-5xl mb-4 drop-shadow-lg">Youth Club</h1>
            <p className="text-lg md:text-2xl mb-8 font-medium drop-shadow-lg">Food, Games, Sports, Salah…</p>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Volunteer
              </button>
              <button
                onClick={() => window.open(YOUTH_WHATSAPP, '_blank')}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full shadow hover:bg-white hover:text-primary transition-colors bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Join WhatsApp (Parents Only)
              </button>
            </div>
          </div>
        </section>
        {/* Contact Form Section - always visible */}
        <section className="w-full flex justify-center mt-8 mb-12">
          <form ref={formRef} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl" style={{ maxWidth: 600 }}>
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">Get Involved</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={youthFormData.name}
                onChange={handleYouthInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={youthFormData.phone}
                onChange={handleYouthInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={youthFormData.email}
                onChange={handleYouthInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <select
                name="purpose"
                value={youthFormData.purpose}
                onChange={handleYouthInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white"
              >
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={youthFormData.message}
                onChange={handleYouthInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    );
  }

  // --- HERO SECTION for Baby and Mum ---
  if (isBabyAndMum) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section
          style={{
            backgroundImage: `url(${projectImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '4rem 2rem',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1,
          }} />
          <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <h1 className="font-bold text-3xl md:text-5xl mb-4 drop-shadow-lg">Baby and Mum</h1>
            <p className="text-lg md:text-2xl mb-8 font-medium drop-shadow-lg">Reminders and Play</p>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Volunteer
              </button>
              <button
                onClick={() => window.open('https://chat.whatsapp.com/BFFEV2zPoNO8BBknxJrKuz', '_blank')}
                className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-full shadow hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Join our WhatsApp
              </button>
            </div>
          </div>
        </section>
        {/* Contact Form Section - always visible */}
        <section className="w-full flex justify-center mt-8 mb-12">
          <form ref={formRef} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl" style={{ maxWidth: 600 }}>
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">Get Involved</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={babyMumFormData.name}
                onChange={handleBabyMumInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={babyMumFormData.phone}
                onChange={handleBabyMumInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={babyMumFormData.email}
                onChange={handleBabyMumInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <select
                name="purpose"
                value={babyMumFormData.purpose}
                onChange={handleBabyMumInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white"
              >
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={babyMumFormData.message}
                onChange={handleBabyMumInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    );
  }

  // --- HERO SECTION for Quran Breakfast Circle ---
  if (isQuranBreakfast) {
    const QURAN_MEN_WHATSAPP = 'https://chat.whatsapp.com/GNkqP9lrNYtADNHxya6b6d';
    const QURAN_WOMEN_WHATSAPP = null; // No link, just scroll to form
    return (
      <div className="min-h-screen bg-gray-50">
        <section
          style={{
            backgroundImage: `url(${projectImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '4rem 2rem',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1,
          }} />
          <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <h1 className="font-bold text-3xl md:text-5xl mb-4 drop-shadow-lg">Quran Breakfast Circle</h1>
            <p className="text-lg md:text-2xl mb-8 font-medium drop-shadow-lg">Read and Learn</p>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Volunteer
              </button>
              <button
                onClick={() => window.open('https://chat.whatsapp.com/BWe1SH8Sb152zlHUG5uRuQ', '_blank')}
                className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-full shadow hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Women WhatsApp Group
              </button>
              <button
                onClick={() => window.open(QURAN_MEN_WHATSAPP, '_blank')}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full shadow hover:bg-white hover:text-primary transition-colors bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Men WhatsApp Group
              </button>
            </div>
          </div>
        </section>
        {/* Contact Form Section - always visible */}
        <section className="w-full flex justify-center mt-8 mb-12">
          <form ref={formRef} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl" style={{ maxWidth: 600 }}>
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">Get Involved</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={quranFormData.name}
                onChange={handleQuranInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={quranFormData.phone}
                onChange={handleQuranInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={quranFormData.email}
                onChange={handleQuranInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={quranFormData.gender}
                onChange={handleQuranInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white"
              >
                <option value="">Select Gender</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <select
                name="purpose"
                value={quranFormData.purpose}
                onChange={handleQuranInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white"
              >
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={quranFormData.message}
                onChange={handleQuranInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    );
  }

  // --- DEFAULT PROJECT PAGE (other projects) ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${projectImage})` }}
        />
        <div className="relative container mx-auto h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl mb-8">{project.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              {project.buttons.map((button) => (
                <button
                  key={button}
                  onClick={() => handleButtonClick(button)}
                  className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 