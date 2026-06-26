import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-extrabold text-primary font-display">Privacy Policy</h1>
            <p className="text-stone-500 text-xs mt-2">Last Updated: June 26, 2026</p>
          </div>

          <section className="space-y-4 text-stone-750 text-sm md:text-base leading-relaxed">
            <h2 className="text-lg font-bold text-stone-900 font-display">1. Information Collection</h2>
            <p>
              We collect personal details necessary for verification, including names, email addresses, contact numbers, and identification documents (Aadhar, RC, DL).
            </p>

            <h2 className="text-lg font-bold text-stone-900 font-display">2. Use of Information</h2>
            <p>
              Information marked as **Admin Only** (e.g. model numbers, engine/chassis numbers, financial details, full document images) is used strictly for internal security and manual verification checking. Public profiles will only display necessary data fields (e.g. vehicle number, manufacturer name, color, and driver name/photo).
            </p>

            <h2 className="text-lg font-bold text-stone-900 font-display">3. Contact Privacy & Call Masking</h2>
            <p>
              Hellozy uses virtual number masking for call routing to keep actual mobile numbers hidden from the public and riders, protecting the privacy of our vehicle owners and drivers.
            </p>

            <h2 className="text-lg font-bold text-stone-900 font-display">4. Data Protection</h2>
            <p>
              We implement industry-standard security protocols to store your personal data and documents securely, protecting it from unauthorized access, loss, or alteration.
            </p>

            <h2 className="text-lg font-bold text-stone-900 font-display">5. Your Rights</h2>
            <p>
              You can contact us at customercare@hellozy.com to request access, correction, or deletion of your personal details and listed vehicles.
            </p>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
