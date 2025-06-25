import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import images
import summerCampImg from '../../assets/images/Summer Camp (4–11 years).png';
import quranIntensiveImg from '../../assets/images/Quran Intensive (8–16 years).png';
import superSaturdayImg from '../../assets/images/Super Saturday (4–16 years).png';
import kidsTimetable from '../../assets/images/kids Timetable.png';
import juniorsTimetable from '../../assets/images/JUniors timetable (1).png';
import teensTimetable from '../../assets/images/TEENS Timetable.png';

export default function SummerBreakdown() {
  const [activeAgeGroup, setActiveAgeGroup] = useState('kids');
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState(null);

  // Age group timetable data
  const ageGroupTimetables = {
    kids: {
      title: 'Kids (4–7)',
      description: 'Perfect for our youngest attendees',
      programmes: ['Summer Camp (4–11 years)', 'Super Saturday (4–16 years)'],
      timetable: {
        weekdays: '9am – 12pm & 1pm – 4pm',
        weekends: '10am – 1pm'
      }
    },
    juniors: {
      title: 'Juniors (8–11)',
      description: 'Engaging activities for growing minds',
      programmes: ['Quran Intensive (8–16 years)', 'Summer Camp (4–11 years)', 'Super Saturday (4–16 years)'],
      timetable: {
        weekdays: '9am – 12pm & 1pm – 4pm',
        weekends: '10am – 1pm'
      }
    },
    teens: {
      title: 'Teens (12–16)',
      description: 'Advanced learning for young adults',
      programmes: ['Quran Intensive (8–16 years)', 'Super Saturday (4–16 years)'],
      timetable: {
        weekdays: '9am – 12pm',
        weekends: '10am – 1pm'
      }
    }
  };

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
    // Helper: for Saturday, only render Super Saturday at 08:00 with rowSpan=9
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
              gridTemplateColumns: '80px repeat(6, 1fr)',
              gridTemplateRows: '50px repeat(10, 40px)',
              gap: '0px',
              border: `2px solid ${borderColor}`,
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {/* Header row */}
            <div
              style={{
                background: headerBg,
                color: headerText,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px',
                textTransform: 'uppercase',
                gridColumn: '1',
                gridRow: '1',
                borderRight: `1.5px solid ${borderColor}`,
              }}
            >
              Time
            </div>
            {timetableDays.map((day, index) => (
              <div
                key={day}
                style={{
                  background: headerBg,
                  color: headerText,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  gridColumn: index + 2,
                  gridRow: '1',
                  borderRight: index < timetableDays.length - 1 ? `1.5px solid ${borderColor}` : 'none',
                }}
              >
                {day}
              </div>
            ))}

            {/* Time column */}
            {timetableHours.map((hour, index) => (
              <div
                key={hour}
                style={{
                  background: timeBg,
                  color: timeText,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  gridColumn: '1',
                  gridRow: index + 2,
                  borderRight: `1.5px solid ${borderColor}`,
                  borderTop: index > 0 ? `1.5px solid ${borderColor}` : 'none',
                }}
              >
                {hour}
              </div>
            ))}

            {/* Program blocks */}
            {timetableData[ageGroup].map(([rowStart, colStart, rowSpan, colSpan, label], index) => {
              // Skip Super Saturday as it's handled separately
              if (label === 'Super Saturday') return null;
              
              const color = timetableColors[label] || '#e0e0e0';
              return (
                <div
                  key={`${label}-${index}`}
                  style={{
                    background: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    textAlign: 'center',
                    padding: '4px',
                    borderRadius: '6px',
                    margin: '2px',
                    gridColumn: `${colStart + 1} / span ${colSpan}`,
                    gridRow: `${rowStart} / span ${rowSpan}`,
                    border: `1.5px solid ${borderColor}`,
                    color: '#000',
                    textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                  }}
                >
                  {label}
                </div>
              );
            })}

            {/* Saturday column - special handling for Super Saturday */}
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
            {/* Saturday at 17:00 is empty */}
            <div
              key={`sat-empty-17`}
              style={{
                background: '#fff',
                border: `1.5px solid ${borderColor}`,
                minHeight: 40,
                gridColumn: 7,
                gridRow: 11,
              }}
            />
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
      image: quranIntensiveImg,
      intro: 'Recite and memorise like a pro – this summer at WIC. Unlock your child\'s Qur\'anic potential in our focused summer programme designed to inspire and elevate their connection with the Book of Allah.',
      bulletPoints: [
        'Hifdh and how to memorise like a pro',
        'Revision and consolidation of past surahs',
        'Study of Imam Nawawi\'s Etiquettes of a Qur\'an Carrier',
        'Intensive overview of Tajweed rules with practical application',
        'Team activities to build strong brotherhood/sisterhood'
      ],
      description: 'Tailored for boys and girls aged 8–16, with separate male and female teachers. Let this summer be a turning point in your child\'s Qur\'an journey.',
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
      intro: 'A brand new weekday camp designed for our youngest attendees, with flexible AM, PM, or full-day slots. Children will enjoy a dynamic mix of learning and fun in a faith-filled environment.',
      bulletPoints: [
        'Islamic manners and etiquettes',
        'Stories of the Prophets and Seerah',
        'Important daily Duas and Salah',
        'Qur\'an and Qāʿidah revision',
        'The pillars of Islam and Imaan',
        'Multi-sports and activities including archery and VR games'
      ],
      description: 'This is a fun, faith-based environment where young hearts and minds grow through play, learning, and spiritual connection.',
      timetable: {
        weekdays: '9am – 12pm & 1pm – 4pm',
        weekends: '10am – 1pm'
      }
    },
    {
      id: 'super-saturday',
      title: 'Super Saturday (4–16 years)',
      subtitle: 'BOYS & GIRLS',
      image: superSaturdayImg,
      intro: 'Saturdays just wouldn\'t be summer without WIC\'s renowned Saturday Summer Camp! After last year\'s incredible success, Summer Saturdays are back – offering a vibrant, faith-filled morning for Kids, Juniors, and Teens.',
      bulletPoints: [
        'Stories of the Prophets',
        'Responsibilities of adulthood',
        'Team bonding games',
        'Inner dimensions of Salah',
        'Islamic Arts & crafts'
      ],
      description: 'Each session ends with creative, team-building activities that bring the full spirit of summer to life.',
      timetable: {
        weekdays: '9am – 12pm',
        weekends: '10am – 1pm'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-blue-50 to-white font-sans">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-primary relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Summer at WIC
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 drop-shadow-lg max-w-3xl mx-auto">
            Get ready for a <strong>WICKED holiday</strong> this summer – only at WIC!<br />
            With inspiring Islamic learning, a dedicated Qur'an programme, fun-packed activities, and a first-ever Islamic Drama Camp, Summer at WIC allows children and teens to use their time meaningfully – growing in <strong>faith, confidence, and character</strong> while having a <strong>WICKED time and a holiday to remember</strong>.
          </p>
        </div>
      </section>

      {/* Programme Cards Section */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-12">
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
                      <h3 className="text-2xl font-bold text-green-700 mb-4">{programme.title}</h3>
                      
                      {/* Intro Paragraph */}
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {programme.intro}
                      </p>
                      
                      {/* Regular Bullet Points */}
                      {programme.bulletPoints && (
                        <ul className="space-y-2 mb-6 text-gray-700">
                          {programme.bulletPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {/* Description Paragraph */}
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {programme.description}
                      </p>
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex gap-3 flex-wrap mt-6">
                      <Link to="/summer/register" className="px-6 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors">
                        Sign Up Now
                      </Link>
                      <button
                        onClick={() => handlePriceBreakdown(programme)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Price Breakdown
                      </button>
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