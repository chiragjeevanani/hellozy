import React from 'react';
import FormSection from '../shared/FormSection';
import { ShieldCheck, Eye, EyeOff, Edit3 } from 'lucide-react';

export default function Step5_Review({ watch, onEditStep, type, paymentEnabled }) {
  const values = watch();
  const vehicleCategory = values.vehicleCategory || type || 'four-wheeler';
  const isPickup = vehicleCategory === 'pickup';
  const isBus = vehicleCategory === 'bus';
  const isERickshaw = vehicleCategory === 'e-rickshaw' || vehicleCategory === 'three-wheeler';
  const isOwnerDriver = values.isOwnerDriver === 'yes';

  // Render a tiny image/file badge
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
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase" title="Visible to customers">
              <Eye className="w-3 h-3" /> Public
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded font-bold uppercase" title="Only visible to Hellozy staff">
              <EyeOff className="w-3 h-3" /> Admin
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
            Verify Registration Visibility Settings
          </h4>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            Please review the summary below before final submission. Fields tagged with <span className="font-bold text-emerald-600">Public</span> will be visible to your riders, while <span className="font-bold text-stone-500">Admin</span> fields are stored securely and visible only to verification administrators.
          </p>
        </div>
      </div>

      {/* Step 1: Vehicle Info */}
      <FormSection 
        title={
          <div className="flex items-center justify-between w-full pr-4">
            <span>1. Vehicle Information</span>
            <button type="button" onClick={() => onEditStep(0)} className="text-accent hover:text-accent-hover p-1 flex items-center gap-1 text-xs font-bold">
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          {values.vehicleCategory && renderField("Vehicle Category", values.vehicleCategory.replace('-', ' ').toUpperCase(), true)}
          {values.vehicleType && renderField("Vehicle Type", values.vehicleType === 'other' ? (values.customVehicleType || 'Other') : values.vehicleType.replace('-', ' ').toUpperCase(), true)}
          {renderField("Vehicle Number", values.vehicleNumber, true)}
          {renderField("Make / Brand", values.makeName, true)}
          {renderField("Model / Variant", values.modelNumber, false)}
          {renderField("Colour", values.vehicleColor, true)}
          {renderField("Engine Number", values.engineNumber, false)}
          {renderField("Chassis Number", values.chassisNumber, false)}
          {!isERickshaw && renderField("Fuel Type", values.fuelType, false)}
          {!isPickup && renderField("Seating Capacity", values.seatingCapacity, true)}
          {isPickup && renderField("Load Capacity", values.loadCapacity, true)}
          {isPickup && renderField("Load Bed Dimensions", values.dimensions, true)}
          {!isPickup && renderField("Carrier Included", values.carrier?.toUpperCase(), true)}
          {renderField("HSRP Installed", values.hsrp?.toUpperCase(), false)}
          {renderField("Finance / Loan", values.financed?.toUpperCase(), false)}
          {values.financed === 'yes' && (
            <>
              {renderField("Financier Company", values.financierName, false)}
              {renderField("Agreement Date", values.financeDate, false)}
            </>
          )}
          {!isERickshaw && renderField("Commercial Permit Status", values.commercialPermit?.toUpperCase(), false)}
          {values.commercialPermit === 'yes' && (
            <div className="flex justify-between items-center text-sm pt-2">
              <span className="text-stone-500 font-medium">Permit Document</span>
              {renderFileBadge(values.permitDoc)}
            </div>
          )}
        </div>
      </FormSection>

      {/* Step 2: Documents */}
      <FormSection 
        title={
          <div className="flex items-center justify-between w-full pr-4">
            <span>2. Verification Documents (All Admin-Only)</span>
            <button type="button" onClick={() => onEditStep(1)} className="text-accent hover:text-accent-hover p-1 flex items-center gap-1 text-xs font-bold">
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-b border-stone-100 pb-4">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 font-medium">Aadhar Card</span>
              {renderFileBadge(values.aadharDoc)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 font-medium">RC Paper</span>
              {renderFileBadge(values.rcDoc)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 font-medium">Insurance Paper</span>
              {renderFileBadge(values.insuranceDoc)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 font-medium">DL Copy</span>
              {renderFileBadge(values.dlDoc)}
            </div>
            {!isERickshaw && !isBus && (
              <div className="flex justify-between items-center">
                <span className="text-stone-500 font-medium">PUC Slip</span>
                {renderFileBadge(values.pucDoc)}
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-stone-500 font-medium">Agreement</span>
              {renderFileBadge(values.agreementDoc)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 font-medium">Terms & Conditions</span>
              {renderFileBadge(values.tcDoc)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 font-medium">Bank Proof</span>
              {renderFileBadge(values.bankDoc)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 font-medium">Address Photo</span>
              {renderFileBadge(values.addressPhoto)}
            </div>
          </div>

          <div className="space-y-3">
            {renderField("DL Number", values.dlNumber, false)}
            {renderField("DL Issue Date", values.dlIssueDate, false)}
            {renderField("DL Valid Till", values.dlValidityDate, false)}
            {renderField("DL Issuing Authority", values.dlAuthority, false)}
            {renderField("UPI ID", values.upiId, false)}
            {renderField("Has GSTIN", values.hasGst?.toUpperCase(), false)}
            {values.hasGst === 'yes' && renderField("GSTIN ID", values.gstNumber, false)}
          </div>
        </div>
      </FormSection>

      {/* Step 3: Contact/Owner Info */}
      <FormSection 
        title={
          <div className="flex items-center justify-between w-full pr-4">
            <span>3. Owner & Contact Information</span>
            <button type="button" onClick={() => onEditStep(2)} className="text-accent hover:text-accent-hover p-1 flex items-center gap-1 text-xs font-bold">
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          {renderField("Owner Name", values.ownerName, false)}
          {renderField("Owner Address", values.ownerAddress, false)}
          {renderField("Contact Mobile", values.ownerMobile, false)}
          {renderField("WhatsApp Mobile", values.ownerWhatsapp, false)}
          {renderField("Email Address", values.ownerEmail, false)}
          {renderField("ID Mark 1", values.idMark1, false)}
          {renderField("ID Mark 2", values.idMark2, false)}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-500 font-medium">Owner Photo (Admin)</span>
              {renderFileBadge(values.ownerPhoto)}
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-500 font-medium">Vehicle Photo (Public)</span>
              {renderFileBadge(values.vehiclePhoto)}
            </div>
          </div>
        </div>
      </FormSection>

      {/* Step 4: Driver Info */}
      <FormSection 
        title={
          <div className="flex items-center justify-between w-full pr-4">
            <span>4. Driver Information</span>
            <button type="button" onClick={() => onEditStep(isOwnerDriver ? 2 : 3)} className="text-accent hover:text-accent-hover p-1 flex items-center gap-1 text-xs font-bold">
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          {renderField("Owner will drive vehicle?", values.isOwnerDriver?.toUpperCase(), false)}
          
          {!isOwnerDriver ? (
            <>
              {renderField("Driver Name", values.driverName, true)}
              {renderField("Driver Address", values.driverAddress, false)}
              {renderField("Driver Mobile", values.driverMobile, false)}
              {renderField("Driver WhatsApp", values.driverWhatsapp, false)}
              {renderField("Driver DL Number", values.driverDlNumber, false)}
              {renderField("Driver DL Authority", values.driverDlAuthority, false)}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-500 font-medium">Driver Photo (Public)</span>
                  {renderFileBadge(values.driverPhoto)}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-500 font-medium">Driver DL Doc (Admin)</span>
                  {renderFileBadge(values.driverDlDoc)}
                </div>
              </div>
            </>
          ) : (
            <p className="text-xs text-stone-500 italic">
              Owner will drive this vehicle. Owner photo and details will be synced as public driver information.
            </p>
          )}
        </div>
      </FormSection>

      {/* Conditional Step: Payment info */}
      {paymentEnabled && (
        <FormSection title="5. Security Registration Payment Fee">
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 text-center">
            <p className="text-stone-600 text-sm mb-4">
              To activate your registration listing, a token verification fee is required.
            </p>
            <div className="text-3xl font-extrabold text-primary font-display mb-2">
              ₹999.00
            </div>
            <p className="text-xs text-stone-500 mb-6">
              Includes physical high-security checklist, branding kit, and quick verification processing.
            </p>
            <div className="border border-stone-200/80 rounded-xl p-4 bg-white text-left text-xs text-stone-600 flex flex-col gap-1.5 mb-2">
              <div className="flex justify-between font-semibold text-stone-700">
                <span>Verification & Listing Fee</span>
                <span>₹999.00</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Convenience Charge</span>
                <span>₹0.00</span>
              </div>
              <div className="h-px bg-stone-200 my-2"></div>
              <div className="flex justify-between font-bold text-stone-900 text-sm">
                <span>Total Amount Due</span>
                <span>₹999.00</span>
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
