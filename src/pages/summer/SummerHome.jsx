import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Using import statements for images
import summerPoster from '../../assets/images/summer at wic poster.jpeg';
import hero1 from '../../assets/images/hero1.jpeg';
import hero2 from '../../assets/images/hero 2.jpeg';
import hero3 from '../../assets/images/hero 3.jpeg';
import summerCampImg from '../../assets/images/Summer Camp (4–11 years).png';
import quranIntensiveImg from '../../assets/images/Quran Intensive (8–16 years).png';
import superSaturdayImg from '../../assets/images/Super Saturday (4–16 years).png';
import sgalary2 from '../../assets/images/sgalary2.mp4';
import sgalary3 from '../../assets/images/sgalary3.mp4';
import sgalary4 from '../../assets/images/sgalary4.mp4';
import testimonial1 from '../../assets/images/TEST1.jpeg';
import testimonial2 from '../../assets/images/TEST2.jpeg';
import testimonial3 from '../../assets/images/TEST3.jpeg';
import kidsTimetable from '../../assets/images/kids Timetable.png';
import juniorsTimetable from '../../assets/images/JUniors timetable (1).png';
import teensTimetable from '../../assets/images/TEENS Timetable.png';
import newPoster from '../../assets/images/NEWPOSTER.jpeg';
import quranIntensiveImgNew from '../../assets/images/Quran Intensive (8–16 years) NEW PICTURE.png';
import superSaturdayImgNew from '../../assets/images/Super Saturday (4–16 years) NEW PICTURE.png';

export default function SummerHome() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [activeAgeGroup, setActiveAgeGroup] = useState('kids');
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState(null);

  const heroImages = [hero1, hero2, hero3];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroImages.length);
        setFade(true);
      }, 600); // fade out duration
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handlePriceBreakdown = (programme) => {
    setSelectedProgramme(programme);
    setShowPriceModal(true);
  };

  const closePriceModal = () => {
    setShowPriceModal(false);
    setSelectedProgramme(null);
  };

  const getPricingData = (programmeId) => {
    switch (programmeId) {
      case 'quran':
        return {
          title: 'Quran Intensive (8–16 years)',
          pricing: [
            { label: 'Per day', price: '£18' },
            { label: '10% off when booking 5 days or more', price: 'Automatic' }
          ]
        };
      case 'summer-camp':
        return {
          title: 'Summer Camp (4–11 years)',
          pricing: [
            { label: 'Morning session', price: '£18' },
            { label: 'Afternoon session', price: '£18' },
            { label: 'Full Day', price: '£30' },
            { label: '10% off when booking 5 days or more', price: 'Automatic' }
          ]
        };
      case 'super-saturday':
        return {
          title: 'Super Saturday (4–16 years)',
          pricing: [
            { label: 'Per day', price: '£20' },
            { label: '10% off when booking all 6 sessions', price: 'Automatic' }
          ]
        };
      default:
        return { title: '', pricing: [] };
    }
  };

  // Age group timetable data
  const ageGroupTimetables = {
    kids: {
      title: 'Kids (4–7)',
      description: 'Perfect for our youngest attendees',
      programmes: ['Summer Camp (4–11 years)', 'Super Saturday (4–16 years)'],
      timetable: {
        weekdays: '9am – 12pm',
        weekends: '10am – 1pm'
      }
    },
    juniors: {
      title: 'Juniors (8–11)',
      description: 'Engaging activities for growing minds',
      programmes: ['Quran Intensive (8–16 years)', 'Summer Camp (4–11 years)', 'Super Saturday (4–16 years)'],
      timetable: {
        weekdays: '9am – 12pm',
        weekends: '10am – 1pm'
      }
    },
    teens: {
      title: 'Teens (12–16)',
      description: 'Advanced learning and character building',
      programmes: ['Quran Intensive (8–16 years)', 'Super Saturday (4–16 years)'],
      timetable: {
        weekdays: '9am – 12pm',
        weekends: '10am – 1pm'
      }
    }
  };

  // Timetable grid config
  const timetableColors = {
    'Early start': '#f4a6c1',
    'Qur\u2019an Intensive': '#fff799',
    'Quran Intensive': '#fff799',
    'Summer Camp Morning': '#ea4f45',
    'Summer Camp Afternoon': '#ea4f45',
    'Lunch Break': '#4da6ff',
    'Late finish': '#f4a6c1',
    'Super Saturday': '#4caf50',
  };
  const timetableHours = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
  const timetableDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const headerBg = '#ff9800';
  const headerText = '#fff';
  const timeBg = '#ff9800';
  const timeText = '#fff';
  const borderColor = '#e0e0e0';

  // Each block: [rowStart, colStart, rowSpan, colSpan, label]
  // colStart: 1=Mon, 2=Tue, ..., 5=Fri, 6=Sat
  const timetableData = {
    kids: [
      [2, 1, 1, 5, 'Early start'], // 08:00–09:00, Mon–Fri
      [3, 1, 2, 5, 'Summer Camp Morning'], // 09:00–11:00, Mon–Fri
      [5, 1, 2, 5, 'Qur\u2019an Intensive'], // 11:00–13:00, Mon–Fri
      [7, 1, 1, 5, 'Lunch Break'], // 13:00–14:00, Mon–Fri
      [8, 1, 2, 5, 'Summer Camp Afternoon'], // 14:00–16:00, Mon–Fri
      [10, 1, 1, 5, 'Late finish'], // 16:00–17:00, Mon–Fri
      [2, 6, 9, 1, 'Super Saturday'], // 08:00–16:00, Sat only
    ],
    juniors: [
      [2, 1, 1, 5, 'Early start'],
      [3, 1, 2, 5, 'Summer Camp Morning'],
      [5, 1, 2, 5, 'Qur\u2019an Intensive'], // 11:00–13:00, Mon–Fri
      [7, 1, 1, 5, 'Lunch Break'],
      [8, 1, 2, 5, 'Summer Camp Afternoon'],
      [10, 1, 1, 5, 'Late finish'],
      [2, 6, 9, 1, 'Super Saturday'],
    ],
    teens: [
      [2, 1, 1, 5, 'Early start'],           // 08:00–09:00
      [3, 1, 3, 5, 'Qur\u2019an Intensive'], // 09:00–12:00
      [2, 6, 9, 1, 'Super Saturday'],        // 08:00–16:00, Sat only
    ],
  };

  const AgeGroupTimetableDisplay = ({ ageGroup }) => {
    // Helper: for Saturday, only render Super Saturday at 09:00 with rowSpan=9
    const superSaturday = timetableData[ageGroup].find(
      ([rowStart, colStart, rowSpan, colSpan, label]) =>
        label === 'Super Saturday'
    );
    return (
      <div className="overflow-x-auto w-full flex justify-center">
        <div
          className="shadow-2xl rounded-2xl bg-white p-4"
          style={{ minWidth: 370, maxWidth: 900 }}
        >
          <div
            className="grid"
            style={{
              display: 'grid',
              gridTemplateColumns: `70px repeat(6, 1fr)`,
              gridTemplateRows: `40px repeat(10, 1fr)`,
              gap: '2px',
              background: borderColor,
              borderRadius: 16,
              border: `1.5px solid ${borderColor}`,
            }}
          >
            {/* Day header row */}
            <div style={{ background: timeBg, border: `1.5px solid ${borderColor}` }} />
            {timetableDays.map((day, i) => (
              <div
                key={day}
                className="flex items-center justify-center font-bold text-xs md:text-sm uppercase"
                style={{
                  background: headerBg,
                  color: headerText,
                  border: `1.5px solid ${borderColor}`,
                  borderTopRightRadius: i === timetableDays.length - 1 ? 16 : 0,
                  borderTopLeftRadius: i === 0 ? 0 : 0,
                  height: 40,
                  letterSpacing: 1,
                }}
              >
                {day}
              </div>
            ))}
            {/* Time column (leftmost) */}
            {timetableHours.map((hour, rowIdx) => (
              <div
                key={`time-col-${hour}`}
                className="flex items-center justify-center font-semibold text-xs md:text-sm"
                style={{
                  background: timeBg,
                  color: timeText,
                  border: `1.5px solid ${borderColor}`,
                  borderBottomLeftRadius: rowIdx === timetableHours.length - 1 ? 16 : 0,
                  height: 40,
                  fontWeight: 700,
                  letterSpacing: 1,
                  gridColumn: 1,
                  gridRow: rowIdx + 2,
                }}
              >
                {hour}
              </div>
            ))}
            {/* Timetable grid (Mon–Sat, no hour labels) */}
            {timetableHours.map((_, rowIdx) => (
              // For each hour row
              Array.from({ length: 6 }).map((_, colIdx) => {
                // Saturday column special logic
                if (colIdx === 5) {
                  // Super Saturday block fills all of Saturday from 08:00 to 16:00
                  return (
                    <div
                      key={`sat-super-saturday`}
                      className="flex items-center justify-center font-bold text-sm text-center p-1 rounded-md"
                      style={{
                        background: timetableColors['Super Saturday'],
                        color: '#000',
                        textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                        gridColumn: 7,
                        gridRow: '2 / span 9',
                        border: `1.5px solid ${borderColor}`,
                        margin: '2px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      Super Saturday
                    </div>
                  );
                }
                // Saturday at 17:00 is empty
                if (rowIdx === 9) {
                  return <div key={`sat-empty-17`} style={{ background: '#fff', border: `1.5px solid ${borderColor}`, minHeight: 40, gridColumn: 7, gridRow: 11 }} />;
                }
                // Mon–Fri columns
                // Check if a program block starts here
                const block = timetableData[ageGroup].find(
                  ([rowStart, colStart, rowSpan, colSpan, label]) =>
                    rowStart === rowIdx + 2 && colStart === colIdx + 1
                );
                if (block) {
                  const [rowStart, colStart, rowSpan, colSpan, label] = block;
                  return (
                    <div
                      key={`block-${rowIdx}-${colIdx}`}
                      className="flex items-center justify-center font-bold text-center text-xs md:text-sm"
                      style={{
                        gridColumn: colIdx + 2,
                        gridRow: rowIdx + 2,
                        gridRowEnd: `span ${rowSpan}`,
                        gridColumnEnd: `span ${colSpan}`,
                        background: timetableColors[label] || '#eee',
                        color: ['#fff799', '#4caf50'].includes(timetableColors[label]) ? '#222' : '#fff',
                        borderRadius: 8,
                        zIndex: 2,
                        border: '2px solid #fff',
                        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                        minHeight: 40 * rowSpan,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.95em',
                        padding: '0 4px',
                      }}
                    >
                      {label}
                    </div>
                  );
                }
                // Otherwise, render empty cell
                return (
                  <div
                    key={`cell-${rowIdx}-${colIdx}`}
                    style={{ background: '#fff', border: `1.5px solid ${borderColor}`, minHeight: 40, gridColumn: colIdx + 2, gridRow: rowIdx + 2 }}
                  />
                );
              })
            ))}
          </div>
        </div>
      </div>
    );
  };

  const programmes = [
    {
      id: 'quran',
      title: 'Quran Intensive (8–16 years)',
      subtitle: 'BOYS & GIRLS',
      image: quranIntensiveImgNew,
      bulletPoints: [
        'Hifdh and how to memorise like a pro',
        'Revision and consolidation of past surahs',
        "A study of Imam Nawawi's Etiquettes of a Qur'an Carrier",
        'Intensive overview of Tajweed rules with practical application',
        'Team activities to build strong brotherhood/sisterhood'
      ],
      timetable: {
        weekdays: '9am – 12pm',
        weekends: '10am – 1pm'
      }
    },
    {
      id: 'summer-camp',
      title: 'Summer Camp (4–11 years)',
      subtitle: 'BOYS & GIRLS',
      image: summerCampImg,
      bulletPoints: [
        'Islamic manners and etiquettes',
        'Stories of the Prophets and Seerah',
        'Daily Duas and Salah',
        'Qur\'an and Qāʿidah revision',
        'The pillars of Islam and Imaan',
        'Multi-sports and VR games'
      ],
      timetable: {
        weekdays: '9am – 12pm & 1pm – 4pm',
        weekends: '10am – 1pm'
      }
    },
    {
      id: 'super-saturday',
      title: 'Super Saturday (4–16 years)',
      subtitle: 'BOYS & GIRLS',
      image: superSaturdayImgNew,
      bulletPoints: [
        'Stories of the Prophets',
        'Responsibilities of adulthood',
        'Team bonding games',
        'Inner dimensions of Salah',
        'Islamic Arts & crafts'
      ],
      timetable: {
        weekdays: '9am – 12pm',
        weekends: '10am – 1pm'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-blue-50 to-white font-sans">
      {/* Hero Section with Slideshow */}
      <section className="py-20 px-4 text-center flex flex-col items-center justify-center relative min-h-[440px] overflow-hidden">
        {/* Background Images Slideshow */}
        <div className="absolute inset-0 w-full h-full z-0">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 ${
                idx === current && fade ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ backgroundImage: `url('${img}')` }}
              aria-hidden={idx !== current}
            />
          ))}
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Content */}
        <div className="relative z-20 w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">Summer at WIC</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white mb-8 drop-shadow-lg">
            Get ready for a WICKED holiday this summer – only at WIC!<br />
            With inspiring Islamic learning, a dedicated Qur'an programme, fun-packed activities, and a first-ever Islamic Drama Camp, Summer at WIC allows children and teens to use their time meaningfully – growing in faith, confidence, and character while having a WICKED time and a holiday to remember.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link to="/summer/programmes" className="px-8 py-3 rounded-full bg-primary text-white font-bold text-lg shadow hover:bg-primary/90 transition">Full Breakdown of Programmes</Link>
            <Link to="/summer/register" className="px-8 py-3 rounded-full bg-green-500 text-white font-bold text-lg shadow hover:bg-green-600 transition">Start Registration</Link>
            <Link to="/summer/faq" className="px-8 py-3 rounded-full bg-yellow-400 text-black font-bold text-lg shadow hover:bg-yellow-300 transition border-2 border-yellow-600">FAQ – Frequently Asked Questions</Link>
          </div>
        </div>
      </section>

      {/* Poster Section - Made Larger */}
      <section className="w-full bg-white py-12 flex justify-center">
        <img src={newPoster} alt="Summer at WIC Poster" className="max-w-4xl w-full rounded-lg shadow-lg" />
      </section>

      {/* Programme Cards Section - Horizontal Layout */}
      <section id="programmes-preview" className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Summer Programmes</h2>
          <div className="space-y-8">
            {programmes.map((programme) => (
              <div key={programme.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row">
                  {/* Image Section */}
                  <div className="lg:w-1/3 relative">
                    <img 
                      src={programme.image} 
                      alt={programme.title} 
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {programme.subtitle}
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="lg:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-4">{programme.title}</h3>
                      <ul className="space-y-2 text-gray-600 mb-6">
                        {programme.bulletPoints.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Buttons Section */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                      <Link to="/summer/programmes" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                        Find Out More
                      </Link>
                      <Link
                        to="/summer/register"
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Sign Up Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's On For Your Age? Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">What's On For Your Age?</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['kids', 'juniors', 'teens'].map((ageGroup) => (
              <button
                key={ageGroup}
                onClick={() => setActiveAgeGroup(ageGroup)}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  activeAgeGroup === ageGroup
                    ? 'bg-primary text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {ageGroup === 'kids' ? 'Kids (4–7)' : ageGroup === 'juniors' ? 'Juniors (8–11)' : 'Teens (12–16)'}
              </button>
            ))}
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg flex flex-col items-center">
            {activeAgeGroup === 'kids' && (
              <img src={kidsTimetable} alt="Kids Timetable" className="w-full max-w-3xl rounded-lg shadow-md object-contain" style={{height: 'auto'}} />
            )}
            {activeAgeGroup === 'juniors' && (
              <img src={juniorsTimetable} alt="Juniors Timetable" className="w-full max-w-3xl rounded-lg shadow-md object-contain" style={{height: 'auto'}} />
            )}
            {activeAgeGroup === 'teens' && (
              <img src={teensTimetable} alt="Teens Timetable" className="w-full max-w-3xl rounded-lg shadow-md object-contain" style={{height: 'auto'}} />
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">What Parents Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src={testimonial1} 
                alt="Testimonial 1" 
                className="w-full h-auto object-cover"
              />
              <div className="p-4 text-center">
                <p className="text-gray-600 text-sm font-medium">Parent Feedback</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src={testimonial2} 
                alt="Testimonial 2" 
                className="w-full h-auto object-cover"
              />
              <div className="p-4 text-center">
                <p className="text-gray-600 text-sm font-medium">Real Testimonial</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src={testimonial3} 
                alt="Testimonial 3" 
                className="w-full h-auto object-cover"
              />
              <div className="p-4 text-center">
                <p className="text-gray-600 text-sm font-medium">Parent Feedback</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">Gallery from Summer '24</h2>
          <div className="flex flex-col md:flex-row gap-6">
            {[{src: sgalary2, label: 'sgalary2.mp4'}, {src: sgalary3, label: 'sgalary3.mp4'}, {src: sgalary4, label: 'sgalary4.mp4'}].map((video, idx) => (
              video.src ? (
                <video
                  key={video.label}
                  src={video.src}
                  controls
                  autoPlay={false}
                  style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
                  className="rounded-lg shadow-md"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div key={video.label} className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-lg shadow-md text-gray-500 text-lg">
                  Video not available.
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Price Modal */}
      {showPriceModal && selectedProgramme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-primary">
                {getPricingData(selectedProgramme.id).title}
              </h2>
              <button
                onClick={closePriceModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing Breakdown</h3>
              <div className="space-y-3">
                {getPricingData(selectedProgramme.id).pricing.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-700 font-medium">{item.label}</span>
                    <span className="text-primary font-bold text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={closePriceModal}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 