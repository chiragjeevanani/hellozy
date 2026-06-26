import React, { useState, useEffect } from 'react';
import { getOrganizers, saveOrganizer } from '../../registration/utils/registrationStore';
import { Plus, X, Upload, Building2, User, Phone, Mail, ShieldAlert, CheckCircle, CreditCard, FileText } from 'lucide-react';

export default function AdminOrganizersPage() {
  const [organizers, setOrganizers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [ownerName, setOwnerName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [address, setAddress] = useState('');
  const [firmRegNo, setFirmRegNo] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccNo, setBankAccNo] = useState('');
  const [bankAccType, setBankAccType] = useState('Saving');
  const [bankIfsc, setBankIfsc] = useState('');
  const [mobile, setMobile] = useState('');
  const [altMobile, setAltMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [hasGst, setHasGst] = useState('no');
  const [gstFile, setGstFile] = useState(null);
  const [hasUdyam, setHasUdyam] = useState('no');
  const [udyamFile, setUdyamFile] = useState(null);

  // File states (mocking uploads as names/sizes/local URLs)
  const [firmRegFile, setFirmRegFile] = useState(null);
  const [bankDocFile, setBankDocFile] = useState(null);
  const [passportPicFile, setPassportPicFile] = useState(null);
  const [fullsizePicFile, setFullsizePicFile] = useState(null);

  useEffect(() => {
    setOrganizers(getOrganizers());
  }, []);

  const handleFileChange = (e, setFileState) => {
    const file = e.target.files[0];
    if (file) {
      setFileState({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        url: URL.createObjectURL(file)
      });
    }
  };

  const handleRegisterOrganizer = (e) => {
    e.preventDefault();
    if (!ownerName || !email || !password || !mobile) {
      setErrorMsg('Owner Name, Email, Password, and Mobile are mandatory fields.');
      return;
    }

    const newOrg = {
      ownerName,
      firmName,
      address,
      firmRegNo,
      bankDetails: {
        bankName,
        accountNo: bankAccNo,
        accountType: bankAccType,
        ifscCode: bankIfsc,
        passbookDoc: bankDocFile
      },
      mobile,
      altMobile,
      whatsapp,
      email,
      password,
      hasGst,
      gstDoc: hasGst === 'yes' ? gstFile : null,
      hasUdyam,
      udyamDoc: hasUdyam === 'yes' ? udyamFile : null,
      firmRegDoc: firmRegFile,
      passportPic: passportPicFile,
      fullsizePic: fullsizePicFile
    };

    const saved = saveOrganizer(newOrg);
    if (saved) {
      setSuccessMsg('Organizer successfully registered!');
      setOrganizers(getOrganizers());
      resetForm();
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMsg('');
      }, 1500);
    } else {
      setErrorMsg('Failed to save organizer details.');
    }
  };

  const resetForm = () => {
    setOwnerName('');
    setFirmName('');
    setAddress('');
    setFirmRegNo('');
    setBankName('');
    setBankAccNo('');
    setBankAccType('Saving');
    setBankIfsc('');
    setMobile('');
    setAltMobile('');
    setWhatsapp('');
    setEmail('');
    setPassword('');
    setHasGst('no');
    setGstFile(null);
    setHasUdyam('no');
    setUdyamFile(null);
    setFirmRegFile(null);
    setBankDocFile(null);
    setPassportPicFile(null);
    setFullsizePicFile(null);
    setErrorMsg('');
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-primary font-display">Event Organizers</h2>
          <p className="text-xs text-stone-500 font-semibold mt-1">Register and monitor sub-admin event partners.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-xl font-bold text-xs inline-flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={16} /> Register Organizer
        </button>
      </div>

      {/* Organizers List */}
      <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 text-[10px] uppercase font-bold tracking-wider text-stone-500 border-b border-stone-150">
                <th className="px-6 py-4">Organizer ID / Date</th>
                <th className="px-6 py-4">Owner & Firm Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Bank Details</th>
                <th className="px-6 py-4">Documents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-150 text-xs text-stone-700">
              {organizers.length > 0 ? (
                organizers.map((org) => (
                  <tr key={org.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-stone-900 block">{org.id}</span>
                      <span className="text-[10px] text-stone-400 font-semibold">{new Date(org.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-stone-900 block">{org.ownerName}</span>
                      <span className="text-[10px] text-stone-500 font-semibold">{org.firmName || 'No Firm Name'}</span>
                    </td>
                    <td className="px-6 py-4 space-y-0.5">
                      <div className="font-semibold">{org.email}</div>
                      <div className="text-[10px] text-stone-500 font-bold">{org.mobile} {org.whatsapp && `(WA: ${org.whatsapp})`}</div>
                    </td>
                    <td className="px-6 py-4 text-[10px] space-y-0.5">
                      <div className="font-bold text-stone-800">{org.bankDetails?.bankName || 'N/A'}</div>
                      <div className="text-stone-500">Acc: {org.bankDetails?.accountNo || 'N/A'} ({org.bankDetails?.accountType})</div>
                      <div className="text-stone-400 font-mono">IFSC: {org.bankDetails?.ifscCode || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {org.firmRegDoc && <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-stone-600 rounded text-[9px] font-bold">Firm Reg</span>}
                        {org.bankDetails?.passbookDoc && <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-stone-600 rounded text-[9px] font-bold">Passbook</span>}
                        {org.gstDoc && <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded text-[9px] font-bold">GST</span>}
                        {org.udyamDoc && <span className="px-2 py-0.5 bg-sky-50 border border-sky-100 text-sky-700 rounded text-[9px] font-bold">Udyam</span>}
                        {org.passportPic && <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-stone-600 rounded text-[9px] font-bold">Passport Pic</span>}
                        {org.fullsizePic && <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-stone-600 rounded text-[9px] font-bold">Fullsize Pic</span>}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-stone-400 font-bold">
                    No organizers registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-stone-250 w-full max-w-3xl rounded-3xl shadow-xl overflow-hidden flex flex-col my-8 max-h-[85vh] text-left">
            <div className="px-6 py-4 bg-primary text-white flex justify-between items-center shrink-0">
              <h3 className="font-display font-extrabold text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-accent" /> Event Organizer Registration
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRegisterOrganizer} className="p-6 overflow-y-auto space-y-6 flex-grow">
              {errorMsg && (
                <div className="p-3.5 bg-red-55/60 border border-red-200 rounded-xl text-xs text-red-700 font-bold flex items-center gap-2">
                  <ShieldAlert size={16} /> {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="p-3.5 bg-emerald-55/60 border border-emerald-250 rounded-xl text-xs text-emerald-850 font-bold flex items-center gap-2">
                  <CheckCircle size={16} /> {successMsg}
                </div>
              )}

              {/* Basic & Account Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider border-b pb-1">Owner & Credentials</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Owner Name *</label>
                    <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Firm Name (Optional)</label>
                    <input type="text" value={firmName} onChange={(e) => setFirmName(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Email Address *</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Login Password *</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Complete Address</label>
                  <textarea rows="2" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                </div>
              </div>

              {/* Contacts */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider border-b pb-1">Contact Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Mobile No *</label>
                    <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Alt Mobile No</label>
                    <input type="text" value={altMobile} onChange={(e) => setAltMobile(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">WhatsApp No</label>
                    <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider border-b pb-1">Bank Account Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Bank Name</label>
                    <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Account Number</label>
                    <input type="text" value={bankAccNo} onChange={(e) => setBankAccNo(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Account Type</label>
                    <select value={bankAccType} onChange={(e) => setBankAccType(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-600 focus:outline-none focus:border-accent bg-white cursor-pointer">
                      <option value="Saving">Saving Account</option>
                      <option value="Current">Current Account</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">IFSC Code</label>
                    <input type="text" value={bankIfsc} onChange={(e) => setBankIfsc(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>
                </div>
              </div>

              {/* Upload Documents */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider border-b pb-1">Document Uploads</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Firm Reg Upload */}
                  <div className="p-3 border border-stone-200 rounded-xl flex flex-col gap-2 bg-stone-50">
                    <span className="text-[10px] font-bold text-stone-550 block">Firm Registration Cert (PDF)</span>
                    <label className="border border-dashed border-stone-300 rounded-lg p-3 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-stone-50 transition-colors">
                      <Upload className="w-4 h-4 text-stone-400 mb-1" />
                      <span className="text-[10px] text-stone-500 font-semibold">{firmRegFile ? firmRegFile.name : 'Select PDF File'}</span>
                      <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileChange(e, setFirmRegFile)} />
                    </label>
                  </div>

                  {/* Bank Passbook Upload */}
                  <div className="p-3 border border-stone-200 rounded-xl flex flex-col gap-2 bg-stone-50">
                    <span className="text-[10px] font-bold text-stone-550 block">Passbook / Cheque Copy (PDF/JPEG)</span>
                    <label className="border border-dashed border-stone-300 rounded-lg p-3 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-stone-50 transition-colors">
                      <Upload className="w-4 h-4 text-stone-400 mb-1" />
                      <span className="text-[10px] text-stone-500 font-semibold">{bankDocFile ? bankDocFile.name : 'Select PDF/Image'}</span>
                      <input type="file" accept="application/pdf,image/*" className="hidden" onChange={(e) => handleFileChange(e, setBankDocFile)} />
                    </label>
                  </div>
                </div>
              </div>

              {/* GST & Udyam Toggles */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider border-b pb-1">GST & Udyam Registrations</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* GST */}
                  <div className="p-4 border border-stone-200 rounded-2xl bg-stone-50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-800">GST Registration?</span>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setHasGst('yes')} className={`px-3 py-1 rounded-lg text-[10px] font-bold ${hasGst === 'yes' ? 'bg-accent text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>Yes</button>
                        <button type="button" onClick={() => { setHasGst('no'); setGstFile(null); }} className={`px-3 py-1 rounded-lg text-[10px] font-bold ${hasGst === 'no' ? 'bg-primary text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>No</button>
                      </div>
                    </div>
                    {hasGst === 'yes' && (
                      <label className="border border-dashed border-stone-300 rounded-lg p-2.5 flex flex-col items-center justify-center bg-white cursor-pointer">
                        <Upload className="w-3.5 h-3.5 text-stone-400 mb-0.5" />
                        <span className="text-[9px] text-stone-500 font-bold truncate max-w-[200px]">{gstFile ? gstFile.name : 'Upload GST PDF'}</span>
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileChange(e, setGstFile)} />
                      </label>
                    )}
                  </div>

                  {/* Udyam */}
                  <div className="p-4 border border-stone-200 rounded-2xl bg-stone-50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-800">Udyam Registration?</span>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setHasUdyam('yes')} className={`px-3 py-1 rounded-lg text-[10px] font-bold ${hasUdyam === 'yes' ? 'bg-accent text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>Yes</button>
                        <button type="button" onClick={() => { setHasUdyam('no'); setUdyamFile(null); }} className={`px-3 py-1 rounded-lg text-[10px] font-bold ${hasUdyam === 'no' ? 'bg-primary text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>No</button>
                      </div>
                    </div>
                    {hasUdyam === 'yes' && (
                      <label className="border border-dashed border-stone-300 rounded-lg p-2.5 flex flex-col items-center justify-center bg-white cursor-pointer">
                        <Upload className="w-3.5 h-3.5 text-stone-400 mb-0.5" />
                        <span className="text-[9px] text-stone-500 font-bold truncate max-w-[200px]">{udyamFile ? udyamFile.name : 'Upload Udyam PDF'}</span>
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileChange(e, setUdyamFile)} />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Photos */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider border-b pb-1">Photos</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 border border-stone-200 rounded-xl bg-stone-50">
                    <span className="text-[10px] font-bold text-stone-550 block mb-2">Passport Size Photo (JPEG/PDF)</span>
                    <label className="border border-dashed border-stone-300 rounded-lg p-3 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-stone-50">
                      <Upload className="w-4 h-4 text-stone-400 mb-1" />
                      <span className="text-[10px] text-stone-500 font-semibold">{passportPicFile ? passportPicFile.name : 'Select Photo'}</span>
                      <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => handleFileChange(e, setPassportPicFile)} />
                    </label>
                  </div>
                  <div className="p-3 border border-stone-200 rounded-xl bg-stone-50">
                    <span className="text-[10px] font-bold text-stone-550 block mb-2">Fullsize Portfolio Photo (JPEG/PDF)</span>
                    <label className="border border-dashed border-stone-300 rounded-lg p-3 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-stone-50">
                      <Upload className="w-4 h-4 text-stone-400 mb-1" />
                      <span className="text-[10px] text-stone-500 font-semibold">{fullsizePicFile ? fullsizePicFile.name : 'Select Photo'}</span>
                      <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => handleFileChange(e, setFullsizePicFile)} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-stone-200 rounded-xl text-xs font-bold text-stone-750 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Save Organizer Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
