import React, { useState, useEffect } from 'react';
import { getEvents, getEventApplications } from '../../registration/utils/registrationStore';
import { Users, Edit, CheckCircle, XCircle, Clock, X } from 'lucide-react';

export default function ApplicantsPage() {
  const [organizer, setOrganizer] = useState(null);
  const [events, setEvents] = useState([]);
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

  useEffect(() => {
    const session = localStorage.getItem('hellozy_active_organizer');
    if (session) {
      const orgData = JSON.parse(session);
      setOrganizer(orgData);

      const allEvents = getEvents().filter(e => e.organizerId === orgData.id);
      setEvents(allEvents);

      const eventIds = allEvents.map(e => e.id);
      const orgApps = getEventApplications().filter(a => eventIds.includes(a.eventId));
      setApplications(orgApps);
    }
  }, []);

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

  if (!organizer) return null;

  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="text-2xl font-extrabold text-primary font-display">Registered Event Applicants</h2>
        <p className="text-xs text-stone-500 font-semibold mt-1">Review checkouts, payments, and verify attendee profiles.</p>
      </div>

      <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-4 border-b">
          <h3 className="text-sm font-bold text-stone-900 font-display">Applicant Roster</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 text-[10px] uppercase font-bold tracking-wider text-stone-500 border-b border-stone-150">
                <th className="px-6 py-4">Applicant ID</th>
                <th className="px-6 py-4">Name & Contact</th>
                <th className="px-6 py-4">Role Booking</th>
                <th className="px-6 py-4">Booking Amount</th>
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
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-700">
                      ₹{Number(app.bookingAmount || 0).toLocaleString()}
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
                  <td colSpan="7" className="px-6 py-16 text-center text-stone-400 font-bold">
                    No applicants for your hosted events yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
