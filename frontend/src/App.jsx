import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './modules/landing/pages/LandingPage';
import RegistrationPage from './modules/registration/pages/RegistrationPage';
import SuccessScreen from './modules/registration/components/shared/SuccessScreen';
import AboutPage from './modules/landing/pages/AboutPage';
import FaqsPage from './modules/landing/pages/FaqsPage';
import BlogPage from './modules/landing/pages/BlogPage';
import ContactPage from './modules/landing/pages/ContactPage';
import TermsPage from './modules/landing/pages/TermsPage';
import PrivacyPage from './modules/landing/pages/PrivacyPage';
import RefundPage from './modules/landing/pages/RefundPage';
import CancellationPage from './modules/landing/pages/CancellationPage';
import Lenis from 'lenis';

// Admin panel routing imports
import AdminRoutes from './modules/admin/routes/AdminRoutes';
import AdminLayout from './modules/admin/components/AdminLayout';
import AdminLoginPage from './modules/admin/pages/AdminLoginPage';
import DashboardPage from './modules/admin/pages/DashboardPage';
import RegistrationsPage from './modules/admin/pages/RegistrationsPage';
import SettingsPage from './modules/admin/pages/SettingsPage';
import AdminOrganizersPage from './modules/admin/pages/AdminOrganizersPage';
import AdminEventTypesPage from './modules/admin/pages/AdminEventTypesPage';
import AdminBookingsPage from './modules/admin/pages/AdminBookingsPage';

// Organizer and Booking imports
import EventBookingPage from './modules/landing/pages/EventBookingPage';
import OrganizerRoutes from './modules/organizer/routes/OrganizerRoutes';
import OrganizerLayout from './modules/organizer/components/OrganizerLayout';
import OrganizerLoginPage from './modules/organizer/pages/OrganizerLoginPage';
import OrganizerDashboardPage from './modules/organizer/pages/DashboardPage';
import OrganizerEventsPage from './modules/organizer/pages/EventsPage';
import OrganizerApplicantsPage from './modules/organizer/pages/ApplicantsPage';
import OrganizerEarningsPage from './modules/organizer/pages/EarningsPage';
import OrganizerSettingsPage from './modules/organizer/pages/SettingsPage';
import UnifiedLoginPage from './modules/landing/pages/UnifiedLoginPage';

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
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
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
        <Route path="/login" element={<UnifiedLoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/register/success" element={<SuccessScreen />} />
        
        {/* Admin Section */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<AdminRoutes />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<DashboardPage />} />
            <Route path="/admin/registrations" element={<RegistrationsPage />} />
            <Route path="/admin/organizers" element={<AdminOrganizersPage />} />
            <Route path="/admin/event-types" element={<AdminEventTypesPage />} />
            <Route path="/admin/bookings" element={<AdminBookingsPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Organizer Section & Seat Booking */}
        <Route path="/event-registration" element={<EventBookingPage />} />
        <Route path="/organizer/login" element={<OrganizerLoginPage />} />
        <Route element={<OrganizerRoutes />}>
          <Route element={<OrganizerLayout />}>
            <Route path="/organizer" element={<OrganizerDashboardPage />} />
            <Route path="/organizer/events" element={<OrganizerEventsPage />} />
            <Route path="/organizer/applicants" element={<OrganizerApplicantsPage />} />
            <Route path="/organizer/earnings" element={<OrganizerEarningsPage />} />
            <Route path="/organizer/settings" element={<OrganizerSettingsPage />} />
          </Route>
        </Route>

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


