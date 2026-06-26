import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-24 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center bg-accent/5 border border-accent/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="p-3 bg-accent/10 text-accent rounded-2xl mb-6">
            <Mail size={32} />
          </div>
          <p className="text-accent font-bold uppercase tracking-wider text-sm mb-3">
            GET TO ACCESS
          </p>
          <h2 className="font-display font-black text-3xl text-primary mb-4">
            Subscribe Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8 text-sm md:text-base leading-relaxed">
            Stay in the loop! Subscribe to our newsletter to receive the latest updates, exclusive discounts, and travel guides directly in your inbox.
          </p>

          <form 
            className="w-full flex flex-col sm:flex-row gap-3" 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Successfully subscribed to newsletter!");
            }}
          >
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-grow bg-white border border-gray-200 rounded-xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-accent shadow-sm"
            />
            <button 
              type="submit"
              className="bg-primary hover:bg-primary-light text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/10 transition-all flex items-center justify-center gap-2"
            >
              <span>Subscribe Now</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
