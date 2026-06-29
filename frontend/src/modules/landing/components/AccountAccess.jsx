import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserCheck } from 'lucide-react';

export default function AccountAccess() {
  return (
    <section className="py-24 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary to-primary-light rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -mr-20 -mt-20"></div>

        <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 text-left">
            <span className="bg-white/20 text-white border border-white/10 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
              Account Access
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl leading-tight mb-4">
              Manage everything from your dashboard.
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-6 leading-relaxed">
              Login to Hellozy to track active bookings, manage refunds, check transaction history, and reach out to our 24/7 customer support team instantly.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4 w-full">
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <span>Go to Login</span>
              <ArrowRight size={18} />
            </Link>
            <a 
              href="#register" 
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-6 rounded-xl border border-white/20 transition-all"
            >
              <UserCheck size={18} className="mr-1.5" />
              <span>Create Account</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
