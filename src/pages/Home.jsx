import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import HeroSlider from '../components/common/HeroSlider';
import WICProjects from '../components/home/WICProjects';

const quickActions = [
  {
    title: 'Enrol Now',
    description: 'Join our educational programs',
    href: '/enrol',
    icon: '📚',
  },
  {
    title: 'Jummah Salah',
    description: 'Friday prayer times and details',
    href: '/timetable',
    icon: '🕌',
  },
  {
    title: 'Charity Dinner',
    description: 'Support our community events',
    href: '/projects',
    icon: '🍽️',
  },
  {
    title: 'Youth Night',
    description: 'Weekly activities for youth',
    href: '/projects',
    icon: '🌟',
  },
];

const programs = [
  {
    title: 'WIC Library',
    description: 'Access to Islamic literature and resources',
    image: '/images/WIC LIBRARY.png',
    href: '/projects/wic-library',
  },
  {
    title: 'WIC Youth',
    description: 'Empowering the next generation through youth programs and activities.',
    image: '/images/WIC YOUTH.png',
    href: '/projects/wic-youth',
  },
  {
    title: 'WIC FC',
    description: 'Sports and physical activities',
    image: '/images/WIC FC.png',
    href: '/projects/wic-fc',
  },
  {
    title: 'WIC Baby and Mum',
    description: 'Support and activities for mothers and their babies.',
    image: '/images/WIC BABY AND MUM.png',
    href: '/projects/wic-baby-and-mum',
  },
  {
    title: 'WIC Jummah Salah',
    description: 'Weekly congregational Friday prayers for the community.',
    image: '/images/WIC JUMMAH SALAH.png',
    href: '/projects/wic-jummah-salah',
  },
  {
    title: 'WIC Business and Barakah',
    description: 'Business networking and barakah-focused entrepreneurship.',
    image: '/images/WIC BUSINESS AND BARAKAH.png',
    href: '/projects/wic-business-barakah',
  },
  {
    title: 'WIC Over 60s',
    description: 'Social and educational activities for seniors.',
    image: '/images/WIC OVER 60s.png',
    href: '/projects/wic-over-60s',
  },
  {
    title: 'WIC Quran Breakfast Circle',
    description: 'Morning Quran study and breakfast gatherings.',
    image: '/images/WIC QURAN BREAKFAST CIRCLE.png',
    href: '/projects/wic-quran-breakfast-circle',
  },
];

const testimonials = [
  {
    quote: "The best Islamic center I've been to. The teachers are knowledgeable and caring.",
    author: "Ahmed Khan",
    role: "Parent"
  },
  {
    quote: "My children have grown so much in their Islamic knowledge since joining WIC.",
    author: "Fatima Ali",
    role: "Parent"
  },
  {
    quote: "The community here is welcoming and supportive. Truly a second home.",
    author: "Mohammed Rahman",
    role: "Student"
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider />

      {/* WIC Projects Section */}
      <WICProjects />
    </div>
  );
} 