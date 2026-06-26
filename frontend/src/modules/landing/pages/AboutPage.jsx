import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Eye, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full text-left">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm font-display">
            Who We Are
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-primary font-display">
            Empowering Mobility, Securing Journeys
          </h1>
          <p className="mt-6 text-lg text-stone-600 leading-relaxed">
            Hellozy is a next-generation mobility platform dedicated to connecting vehicle owners, transit drivers, and healthcare facilities into one secure, seamless ride network.
          </p>
        </motion.div>

        {/* Vision & Mission Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200/80 shadow-xs"
          >
            <div className="p-3.5 bg-accent/10 text-accent rounded-xl w-fit mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-primary font-display mb-4">Our Vision</h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed">
              To build the most trusted and secure logistics and passenger transit grid in India, making clean, automated rides accessible to everyone, everywhere, at launch-promo zero costs.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200/80 shadow-xs"
          >
            <div className="p-3.5 bg-primary/10 text-primary rounded-xl w-fit mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-primary font-display mb-4">Our Mission</h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed">
              To supply premium verified vehicles, licensed professional drivers, and emergency hospital clinics under a strict manual verification checklist that guarantees passenger safety.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary font-display">Our Core Values</h2>
          <p className="text-stone-600 mt-2 text-sm max-w-lg mx-auto">The guiding principles behind every verification check and partner onboarding.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 text-center">
            <div className="p-3 bg-accent/10 text-accent rounded-full w-fit mx-auto mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 font-display mb-2">Unmatched Safety</h3>
            <p className="text-stone-600 text-xs leading-relaxed">100% manual document verification on Aadhar, RC, DL, and insurance to enforce premium protection.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 text-center">
            <div className="p-3 bg-accent/10 text-accent rounded-full w-fit mx-auto mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 font-display mb-2">Partner Centric</h3>
            <p className="text-stone-600 text-xs leading-relaxed">Providing vehicle owners, drivers, and clinic channels with direct platform listing to boost operational revenue.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 text-center">
            <div className="p-3 bg-accent/10 text-accent rounded-full w-fit mx-auto mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 font-display mb-2">Gold Standard Service</h3>
            <p className="text-stone-600 text-xs leading-relaxed">Rigorous performance reviews and high-quality onboarding checks to maintain clean, premium rides.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
