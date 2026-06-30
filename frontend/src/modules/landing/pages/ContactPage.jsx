import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full text-left">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm font-display">
            Contact Us
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-primary font-display">
            Get In Touch
          </h1>
          <p className="mt-4 text-stone-600 text-sm md:text-base max-w-lg mx-auto">
            Have queries, partnership opportunities, or feedback? Send us a message and our support team will respond quickly.
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-white border border-stone-200/85 rounded-3xl p-8 shadow-xs space-y-8"
          >
            <h2 className="text-2xl font-bold text-primary font-display mb-6">Contact Information</h2>

            <div className="flex items-start gap-4 text-left">
              <div className="p-3 bg-accent/10 text-accent rounded-xl shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Call Us</h4>
                <p className="text-stone-800 font-bold mt-1 text-sm sm:text-base">+91 93997 17375</p>
                <p className="text-stone-500 text-xs mt-0.5">Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-left">
              <div className="p-3 bg-accent/10 text-accent rounded-xl shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Email Us</h4>
                <p className="text-stone-800 font-bold mt-1 text-sm sm:text-base">customercare@hellozy.com</p>
                <p className="text-stone-500 text-xs mt-0.5">For fleet queries: onboarding@hellozy.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-left">
              <div className="p-3 bg-accent/10 text-accent rounded-xl shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Our Hub Office</h4>
                <p className="text-stone-800 font-bold mt-1 text-sm sm:text-base">Near idea tower near madan gaurd</p>
                <p className="text-stone-500 text-xs mt-0.5">Manendragarh Distt MCB - 497442</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white border border-stone-200/85 rounded-3xl p-8 shadow-xs"
          >
            <h2 className="text-2xl font-bold text-primary font-display mb-6">Send A Message</h2>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-stone-800">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-3 rounded-xl border border-stone-250 focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent font-semibold text-stone-800 text-sm bg-stone-50/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-stone-800">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ramesh@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-stone-250 focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent font-semibold text-stone-800 text-sm bg-stone-50/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-stone-800">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Partnership inquiry, fleet listing support"
                  className="w-full px-4 py-3 rounded-xl border border-stone-250 focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent font-semibold text-stone-800 text-sm bg-stone-50/30"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-stone-800">Your Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Write your query or details here..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-250 focus:outline-none focus:ring-4 focus:ring-accent/15 focus:border-accent font-semibold text-stone-800 text-sm bg-stone-50/30"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-8 bg-accent hover:bg-accent-hover text-white text-sm font-bold rounded-xl transition-colors shadow-md inline-flex items-center gap-1.5 cursor-pointer"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
