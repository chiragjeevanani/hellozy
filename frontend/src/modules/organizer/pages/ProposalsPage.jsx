import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../../registration/utils/registrationStore';
import { Search, Calendar, MapPin, Plane, ShieldCheck, Tag, Info, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ProposalsPage() {
  const [organizer, setOrganizer] = useState(null);
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('hellozy_active_organizer');
    if (session) {
      const orgData = JSON.parse(session);
      setOrganizer(orgData);
      
      const allEvents = getEvents().filter(e => e.organizerId === orgData.id);
      setEvents(allEvents);
    }
  }, []);

  useEffect(() => {
    let result = [...events];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(term) ||
        e.id.toLowerCase().includes(term) ||
        (e.eventLocation && e.eventLocation.toLowerCase().includes(term))
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(e => e.status === statusFilter);
    }
    setFiltered(result);
  }, [searchTerm, statusFilter, events]);

  const handleEditRefill = (evtId) => {
    navigate(`/organizer/events?edit=${evtId}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="px-2.5 py-1 rounded-full border text-[9px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border-emerald-200">
            Approved
          </span>
        );
      case 'Rejected':
        return (
          <span className="px-2.5 py-1 rounded-full border text-[9px] font-extrabold uppercase bg-red-50 text-red-700 border-red-200">
            Rejected
          </span>
        );
      case 'Needs Revision':
        return (
          <span className="px-2.5 py-1 rounded-full border text-[9px] font-extrabold uppercase bg-amber-50 text-amber-700 border-amber-200">
            Needs Revision
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full border text-[9px] font-extrabold uppercase bg-blue-50 text-blue-700 border-blue-200">
            Pending Approval
          </span>
        );
    }
  };

  if (!organizer) return null;

  return (
    <div className="space-y-8 text-left font-sans">
      <div>
        <h2 className="text-2xl font-extrabold text-primary font-display">Event Requests Status</h2>
        <p className="text-xs text-stone-500 font-semibold mt-1">Track verification proposals, review admin remarks, and edit returned applications.</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search proposals by title, location or ID..."
            className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-xs font-semibold text-stone-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <select
            className="px-4 py-2.5 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-xs font-bold text-stone-650 cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Request Statuses</option>
            <option value="Pending">Pending Approval</option>
            <option value="Approved">Approved & Active</option>
            <option value="Rejected">Rejected</option>
            <option value="Needs Revision">Needs Revision</option>
          </select>
        </div>
      </div>

      {/* Proposals list */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(evt => (
            <div key={evt.id} className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2.5 py-0.5 bg-stone-100 border border-stone-150 text-stone-500 rounded text-[9px] font-bold uppercase">{evt.eventType}</span>
                    <span className="text-[10px] text-stone-400 font-bold font-mono">#{evt.id}</span>
                  </div>
                  {getStatusBadge(evt.status)}
                </div>

                {/* Banner image crop preview */}
                {evt.eventImage?.url && (
                  <div className="w-full aspect-video rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                    <img src={evt.eventImage.url} alt={evt.title} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Title & Description */}
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base leading-snug">{evt.title}</h3>
                  <p className="text-stone-550 leading-relaxed text-xs mt-1.5 line-clamp-3 font-medium">{evt.description}</p>
                </div>

                {/* Location & Date */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-stone-450 font-bold">
                  {evt.eventDate && <span className="flex items-center gap-1.5"><Calendar size={13} className="text-stone-400" /> {new Date(evt.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</span>}
                  {evt.eventLocation && <span className="flex items-center gap-1.5"><MapPin size={13} className="text-stone-400" /> {evt.eventLocation}</span>}
                </div>

                {/* Revision Comments */}
                {evt.status === 'Needs Revision' && evt.resendReason && (
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-left text-xs font-semibold text-amber-800">
                      <span className="font-extrabold uppercase tracking-wider text-[8px] text-amber-700 block mb-0.5">Admin Refill Comments</span>
                      {evt.resendReason}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom operational row */}
              <div className="pt-5 mt-5 border-t border-stone-100 flex items-center justify-between gap-4">
                <div className="text-[10px] text-stone-400 font-bold">
                  Submitted: {new Date(evt.createdAt).toLocaleDateString()}
                </div>
                {evt.status === 'Needs Revision' && (
                  <button
                    onClick={() => handleEditRefill(evt.id)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    Edit & Refill <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-3xl py-20 text-center text-stone-400 font-bold text-xs shadow-xs">
          {events.length === 0 ? (
            <p>You haven't submitted any event requests yet.</p>
          ) : (
            <p>No proposals matching filters.</p>
          )}
        </div>
      )}
    </div>
  );
}
