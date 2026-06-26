import React from 'react';
import FormSection from '../shared/FormSection';
import { ShieldCheck, Eye, EyeOff, Edit3 } from 'lucide-react';

export default function Step3_Review({ watch, onEditStep, paymentEnabled }) {
  const values = watch();

  const renderFileBadge = (file) => {
    if (!file) return <span className="text-stone-400 italic">Not Uploaded</span>;
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
        📎 {file.name} ({file.size})
      </span>
    );
  };

  const renderField = (label, value, isPublic = false) => {
    return (
      <div className="border-b border-stone-100 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-2">
        <span className="text-stone-500 font-medium flex items-center gap-1.5">
          {label}
          {isPublic ? (
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase">
              <Eye className="w-3.5 h-3.5" /> Public
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded font-bold uppercase">
              <EyeOff className="w-3.5 h-3.5" /> Admin
            </span>
          )}
        </span>
        <span className="text-stone-900 font-bold text-left sm:text-right">
          {value || <span className="text-stone-400 italic">Not Specified</span>}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
        <div className="text-left">
          <h4 className="text-sm font-bold text-stone-900 font-display">
            Verify Hospital Visibility Settings
          </h4>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            Please review the summary below before final submission. Fields tagged with <span className="font-bold text-emerald-600">Public</span> will be visible to your patients/riders, while <span className="font-bold text-stone-500">Admin</span> fields are stored securely and visible only to verification administrators.
          </p>
        </div>
      </div>

      {/* Step 1: Hospital Details */}
      <FormSection
        title={
          <div className="flex items-center justify-between w-full pr-4">
            <span>1. Hospital / Clinic Profile</span>
            <button type="button" onClick={() => onEditStep(0)} className="text-accent hover:text-accent-hover p-1 flex items-center gap-1 text-xs font-bold">
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          {renderField("Hospital Name", values.hospitalName, true)}
          {renderField("Hospital Address", values.hospitalAddress, true)}
          {renderField("GSTIN Number", values.gstNumber, false)}
          {renderField("PAN Number", values.panNumber, false)}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-500 font-medium">Registration Certificate (Admin)</span>
              {renderFileBadge(values.regCert)}
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-500 font-medium">Entrance Photo (Public)</span>
              {renderFileBadge(values.hospitalPhoto)}
            </div>
          </div>
        </div>
      </FormSection>

      {/* Step 2: Officer/Owner Details */}
      <FormSection
        title={
          <div className="flex items-center justify-between w-full pr-4">
            <span>2. Owner & Administrative Officer Details (All Admin-Only)</span>
            <button type="button" onClick={() => onEditStep(1)} className="text-accent hover:text-accent-hover p-1 flex items-center gap-1 text-xs font-bold">
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Owner / Managing Director
          </h4>
          <div className="space-y-3">
            {renderField("Owner Name", values.ownerName, false)}
            {renderField("Owner Mobile", values.ownerMobile, false)}
            {renderField("Owner Email", values.ownerEmail, false)}
            {renderField("Owner Address", values.ownerAddress, false)}
            <div className="flex justify-between items-center text-sm pt-2">
              <span className="text-stone-500 font-medium">Owner Aadhar Card</span>
              {renderFileBadge(values.ownerAadhar)}
            </div>
            <div className="flex justify-between items-center text-sm pb-4 border-b border-stone-150">
              <span className="text-stone-500 font-medium">Owner Passport Photo</span>
              {renderFileBadge(values.ownerPhoto)}
            </div>
          </div>

          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider pt-2">
            Administrative Officer
          </h4>
          <div className="space-y-3">
            {renderField("Officer Name", values.officerName, false)}
            {renderField("Officer Mobile", values.officerMobile, false)}
            {renderField("Officer Email", values.officerEmail, false)}
            {renderField("Officer Address", values.officerAddress, false)}
            <div className="flex justify-between items-center text-sm pt-2">
              <span className="text-stone-500 font-medium">Officer Aadhar Card</span>
              {renderFileBadge(values.officerAadhar)}
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-500 font-medium">Officer Passport Photo</span>
              {renderFileBadge(values.officerPhoto)}
            </div>
          </div>
        </div>
      </FormSection>

      {/* Conditional Step: Payment info */}
      {paymentEnabled && (
        <FormSection title="3. Security Registration Payment Fee">
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 text-center">
            <p className="text-stone-600 text-sm mb-4">
              To activate your registration listing, a token verification fee is required.
            </p>
            <div className="text-3xl font-extrabold text-primary font-display mb-2">
              ₹1999.00
            </div>
            <p className="text-xs text-stone-500 mb-6">
              Includes physical high-security checklist, emergency portal access, and quick verification processing.
            </p>
            <div className="border border-stone-200/80 rounded-xl p-4 bg-white text-left text-xs text-stone-600 flex flex-col gap-1.5 mb-2">
              <div className="flex justify-between font-semibold text-stone-700">
                <span>Verification & Listing Fee</span>
                <span>₹1999.00</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Convenience Charge</span>
                <span>₹0.00</span>
              </div>
              <div className="h-px bg-stone-200 my-2"></div>
              <div className="flex justify-between font-bold text-stone-900 text-sm">
                <span>Total Amount Due</span>
                <span>₹1999.00</span>
              </div>
            </div>
            <div className="text-[10px] text-accent font-bold text-left bg-accent/5 p-2.5 rounded-lg border border-accent/15">
              ⚠️ In development mode: Clicking submit will process this payment test run automatically.
            </div>
          </div>
        </FormSection>
      )}
    </div>
  );
}
