import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getEvents, 
  saveEvent, 
  getEventTypes, 
  getEventApplications, 
  updateEventApplicationPaymentStatus, 
  updateEventApplicationStatus 
} from '../../registration/utils/registrationStore';
import { 
  Building2, 
  LogOut, 
  Plus, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Clock, 
  X, 
  CreditCard 
} from 'lucide-react';

export default function OrganizerDashboard() {
  const [organizer, setOrganizer] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, host-event, applicants
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [applications, setApplications] = useState([]);
  
  // Selected Applicant for edit modal
  const [selectedApp, setSelectedApp] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDob, setEditDob] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPaymentStatus, setEditPaymentStatus] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editPersonsCount, setEditPersonsCount] = useState(1);
  const [editSponsorAmount, setEditSponsorAmount] = useState('');

  // Host Event Form States
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [facilities, setFacilities] = useState('');
  const [minSponsor, setMinSponsor] = useState('0');
  const [bookingRoles, setBookingRoles] = useState(['Participate', 'Visitor', 'Sponsor', 'Couple']);
  
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const orgSession = localStorage.getItem('hellozy_active_organizer');
    if (!orgSession) {
      navigate('/organizer/login', { replace: true });
      return;
    }
    const orgData = JSON.parse(orgSession);
    setOrganizer(orgData);

    // Load data
    const allEvents = getEvents().filter(e => e.organizerId === orgData.id);
    setEvents(allEvents);
    setEventTypes(getEventTypes());
    
    // Load category by default
    const cats = getEventTypes();
    if (cats.length > 0) setEventType(cats[0]);

    // Load applicant applications
    const eventIds = allEvents.map(e => e.id);
    const allApps = getEventApplications().filter(app => eventIds.includes(app.eventId));
    setApplications(allApps);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('hellozy_active_organizer');
    navigate('/organizer/login', { replace: true });
  };

  const handleHostEvent = (e) => {
    e.preventDefault();
    if (!eventTitle || !eventDesc || !eventType) {
      setFormError('Please complete all event details fields.');
      return;
    }

    const newEvent = {
      organizerId: organizer.id,
      organizerName: organizer.ownerName,
      title: eventTitle,
      eventType,
      description: eventDesc,
      facilities,
      minSponsorAmount: Number(minSponsor) || 0,
      bookingRoles
    };

    const saved = saveEvent(newEvent);
    if (saved) {
      setFormSuccess('Event successfully hosted!');
      // Reload events
      const allEvents = getEvents().filter(e => e.organizerId === organizer.id);
      setEvents(allEvents);
      
      // Reset form
      setEventTitle('');
      setEventDesc('');
      setFacilities('');
      setMinSponsor('0');
      setFormError('');
      
      setTimeout(() => {
        setFormSuccess('');
        setActiveTab('overview');
      }, 1500);
    } else {
      setFormError('Failed to host event.');
    }
  };

  const handleOpenEditModal = (app) => {
    setSelectedApp(app);
    setEditName(app.name);
    setEditDob(app.dob);
    setEditMobile(app.mobile);
    setEditEmail(app.email);
    setEditPaymentStatus(app.paymentStatus);
    setEditStatus(app.status);
    setEditPersonsCount(app.personsCount || 1);
    setEditSponsorAmount(app.sponsorAmount || '');
  };

  const handleSaveApplicantEdit = (e) => {
    e.preventDefault();
    // Save locally
    const allApps = getEventApplications();
    const index = allApps.findIndex(a => a.id === selectedApp.id);
    if (index !== -1) {
      allApps[index] = {
        ...allApps[index],
        name: editName,
        dob: editDob,
        mobile: editMobile,
        email: editEmail,
        paymentStatus: editPaymentStatus,
        status: editStatus,
        personsCount: Number(editPersonsCount),
        sponsorAmount: Number(editSponsorAmount) || 0
      };
      localStorage.setItem('hellozy_event_applications', JSON.stringify(allApps));

      // Reload state
      const eventIds = events.map(e => e.id);
      const filteredApps = allApps.filter(app => eventIds.includes(app.eventId));
      setApplications(filteredApps);
      setSelectedApp(null);
    }
  };

  // Metrics
  const totalRegistrations = applications.length;
  const paySuccess = applications.filter(a => a.paymentStatus === 'Successful').length;
  const payFailed = applications.filter(a => a.paymentStatus === 'Unsuccessful').length;
  const payPending = applications.filter(a => a.paymentStatus === 'Pending').length;

  if (!organizer) return null;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-left">
      {/* Header bar */}
      <header className="sticky top-0 z-35 bg-primary text-white py-4 px-6 md:px-8 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-accent" />
          <div>
            <h1 className="text-lg font-extrabold font-display leading-tight">{organizer.firmName || 'Sub-Admin Hub'}</h1>
            <p className="text-[10px] text-stone-300 font-semibold mt-0.5">Organized by: {organizer.ownerName}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </header>

      {/* Main Panel Content */}
      <div className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar Drawer */}
        <aside className="w-full lg:w-64 shrink-0 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview' ? 'bg-accent text-white shadow-md' : 'bg-white border text-stone-600 hover:bg-stone-50'
            }`}
          >
            <LayoutDashboard size={16} /> Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('host-event')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'host-event' ? 'bg-accent text-white shadow-md' : 'bg-white border text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Plus size={16} /> Host Event
          </button>
          <button
            onClick={() => setActiveTab('applicants')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'applicants' ? 'bg-accent text-white shadow-md' : 'bg-white border text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Users size={16} /> Registered Applicants ({applications.length})
          </button>
        </aside>

        {/* Dynamic Panels */}
        <main className="flex-grow">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-stone-200 text-left">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Total Registrations</span>
                  <span className="text-2xl font-extrabold text-stone-900 font-display">{totalRegistrations}</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-stone-200 text-left">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">Payment Successful</span>
                  <span className="text-2xl font-extrabold text-emerald-700 font-display">{paySuccess}</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-stone-200 text-left">
                  <span className="text-[10px] font-bold text-red-650 uppercase tracking-wider block mb-1">Payment Failed</span>
                  <span className="text-2xl font-extrabold text-red-700 font-display">{payFailed}</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-stone-200 text-left">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-1">Payment Pending</span>
                  <span className="text-2xl font-extrabold text-amber-700 font-display">{payPending}</span>
                </div>
              </div>

              {/* Host Events List */}
              <div className="bg-white p-6 border border-stone-200 rounded-3xl space-y-4">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2 border-b pb-2">
                  <Calendar size={18} className="text-stone-400" /> Hosted Events List
                </h3>

                {events.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {events.map(evt => (
                      <div key={evt.id} className="p-4 border border-stone-200 rounded-2xl space-y-2 bg-stone-50/30">
                        <span className="inline-block px-2.5 py-0.5 bg-stone-100 border text-stone-500 rounded text-[9px] font-bold uppercase">{evt.eventType}</span>
                        <h4 className="font-bold text-stone-900">{evt.title}</h4>
                        <p className="text-stone-500 leading-relaxed text-[11px] line-clamp-2">{evt.description}</p>
                        <div className="pt-2 border-t flex justify-between items-center text-[10px] text-stone-400 font-bold">
                          <span>Min Sponsor: ₹{evt.minSponsorAmount}</span>
                          <span className="font-mono text-stone-550">{evt.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-stone-450 font-bold">
                    No active events created. Go to "Host Event" tab to host one.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'host-event' && (
            <div className="bg-white border border-stone-200 rounded-3xl p-6">
              <h3 className="text-base font-bold text-stone-900 font-display mb-4 border-b pb-2">Create New Host Event</h3>
              
              <form onSubmit={handleHostEvent} className="space-y-4 text-xs">
                {formError && <div className="p-3 bg-red-50 text-red-750 font-bold rounded-xl">{formError}</div>}
                {formSuccess && <div className="p-3 bg-emerald-50 text-emerald-850 font-bold rounded-xl">{formSuccess}</div>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider">Event Title *</label>
                    <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider">Event Type Category *</label>
                    <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-bold text-stone-600 focus:outline-none focus:border-accent bg-white cursor-pointer">
                      {eventTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider">Event Description *</label>
                    <textarea rows="3" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} required className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider">Facility Details (Details of event venue setup)</label>
                    <textarea rows="3" value={facilities} onChange={(e) => setFacilities(e.target.value)} placeholder="WiFi, Catering service, Seating arrangements details..." className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider">Minimum Sponsorship Amount (₹)</label>
                    <input type="number" min="0" value={minSponsor} onChange={(e) => setMinSponsor(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                  </div>
                </div>

                <div className="pt-4 border-t flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    Host Active Event
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'applicants' && (
            <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs">
              <div className="p-4 border-b">
                <h3 className="text-base font-bold text-stone-900 font-display">Registered Event Applicants</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 text-[10px] uppercase font-bold tracking-wider text-stone-500 border-b border-stone-150">
                      <th className="px-6 py-4">Applicant ID</th>
                      <th className="px-6 py-4">Name & Contact</th>
                      <th className="px-6 py-4">Role Booking</th>
                      <th className="px-6 py-4">Payment Status</th>
                      <th className="px-6 py-4">Review Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-150 text-xs text-stone-700">
                    {applications.length > 0 ? (
                      applications.map((app) => (
                        <tr key={app.id} className="hover:bg-stone-50/50 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-stone-900">{app.id}</td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-stone-900 block">{app.name}</span>
                            <span className="text-[10px] text-stone-550 block">{app.email} • {app.mobile}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 bg-stone-100 border text-stone-600 rounded-lg text-[10px] font-bold uppercase">{app.role}</span>
                            {app.role === 'Sponsor' && <span className="block text-[10px] text-accent font-extrabold mt-1">₹{app.sponsorAmount}</span>}
                          </td>
                          <td className="px-6 py-4">
                            {app.paymentStatus === 'Successful' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle className="w-3 h-3" /> Success
                              </span>
                            ) : app.paymentStatus === 'Unsuccessful' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                                <XCircle className="w-3 h-3" /> Failed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-250 animate-pulse">
                                <Clock className="w-3 h-3" /> Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {app.status === 'Approved' ? (
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-750 font-bold border border-emerald-150 rounded text-[10px]">Approved</span>
                            ) : app.status === 'Rejected' ? (
                              <span className="px-2 py-0.5 bg-red-50 text-red-750 font-bold border border-red-150 rounded text-[10px]">Rejected</span>
                            ) : (
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-750 font-bold border border-amber-150 rounded text-[10px]">Pending</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleOpenEditModal(app)}
                              className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-bold inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Edit size={13} /> View/Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-16 text-center text-stone-400 font-bold">
                          No applicants for your hosted events yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Edit Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-xs p-4 overflow-y-auto text-left">
          <div className="bg-white border border-stone-250 w-full max-w-xl rounded-3xl shadow-xl overflow-hidden flex flex-col my-8 max-h-[85vh]">
            <div className="px-6 py-4 bg-primary text-white flex justify-between items-center shrink-0">
              <h3 className="font-display font-extrabold text-sm flex items-center gap-2">
                Edit Applicant ID: {selectedApp.id}
              </h3>
              <button onClick={() => setSelectedApp(null)} className="text-white/80 hover:text-white p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveApplicantEdit} className="p-6 overflow-y-auto space-y-4 flex-grow text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Applicant Name</label>
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">DOB</label>
                  <input type="date" value={editDob} onChange={(e) => setEditDob(e.target.value)} required className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Mobile Number</label>
                  <input type="text" value={editMobile} onChange={(e) => setEditMobile(e.target.value)} required className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Email Address</label>
                  <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} required className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                </div>
              </div>

              {(selectedApp.role === 'Visitor' || selectedApp.role === 'Couple' || selectedApp.role === 'Sponsor') && (
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Number of Attending Persons</label>
                  <input type="number" min="1" value={editPersonsCount} onChange={(e) => setEditPersonsCount(Number(e.target.value))} required className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                </div>
              )}

              {selectedApp.role === 'Sponsor' && (
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Sponsorship Commitment Amount (₹)</label>
                  <input type="number" min="0" value={editSponsorAmount} onChange={(e) => setEditSponsorAmount(e.target.value)} required className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Payment Checkout Status</label>
                  <select value={editPaymentStatus} onChange={(e) => setEditPaymentStatus(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-600 bg-white">
                    <option value="Pending">Pending</option>
                    <option value="Successful">Successful</option>
                    <option value="Unsuccessful">Unsuccessful</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Registration Review Status</label>
                  <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-600 bg-white">
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* View uploaded documents */}
              <div className="pt-3 border-t space-y-2">
                <h5 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Uploaded Documents</h5>
                <div className="flex flex-wrap gap-2 text-[10px]">
                  {selectedApp.photo && <a href={selectedApp.photo.url} target="_blank" rel="noreferrer" className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 border text-stone-700 font-bold rounded-lg transition-colors">Applicant Photo</a>}
                  {selectedApp.aadharDoc && <a href={selectedApp.aadharDoc.url} target="_blank" rel="noreferrer" className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 border text-stone-700 font-bold rounded-lg transition-colors">Aadhar Card</a>}
                  {selectedApp.passportDoc && <a href={selectedApp.passportDoc.url} target="_blank" rel="noreferrer" className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 border text-stone-700 font-bold rounded-lg transition-colors">Passport Document</a>}
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2 shrink-0">
                <button type="button" onClick={() => setSelectedApp(null)} className="px-4 py-2 border border-stone-200 rounded-xl text-xs font-bold hover:bg-stone-50 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-all shadow-xs">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
