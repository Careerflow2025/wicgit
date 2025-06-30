import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import EnrolPage from './pages/EnrolPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetails';
import SummerHome from './pages/summer/SummerHome';
import SummerBreakdown from './pages/summer/SummerBreakdown';
import SummerRegister from './pages/summer/SummerRegister';
import FAQ from './pages/summer/faq';
import ScrollToTop from './components/common/ScrollToTop';
import DirectoryPage from './pages/DirectoryPage';
import TermsAndConditions from './pages/summer/TermsAndConditions';
import ThankYou from './pages/summer/ThankYou';
import Contact from './pages/Contact';
import { Toaster } from 'react-hot-toast';
import AdminDashboard from './pages/AdminDashboard';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Timetable = lazy(() => import('./pages/Timetable'));
const Enrol = lazy(() => import('./pages/Enrol'));
const SingleProject = lazy(() => import('./pages/SingleProject'));
const WhatIsWIC = lazy(() => import('./pages/WhatIsWIC'));
const WhyChooseWIC = lazy(() => import('./pages/WhyChooseWIC'));
const Volunteer = lazy(() => import('./pages/VolunteerPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicy = lazy(() => import('./pages/policies/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/policies/TermsConditions'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/enrol" element={<Enrol />} />
              <Route path="/enrol-now" element={<EnrolPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
              <Route path="/what-is-wic" element={<WhatIsWIC />} />
              <Route path="/why-choose-wic" element={<WhyChooseWIC />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/policies/privacy" element={<PrivacyPolicy />} />
              <Route path="/policies/terms" element={<TermsConditions />} />
              <Route path="/summer" element={<SummerHome />} />
              <Route path="/summer/programmes" element={<SummerBreakdown />} />
              <Route path="/summer/register" element={<SummerRegister />} />
              <Route path="/summer/faq" element={<FAQ />} />
              <Route path="/directory" element={<DirectoryPage />} />
              <Route path="/summer-at-wic/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 