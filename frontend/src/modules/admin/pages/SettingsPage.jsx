import React, { useState, useEffect } from 'react';
import { isPaymentEnabled, setPaymentEnabled } from '../../registration/utils/registrationStore';
import { changeAdminCredentials } from '../utils/adminAuth';
import { CreditCard, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const [paymentConfig, setPaymentConfig] = useState(false);
  
  // Credentials state
  const [currentPassword, setCurrentPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('admin@hellozy.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [pwdStatus, setPwdStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    setPaymentConfig(isPaymentEnabled());
    const storedEmail = localStorage.getItem('hellozy_admin_email');
    if (storedEmail) {
      setAdminEmail(storedEmail);
    }
  }, []);

  const handleTogglePayment = () => {
    const newVal = !paymentConfig;
    setPaymentConfig(newVal);
    setPaymentEnabled(newVal);
  };

  const handleCredentialsChange = (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      setPwdStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }
    
    const success = changeAdminCredentials(currentPassword, adminEmail, newPassword);
    if (success) {
      setPwdStatus({ type: 'success', message: 'Credentials updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPwdStatus({ type: 'error', message: 'Incorrect current password.' });
    }
  };

  return (
    <div className="max-w-3xl space-y-8 text-left">
      {/* Onboarding Configuration Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-stone-900 font-display mb-2">
          Onboarding Configurations
        </h3>
        <p className="text-xs text-stone-500 font-semibold mb-6">
          Toggle launch payment requirements for new drivers, partners, and hospitals.
        </p>

        <div className="flex items-center justify-between p-4 border border-stone-150 rounded-2xl bg-stone-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-accent">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Collect Registration Fee
              </h4>
              <p className="text-[10px] text-stone-500 font-semibold mt-0.5">
                Enable payment screens at the final onboarding checkout step.
              </p>
            </div>
          </div>

          <button
            onClick={handleTogglePayment}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              paymentConfig ? 'bg-accent' : 'bg-stone-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                paymentConfig ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Admin Credentials Change Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-stone-900 font-display mb-2">
          Update Authentication Credentials
        </h3>
        <p className="text-xs text-stone-500 font-semibold mb-6">
          Keep your management email and password secure.
        </p>

        <form onSubmit={handleCredentialsChange} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Admin Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                New Password (Optional)
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={newPassword}
                placeholder="Leave blank to keep current password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                value={confirmPassword}
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {pwdStatus.message && (
            <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              pwdStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-250' : 'bg-red-50 text-red-700 border border-red-250'
            }`}>
              {pwdStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{pwdStatus.message}</span>
            </div>
          )}

          <div className="pt-2 border-t border-stone-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm cursor-pointer inline-flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
