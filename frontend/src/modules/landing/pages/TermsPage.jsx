import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
            <h1 className="text-3xl font-extrabold text-primary font-display">Terms & Conditions</h1>
            <p className="text-stone-500 text-xs mt-2">Last Updated: June 26, 2026</p>
          </div>

          <section className="space-y-4 text-stone-750 text-sm md:text-base leading-relaxed">
            <h2 className="text-lg font-bold text-stone-900 font-display">1. Acceptance of Terms</h2>
            <p>
              By accessing and registering on the Hellozy platform, you agree to comply with and be bound by these Terms & Conditions. If you do not agree to these terms, please do not register.
            </p>

            <h2 className="text-lg font-bold text-stone-900 font-display">2. Registration and Compliance</h2>
            <p>
              Fleet partners, vehicle owners, drivers, and hospitals must supply complete, accurate, and valid documentation (Aadhar, RC, Driving License, Commercial Permits). Providing false or forged documents will lead to immediate listing suspension and potential legal action.
            </p>

            <h2 className="text-lg font-bold text-stone-900 font-display">3. Document Verification</h2>
            <p>
              Hellozy reserves the right to manually verify all submitted files and profile details. Approval of listings is subject to our sole discretion.
            </p>

            <h2 className="text-lg font-bold text-stone-900 font-display">4. Platform Fees</h2>
            <p>
              Partner registrations are free during the promotional launch period. Should listing fees be introduced or toggled active by administration, details and pricing modifications will be communicated clearly beforehand.
            </p>

            <h2 className="text-lg font-bold text-stone-900 font-display">5. User Conduct</h2>
            <p>
              All partners are expected to maintain professional standards of behavior when dealing with riders, emergency hospitals, and general passengers. Failure to meet standard safety guidelines will result in account review and potential rejection of listings.
            </p>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
