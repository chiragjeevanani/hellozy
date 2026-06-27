import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AdBannerCarousel from '../components/AdBannerCarousel';
import Services from '../components/Services';
import EventHighlight from '../components/EventHighlight';
import Benefits from '../components/Benefits';
import RegistrationCTA from '../components/RegistrationCTA';
import AccountAccess from '../components/AccountAccess';
import Community from '../components/Community';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <AdBannerCarousel />
        <Services />
        <EventHighlight />
        <Benefits />
        <RegistrationCTA />
        <AccountAccess />
        <Community />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

