import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './modules/landing/pages/LandingPage';
import RegistrationPage from './modules/registration/pages/RegistrationPage';
import SuccessScreen from './modules/registration/components/shared/SuccessScreen';
import RegistrationsView from './modules/admin/components/RegistrationsView';
import AboutPage from './modules/landing/pages/AboutPage';
import FaqsPage from './modules/landing/pages/FaqsPage';
import BlogPage from './modules/landing/pages/BlogPage';
import ContactPage from './modules/landing/pages/ContactPage';
import TermsPage from './modules/landing/pages/TermsPage';
import PrivacyPage from './modules/landing/pages/PrivacyPage';
import RefundPage from './modules/landing/pages/RefundPage';
import CancellationPage from './modules/landing/pages/CancellationPage';
import Lenis from 'lenis';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/register/success" element={<SuccessScreen />} />
        <Route path="/admin/registrations" element={<RegistrationsView />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/cancellation" element={<CancellationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


