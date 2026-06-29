import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getEvents, saveEventApplication, getCommissionConfig, calculateCommission } from '../../registration/utils/registrationStore';
import { ArrowLeft, ArrowRight, ShieldCheck, Upload, CheckCircle2, Ticket, Calendar, DollarSign, Users, Plane, Train, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventBookingPage() {
  const [events, setEvents] = useState([]);
  const [step, setStep] = useState(0);
  
  // Data State
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [role, setRole] = useState('Participate'); // Participate, Visitor, Sponsor, Couple
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [sex, setSex] = useState('Male');
  const [mobile, setMobile] = useState('');
  const [altMobile, setAltMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [travelMode, setTravelMode] = useState('Train');
  const [personsCount, setPersonsCount] = useState(1);
  const [sponsorAmount, setSponsorAmount] = useState('');
  
  // Document Upload states
  const [picFile, setPicFile] = useState(null);
  const [aadharNo, setAadharNo] = useState('');
  const [aadharFile, setAadharFile] = useState(null);
  const [hasPassport, setHasPassport] = useState('no');
  const [passportNo, setPassportNo] = useState('');
  const [passportIssueDate, setPassportIssueDate] = useState('');
  const [passportFile, setPassportFile] = useState(null);

  const [errorMsg, setErrorMsg] = useState('');
  const [successApp, setSuccessApp] = useState(null);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  // Derive booking amount from event's rolePricing for selected role
  const bookingAmount = React.useMemo(() => {
    if (!selectedEvent) return 0;
    if (role === 'Sponsor') return Number(sponsorAmount) || 0;
    const pricing = selectedEvent.rolePricing || {};
    return Number(pricing[role]) || 0;
  }, [selectedEvent, role, sponsorAmount]);

  const commissionAmt = React.useMemo(() => calculateCommission(bookingAmount), [bookingAmount]);
  const totalPayable = bookingAmount + commissionAmt;

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

  const handleNext = () => {
    if (step === 0) {
      if (!selectedEvent) {
        setErrorMsg('Please select an event to proceed.');
        return;
      }
      setErrorMsg('');
    } else if (step === 1) {
      if (!name || !dob || !mobile || !email || !address) {
        setErrorMsg('Please fill out all profile fields.');
        return;
      }
      setErrorMsg('');
    } else if (step === 2) {
      if (!picFile || !aadharNo || !aadharFile) {
        setErrorMsg('Please upload your photo and Aadhar card.');
        return;
      }
      if (selectedEvent.requirePassport && hasPassport === 'yes' && (!passportNo || !passportIssueDate || !passportFile)) {
        setErrorMsg('Please complete all passport verification details.');
        return;
      }
      setErrorMsg('');
    } else if (step === 3) {
      if (role === 'Sponsor') {
        const minSponsor = Number(selectedEvent.minSponsorAmount || 0);
        if (!sponsorAmount || Number(sponsorAmount) < minSponsor) {
          setErrorMsg(`Sponsorship amount must be at least ₹${minSponsor}.`);
          return;
        }
      }
      setErrorMsg('');
    }
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep(prev => Math.max(0, prev - 1));
    setErrorMsg('');
  };

  const handlePaymentCheckout = (status) => {
    const appData = {
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      role,
      name,
      dob,
      sex,
      mobile,
      altMobile,
      whatsapp,
      email,
      address,
      travelMode: selectedEvent.requireTravel ? travelMode : 'None',
      personsCount,
      sponsorAmount: role === 'Sponsor' ? Number(sponsorAmount) : 0,
      photo: picFile,
      aadharNo,
      aadharDoc: aadharFile,
      hasPassport: selectedEvent.requirePassport ? hasPassport : 'no',
      passportNo: (selectedEvent.requirePassport && hasPassport === 'yes') ? passportNo : '',
      passportIssueDate: (selectedEvent.requirePassport && hasPassport === 'yes') ? passportIssueDate : '',
      passportDoc: (selectedEvent.requirePassport && hasPassport === 'yes') ? passportFile : null,
      paymentStatus: status,
      bookingAmount,
      commissionAmount: commissionAmt
    };

    const saved = saveEventApplication(appData);
    if (saved) {
      setSuccessApp(saved);
      setStep(5);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-left mb-6">
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-2">Step 1: Select Event & Role</h3>
              <p className="text-stone-500 text-xs">Choose the active event and registration category.</p>
            </div>

            {/* Event List Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Available Events</label>
              {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map(evt => (
                    <div
                      key={evt.id}
                      onClick={() => setSelectedEvent(evt)}
                      className={`p-4 border-2 rounded-2xl cursor-pointer text-left transition-all ${
                        selectedEvent?.id === evt.id ? 'border-accent bg-accent/5' : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      {evt.eventImage?.url && (
                        <div className={`w-full overflow-hidden rounded-xl bg-stone-100 border border-stone-200/80 mb-3 ${
                          evt.imageOrientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-video'
                        }`}>
                          <img src={evt.eventImage.url} alt={evt.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex justify-between items-start">
                        <span className="inline-block px-2.5 py-0.5 bg-stone-100 border text-stone-600 rounded-lg text-[9px] font-extrabold uppercase mb-2">
                          {evt.eventType}
                        </span>
                        <div className="flex gap-1">
                          {evt.requireTravel && <span className="p-1 rounded bg-stone-200/50 text-stone-650" title="Travel details required"><Plane size={9} /></span>}
                          {evt.requirePassport && <span className="p-1 rounded bg-accent/10 text-accent" title="Passport required"><ShieldCheck size={9} /></span>}
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-stone-900 leading-tight">{evt.title}</h4>
                      <p className="text-[11px] text-stone-500 line-clamp-2 mt-1">{evt.description}</p>
                      
                      {/* Date & Location preview */}
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[9px] text-stone-400 font-bold mt-2">
                        {evt.eventDate && <span className="flex items-center gap-0.5"><Calendar size={10} /> {new Date(evt.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>}
                        {evt.eventLocation && <span className="flex items-center gap-0.5"><MapPin size={10} /> {evt.eventLocation}</span>}
                      </div>

                      <div className="mt-3 pt-3 border-t border-stone-100 flex justify-between items-center text-[10px] text-stone-500 font-bold">
                        <span>Min Sponsor: ₹{evt.minSponsorAmount}</span>
                        <span>Organized by: {evt.organizerName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 border border-stone-200 rounded-2xl text-center bg-white text-stone-400 font-bold">
                  No active events available. Please register events first.
                </div>
              )}
            </div>

            {/* Role Selection */}
            {selectedEvent && (
              <div className="space-y-3 pt-4 border-t">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Register As</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(selectedEvent.bookingRoles || ['Participate', 'Visitor', 'Sponsor', 'Couple']).map(cat => {
                    const price = selectedEvent.rolePricing?.[cat];
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setRole(cat)}
                        className={`py-3 px-2 rounded-xl font-bold text-xs border-2 transition-all flex flex-col items-center gap-0.5 ${
                          role === cat ? 'bg-primary border-primary text-white' : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <span>{cat}</span>
                        {price !== undefined && price > 0 && (
                          <span className={`text-[9px] font-bold ${role === cat ? 'text-white/70' : 'text-accent'}`}>₹{price}</span>
                        )}
                        {price === 0 && cat !== 'Sponsor' && (
                          <span className={`text-[9px] font-bold ${role === cat ? 'text-white/70' : 'text-emerald-600'}`}>Free</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {/* Price preview */}
                {bookingAmount > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-accent/5 border border-accent/20 rounded-xl text-xs">
                    <span className="text-stone-600 font-semibold">Booking Fee: <strong className="text-stone-900">₹{bookingAmount}</strong></span>
                    <span className="text-stone-400">+</span>
                    <span className="text-stone-600 font-semibold">Service Charge: <strong className="text-accent">₹{commissionAmt}</strong></span>
                    <span className="text-stone-400">=</span>
                    <span className="font-bold text-stone-900">Total: ₹{totalPayable}</span>
                  </div>
                )}
                {bookingAmount === 0 && role !== 'Sponsor' && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-semibold">
                    This role is free to register.
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 text-left">
            <div>
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-2">Step 2: Contact Information</h3>
              <p className="text-stone-500 text-xs">Fill out the applicant profile details.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Applicant Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">DOB *</label>
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Sex *</label>
                <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-bold text-stone-600 focus:outline-none focus:border-accent bg-white cursor-pointer">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Mobile No *</label>
                <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Alternate Mobile No</label>
                <input type="text" value={altMobile} onChange={(e) => setAltMobile(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">WhatsApp No</label>
                <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Email Address *</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Complete Address *</label>
                <textarea rows="2" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 text-left">
            <div>
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-2">Step 3: Upload Profile Photos & Aadhar Card</h3>
              <p className="text-stone-500 text-xs">Verify your identity using official documents.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Photo */}
              <div className="p-4 border border-stone-200 rounded-2xl bg-stone-50 space-y-3">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Full Size Photo (JPEG) *</span>
                <label className="border border-dashed border-stone-300 rounded-lg p-4 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-stone-50 transition-colors">
                  <Upload className="w-5 h-5 text-stone-400 mb-1" />
                  <span className="text-[10px] text-stone-500 font-semibold">{picFile ? picFile.name : 'Select JPG/JPEG Photo'}</span>
                  <input type="file" accept="image/jpeg,image/jpg" className="hidden" onChange={(e) => handleFileChange(e, setPicFile)} />
                </label>
              </div>

              {/* Aadhar */}
              <div className="p-4 border border-stone-200 rounded-2xl bg-stone-50 space-y-3">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Aadhar Card PDF *</span>
                <input
                  type="text"
                  placeholder="Enter 12-digit Aadhar No"
                  className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent bg-white"
                  value={aadharNo}
                  onChange={(e) => setAadharNo(e.target.value)}
                />
                <label className="border border-dashed border-stone-300 rounded-lg p-2.5 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-stone-50 transition-colors">
                  <Upload className="w-4 h-4 text-stone-400 mb-0.5" />
                  <span className="text-[10px] text-stone-500 font-semibold">{aadharFile ? aadharFile.name : 'Upload Aadhar PDF'}</span>
                  <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileChange(e, setAadharFile)} />
                </label>
              </div>

              {/* Passport */}
              {selectedEvent.requirePassport && (
                <div className="p-4 border border-stone-200 rounded-2xl bg-stone-50 space-y-3 sm:col-span-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-stone-850">Do you possess a valid Passport?</span>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setHasPassport('yes')} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${hasPassport === 'yes' ? 'bg-accent text-white' : 'bg-white border text-stone-600'}`}>Yes</button>
                      <button type="button" onClick={() => { setHasPassport('no'); setPassportNo(''); setPassportFile(null); }} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${hasPassport === 'no' ? 'bg-primary text-white' : 'bg-white border text-stone-600'}`}>No</button>
                    </div>
                  </div>
                  
                  {hasPassport === 'yes' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Passport Number</label>
                        <input type="text" value={passportNo} onChange={(e) => setPassportNo(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent bg-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Issue Date</label>
                        <input type="date" value={passportIssueDate} onChange={(e) => setPassportIssueDate(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent bg-white" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="border border-dashed border-stone-300 rounded-lg p-3.5 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-stone-50">
                          <Upload className="w-4 h-4 text-stone-400 mb-1" />
                          <span className="text-[10px] text-stone-500 font-semibold">{passportFile ? passportFile.name : 'Upload Passport PDF'}</span>
                          <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileChange(e, setPassportFile)} />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 text-left">
            <div>
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-2">Step 4: Attendance & Sponsorship</h3>
              <p className="text-stone-500 text-xs">Fill out event travel arrangements and sponsorship terms.</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedEvent.requireTravel && (
                <div className="space-y-1.5 p-4 border border-stone-200 rounded-2xl bg-stone-50/50">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Going Through (Travel Mode)</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={travelMode === 'Train'} onChange={() => setTravelMode('Train')} className="accent-accent" />
                      <Train size={16} className="text-stone-500" /> <span className="text-xs font-semibold">Train</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={travelMode === 'Flight'} onChange={() => setTravelMode('Flight')} className="accent-accent" />
                      <Plane size={16} className="text-stone-500" /> <span className="text-xs font-semibold">Flight</span>
                    </label>
                  </div>
                </div>
              )}      </div>

              {(role === 'Visitor' || role === 'Couple' || role === 'Sponsor') && (
                <div className="space-y-1 p-4 border border-stone-200 rounded-2xl bg-stone-50/50">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Number of Attending Persons *</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent bg-white"
                    value={personsCount}
                    onChange={(e) => setPersonsCount(Number(e.target.value))}
                    required
                  />
                </div>
              )}

              {role === 'Sponsor' && (
                <div className="space-y-1 p-4 border border-stone-200 rounded-2xl bg-stone-50/50 sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Sponsorship Commitment Amount (₹) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs font-bold">₹</span>
                    <input
                      type="number"
                      placeholder={`Min threshold: ₹${selectedEvent?.minSponsorAmount}`}
                      className="w-full pl-7 pr-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent bg-white"
                      value={sponsorAmount}
                      onChange={(e) => setSponsorAmount(e.target.value)}
                      required
                    />
                  </div>
                  <span className="text-[9px] text-stone-500 font-bold block">Note: Minimal sponsorship amount set for this event is ₹{selectedEvent?.minSponsorAmount}.</span>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-left">
            <div>
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-2">Step 5: Booking Review & Simulation</h3>
              <p className="text-stone-500 text-xs">Verify your booking summary and simulate payment authorization.</p>
            </div>

            <div className="border border-stone-200 rounded-3xl p-6 bg-stone-50/50 space-y-4">
              <div className="flex justify-between border-b pb-2 text-xs sm:text-sm">
                <span className="text-stone-500 font-semibold">Event Name</span>
                <span className="text-stone-900 font-bold">{selectedEvent?.title}</span>
              </div>
              <div className="flex justify-between border-b pb-2 text-xs sm:text-sm">
                <span className="text-stone-500 font-semibold">Registered As</span>
                <span className="text-stone-900 font-bold text-accent">{role}</span>
              </div>
              <div className="flex justify-between border-b pb-2 text-xs sm:text-sm">
                <span className="text-stone-500 font-semibold">Applicant Name</span>
                <span className="text-stone-900 font-bold">{name}</span>
              </div>
              <div className="flex justify-between border-b pb-2 text-xs sm:text-sm">
                <span className="text-stone-500 font-semibold">Email & Phone</span>
                <span className="text-stone-900 font-bold">{email} • {mobile}</span>
              </div>
              {selectedEvent.requireTravel && (
                <div className="flex justify-between border-b pb-2 text-xs sm:text-sm">
                  <span className="text-stone-500 font-semibold">Travel Mode</span>
                  <span className="text-stone-900 font-bold">{travelMode}</span>
                </div>
              )}
              {role === 'Sponsor' && (
                <div className="flex justify-between border-b pb-2 text-xs sm:text-sm bg-accent/5 p-2 rounded-lg">
                  <span className="text-accent font-bold">Sponsor Amount</span>
                  <span className="text-accent font-bold text-base">₹{sponsorAmount}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="pt-3 border-t space-y-2">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Payment Breakdown</p>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500 font-semibold">Booking Fee ({role})</span>
                  <span className="font-bold text-stone-800">₹{bookingAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500 font-semibold">Platform Service Charge</span>
                  <span className="font-bold text-accent">₹{commissionAmt.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm border-t pt-2">
                  <span className="font-bold text-stone-900">Total Payable</span>
                  <span className="font-extrabold text-stone-900">₹{totalPayable.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Checkout Authorization</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handlePaymentCheckout('Successful')}
                  className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Pay Success
                </button>
                <button
                  type="button"
                  onClick={() => handlePaymentCheckout('Unsuccessful')}
                  className="py-3 bg-red-650 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Pay Failed
                </button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-stone-900 font-display">Booking Submitted!</h2>
              <p className="text-xs text-stone-500 font-semibold mt-1">Your reservation ID is: <span className="font-mono font-bold text-stone-900">{successApp?.id}</span></p>
            </div>

            <div className="p-4 border border-stone-200 rounded-2xl bg-stone-50 max-w-sm mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Applicant:</span>
                <span className="font-bold">{successApp?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Status:</span>
                <span className={`font-bold ${successApp?.paymentStatus === 'Successful' ? 'text-emerald-700' : 'text-red-700'}`}>{successApp?.paymentStatus}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setStep(0);
                setSelectedEvent(null);
                setSuccessApp(null);
                setName('');
                setDob('');
                setMobile('');
                setEmail('');
                setAddress('');
                setSponsorAmount('');
                setPicFile(null);
                setAadharFile(null);
              }}
              className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Register Another Event
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto w-full">
        {/* Form Outer Container */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 md:p-10 shadow-xs">
          
          <div className="mb-8 text-center md:text-left flex justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-primary font-display">Event Registration</h1>
              <p className="text-stone-550 text-xs mt-1">Register for seats or sponsorship slots in active Hellozy events.</p>
            </div>
            <Ticket className="w-8 h-8 text-accent shrink-0 hidden sm:block" />
          </div>

          {errorMsg && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-750" /> {errorMsg}
            </div>
          )}

          {/* Form Step Render */}
          <div className="min-h-[300px]">
            {renderStep()}
          </div>

          {/* Bottom Actions */}
          {step < 4 && (
            <div className="mt-10 pt-6 border-t border-stone-150 flex justify-between">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 border border-stone-200 rounded-xl text-xs font-bold text-stone-750 hover:bg-stone-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <div />
              )}
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                Continue <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
