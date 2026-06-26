import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

const JOBS = [
  {
    title: "Partner Verification Associate",
    department: "Operations",
    location: "New Delhi, India (Hybrid)",
    type: "Full-Time",
    salary: "₹4L - ₹6L / annum",
    description: "Responsible for reviewing document submissions (Aadhar, RC, DL, Permits) manually to verify fleet compliance and list partner listings."
  },
  {
    title: "Onboarding Coordinator",
    department: "Partner Relations",
    location: "Dwarka, Delhi (On-site)",
    type: "Full-Time",
    salary: "₹3.5L - ₹5L / annum",
    description: "Support taxi owners, drivers, hospital admins, and influencers through the dynamic step onboarding portal, resolving listing blocks."
  },
  {
    title: "Frontend Support Engineer",
    department: "Engineering",
    location: "Remote (India)",
    type: "Contract / Full-time",
    salary: "₹8L - ₹12L / annum",
    description: "Maintain and optimize user onboarding portals. Experience with React, Vite, Tailwind CSS, and Framer Motion microanimations is highly preferred."
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto w-full text-left">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm font-display">
            Work With Hellozy
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-primary font-display">
            Join Our Mission
          </h1>
          <p className="mt-4 text-stone-600 text-sm md:text-base">
            Help us build safe, secure, and reliable transportation networks. Explore our open positions below.
          </p>
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-6">
          {JOBS.map((job, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3, borderColor: "rgba(232, 93, 4, 0.3)" }}
              className="bg-white border border-stone-200/80 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-all"
            >
              <div className="space-y-3 text-left max-w-xl">
                <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {job.department}
                </span>
                
                <h2 className="text-xl font-bold text-stone-900 font-display">
                  {job.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-semibold">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-stone-400" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-stone-400" /> {job.type}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-stone-400" /> {job.salary}</span>
                </div>
                
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed pt-1">
                  {job.description}
                </p>
              </div>

              <div className="shrink-0 text-left">
                <button className="py-3 px-6 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl transition-colors shadow-sm inline-flex items-center gap-1">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
