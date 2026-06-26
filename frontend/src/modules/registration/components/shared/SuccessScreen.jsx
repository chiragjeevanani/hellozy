import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function SuccessScreen() {
  const location = useLocation();
  const registrationId = location.state?.registrationId || 'HZ-' + Math.floor(100000 + Math.random() * 900000);
  const type = location.state?.type || 'partner';

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl border border-stone-200/80 shadow-md">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        
        <h2 className="text-2xl font-bold tracking-tight text-primary font-display mb-2">
          Registration Submitted!
        </h2>
        
        <p className="text-stone-500 text-sm mb-6">
          Thank you for choosing to partner with Hellozy. Your application is under review.
        </p>

        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80 text-left space-y-2 mb-8">
          <div className="flex justify-between text-xs">
            <span className="text-stone-400 font-semibold">REGISTRATION ID</span>
            <span className="font-mono font-bold text-stone-800">{registrationId}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-stone-400 font-semibold">STATUS</span>
            <span className="font-semibold text-amber-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Under Review
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-stone-400 font-semibold">FEE PAID</span>
            <span className="font-bold text-emerald-600">₹0.00 (Free Launch Promo)</span>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 border border-stone-200 text-sm font-semibold rounded-xl text-stone-700 bg-white hover:bg-stone-50 transition-colors shadow-xs"
          >
            <Home className="h-4 w-4" />
            Back to Homepage
          </Link>

          <Link
            to="/admin/registrations"
            className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl text-white bg-primary hover:bg-primary-light transition-colors shadow-sm"
          >
            <ShieldCheck className="h-4 w-4" />
            View in Admin Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
