import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ShieldAlert, Building2 } from 'lucide-react';
import { authenticateOrganizer } from '../../registration/utils/registrationStore';

export default function OrganizerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const organizer = authenticateOrganizer(email, password);
    if (organizer) {
      localStorage.setItem('hellozy_active_organizer', JSON.stringify(organizer));
      navigate('/organizer', { replace: true });
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 px-4">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(61,35,20,0.4)_0%,rgba(20,20,20,0.9)_100%)] pointer-events-none" />

      <motion.div 
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#0c0a09] bg-stone-950/95 border border-stone-850 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 backdrop-blur-md"
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/15 text-accent mb-4 border border-accent/20">
            <Building2 size={22} />
          </div>
          <h2 className="text-2xl font-extrabold text-white font-display tracking-tight">
            Organizer Portal
          </h2>
          <p className="text-stone-400 text-xs mt-1.5 font-semibold">
            Please log in using your Sub-Admin host credentials.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-extrabold tracking-wider uppercase text-stone-400">
              Host Email ID
            </label>
            <input
              type="email"
              placeholder="e.g. host@firm.com"
              className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-center placeholder:text-stone-700"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-extrabold tracking-wider uppercase text-stone-400">
              Credentials Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-center tracking-widest placeholder:text-stone-700"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-900/30 rounded-xl text-xs text-red-400 font-semibold animate-fade-in text-left">
              <ShieldAlert size={16} className="shrink-0" />
              <span>Invalid organizer credentials. Try again or contact Admin.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-accent/20 cursor-pointer"
          >
            Access Organizer Panel
          </button>
        </form>
      </motion.div>
    </div>
  );
}
