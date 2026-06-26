import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function RefundPage() {
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
            <h1 className="text-3xl font-extrabold text-primary font-display">Refund Policy</h1>
            <p className="text-stone-500 text-xs mt-2">Last Updated: June 26, 2026</p>
          </div>

          <section className="space-y-4 text-stone-750 text-sm md:text-base leading-relaxed">
            <h2 className="text-lg font-bold text-stone-900 font-display">1. Promotional Onboarding</h2>
            <p>
              Onboarding and partner listings are free under current launch promotions. No fees are collected, and thus no refunds are applicable for free promotional listings.
            </p>

            <h2 className="text-lg font-bold text-stone-900 font-display">2. Registration Fees (If Enabled)</h2>
            <p>
              Should the platform enable security listing fees in the future:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Listing fees are non-refundable once the manual verification process has begun.</li>
              <li>If an application is rejected due to invalid documents or non-compliance prior to verification, the listing fee may be processed for refund (minus convenience charges) within 7-10 working days.</li>
            </ul>

            <h2 className="text-lg font-bold text-stone-900 font-display">3. Payment Disputes</h2>
            <p>
              For any duplicate charges, transaction failures, or payment discrepancies, please contact our billing desk at billing@hellozy.com with your transaction ID and details.
            </p>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
