import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Building2, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginOptionsPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4 md:px-8 max-w-5xl mx-auto w-full flex flex-col justify-center">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/5 text-primary border border-primary/10 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={12} className="text-accent" /> Hellozy Portal Access
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 font-display tracking-tight leading-none">
            Choose Your Account Type
          </h1>
          <p className="text-stone-500 text-xs mt-3 font-semibold leading-relaxed">
            Select the appropriate portal option below to access your dashboard and manage operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Organizer Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-stone-150 rounded-3xl p-8 shadow-xs hover:border-accent/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Building2 size={24} />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-extrabold text-stone-900 font-display leading-tight">
                  Organizer Portal
                </h2>
                <p className="text-[10px] text-accent font-bold uppercase tracking-wider">
                  Event Hosts & Sub-Admins
                </p>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">
                Log in to schedule new events, configure role pricing (Participate, Visitor, Couple, Sponsor), manage registered applicant checkouts, and check your commission earnings payout.
              </p>
            </div>
            
            <div className="pt-8">
              <Link
                to="/organizer/login"
                className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 group-hover:translate-x-0.5 shadow-sm cursor-pointer"
              >
                Access Host Portal <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Admin Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white border-2 border-stone-150 rounded-3xl p-8 shadow-xs hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Shield size={24} />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-extrabold text-stone-900 font-display leading-tight">
                  Administrator Portal
                </h2>
                <p className="text-[10px] text-primary font-bold uppercase tracking-wider">
                  System Admin Control
                </p>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">
                Access control systems to register and verify new organizer credentials, configure platform-wide booking commission rates, review gross transaction summaries, and audit global settings.
              </p>
            </div>

            <div className="pt-8">
              <Link
                to="/admin/login"
                className="w-full py-3.5 bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 group-hover:translate-x-0.5 shadow-sm cursor-pointer"
              >
                Access Admin Portal <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
