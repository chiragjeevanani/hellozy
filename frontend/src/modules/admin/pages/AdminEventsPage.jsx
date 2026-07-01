import React, { useState, useEffect } from 'react';
import { getEvents, updateEvent, getEventTypes } from '../../registration/utils/registrationStore';
import { Search, Calendar, Eye, CheckCircle, XCircle, ArrowLeftRight, Edit3, X, MapPin, Tag } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Resend Reason state
  const [isResending, setIsResending] = useState(false);
  const [resendReason, setResendReason] = useState('');

  // Manually Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editType, setEditType] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editFacilities, setEditFacilities] = useState('');
  const [editPricing, setEditPricing] = useState({ Participate: 0, Visitor: 0, Couple: 0 });
  const [editMinSponsor, setEditMinSponsor] = useState(0);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadEvents();
    setCategories(getEventTypes());
  }, []);

  const loadEvents = () => {
    const list = getEvents();
    setEvents(list);
  };

  useEffect(() => {
    let result = [...events];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(term) ||
        (e.organizerName && e.organizerName.toLowerCase().includes(term)) ||
        e.id.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(e => e.status === statusFilter);
    }
    setFilteredEvents(result);
  }, [searchTerm, statusFilter, events]);

  const handleApprove = (evt) => {
    const updated = updateEvent({
      ...evt,
      status: 'Approved',
      resendReason: ''
    });
    if (updated) {
      loadEvents();
      setSelectedEvent(updated);
      setIsResending(false);
      setIsEditing(false);
    }
  };

  const handleReject = (evt) => {
    const updated = updateEvent({
      ...evt,
      status: 'Rejected',
      resendReason: ''
    });
    if (updated) {
      loadEvents();
      setSelectedEvent(updated);
      setIsResending(false);
      setIsEditing(false);
    }
  };

  const handleResendSubmit = (e) => {
    e.preventDefault();
    if (!resendReason.trim()) return;

    const updated = updateEvent({
      ...selectedEvent,
      status: 'Needs Revision',
      resendReason: resendReason
    });
    if (updated) {
      loadEvents();
      setSelectedEvent(updated);
      setIsResending(false);
      setResendReason('');
    }
  };

  const handleStartEdit = (evt) => {
    setEditTitle(evt.title || '');
    setEditDate(evt.eventDate || '');
    setEditLocation(evt.eventLocation || '');
    setEditType(evt.eventType || '');
    setEditDesc(evt.description || '');
    setEditFacilities(evt.facilities || '');
    setEditPricing({
      Participate: evt.rolePricing?.Participate ?? 0,
      Visitor: evt.rolePricing?.Visitor ?? 0,
      Couple: evt.rolePricing?.Couple ?? 0
    });
    setEditMinSponsor(evt.minSponsorAmount ?? 0);
    setIsEditing(true);
    setIsResending(false);
  };

  const handleSaveAndApprove = (e) => {
    e.preventDefault();

    const updated = updateEvent({
      ...selectedEvent,
      title: editTitle,
      eventDate: editDate,
      eventLocation: editLocation,
      eventType: editType,
      description: editDesc,
      facilities: editFacilities,
      rolePricing: {
        ...selectedEvent.rolePricing,
        Participate: Number(editPricing.Participate) || 0,
        Visitor: Number(editPricing.Visitor) || 0,
        Couple: Number(editPricing.Couple) || 0
      },
      minSponsorAmount: Number(editMinSponsor) || 0,
      status: 'Approved',
      resendReason: ''
    });

    if (updated) {
      loadEvents();
      setSelectedEvent(updated);
      setIsEditing(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Needs Revision':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-stone-50 text-stone-600 border-stone-200';
    }
  };

  return (
    <div className="space-y-8 text-left font-sans">
      <div>
        <h2 className="text-2xl font-extrabold text-primary font-display">Event Requests & Approvals</h2>
        <p className="text-xs text-stone-500 font-semibold mt-1">
          Review, approve, reject, or send back event requests hosted by platform organizers.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Table/List area */}
        <div className="xl:col-span-2 bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs flex flex-col">
          {/* Filters Bar */}
          <div className="p-6 border-b border-stone-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search by Title, ID, Organizer..."
                className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-xs font-semibold text-stone-850"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-3 py-2.5 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-xs font-bold text-stone-650 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Needs Revision">Needs Revision</option>
            </select>
          </div>

          {/* List Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-stone-50 text-[10px] uppercase font-extrabold tracking-wider text-stone-500 border-b border-stone-150">
                  <th className="px-6 py-4">ID / Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Organizer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-150 text-xs font-semibold text-stone-700">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map(evt => (
                    <tr 
                      key={evt.id} 
                      className={`hover:bg-stone-50/50 transition-colors cursor-pointer ${
                        selectedEvent?.id === evt.id ? 'bg-accent/5' : ''
                      }`}
                      onClick={() => {
                        setSelectedEvent(evt);
                        setIsResending(false);
                        setIsEditing(false);
                      }}
                    >
                      <td className="px-6 py-4">
                        <span className="text-[10px] text-stone-400 font-mono block">#{evt.id}</span>
                        <span className="text-stone-900 font-bold leading-snug line-clamp-1">{evt.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-0.5 bg-stone-100 border border-stone-200 rounded text-[9px] font-bold text-stone-600 uppercase">
                          {evt.eventType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-stone-800">{evt.organizerName || 'Hellozy Organizer'}</td>
                      <td className="px-6 py-4 text-stone-500 font-medium">
                        {new Date(evt.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase ${getStatusBadgeClass(evt.status)}`}>
                          {evt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setSelectedEvent(evt);
                            setIsResending(false);
                            setIsEditing(false);
                          }}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-stone-450 font-bold">
                      No event requests found matching filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View/Moderation Drawer */}
        <div className="xl:col-span-1 space-y-6">
          {selectedEvent ? (
            <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-md space-y-6 text-xs">
              {/* Header */}
              <div className="flex justify-between items-start border-b pb-4">
                <div className="text-left">
                  <span className="text-[9px] uppercase font-extrabold tracking-wider text-stone-400">EVENT PROPOSAL</span>
                  <h3 className="text-sm font-bold text-stone-900 font-mono leading-none mt-1">#{selectedEvent.id}</h3>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 rounded-lg hover:bg-stone-100 text-stone-450 hover:text-stone-700 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {!isEditing ? (
                /* Standard Detailed View */
                <div className="space-y-6 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase ${getStatusBadgeClass(selectedEvent.status)}`}>
                        {selectedEvent.status}
                      </span>
                      <span className="text-[10px] text-stone-400 font-semibold">{new Date(selectedEvent.createdAt).toLocaleDateString()}</span>
                    </div>
                    {selectedEvent.eventImage?.url && (
                      <div className="w-full aspect-video rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                        <img src={selectedEvent.eventImage.url} alt={selectedEvent.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <h4 className="text-base font-extrabold text-stone-900 leading-snug">{selectedEvent.title}</h4>
                    <p className="text-stone-600 leading-relaxed font-medium">{selectedEvent.description}</p>
                  </div>

                  <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-3 font-semibold text-stone-750">
                    <div className="flex justify-between py-1 border-b border-stone-200/40">
                      <span className="text-stone-450 flex items-center gap-1"><Tag size={12} /> Category</span>
                      <span className="text-stone-900 font-bold">{selectedEvent.eventType}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-200/40">
                      <span className="text-stone-450 flex items-center gap-1"><Calendar size={12} /> Event Date</span>
                      <span className="text-stone-900 font-bold">{new Date(selectedEvent.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-200/40">
                      <span className="text-stone-450 flex items-center gap-1"><MapPin size={12} /> Location</span>
                      <span className="text-stone-900 font-bold">{selectedEvent.eventLocation}</span>
                    </div>
                    {selectedEvent.facilities && (
                      <div className="pt-2 text-left">
                        <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider mb-1">Facilities</span>
                        <p className="text-[11px] text-stone-600 font-normal italic leading-relaxed">{selectedEvent.facilities}</p>
                      </div>
                    )}
                  </div>

                  {/* Pricing Overview */}
                  <div className="space-y-3 border-t pt-4">
                    <h5 className="text-[10px] font-bold text-stone-450 uppercase tracking-wider">Prices & Bookings</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 border border-stone-150 p-3 rounded-xl font-bold">
                      <div>Participate: <span className="text-accent block">₹{selectedEvent.rolePricing?.Participate ?? 0}</span></div>
                      <div>Visitor: <span className="text-accent block">₹{selectedEvent.rolePricing?.Visitor ?? 0}</span></div>
                      <div>Couple: <span className="text-accent block">₹{selectedEvent.rolePricing?.Couple ?? 0}</span></div>
                      <div>Sponsor (Min): <span className="text-accent block">₹{selectedEvent.minSponsorAmount ?? 0}</span></div>
                    </div>
                  </div>

                  {/* Show Needs Revision Reason */}
                  {selectedEvent.status === 'Needs Revision' && selectedEvent.resendReason && (
                    <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-left">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">Needs Revision Comment</p>
                      <p className="font-semibold mt-1 text-[11px]">{selectedEvent.resendReason}</p>
                    </div>
                  )}

                  {/* Action Buttons Row */}
                  <div className="pt-4 border-t space-y-3">
                    {!isResending ? (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => handleApprove(selectedEvent)}
                            className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <CheckCircle size={14} /> Approve Event
                          </button>
                          <button
                            onClick={() => handleReject(selectedEvent)}
                            className="py-2.5 bg-red-650 hover:bg-red-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <XCircle size={14} /> Reject
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => setIsResending(true)}
                            className="py-2.5 bg-amber-500 hover:bg-amber-650 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <ArrowLeftRight size={14} /> Resend (Refill)
                          </button>
                          <button
                            onClick={() => handleStartEdit(selectedEvent)}
                            className="py-2.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <Edit3 size={14} /> Manually Edit
                          </button>
                        </div>
                      </>
                    ) : (
                      /* Resend reason form */
                      <form onSubmit={handleResendSubmit} className="space-y-3 text-left">
                        <div className="space-y-1">
                          <label className="text-[10px] font-extrabold text-stone-550 uppercase tracking-wider block">Reason to Refill *</label>
                          <textarea
                            rows="3"
                            value={resendReason}
                            onChange={(e) => setResendReason(e.target.value)}
                            placeholder="Specify what mistakes are made or details that need correction (e.g. adjust Couple pricing, clarify location details...)"
                            className="w-full p-3 border border-stone-250 rounded-xl font-medium focus:outline-none focus:border-accent"
                            required
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="flex-1 py-2 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all cursor-pointer"
                          >
                            Send back
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsResending(false)}
                            className="px-4 py-2 border border-stone-200 text-stone-600 hover:bg-stone-50 font-bold rounded-xl transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              ) : (
                /* Admin Manual Edit Form */
                <form onSubmit={handleSaveAndApprove} className="space-y-4 text-left">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <Edit3 size={14} className="text-accent" /> Edit Event & Approve
                  </h4>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider block">Event Title</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-250 rounded-xl font-semibold focus:outline-none focus:border-accent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider block">Date</label>
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-250 rounded-xl font-semibold focus:outline-none focus:border-accent"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-555 uppercase tracking-wider block">Location / City</label>
                      <input
                        type="text"
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-250 rounded-xl font-semibold focus:outline-none focus:border-accent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider block">Event Category</label>
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-250 rounded-xl font-bold text-stone-605 focus:outline-none focus:border-accent bg-white cursor-pointer"
                    >
                      {categories.map((c, idx) => (
                        <option key={idx} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider block">Description</label>
                    <textarea
                      rows="3"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-250 rounded-xl font-medium focus:outline-none focus:border-accent"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider block">Facilities</label>
                    <textarea
                      rows="2"
                      value={editFacilities}
                      onChange={(e) => setEditFacilities(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-250 rounded-xl font-medium focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Pricing grid */}
                  <div className="pt-2 border-t space-y-2">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Modify Ticket Prices (₹)</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                      <div className="space-y-0.5">
                        <label className="text-stone-500">Participate Price</label>
                        <input
                          type="number"
                          value={editPricing.Participate}
                          onChange={(e) => setEditPricing(prev => ({ ...prev, Participate: e.target.value }))}
                          className="w-full px-2 py-1 border border-stone-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-stone-500">Visitor Price</label>
                        <input
                          type="number"
                          value={editPricing.Visitor}
                          onChange={(e) => setEditPricing(prev => ({ ...prev, Visitor: e.target.value }))}
                          className="w-full px-2 py-1 border border-stone-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-stone-500">Couple Price</label>
                        <input
                          type="number"
                          value={editPricing.Couple}
                          onChange={(e) => setEditPricing(prev => ({ ...prev, Couple: e.target.value }))}
                          className="w-full px-2 py-1 border border-stone-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-stone-500">Min Bid (Sponsor)</label>
                        <input
                          type="number"
                          value={editMinSponsor}
                          onChange={(e) => setEditMinSponsor(e.target.value)}
                          className="w-full px-2 py-1 border border-stone-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save actions */}
                  <div className="flex gap-2 pt-3 border-t">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      Save & Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2.5 border border-stone-200 text-stone-600 hover:bg-stone-50 font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="bg-stone-50 border border-stone-200 border-dashed rounded-3xl p-12 text-center text-stone-400 font-bold">
              Select an event request from the list to begin moderation review.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
