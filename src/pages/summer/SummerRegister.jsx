import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// --- DIAGNOSTIC LOG ---
console.log(
  '[Stripe Frontend] Initializing with Publishable Key:', 
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
// --------------------

const programmeOptions = [
  'Quran Intensive (9am–12pm)',
  'Summer Camp – Morning (9am–12pm)',
  'Summer Camp – Afternoon (1pm–4pm)',
  'Summer Camp – Full Day (9am–4pm)',
  'Super Saturday (10am–1pm)',
];
const minDate = new Date(2025, 6, 24); // 24 July 2025
const maxDate = new Date(2025, 7, 30); // 30 August 2025

const isSunday = (date) => date.getDay() === 0;

// Helper to format date for display
const formatDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// Helper to check if a date is a weekday (Monday-Friday)
const isWeekday = (date) => {
  const day = date.getDay();
  return day >= 1 && day <= 5; // Monday = 1, Friday = 5
};

// Helper to check if a date is a Saturday
const isSaturday = (date) => {
  return date.getDay() === 6; // Saturday = 6
};

// Helper function to get base programme name without timing
const getBaseProgrammeName = (programmeWithTiming) => {
  if (programmeWithTiming.includes('Quran Intensive')) return 'Quran Intensive';
  if (programmeWithTiming.includes('Summer Camp')) {
    if (programmeWithTiming.includes('Morning')) return 'Summer Camp – Morning';
    if (programmeWithTiming.includes('Afternoon')) return 'Summer Camp – Afternoon';
    if (programmeWithTiming.includes('Full Day')) return 'Summer Camp – Full Day';
  }
  if (programmeWithTiming.includes('Super Saturday')) return 'Super Saturday';
  return programmeWithTiming;
};

// Age-based programme eligibility logic
const getEligibleProgrammes = (age) => {
  const numAge = parseInt(age);
  
  if (isNaN(numAge) || numAge < 4 || numAge > 16) {
    return []; // No programmes eligible if age is invalid or outside range
  }
  
  if (numAge >= 4 && numAge <= 7) {
    // Ages 4-7: Summer Camp (all), Super Saturday
    return [
      'Summer Camp – Morning (9am–12pm)',
      'Summer Camp – Afternoon (1pm–4pm)',
      'Summer Camp – Full Day (9am–4pm)',
      'Super Saturday (10am–1pm)',
    ];
  }
  
  if (numAge >= 8 && numAge <= 11) {
    // Ages 8-11: All programmes
    return programmeOptions;
  }
  
  if (numAge >= 12 && numAge <= 16) {
    // Ages 12-16: Quran Intensive, Super Saturday
    return [
      'Quran Intensive (9am–12pm)',
      'Super Saturday (10am–1pm)',
    ];
  }
  
  return [];
};

// Check if age is valid for any programme
const isAgeValid = (age) => {
  const numAge = parseInt(age);
  return !isNaN(numAge) && numAge >= 4 && numAge <= 16;
};

// Get age validation message
const getAgeValidationMessage = (age) => {
  const numAge = parseInt(age);
  if (isNaN(numAge)) return "Please enter a valid age";
  if (numAge < 4 || numAge > 16) return "This programme is only for children aged 4–16";
  return null;
};

// Pricing and discount helpers
const getProgrammePrice = (prog, allProgs) => {
  const baseName = getBaseProgrammeName(prog.name);
  
  if (baseName === 'Quran Intensive') {
    const days = prog.dates.length;
    let subtotal = days * 18;
    
    // Check if 5 weekdays are selected (Monday-Friday)
    const weekdays = prog.dates.filter(date => {
      const day = date.getDay();
      return day >= 1 && day <= 5; // Monday = 1, Friday = 5
    });
    let discount = weekdays.length >= 5 ? subtotal * 0.1 : 0;
    
    return { days, subtotal, discount, total: subtotal - discount };
  }
  
  if (baseName.startsWith('Summer Camp')) {
    // For Summer Camp, need to check if both Morning and Afternoon are selected on the same day
    // Group all Summer Camp progs for this child
    // We'll handle this in the main calculation below
    return { days: prog.dates.length, subtotal: 0, discount: 0, total: 0 };
  }
  
  if (baseName === 'Super Saturday') {
    const sessions = prog.dates.length;
    let subtotal = sessions * 20;
    
    // Check if all 6 Saturday sessions are selected
    let discount = sessions === 6 ? subtotal * 0.1 : 0;
    
    return { days: sessions, subtotal, discount, total: subtotal - discount };
  }
  
  return { days: 0, subtotal: 0, discount: 0, total: 0 };
};

const getChildPricing = (child) => {
  let progs = child.programmes;
  let breakdown = [];
  let totalBeforeDiscounts = 0;
  let fullWeekDiscount = 0;

  // Special handling for Summer Camp
  const campProgs = progs.filter(p => getBaseProgrammeName(p.name).startsWith('Summer Camp'));
  let campDays = {};
  campProgs.forEach(p => {
    const baseName = getBaseProgrammeName(p.name);
    p.dates.forEach(date => {
      const key = date.toDateString();
      if (!campDays[key]) campDays[key] = { morning: false, afternoon: false, early: p.earlyStart, late: p.lateFinish };
      if (baseName === 'Summer Camp – Morning' || baseName === 'Summer Camp – Full Day') campDays[key].morning = true;
      if (baseName === 'Summer Camp – Afternoon' || baseName === 'Summer Camp – Full Day') campDays[key].afternoon = true;
      if (p.earlyStart) campDays[key].early = true;
      if (p.lateFinish) campDays[key].late = true;
    });
  });
  
  let campSubtotal = 0;
  let campDayCount = 0;
  let weekdayCount = 0;
  let campBreakdownDetails = [];
  
  Object.entries(campDays).forEach(([date, info]) => {
    let dayPrice = 0;
    if (info.morning && info.afternoon) dayPrice = 35;
    else if (info.morning || info.afternoon) dayPrice = 18;
    if (info.early) dayPrice += 5;
    if (info.late) dayPrice += 5;
    
    campSubtotal += dayPrice;
    campDayCount++;
    const dateObj = new Date(date);
    if (isWeekday(dateObj)) weekdayCount++;
    
    campBreakdownDetails.push({ 
      date, 
      price: dayPrice, 
      early: info.early, 
      late: info.late, 
      full: info.morning && info.afternoon,
      isWeekday: isWeekday(dateObj)
    });
  });
  
  let campWeekDiscount = 0;
  if (weekdayCount >= 5) {
    campWeekDiscount = campSubtotal * 0.1;
    fullWeekDiscount += campWeekDiscount;
  }
  
  if (campDayCount > 0) {
    breakdown.push({
      name: 'Summer Camp',
      days: campDayCount,
      weekdays: weekdayCount,
      subtotal: campSubtotal,
      discount: campWeekDiscount,
      total: campSubtotal - campWeekDiscount,
      details: campBreakdownDetails
    });
    totalBeforeDiscounts += campSubtotal;
  }

  // Handle other progs
  progs.forEach(p => {
    if (getBaseProgrammeName(p.name).startsWith('Summer Camp')) return;
    
    const { days, subtotal, discount } = getProgrammePrice(p, progs);
    if (days > 0) {
      breakdown.push({
        name: p.name,
        days,
        subtotal,
        discount,
        total: subtotal - discount,
        details: p.dates.map(date => ({ date: date.toDateString(), isWeekday: isWeekday(date) }))
      });
      totalBeforeDiscounts += subtotal;
      fullWeekDiscount += discount;
    }
  });
  
  const total = totalBeforeDiscounts - fullWeekDiscount;
  return { breakdown, totalBeforeDiscounts, fullWeekDiscount, total };
};

const getAllPricing = (children, coupon = '') => {
  const all = children.map(getChildPricing);
  const subtotal = all.reduce((sum, c) => sum + c.totalBeforeDiscounts, 0);
  const fullWeekDiscount = all.reduce((sum, c) => sum + c.fullWeekDiscount, 0);

  const totalAfterWeekDiscount = subtotal - fullWeekDiscount;

  let siblingDiscount = 0;
  if (children.length > 1) {
    siblingDiscount = totalAfterWeekDiscount * 0.05;
  }

  const totalAfterSiblingDiscount = totalAfterWeekDiscount - siblingDiscount;
  
  let couponDiscount = 0;
  if (coupon && coupon.trim().toLowerCase() === 'wic2025') {
    couponDiscount = totalAfterSiblingDiscount * 0.10;
  }

  const grandTotal = totalAfterSiblingDiscount - couponDiscount;

  return { 
    all, 
    subtotal,
    fullWeekDiscount,
    siblingDiscount,
    couponDiscount,
    grandTotal 
  };
};

// Helper to count total sessions for a child
const getChildTotalSessions = (child) => {
  let total = 0;
  // For Summer Camp, count unique days
  const campProgs = child.programmes.filter(p => getBaseProgrammeName(p.name).startsWith('Summer Camp'));
  let campDays = new Set();
  campProgs.forEach(p => p.dates.forEach(date => campDays.add(date.toDateString())));
  total += campDays.size;
  // For other progs, just count dates
  child.programmes.forEach(p => {
    if (!getBaseProgrammeName(p.name).startsWith('Summer Camp')) total += p.dates.length;
  });
  return total;
};

// Helper function to check if Early Start is available for a programme
const isEarlyStartAvailable = (programmeName) => {
  const baseName = getBaseProgrammeName(programmeName);
  return baseName === 'Quran Intensive' || baseName.startsWith('Summer Camp');
};

// Helper function to check if Late Finish is available for a programme
const isLateFinishAvailable = (programmeName) => {
  const baseName = getBaseProgrammeName(programmeName);
  return baseName.startsWith('Summer Camp');
};

// Helper function to check if any programme allows Early Start
const canSelectEarlyStart = (child) => {
  return child.programmes.some(p => isEarlyStartAvailable(p.name));
};

// Helper function to check if any programme allows Late Finish
const canSelectLateFinish = (child) => {
  return child.programmes.some(p => isLateFinishAvailable(p.name));
};

// Helper function to check if a date is valid for a specific programme
const isValidDateForProgramme = (date, programmeName) => {
  const day = date.getDay();
  const start = new Date(2025, 6, 24); // 24 July 2025
  const end = new Date(2025, 7, 30);   // 30 August 2025

  // Check if date is within allowed range and not Sunday
  if (date < start || date > end || day === 0) return false;

  const baseName = getBaseProgrammeName(programmeName);

  // Quran Intensive and Summer Camp: only weekdays (Monday-Friday)
  if (baseName === 'Quran Intensive' || baseName.startsWith('Summer Camp')) {
    return day >= 1 && day <= 5; // Monday = 1, Friday = 5
  }

  // Super Saturday: only Saturdays
  if (baseName === 'Super Saturday') {
    return day === 6; // Saturday = 6
  }

  return false;
};

// Helper function to get excluded dates for a specific programme
const getExcludedDatesForProgramme = (programmeName) => {
  const excludedDates = [];
  const start = new Date(2025, 6, 24); // 24 July 2025
  const end = new Date(2025, 7, 30);   // 30 August 2025
  
  let currentDate = new Date(start);
  
  while (currentDate <= end) {
    if (!isValidDateForProgramme(currentDate, programmeName)) {
      excludedDates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return excludedDates;
};

// Helper function to get day class name for DatePicker styling
const getDayClassName = (date, programmeName, selectedDates) => {
  const baseName = getBaseProgrammeName(programmeName);
  
  // Check if this date is already selected
  const isSelected = selectedDates.some(d => d.toDateString() === date.toDateString());
  if (isSelected) {
    return 'bg-primary text-white rounded-full hover:bg-primary/90';
  }
  
  // Check if this date is valid for the programme
  if (isValidDateForProgramme(date, programmeName)) {
    if (baseName === 'Quran Intensive' || baseName.startsWith('Summer Camp')) {
      return 'bg-blue-50 text-blue-800 hover:bg-blue-100 cursor-pointer';
    } else if (baseName === 'Super Saturday') {
      return 'bg-green-50 text-green-800 hover:bg-green-100 cursor-pointer';
    }
  }
  
  // Invalid dates should be disabled/greyed out
  return 'text-gray-300 cursor-not-allowed';
};

export default function SummerRegister() {
  const formRef = useRef();
  const [step, setStep] = useState(1);
  const [numChildren, setNumChildren] = useState(1);
  const [children, setChildren] = useState([
    { name: '', age: '', programmes: [] },
  ]);
  const [parent, setParent] = useState({ name: '', phone: '', email: '' });
  const [payment, setPayment] = useState('Upfront');
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  // Handlers for each step
  const handleChildChange = (i, field, value) => {
    setChildren((prev) => prev.map((c, idx) => {
      if (idx !== i) return c;
      
      const updatedChild = { ...c, [field]: value };
      
      // If age is being changed, remove programmes that are no longer eligible
      if (field === 'age') {
        const eligibleProgrammes = getEligibleProgrammes(value);
        updatedChild.programmes = c.programmes.filter(p => 
          eligibleProgrammes.includes(p.name)
        );
      }
      
      return updatedChild;
    }));
  };
  const handleNumChildren = (n) => {
    setNumChildren(n);
    setChildren((prev) => {
      const arr = [...prev];
      while (arr.length < n) arr.push({ name: '', age: '', programmes: [] });
      return arr.slice(0, n);
    });
  };
  const handleParentChange = (field, value) => setParent((p) => ({ ...p, [field]: value }));

  const handleCouponChange = (e) => {
    const newCoupon = e.target.value;
    setCoupon(newCoupon);

    if (newCoupon && newCoupon.trim().toLowerCase() !== 'wic2025') {
      setCouponError('Invalid or expired coupon');
    } else {
      setCouponError('');
    }
  };

  // Handlers for dynamic children
  const addChild = () => {
    if (children.length < 5) {
      setChildren([...children, { name: '', age: '', programmes: [] }]);
    }
  };
  const removeChild = (i) => {
    if (children.length > 1) setChildren(children.filter((_, idx) => idx !== i));
  };

  // Programme selection handler
  const handleProgrammeToggle = (childIdx, progName) => {
    setChildren(prev => prev.map((child, idx) => {
      if (idx !== childIdx) return child;
      
      // Check if programme is eligible for this child's age
      const eligibleProgrammes = getEligibleProgrammes(child.age);
      if (!eligibleProgrammes.includes(progName)) {
        return child; // Don't allow selection of ineligible programmes
      }
      
      const exists = child.programmes.find(p => p.name === progName);
      if (exists) {
        // Remove programme
        return { ...child, programmes: child.programmes.filter(p => p.name !== progName) };
      } else {
        // Add programme with properly initialized dates array
        return {
          ...child,
          programmes: [
            ...child.programmes,
            { 
              name: progName, 
              dates: [], 
              earlyStart: false, 
              lateFinish: false 
            }
          ]
        };
      }
    }));
  };

  // Programme-specific handlers
  const handleProgrammeDateSelect = (childIdx, progName, date) => {
    // Validate that the selected date is valid for this programme
    if (!isValidDateForProgramme(date, progName)) {
      return; // Don't allow selection of invalid dates
    }

    setChildren(prev => prev.map((child, idx) => {
      if (idx !== childIdx) return child;
      return {
        ...child,
        programmes: child.programmes.map(p => {
          if (p.name !== progName) return p;
          
          // Ensure dates array exists and is properly initialized
          const dates = Array.isArray(p.dates) ? [...p.dates] : [];
          const dateStr = date.toDateString();
          const existingIndex = dates.findIndex(d => d.toDateString() === dateStr);
          
          if (existingIndex > -1) {
            // Remove date if already selected
            dates.splice(existingIndex, 1);
          } else {
            // Add date if not already selected
            dates.push(new Date(date));
          }
          
          // Sort dates chronologically
          return { ...p, dates: dates.sort((a, b) => a - b) };
        })
      };
    }));
  };

  const handleProgrammeTimeOption = (childIdx, progName, field, value) => {
    setChildren(prev => prev.map((child, idx) => {
      if (idx !== childIdx) return child;
      return {
        ...child,
        programmes: child.programmes.map(p =>
          p.name === progName ? { ...p, [field]: value } : p
        )
      };
    }));
  };

  const generateChildrenBlockHTML = (children) => {
    return children
      .filter(child => child.name && child.age) // Only include children that are filled out
      .map((child, i) => {
        const emoji = i % 2 === 0 ? '👧' : '👦';

        const programmesHTML = child.programmes.map(p => {
          const dates = p.dates.length > 0
            ? p.dates.map(d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })).join(', ')
            : 'N/A';
          return `
            <p>Programme: ${p.name}</p>
            <p>Dates: ${dates}</p>
            <p>Early Start: ${p.earlyStart ? 'Yes' : 'No'}</p>
            <p>Late Finish: ${p.lateFinish ? 'Yes' : 'No'}</p>
          `;
        }).join('');

        return `
          <div>
            <h4>${emoji} Child ${i + 1}</h4>
            <p>Name: ${child.name}</p>
            <p>Age: ${child.age}</p>
            ${programmesHTML}
          </div>
        `;
      })
      .join('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      toast.error('Please accept the Terms & Conditions to proceed.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Prepare EmailJS template parameters
      const { subtotal, siblingDiscount, fullWeekDiscount, couponDiscount, grandTotal } = getAllPricing(children, coupon);
      
      const templateParams = {
        parent_name: parent.name,
        parent_email: parent.email,
        parent_phone: parent.phone,
        payment_method: payment,
        children_block: generateChildrenBlockHTML(children),
        early_start: children.some(c => c.programmes.some(p => p.earlyStart)) ? 'Yes' : 'No',
        late_finish: children.some(c => c.programmes.some(p => p.lateFinish)) ? 'Yes' : 'No',
        lunch_provided: 'No', // Assuming this is not an option in the form
        transport_required: 'No', // Assuming this is not an option in the form
        subtotal: subtotal.toFixed(2),
        has_full_week_discount: fullWeekDiscount > 0,
        full_week_discount: fullWeekDiscount.toFixed(2),
        has_sibling_discount: siblingDiscount > 0,
        sibling_discount: siblingDiscount.toFixed(2),
        has_coupon_discount: couponDiscount > 0,
        coupon_discount: couponDiscount.toFixed(2),
        total_amount: grandTotal.toFixed(2),
        terms_accepted: agree ? 'Yes' : 'No',
        registration_date: new Date().toLocaleDateString('en-GB'),
      };
      
      // 2. Send the registration data via EmailJS
      await emailjs.send(
        'service_pghoqyc',
        'template_w5jzemh',
        templateParams,
        'TmR4Bj4RfWfUyottq'
      );

      // 3. Prepare Stripe payment data
      const paymentOption = payment; // 'upfront' or 'weekly'
      const amount = grandTotal;

      const stripeSessionData = {
        user: {
          parentName: parent.name,
          parentEmail: parent.email,
        },
        amount,
        paymentOption,
        children,
        pricing: getAllPricing(children, coupon)
      };
      localStorage.setItem('stripeSession', JSON.stringify(stripeSessionData));

      // Create Stripe Checkout session
      console.log('[Stripe] Attempting to create checkout session with:', {
        amount,
        email: parent.email,
        paymentOption
      });
      
      const response = await fetch('/.netlify/functions/create-stripe-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          email: parent.email,
          paymentOption
        })
      });
      
      console.log('[Stripe] Server response status:', response.status);
      
      if (!response.ok) {
        // If the server response is not OK, display the error
        const errorData = await response.json().catch(() => ({ error: 'An unknown error occurred' }));
        console.error('[Stripe] Server error response:', errorData);
        throw new Error(errorData.error || `Server error: ${response.status} ${response.statusText}`);
      }

      const session = await response.json();
      console.log('[Stripe] Session created successfully:', session);
      
      // 2. Redirect to the Stripe Checkout URL provided by the server
      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error('Could not retrieve checkout session URL.');
      }

    } catch (err) {
      console.error("Submission Error: ", err);
      setError(err.message || 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white font-sans flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Summer at WIC Registration</h1>
        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Hidden inputs are no longer needed for EmailJS as we use emailjs.send */}
          
          {/* Step 1: Dynamic Children */}
          {step === 1 && (
            <div className="space-y-8">
              <label className="block text-lg font-medium text-gray-700 mb-2">Children Details</label>
              {children.map((child, i) => (
                <div key={i} className="bg-slate-100 rounded-xl shadow mb-8 p-6 relative">
                  <h2 className="font-bold text-xl mb-4">Child {i+1}</h2>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      value={child.name} 
                      onChange={e => handleChildChange(i, 'name', e.target.value)} 
                      required 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md" 
                    />
                    <input 
                      type="number" 
                      placeholder="Age" 
                      value={child.age} 
                      onChange={e => handleChildChange(i, 'age', e.target.value)} 
                      required 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md" 
                    />
                    {child.age && getAgeValidationMessage(child.age) && (
                      <div className="text-red-600 text-sm bg-red-50 p-2 rounded-md">
                        {getAgeValidationMessage(child.age)}
                      </div>
                    )}
                    <div>
                      <label className="block mb-1 font-medium">Programmes</label>
                      {!isAgeValid(child.age) ? (
                        <div className="text-gray-500 text-sm bg-gray-50 p-3 rounded-md">
                          Please enter a valid age (4-16) to see available programmes.
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-4">
                          {getEligibleProgrammes(child.age).map(opt => (
                            <label key={opt} className="inline-flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={!!child.programmes.find(p => p.name === opt)}
                                onChange={() => handleProgrammeToggle(i, opt)}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      
                      {/* Show programmes that are not eligible for this age */}
                      {isAgeValid(child.age) && getEligibleProgrammes(child.age).length < programmeOptions.length && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <div className="text-sm text-gray-600 mb-2">Not available for this age group:</div>
                          <div className="flex flex-wrap gap-2">
                            {programmeOptions
                              .filter(opt => !getEligibleProgrammes(child.age).includes(opt))
                              .map(opt => (
                                <span key={opt} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {opt}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Early Start and Late Finish Options */}
                      {child.programmes.length > 0 && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <label className="block mb-2 font-medium text-sm">Additional Options</label>
                          <div className="flex flex-wrap gap-6">
                            <label className={`inline-flex items-center gap-2 ${!canSelectEarlyStart(child) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                              <input
                                type="checkbox"
                                checked={child.programmes.some(p => p.earlyStart)}
                                onChange={e => {
                                  if (canSelectEarlyStart(child)) {
                                    child.programmes.forEach(p => {
                                      if (isEarlyStartAvailable(p.name)) {
                                        handleProgrammeTimeOption(i, p.name, 'earlyStart', e.target.checked);
                                      }
                                    });
                                  }
                                }}
                                disabled={!canSelectEarlyStart(child)}
                              />
                              <span className="text-sm">Early Start (8am–9am)</span>
                            </label>
                            <label className={`inline-flex items-center gap-2 ${!canSelectLateFinish(child) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                              <input
                                type="checkbox"
                                checked={child.programmes.some(p => p.lateFinish)}
                                onChange={e => {
                                  if (canSelectLateFinish(child)) {
                                    child.programmes.forEach(p => {
                                      if (isLateFinishAvailable(p.name)) {
                                        handleProgrammeTimeOption(i, p.name, 'lateFinish', e.target.checked);
                                      }
                                    });
                                  }
                                }}
                                disabled={!canSelectLateFinish(child)}
                              />
                              <span className="text-sm">Late Finish (4pm–5pm)</span>
                            </label>
                          </div>
                          {(!canSelectEarlyStart(child) || !canSelectLateFinish(child)) && (
                            <p className="text-xs text-gray-600 mt-2">
                              Early Start available only for Quran Intensive and Summer Camp. Late Finish available only for Summer Camp.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    {/* Programmes grid */}
                    {child.programmes.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {child.programmes.map((p, j) => (
                          <div key={p.name} className="border border-slate-200 bg-white rounded-lg shadow p-4 flex flex-col mb-2">
                            <div className="font-semibold text-primary text-lg mb-2">{p.name}</div>
                            <div className="flex flex-col items-center">
                              <div className="w-full flex justify-center">
                                <div className="scale-90 origin-top">
                                  <DatePicker
                                    inline
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    highlightDates={p.dates}
                                    excludeDates={getExcludedDatesForProgramme(p.name)}
                                    filterDate={(date) => isValidDateForProgramme(date, p.name)}
                                    onChange={date => handleProgrammeDateSelect(i, p.name, date)}
                                    selected={null}
                                    dayClassName={date => getDayClassName(date, p.name, p.dates)}
                                    calendarClassName="border border-gray-200 rounded-lg shadow-sm"
                                    popperClassName="z-50"
                                  />
                                </div>
                              </div>
                              {/* Selected Dates Display */}
                              {p.dates?.length > 0 && (
                                <div className="mt-2 p-2 bg-gray-50 rounded-lg w-full">
                                  <h4 className="font-medium mb-1 text-sm">Selected Dates:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {p.dates.map((date, idx) => (
                                      <span 
                                        key={idx}
                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                          isWeekday(date) 
                                            ? 'bg-blue-100 text-blue-800' 
                                            : isSaturday(date)
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-primary/10 text-primary'
                                        }`}
                                      >
                                        {formatDate(date)}
                                        <button
                                          type="button"
                                          onClick={() => handleProgrammeDateSelect(i, p.name, date)}
                                          className="ml-1 hover:opacity-70"
                                        >
                                          ×
                                        </button>
                                      </span>
                                    ))}
                                  </div>
                                  
                                  {/* Show discount information */}
                                  {(() => {
                                    const baseName = getBaseProgrammeName(p.name);
                                    const weekdays = p.dates.filter(isWeekday);
                                    const saturdays = p.dates.filter(isSaturday);
                                    
                                    if (baseName === 'Super Saturday' && saturdays.length === 6) {
                                      return (
                                        <div className="mt-2 p-2 bg-green-100 rounded text-xs text-green-800 font-medium">
                                          🎉 10% discount applied - All 6 Saturday sessions selected!
                                        </div>
                                      );
                                    }
                                    
                                    if ((baseName === 'Quran Intensive' || baseName.startsWith('Summer Camp')) && weekdays.length >= 5) {
                                      return (
                                        <div className="mt-2 p-2 bg-blue-100 rounded text-xs text-blue-800 font-medium">
                                          🎉 10% discount applied - Full week (5 weekdays) selected!
                                        </div>
                                      );
                                    }
                                    
                                    if (baseName === 'Super Saturday' && saturdays.length > 0) {
                                      return (
                                        <div className="mt-2 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
                                          💡 Select all 6 Saturdays for 10% discount
                                        </div>
                                      );
                                    }
                                    
                                    if ((baseName === 'Quran Intensive' || baseName.startsWith('Summer Camp')) && weekdays.length > 0) {
                                      return (
                                        <div className="mt-2 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
                                          💡 Select 5 weekdays for 10% discount
                                        </div>
                                      );
                                    }
                                    
                                    return null;
                                  })()}
                                </div>
                              )}
                              <div className="text-xs text-gray-500 mt-2 mb-2 w-full text-center">
                                <div>Available dates: 24th July to 30th August 2025 (excluding Sundays)</div>
                                <div className="mt-1">
                                  {(() => {
                                    const baseName = getBaseProgrammeName(p.name);
                                    if (baseName === 'Quran Intensive' || baseName.startsWith('Summer Camp')) {
                                      return (
                                        <>
                                          <span className="inline-block w-3 h-3 bg-blue-50 border border-blue-200 mr-1"></span>
                                          Weekdays only (Mon-Fri)
                                        </>
                                      );
                                    } else if (baseName === 'Super Saturday') {
                                      return (
                                        <>
                                          <span className="inline-block w-3 h-3 bg-green-50 border border-green-200 mr-1"></span>
                                          Saturdays only
                                        </>
                                      );
                                    }
                                    return null;
                                  })()}
                                </div>
                                <div className="mt-2 text-xs text-gray-600 font-medium">
                                  {(() => {
                                    const baseName = getBaseProgrammeName(p.name);
                                    if (baseName === 'Quran Intensive' || baseName.startsWith('Summer Camp')) {
                                      return "Please select only weekdays (Monday-Friday)";
                                    } else if (baseName === 'Super Saturday') {
                                      return "Please select only Saturdays";
                                    }
                                    return null;
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Remove Child Button */}
                  {children.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeChild(i)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <div className="flex justify-between items-center">
                <button type="button" onClick={addChild} disabled={children.length >= 5} className="btn btn-outline rounded-full px-6 py-2">Add Child</button>
                <button type="button" onClick={() => setStep(2)} className="btn bg-primary text-white rounded-full px-6 py-2 font-bold hover:bg-primary/90">Next</button>
              </div>
            </div>
          )}
          {/* Step 2: Parent Info */}
          {step === 2 && (
            <div className="space-y-6">
              <input type="text" placeholder="Parent Full Name" value={parent.name} onChange={e => handleParentChange('name', e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              <input type="tel" placeholder="Phone Number" value={parent.phone} onChange={e => handleParentChange('phone', e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              <input type="email" placeholder="Email Address" value={parent.email} onChange={e => handleParentChange('email', e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="btn btn-outline rounded-full px-6 py-2">Back</button>
                <button type="button" onClick={() => setStep(3)} className="btn bg-primary text-white rounded-full px-6 py-2 font-bold hover:bg-primary/90">Next</button>
              </div>
            </div>
          )}
          {/* Step 3: Payment Method */}
          {step === 3 && (
            (() => {
              const allowWeekly = children.some(child => getChildTotalSessions(child) > 5);
              // If payment is set to Weekly but not allowed, reset to Upfront
              if (!allowWeekly && payment === 'Weekly') setPayment('Upfront');
              return (
                <div className="space-y-6">
                  <label className="block text-lg font-medium text-gray-700 mb-2">Payment Method</label>
                  <select value={payment} onChange={e => setPayment(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="Upfront">Upfront</option>
                    {allowWeekly && <option value="Weekly">Weekly</option>}
                  </select>
                  
                  <div className="mt-4">
                    <label htmlFor="coupon" className="block text-lg font-medium text-gray-700 mb-2">Coupon Code</label>
                    <input
                        type="text"
                        id="coupon"
                        value={coupon}
                        onChange={handleCouponChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter coupon code"
                    />
                    {couponError && <p className="text-red-600 text-sm mt-1">{couponError}</p>}
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep(2)} className="btn btn-outline rounded-full px-6 py-2">Back</button>
                    <button type="button" onClick={() => setStep(4)} className="btn bg-primary text-white rounded-full px-6 py-2 font-bold hover:bg-primary/90">Next</button>
                  </div>
                </div>
              );
            })()
          )}
          {/* Step 4: Terms & Agreements */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 flex-wrap md:flex-nowrap">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={e => setAgree(e.target.checked)}
                  className="mt-1 md:mt-0"
                  required
                  id="terms-agree"
                />
                <label htmlFor="terms-agree" className="text-base text-gray-800 leading-relaxed cursor-pointer select-none">
                  I agree to the{' '}
                  <a
                    href="/summer-at-wic/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-700 hover:text-blue-900"
                  >
                    terms and conditions
                  </a>{' '}
                  and understand space is not confirmed until payment is made.
                </label>
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(3)} className="btn btn-outline rounded-full px-6 py-2">Back</button>
                <button 
                  type="button" 
                  disabled={!agree || loading} 
                  onClick={() => setStep(5)}
                  className="btn bg-green-500 text-white rounded-full px-6 py-2 font-bold hover:bg-green-600 disabled:opacity-50"
                >
                  Review
                </button>
              </div>
              {error && <p className="text-red-600 text-center mt-4">{error}</p>}
            </div>
          )}
          {/* Step 5: Summary/Review */}
          {step === 5 && (
            (() => {
              const { all: pricing, subtotal, fullWeekDiscount, siblingDiscount, couponDiscount, grandTotal } = getAllPricing(children, coupon);
              const weeklyAmount = payment === 'Weekly' ? (grandTotal / 3) : 0;
              return (
                <div className="space-y-6 text-center">
                  <h2 className="text-2xl font-bold text-primary mb-4">Review Registration</h2>
                  <div className="bg-blue-50 rounded-lg p-6 text-left">
                    {children.map((c, i) => (
                      <div key={i} className="mb-8 p-4 bg-white rounded-lg border">
                        <div className="font-bold text-xl mb-4 text-primary border-b pb-2">
                          {c.name} (Age {c.age})
                        </div>
                        
                        {pricing[i].breakdown.length === 0 ? (
                          <div className="text-gray-500 italic">No programmes selected</div>
                        ) : (
                          <div className="space-y-3">
                            {pricing[i].breakdown.map((p, j) => (
                              <div key={j} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                  <div className="font-semibold text-primary">✅ {p.name}</div>
                                  <div className="text-sm text-gray-600">
                                    {p.name === 'Super Saturday' ? (
                                      `${p.days} sessions (10am–1pm)`
                                    ) : p.name === 'Quran Intensive' ? (
                                      `${p.days} days (9am–12pm)`
                                    ) : p.name === 'Summer Camp' ? (
                                      `${p.days} days (9am–4pm)`
                                    ) : (
                                      `${p.days} days`
                                    )}
                                  </div>
                                  
                                  {/* Show discount information */}
                                  {p.discount > 0 && (
                                    <div className="text-xs text-green-700 mt-1 font-medium">
                                      {p.name === 'Super Saturday' && p.days === 6 ? (
                                        '🎉 10% off - All 6 sessions booked!'
                                      ) : p.name === 'Quran Intensive' && p.weekdays >= 5 ? (
                                        '🎉 10% off - Full week (5 weekdays) booked!'
                                      ) : p.name === 'Summer Camp' && p.weekdays >= 5 ? (
                                        '🎉 10% off - Full week (5 weekdays) booked!'
                                      ) : (
                                        'Discount applied'
                                      )}
                                    </div>
                                  )}
                                  
                                  {p.details && p.details.length > 0 && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      <div className="font-medium">Selected Dates:</div>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {p.details.map((d, idx) => (
                                          <span key={idx} className={`inline-block px-2 py-1 rounded text-xs ${
                                            d.isWeekday ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
                                          }`}>
                                            {new Date(d.date).toLocaleDateString('en-GB', { 
                                              weekday: 'short', 
                                              day: 'numeric', 
                                              month: 'short' 
                                            })}
                                            {d.full ? ' (Full Day)' : ''}
                                            {d.early ? ' +Early' : ''}
                                            {d.late ? ' +Late' : ''}
                                            {d.isWeekday ? ' (Weekday)' : ''}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="text-right ml-4">
                                  <div className="text-sm text-gray-600">
                                    {p.discount > 0 && (
                                      <div className="line-through">£{p.subtotal.toFixed(2)}</div>
                                    )}
                                  </div>
                                  <div className="font-bold text-lg text-primary">
                                    £{p.total.toFixed(2)}
                                  </div>
                                  {p.discount > 0 && (
                                    <div className="text-xs text-green-700">
                                      -£{p.discount.toFixed(2)} discount
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                            
                            <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                              <span className="font-bold text-lg text-primary">➤ Total for {c.name}:</span>
                              <span className="font-bold text-xl text-primary">£{pricing[i].total.toFixed(2)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="mt-8 p-6 bg-white rounded-lg border">
                      <h3 className="text-xl font-bold text-primary mb-4 text-center">Final Summary</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-lg">
                          <span>Subtotal:</span>
                          <span className="font-bold">£{subtotal.toFixed(2)}</span>
                        </div>
                        
                        {fullWeekDiscount > 0 && (
                          <div className="flex justify-between items-center text-lg text-green-700">
                            <span>➤ Full Week Discount (10%):</span>
                            <span className="font-bold">-£{fullWeekDiscount.toFixed(2)}</span>
                          </div>
                        )}

                        {siblingDiscount > 0 && (
                          <div className="flex justify-between items-center text-lg text-green-700">
                            <span>➤ Sibling Discount (5%):</span>
                            <span className="font-bold">-£{siblingDiscount.toFixed(2)}</span>
                          </div>
                        )}
                        
                        {couponDiscount > 0 && (
                          <div className="flex justify-between items-center text-lg text-green-700">
                            <span>➤ Coupon WIC2025 (10%):</span>
                            <span className="font-bold">-£{couponDiscount.toFixed(2)}</span>
                          </div>
                        )}
                        
                        <div className="border-t pt-3 mt-4">
                          <div className="flex justify-between items-center text-lg font-semibold mb-2">
                            <span>Payment Method:</span>
                            <span className="font-bold">{payment}</span>
                          </div>
                          
                          <div className="flex justify-between items-center text-2xl font-extrabold text-primary">
                            <span>✅ Total:</span>
                            <span>£{grandTotal.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        {payment === 'Weekly' && (
                          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div className="font-bold text-lg text-yellow-800 mb-2">Weekly Payment Plan Selected</div>
                            <div className="text-base text-gray-800 space-y-1">
                              <div>• First payment: <span className="font-bold">£{weeklyAmount.toFixed(2)}</span> (now)</div>
                              <div>• Second payment: <span className="font-bold">£{weeklyAmount.toFixed(2)}</span> (next week)</div>
                              <div>• Third payment: <span className="font-bold">£{weeklyAmount.toFixed(2)}</span> (week after)</div>
                            </div>
                            <div className="text-xs text-gray-500 italic mt-2 flex items-center justify-center gap-1">
                              <span>ℹ️</span> Your card will be charged automatically each week for the next two weeks.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button type="button" onClick={() => setStep(4)} className="btn btn-outline rounded-full px-6 py-2">Back</button>
                    <button 
                      type="submit" 
                      disabled={loading} 
                      className="btn bg-green-500 text-white rounded-full px-6 py-2 font-bold hover:bg-green-600 disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Submit and Pay'}
                    </button>
                  </div>
                  {error && <p className="text-red-600 text-center mt-4">{error}</p>}
                </div>
              );
            })()
          )}
          {/* Step 6: Success */}
          {step === 6 && submitted && (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">Registration Complete!</h2>
              <p className="mb-2">We will email you instructions on how to pay, a medical info form, and the WhatsApp group link.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 