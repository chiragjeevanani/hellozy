import React, { useState, useEffect } from 'react';
import { 
  getRegistrations, 
  updateRegistrationStatus, 
  isPaymentEnabled, 
  setPaymentEnabled 
} from '../../registration/utils/registrationStore';
import { 
  Search, 
  Filter, 
  CreditCard, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText,
  Eye,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegistrationsView() {
  const [registrations, setRegistrations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Admin Configurations
  const [paymentConfig, setPaymentConfig] = useState(false);

  useEffect(() => {
    const list = getRegistrations();
    setRegistrations(list);
    setFiltered(list);
    setPaymentConfig(isPaymentEnabled());
  }, []);

  // Apply filters on updates
  useEffect(() => {
    let result = [...registrations];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(r => 
        r.id.toLowerCase().includes(term) ||
        (r.ownerName && r.ownerName.toLowerCase().includes(term)) ||
        (r.name && r.name.toLowerCase().includes(term)) ||
        (r.vehicleNumber && r.vehicleNumber.toLowerCase().includes(term)) ||
        (r.hospitalName && r.hospitalName.toLowerCase().includes(term))
      );
    }

    if (filterType !== 'all') {
      result = result.filter(r => r.type === filterType);
    }

    if (filterStatus !== 'all') {
      result = result.filter(r => r.status === filterStatus);
    }

    setFiltered(result);
  }, [searchTerm, filterType, filterStatus, registrations]);

  const handleTogglePayment = () => {
    const newVal = !paymentConfig;
    setPaymentConfig(newVal);
    setPaymentEnabled(newVal);
  };

  const handleUpdateStatus = (id, newStatus) => {
    const success = updateRegistrationStatus(id, newStatus);
    if (success) {
      // Reload registrations
      const list = getRegistrations();
      setRegistrations(list);
      if (selected && selected.id === id) {
        setSelected({ ...selected, status: newStatus });
      }
    }
  };

  // Status Badge UI
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-250"><CheckCircle className="w-3 h-3" /> Approved</span>;
      case 'Rejected':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-250"><XCircle className="w-3 h-3" /> Rejected</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-250 animate-pulse"><Clock className="w-3 h-3" /> Pending</span>;
    }
  };

  // Render Document Item in modal
  const renderDocLink = (label, doc) => {
    if (!doc) return <div className="text-xs text-stone-400 italic">No Uploaded Doc</div>;
    return (
      <div className="flex items-center justify-between p-3 bg-stone-50 border border-stone-250 rounded-xl">
        <div className="text-left">
          <p className="text-xs font-bold text-stone-800 truncate max-w-[200px]">{doc.name}</p>
          <p className="text-[10px] text-stone-500 font-semibold">{doc.size}</p>
        </div>
        <a 
          href={doc.url} 
          target="_blank" 
          rel="noreferrer"
          className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-700 transition-colors"
          title="Open Document Preview"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  };

  const renderDetailField = (label, val) => (
    <div className="border-b border-stone-150 py-2.5 flex justify-between text-sm">
      <span className="text-stone-500 font-semibold">{label}</span>
      <span className="text-stone-900 font-bold text-right">{val || <span className="text-stone-400 italic">N/A</span>}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-100/50 py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-700 font-semibold mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <h1 className="text-3xl font-extrabold text-primary font-display flex items-center gap-2">
              Hellozy Admin Hub
            </h1>
            <p className="text-stone-500 text-xs mt-1">
              Verify applications, review documents, and configure platform settings.
            </p>
          </div>

          {/* Payment Toggle Switch */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-4 flex items-center space-x-6 shadow-xs shrink-0 self-start md:self-auto">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-accent">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-stone-900 font-display">
                  Listing Payments Fee
                </h3>
                <p className="text-[10px] text-stone-500 font-semibold">
                  Collect payments during onboarding
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

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Table view */}
          <div className="lg:col-span-2 bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs flex flex-col">
            {/* Filter Section */}
            <div className="p-6 border-b border-stone-150 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by ID, name, vehicle number..."
                  className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-xs font-semibold text-stone-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <select
                  className="px-3 py-2 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-xs font-semibold text-stone-600 cursor-pointer"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="four-wheeler">4-Wheeler</option>
                  <option value="pickup">Pickup</option>
                  <option value="bus">Bus</option>
                  <option value="e-rickshaw">E-Rickshaw</option>
                  <option value="hospital">Hospital</option>
                  <option value="influencer">Influencer</option>
                </select>

                <select
                  className="px-3 py-2 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-xs font-semibold text-stone-600 cursor-pointer"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Submissions Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-[10px] uppercase font-bold tracking-wider text-stone-500 border-b border-stone-150">
                    <th className="px-6 py-4">ID / Date</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Partner Entity</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-150 text-xs">
                  {filtered.length > 0 ? (
                    filtered.map((item) => (
                      <tr 
                        key={item.id}
                        className={`hover:bg-stone-50/50 transition-colors ${selected?.id === item.id ? 'bg-accent/5 hover:bg-accent/5' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono font-bold text-stone-900 block">{item.id}</span>
                          <span className="text-[10px] text-stone-400 font-semibold">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-stone-600 capitalize">
                          {item.type.replace('-', ' ')}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-stone-800 block">
                            {item.hospitalName || item.ownerName || item.name}
                          </span>
                          <span className="text-[10px] text-stone-500 font-semibold truncate max-w-[150px] block">
                            {item.vehicleNumber || item.email || 'No details'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setSelected(item)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" /> View Info
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-16 text-center text-stone-400 font-semibold">
                        No partner registrations match the active search filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details Panel */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs h-fit">
            {selected ? (
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-stone-150 pb-4">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">REGISTRATION FILE</span>
                    <h2 className="text-lg font-bold text-stone-900 font-mono">{selected.id}</h2>
                  </div>
                  <div>
                    {getStatusBadge(selected.status)}
                  </div>
                </div>

                {/* Verification Actions */}
                {selected.status === 'Pending' && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleUpdateStatus(selected.id, 'Approved')}
                      className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors text-xs flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" /> Approve Listing
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selected.id, 'Rejected')}
                      className="py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors text-xs flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" /> Reject Listing
                    </button>
                  </div>
                )}

                {/* Profile detail lists depending on registration type */}
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                  <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider text-left">
                    Information Profile
                  </h3>
                  
                  {/* Vehicle Owner Profile Details */}
                  {['four-wheeler', 'pickup', 'bus', 'e-rickshaw'].includes(selected.type) && (
                    <>
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
                      
                      <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pt-4 text-left border-t border-stone-100">
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

                      <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pt-4 text-left border-t border-stone-100">
                        Driver Details Choice
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

                  {/* Hospital Profile Details */}
                  {selected.type === 'hospital' && (
                    <>
                      {renderDetailField("Hospital Name", selected.hospitalName)}
                      {renderDetailField("Address", selected.hospitalAddress)}
                      {renderDetailField("GSTIN ID", selected.gstNumber)}
                      {renderDetailField("PAN ID", selected.panNumber)}
                      
                      <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pt-4 text-left border-t border-stone-100">
                        Hospital Owner Details
                      </h4>
                      {renderDetailField("Owner Name", selected.ownerName)}
                      {renderDetailField("Owner Contact", selected.ownerMobile)}
                      {renderDetailField("Owner Email", selected.ownerEmail)}
                      {renderDetailField("Owner Address", selected.ownerAddress)}

                      <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pt-4 text-left border-t border-stone-100">
                        Administrative Person
                      </h4>
                      {renderDetailField("Admin Name", selected.officerName)}
                      {renderDetailField("Admin Contact", selected.officerMobile)}
                      {renderDetailField("Admin Email", selected.officerEmail)}
                      {renderDetailField("Admin Address", selected.officerAddress)}
                    </>
                  )}

                  {/* Influencer Profile Details */}
                  {selected.type === 'influencer' && (
                    <>
                      {renderDetailField("Full Name", selected.name)}
                      {renderDetailField("Contact Mobile", selected.mobile)}
                      {renderDetailField("Email Address", selected.email)}
                      {renderDetailField("Residential Address", selected.address)}
                      
                      <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pt-4 text-left border-t border-stone-100">
                        Linked Accounts
                      </h4>
                      {renderDetailField("Instagram", selected.instagram)}
                      {renderDetailField("Facebook", selected.facebook)}
                      {renderDetailField("YouTube", selected.youtube)}
                      {renderDetailField("Extra Platform 1", selected.extraLink1)}
                      {renderDetailField("Extra Platform 2", selected.extraLink2)}
                      {renderDetailField("Extra Platform 3", selected.extraLink3)}
                    </>
                  )}
                </div>

                {/* Uploaded Documents List */}
                <div className="space-y-3 pt-4 border-t border-stone-150">
                  <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider text-left">
                    Uploaded Verification Files
                  </h3>
                  
                  {['four-wheeler', 'pickup', 'bus', 'e-rickshaw'].includes(selected.type) && (
                    <div className="grid grid-cols-1 gap-2.5">
                      {selected.aadharDoc && renderDocLink("Aadhar Copy", selected.aadharDoc)}
                      {selected.rcDoc && renderDocLink("RC Document", selected.rcDoc)}
                      {selected.insuranceDoc && renderDocLink("Insurance Slip", selected.insuranceDoc)}
                      {selected.dlDoc && renderDocLink("DL Copy", selected.dlDoc)}
                      {selected.pucDoc && renderDocLink("PUC Slip", selected.pucDoc)}
                      {selected.agreementDoc && renderDocLink("Signed Agreement", selected.agreementDoc)}
                      {selected.tcDoc && renderDocLink("Signed T&C", selected.tcDoc)}
                      {selected.bankDoc && renderDocLink("Bank Account Details", selected.bankDoc)}
                      {selected.addressPhoto && renderDocLink("Residence/Office Photo", selected.addressPhoto)}
                      {selected.ownerPhoto && renderDocLink("Owner Passport Photo", selected.ownerPhoto)}
                      {selected.vehiclePhoto && renderDocLink("Vehicle Photo", selected.vehiclePhoto)}
                      {selected.isOwnerDriver === 'no' && selected.driverPhoto && renderDocLink("Driver Photo", selected.driverPhoto)}
                      {selected.isOwnerDriver === 'no' && selected.driverDlDoc && renderDocLink("Driver DL Copy", selected.driverDlDoc)}
                    </div>
                  )}

                  {selected.type === 'hospital' && (
                    <div className="grid grid-cols-1 gap-2.5">
                      {selected.regCert && renderDocLink("Registration Certificate", selected.regCert)}
                      {selected.hospitalPhoto && renderDocLink("Facility Photo", selected.hospitalPhoto)}
                      {selected.ownerAadhar && renderDocLink("Owner Aadhar", selected.ownerAadhar)}
                      {selected.ownerPhoto && renderDocLink("Owner Passport Photo", selected.ownerPhoto)}
                      {selected.officerAadhar && renderDocLink("Officer Aadhar", selected.officerAadhar)}
                      {selected.officerPhoto && renderDocLink("Officer Photo", selected.officerPhoto)}
                    </div>
                  )}

                  {selected.type === 'influencer' && (
                    <div className="grid grid-cols-1 gap-2.5">
                      {selected.aadharDoc && renderDocLink("Aadhar Doc", selected.aadharDoc)}
                      {selected.passportPhoto && renderDocLink("Passport Photo", selected.passportPhoto)}
                      {selected.fullPhoto && renderDocLink("Portfolio Photo", selected.fullPhoto)}
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="text-center py-20 text-stone-400 font-semibold space-y-2">
                <FileText className="w-10 h-10 mx-auto text-stone-300" />
                <p>Select a partner registration to view their verification profile and files.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
