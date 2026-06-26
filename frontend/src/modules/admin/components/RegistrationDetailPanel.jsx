import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, FileText, ExternalLink } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function RegistrationDetailPanel({ selected, onClose, onUpdateStatus }) {
  if (!selected) return null;

  const renderDocLink = (label, doc) => {
    if (!doc) return <div className="text-xs text-stone-400 italic">No Uploaded Doc</div>;
    return (
      <div className="flex items-center justify-between p-3 bg-stone-50 border border-stone-200 rounded-xl">
        <div className="text-left">
          <p className="text-xs font-bold text-stone-850 truncate max-w-[160px]">{doc.name}</p>
          <p className="text-[10px] text-stone-500 font-semibold">{doc.size}</p>
        </div>
        <a 
          href={doc.url} 
          target="_blank" 
          rel="noreferrer"
          className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-700 transition-colors"
          title={`Open ${label}`}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  };

  const renderDetailField = (label, val) => (
    <div className="border-b border-stone-150 py-2.5 flex justify-between text-xs sm:text-sm">
      <span className="text-stone-550 font-semibold">{label}</span>
      <span className="text-stone-900 font-bold text-right">{val || <span className="text-stone-400 italic">N/A</span>}</span>
    </div>
  );

  const isVehicle = ['four-wheeler', 'pickup', 'bus', 'e-rickshaw'].includes(selected.type);

  return (
    <div className="bg-white border border-stone-250 rounded-3xl p-6 shadow-md flex flex-col h-full overflow-hidden text-left">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-stone-150 pb-4 shrink-0">
        <div className="text-left">
          <span className="text-[9px] uppercase font-extrabold tracking-wider text-stone-400">REGISTRATION FILE</span>
          <h2 className="text-lg font-bold text-stone-900 font-mono">{selected.id}</h2>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={selected.status} />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-750 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="flex-grow overflow-y-auto pr-1 py-4 space-y-6">
        
        {/* Verification Status Actions */}
        {selected.status === 'Pending' && (
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <button
              onClick={() => onUpdateStatus(selected.id, 'Approved')}
              className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" /> Approve
            </button>
            <button
              onClick={() => onUpdateStatus(selected.id, 'Rejected')}
              className="py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <XCircle className="w-4 h-4" /> Reject
            </button>
          </div>
        )}

        {/* Profile details */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider text-left border-b border-stone-100 pb-1">
            Information Profile
          </h3>
          
          {isVehicle && (
            <>
              {renderDetailField("Vehicle Type", selected.type)}
              {renderDetailField("Vehicle Number", selected.vehicleNumber)}
              {renderDetailField("Make / Brand", selected.makeName)}
              {renderDetailField("Model / Variant", selected.modelNumber)}
              {renderDetailField("Colour", selected.vehicleColor)}
              {renderDetailField("Engine Number", selected.engineNumber)}
              {renderDetailField("Chassis Number", selected.chassisNumber)}
              {selected.fuelType && renderDetailField("Fuel Type", selected.fuelType)}
              {selected.seatingCapacity && renderDetailField("Seating Capacity", selected.seatingCapacity)}
              {selected.loadCapacity && renderDetailField("Load Capacity", selected.loadCapacity)}
              {selected.dimensions && renderDetailField("Load Dimensions", selected.dimensions)}
              {selected.carrier && renderDetailField("Carrier Attached", selected.carrier)}
              {renderDetailField("HSRP Active", selected.hsrp)}
              {renderDetailField("Loan Financed", selected.financed)}
              {selected.financierName && renderDetailField("Financier Company", selected.financierName)}
              
              <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pt-3 text-left border-t border-stone-100">
                Owner Contact Details
              </h4>
              {renderDetailField("Owner Name", selected.ownerName)}
              {renderDetailField("Owner Mobile", selected.ownerMobile)}
              {renderDetailField("Owner WhatsApp", selected.ownerWhatsapp)}
              {renderDetailField("Owner Email ID", selected.ownerEmail)}
              {renderDetailField("DL Number", selected.dlNumber)}
              {renderDetailField("UPI Account", selected.upiId)}
              {renderDetailField("Has GSTIN", selected.hasGst)}
              {selected.gstNumber && renderDetailField("GSTIN Number", selected.gstNumber)}

              <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pt-3 text-left border-t border-stone-100">
                Driver Assignment
              </h4>
              {renderDetailField("Owner will drive?", selected.isOwnerDriver)}
              {selected.isOwnerDriver === 'no' && (
                <>
                  {renderDetailField("Driver Name", selected.driverName)}
                  {renderDetailField("Driver Mobile", selected.driverMobile)}
                  {renderDetailField("Driver WhatsApp", selected.driverWhatsapp)}
                  {renderDetailField("Driver DL ID", selected.driverDlNumber)}
                </>
              )}
            </>
          )}

          {selected.type === 'hospital' && (
            <>
              {renderDetailField("Hospital Name", selected.hospitalName)}
              {renderDetailField("Address", selected.hospitalAddress)}
              {renderDetailField("GSTIN ID", selected.gstNumber)}
              {renderDetailField("PAN ID", selected.panNumber)}
              
              <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pt-3 text-left border-t border-stone-100">
                Hospital Owner Details
              </h4>
              {renderDetailField("Owner Name", selected.ownerName)}
              {renderDetailField("Owner Contact", selected.ownerMobile)}
              {renderDetailField("Owner Email", selected.ownerEmail)}
              {renderDetailField("Owner Address", selected.ownerAddress)}

              <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pt-3 text-left border-t border-stone-100">
                Administrative Person
              </h4>
              {renderDetailField("Admin Name", selected.officerName)}
              {renderDetailField("Admin Contact", selected.officerMobile)}
              {renderDetailField("Admin Email", selected.officerEmail)}
              {renderDetailField("Admin Address", selected.officerAddress)}
            </>
          )}

          {selected.type === 'influencer' && (
            <>
              {renderDetailField("Full Name", selected.name)}
              {renderDetailField("Contact Mobile", selected.mobile)}
              {renderDetailField("Email Address", selected.email)}
              {renderDetailField("Residential Address", selected.address)}
              
              <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pt-3 text-left border-t border-stone-100">
                Social Accounts
              </h4>
              {renderDetailField("Instagram", selected.instagram)}
              {renderDetailField("Facebook", selected.facebook)}
              {renderDetailField("YouTube", selected.youtube)}
              {renderDetailField("Extra Link 1", selected.extraLink1)}
              {renderDetailField("Extra Link 2", selected.extraLink2)}
            </>
          )}
        </div>

        {/* Uploaded Documents List */}
        <div className="space-y-3 pt-4 border-t border-stone-150">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider text-left">
            Uploaded Verification Files
          </h3>
          
          {isVehicle && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {selected.aadharDoc && renderDocLink("Aadhar Copy", selected.aadharDoc)}
              {selected.rcDoc && renderDocLink("RC Document", selected.rcDoc)}
              {selected.insuranceDoc && renderDocLink("Insurance Slip", selected.insuranceDoc)}
              {selected.dlDoc && renderDocLink("DL Copy", selected.dlDoc)}
              {selected.pucDoc && renderDocLink("PUC Slip", selected.pucDoc)}
              {selected.agreementDoc && renderDocLink("Signed Agreement", selected.agreementDoc)}
              {selected.tcDoc && renderDocLink("Signed T&C", selected.tcDoc)}
              {selected.bankDoc && renderDocLink("Bank Details", selected.bankDoc)}
              {selected.addressPhoto && renderDocLink("Address Photo", selected.addressPhoto)}
              {selected.ownerPhoto && renderDocLink("Owner Photo", selected.ownerPhoto)}
              {selected.vehiclePhoto && renderDocLink("Vehicle Photo", selected.vehiclePhoto)}
              {selected.isOwnerDriver === 'no' && selected.driverPhoto && renderDocLink("Driver Photo", selected.driverPhoto)}
              {selected.isOwnerDriver === 'no' && selected.driverDlDoc && renderDocLink("Driver DL Copy", selected.driverDlDoc)}
            </div>
          )}

          {selected.type === 'hospital' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {selected.regCert && renderDocLink("Registration Certificate", selected.regCert)}
              {selected.hospitalPhoto && renderDocLink("Facility Photo", selected.hospitalPhoto)}
              {selected.ownerAadhar && renderDocLink("Owner Aadhar", selected.ownerAadhar)}
              {selected.ownerPhoto && renderDocLink("Owner Passport Photo", selected.ownerPhoto)}
              {selected.officerAadhar && renderDocLink("Officer Aadhar", selected.officerAadhar)}
              {selected.officerPhoto && renderDocLink("Officer Photo", selected.officerPhoto)}
            </div>
          )}

          {selected.type === 'influencer' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {selected.aadharDoc && renderDocLink("Aadhar Doc", selected.aadharDoc)}
              {selected.passportPhoto && renderDocLink("Passport Photo", selected.passportPhoto)}
              {selected.fullPhoto && renderDocLink("Portfolio Photo", selected.fullPhoto)}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
