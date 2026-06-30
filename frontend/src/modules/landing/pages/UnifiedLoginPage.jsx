import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ShieldAlert, KeyRound, Mail, ArrowLeft, Sparkles } from 'lucide-react';
import { login as authenticateAdmin } from '../../admin/utils/adminAuth';
import { authenticateOrganizer } from '../../registration/utils/registrationStore';

export default function UnifiedLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simulate small network delay for premium feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    // 1. Check Admin Credentials
    const isAdmin = authenticateAdmin(email, password);
    if (isAdmin) {
      setLoading(false);
      navigate('/admin', { replace: true });
      return;
    }

    // 2. Check Organizer Credentials
    const organizer = authenticateOrganizer(email, password);
    if (organizer) {
      localStorage.setItem('hellozy_active_organizer', JSON.stringify(organizer));
      setLoading(false);
      navigate('/organizer', { replace: true });
      return;
    }

    // ----------------------------------------------------
    // Extensibility: Hook up future role authentications here
    // ----------------------------------------------------
    // 3. Check Driver Credentials
    // const driver = authenticateDriver(email, password);
    // if (driver) {
    //   localStorage.setItem('hellozy_active_driver', JSON.stringify(driver));
    //   navigate('/driver', { replace: true });
    //   return;
    // }
    //
    // 4. Check Hospital Credentials
    // const hospital = authenticateHospital(email, password);
    // if (hospital) {
    //   localStorage.setItem('hellozy_active_hospital', JSON.stringify(hospital));
    //   navigate('/hospital', { replace: true });
    //   return;
    // }

    // If no credentials match, trigger error & shake animation
    setError(true);
    setShake(true);
    setLoading(false);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-stone-950 px-4 relative overflow-hidden font-sans select-none">
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(232,93,4,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(61,35,20,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-400 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to website
        </Link>
      </div>

      <motion.div 
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#1c1917] bg-stone-900/95 border border-stone-850 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 backdrop-blur-xl"
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-4 animate-pulse">
            <Sparkles size={10} /> Portal Access
          </div>
          <h2 className="text-2xl font-extrabold text-white font-display tracking-tight">
            Welcome to Hellozy
          </h2>
          <p className="text-stone-450 text-xs mt-1.5 font-semibold">
            Enter your credentials to access your dashboard
          </p>
        </div>

        {/* Unified Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-extrabold tracking-wider uppercase text-stone-400 flex items-center gap-1.5">
              <Mail size={12} className="text-stone-500" /> Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. admin@hellozy.com"
              className="w-full px-4 py-3 bg-stone-900/60 border border-stone-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent placeholder:text-stone-700 font-semibold"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-extrabold tracking-wider uppercase text-stone-400 flex items-center gap-1.5">
              <KeyRound size={12} className="text-stone-500" /> Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-stone-900/60 border border-stone-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent placeholder:text-stone-700 tracking-widest font-semibold"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              required
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 p-3 bg-red-950/40 border border-red-900/30 rounded-xl text-xs text-red-400 font-semibold text-left"
            >
              <ShieldAlert size={16} className="shrink-0" />
              <span>Invalid login credentials. Please double check and try again.</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-accent/15 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2500/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              <>
                <Lock size={13} /> Access Account Portal
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-stone-500 font-semibold">
            By logging in, you agree to our terms of service.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
