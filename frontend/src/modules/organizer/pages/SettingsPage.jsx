import React, { useState, useEffect } from 'react';
import { updateOrganizerCredentials } from '../../registration/utils/registrationStore';
import { KeyRound, ShieldAlert, CheckCircle, Building2 } from 'lucide-react';

export default function SettingsPage() {
  const [organizer, setOrganizer] = useState(null);

  // Account Settings States
  const [accCurrentPass, setAccCurrentPass] = useState('');
  const [accOwnerName, setAccOwnerName] = useState('');
  const [accNewEmail, setAccNewEmail] = useState('');
  const [accNewPass, setAccNewPass] = useState('');
  const [accConfirmPass, setAccConfirmPass] = useState('');
  const [accMobile, setAccMobile] = useState('');
  const [accAltMobile, setAccAltMobile] = useState('');
  const [accWhatsapp, setAccWhatsapp] = useState('');
  const [accFirmName, setAccFirmName] = useState('');
  const [accAddress, setAccAddress] = useState('');

  // Bank Info
  const [accBankName, setAccBankName] = useState('');
  const [accBankAccNo, setAccBankAccNo] = useState('');
  const [accBankAccType, setAccBankAccType] = useState('Saving');
  const [accBankIfsc, setAccBankIfsc] = useState('');

  const [accStatus, setAccStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const session = localStorage.getItem('hellozy_active_organizer');
    if (session) {
      const orgData = JSON.parse(session);
      setOrganizer(orgData);

      setAccOwnerName(orgData.ownerName || '');
      setAccNewEmail(orgData.email || '');
      setAccMobile(orgData.mobile || '');
      setAccAltMobile(orgData.altMobile || '');
      setAccWhatsapp(orgData.whatsapp || '');
      setAccFirmName(orgData.firmName || '');
      setAccAddress(orgData.address || '');

      const bank = orgData.bankDetails || {};
      setAccBankName(bank.bankName || '');
      setAccBankAccNo(bank.accountNo || '');
      setAccBankAccType(bank.accountType || 'Saving');
      setAccBankIfsc(bank.ifscCode || '');
    }
  }, []);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (!accCurrentPass) {
      setAccStatus({ type: 'error', message: 'Current password is required to save changes.' });
      return;
    }
    if (accCurrentPass !== organizer.password) {
      setAccStatus({ type: 'error', message: 'Current password is incorrect.' });
      return;
    }
    if (accNewPass && accNewPass !== accConfirmPass) {
      setAccStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }

    const updates = {
      ownerName: accOwnerName,
      email: accNewEmail,
      mobile: accMobile,
      altMobile: accAltMobile,
      whatsapp: accWhatsapp,
      firmName: accFirmName,
      address: accAddress,
      bankDetails: {
        bankName: accBankName,
        accountNo: accBankAccNo,
        accountType: accBankAccType,
        ifscCode: accBankIfsc,
        passbookDoc: organizer.bankDetails?.passbookDoc || null
      }
    };
    if (accNewPass) updates.password = accNewPass;

    const updated = updateOrganizerCredentials(organizer.id, updates);
    if (updated) {
      localStorage.setItem('hellozy_active_organizer', JSON.stringify(updated));
      setOrganizer(updated);
      setAccStatus({ type: 'success', message: 'Profile details updated successfully!' });
      setAccCurrentPass('');
      setAccNewPass('');
      setAccConfirmPass('');
      setTimeout(() => setAccStatus({ type: '', message: '' }), 3000);
    } else {
      setAccStatus({ type: 'error', message: 'Failed to save changes. Try again.' });
    }
  };

  if (!organizer) return null;

  return (
    <div className="space-y-8 text-left max-w-3xl">
      <div>
        <h2 className="text-2xl font-extrabold text-primary font-display">Account Settings</h2>
        <p className="text-xs text-stone-500 font-semibold mt-1">Configure profile coordinates, WhatsApp contact, bank routes, and credentials.</p>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-6 text-xs">
        
        {/* Verification Check */}
        <div className="space-y-1 bg-stone-50/50 p-4 border border-stone-150 rounded-2xl">
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Verify Current Password *</label>
          <input
            type="password"
            value={accCurrentPass}
            onChange={(e) => setAccCurrentPass(e.target.value)}
            required
            placeholder="Confirm account ownership password"
            className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent bg-white"
          />
        </div>

        {/* Basic profile info */}
        <div className="pt-2 space-y-4">
          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider border-b pb-1">Owner & Firm Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Owner Name</label>
              <input type="text" value={accOwnerName} onChange={(e) => setAccOwnerName(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Firm / Organization Name</label>
              <input type="text" value={accFirmName} onChange={(e) => setAccFirmName(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Login Email</label>
              <input type="email" value={accNewEmail} onChange={(e) => setAccNewEmail(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Mobile Number</label>
              <input type="text" value={accMobile} onChange={(e) => setAccMobile(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Alt Mobile</label>
              <input type="text" value={accAltMobile} onChange={(e) => setAccAltMobile(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">WhatsApp Number</label>
              <input type="text" value={accWhatsapp} onChange={(e) => setAccWhatsapp(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Complete Address</label>
              <textarea rows="2" value={accAddress} onChange={(e) => setAccAddress(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
            </div>
          </div>
        </div>

        {/* Bank info details */}
        <div className="pt-2 space-y-4">
          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider border-b pb-1">Payout Bank Routing</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Bank Name</label>
              <input type="text" value={accBankName} onChange={(e) => setAccBankName(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Account Number</label>
              <input type="text" value={accBankAccNo} onChange={(e) => setAccBankAccNo(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Account Type</label>
              <select value={accBankAccType} onChange={(e) => setAccBankAccType(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-600 focus:outline-none focus:border-accent bg-white cursor-pointer">
                <option value="Saving">Saving Account</option>
                <option value="Current">Current Account</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">IFSC Code</label>
              <input type="text" value={accBankIfsc} onChange={(e) => setAccBankIfsc(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
            </div>
          </div>
        </div>

        {/* Change password (optional) */}
        <div className="pt-2 space-y-4">
          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider border-b pb-1">Reset Password (Optional)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">New Password</label>
              <input type="password" value={accNewPass} onChange={(e) => setAccNewPass(e.target.value)} placeholder="Leave blank to keep current" className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Confirm New Password</label>
              <input type="password" value={accConfirmPass} onChange={(e) => setAccConfirmPass(e.target.value)} placeholder="Confirm new password" className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
            </div>
          </div>
        </div>

        {accStatus.message && (
          <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            accStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-250' : 'bg-red-50 text-red-700 border border-red-250'
          }`}>
            {accStatus.type === 'success' ? <CheckCircle size={16} /> : <ShieldAlert size={16} />}
            <span>{accStatus.message}</span>
          </div>
        )}

        <div className="pt-4 border-t flex justify-end">
          <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5">
            <KeyRound size={14} /> Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}
