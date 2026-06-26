import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function CancellationPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto w-full text-left">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="border-b border-stone-200 pb-6">
            <h1 className="text-3xl font-extrabold text-primary font-display">Cancellation Policy</h1>
            <p className="text-stone-500 text-xs mt-2">Last Updated: June 26, 2026</p>
          </div>

          <section className="space-y-4 text-stone-750 text-sm md:text-base leading-relaxed">
            <h2 className="text-lg font-bold text-stone-900 font-display">1. Application Cancellation</h2>
            <p>
              Partners can request to cancel their onboarding application at any time prior to approval by contacting onboarding@hellozy.com.
            </p>

            <h2 className="text-lg font-bold text-stone-900 font-display">2. Listing Deactivation</h2>
            <p>
              Once approved, fleet owners can voluntarily choose to temporarily deactivate or permanently delete their listed vehicle from the platform profile configuration screen.
            </p>

            <h2 className="text-lg font-bold text-stone-900 font-display">3. Administrative Deactivation</h2>
            <p>
              Hellozy reserves the right to suspend or cancel any partner listing if verification records show expired insurance, suspended driving licenses, or recurring customer safety complaints.
            </p>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
