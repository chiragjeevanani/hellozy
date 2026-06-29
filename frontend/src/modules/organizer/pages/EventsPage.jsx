import React, { useState, useEffect } from 'react';
import { getEvents, saveEvent, getEventTypes } from '../../registration/utils/registrationStore';
import { Calendar, Plus, Tag, MapPin, Plane, ShieldCheck } from 'lucide-react';

export default function EventsPage() {
  const [organizer, setOrganizer] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);

  // Form states
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [facilities, setFacilities] = useState('');
  const [minSponsor, setMinSponsor] = useState('0');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [requirePassport, setRequirePassport] = useState(false);
  const [requireTravel, setRequireTravel] = useState(true);

  // Enabled roles checklist
  const [enabledRoles, setEnabledRoles] = useState({
    Participate: true,
    Visitor: true,
    Couple: true,
    Sponsor: true
  });

  const [rolePricing, setRolePricing] = useState({ Participate: 500, Visitor: 200, Couple: 800, Sponsor: 0 });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('hellozy_active_organizer');
    if (session) {
      const orgData = JSON.parse(session);
      setOrganizer(orgData);

      const allEvents = getEvents().filter(e => e.organizerId === orgData.id);
      setEvents(allEvents);

      const cats = getEventTypes();
      setEventTypes(cats);
      if (cats.length > 0) setEventType(cats[0]);
    }
  }, []);

  const handleHostEvent = (e) => {
    e.preventDefault();
    if (!eventTitle || !eventDesc || !eventType || !eventDate || !eventLocation) {
      setFormError('Please complete all event details fields.');
      return;
    }

    const bookingRoles = Object.keys(enabledRoles).filter(r => enabledRoles[r]);
    if (bookingRoles.length === 0) {
      setFormError('Please enable at least one booking role for this event.');
      return;
    }

    const newEvent = {
      organizerId: organizer.id,
      organizerName: organizer.ownerName,
      title: eventTitle,
      eventType,
      description: eventDesc,
      facilities,
      minSponsorAmount: enabledRoles.Sponsor ? (Number(minSponsor) || 0) : 0,
      bookingRoles,
      rolePricing: bookingRoles.reduce((acc, role) => {
        acc[role] = rolePricing[role] || 0;
        return acc;
      }, {}),
      eventDate,
      eventLocation,
      requirePassport,
      requireTravel
    };

    const saved = saveEvent(newEvent);
    if (saved) {
      setFormSuccess('Event successfully hosted!');
      const allEvents = getEvents().filter(e => e.organizerId === organizer.id);
      setEvents(allEvents);

      // Reset form
      setEventTitle('');
      setEventDesc('');
      setFacilities('');
      setMinSponsor('0');
      setEventDate('');
      setEventLocation('');
      setRequirePassport(false);
      setRequireTravel(true);
      setEnabledRoles({ Participate: true, Visitor: true, Couple: true, Sponsor: true });
      setRolePricing({ Participate: 500, Visitor: 200, Couple: 800, Sponsor: 0 });
      setFormError('');

      setTimeout(() => {
        setFormSuccess('');
      }, 3000);
    } else {
      setFormError('Failed to host event.');
    }
  };

  if (!organizer) return null;

  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="text-2xl font-extrabold text-primary font-display">Host & Manage Events</h2>
        <p className="text-xs text-stone-500 font-semibold mt-1">Schedule new events on Hellozy and track configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Host Form */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs lg:col-span-1">
          <h3 className="text-sm font-bold text-stone-900 border-b pb-2 mb-4 flex items-center gap-1.5">
            <Plus size={16} className="text-accent" /> Host New Event
          </h3>

          <form onSubmit={handleHostEvent} className="space-y-4 text-xs">
            {formError && <div className="p-3 bg-red-50 text-red-750 font-bold rounded-xl">{formError}</div>}
            {formSuccess && <div className="p-3 bg-emerald-50 text-emerald-850 font-bold rounded-xl">{formSuccess}</div>}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider block">Event Title *</label>
              <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider block">Event Date *</label>
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent bg-white" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider block">Location / City *</label>
                <input type="text" placeholder="e.g. Mumbai" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider block">Event Category *</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-bold text-stone-600 focus:outline-none focus:border-accent bg-white cursor-pointer">
                {eventTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-550 uppercase tracking-wider block">Description *</label>
              <textarea rows="3" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} required className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-555 uppercase tracking-wider block">Venue Facilities Details</label>
              <textarea rows="2" value={facilities} onChange={(e) => setFacilities(e.target.value)} placeholder="WiFi, Catering, audio setup, seating arrangements..." className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent" />
            </div>

            {/* Role-wise pricing & checklist */}
            <div className="pt-3 border-t space-y-3">
              <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Booking Roles & Pricing</h4>
              <div className="space-y-2.5">
                {['Participate', 'Visitor', 'Couple', 'Sponsor'].map(role => (
                  <div key={role} className="flex items-center justify-between gap-4 p-2.5 bg-stone-50 rounded-xl border border-stone-150">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={enabledRoles[role]} 
                        onChange={(e) => setEnabledRoles(prev => ({ ...prev, [role]: e.target.checked }))}
                        className="accent-accent"
                      />
                      <span className="text-xs font-bold text-stone-750">{role}</span>
                    </label>
                    {enabledRoles[role] && role !== 'Sponsor' && (
                      <div className="flex items-center gap-1 max-w-[90px]">
                        <span className="text-[10px] text-stone-400 font-bold">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={rolePricing[role] ?? 0}
                          onChange={(e) => setRolePricing(prev => ({ ...prev, [role]: Number(e.target.value) }))}
                          className="w-full px-2 py-1 border border-stone-200 rounded-lg text-xs font-semibold bg-white focus:outline-none focus:border-accent text-right"
                          placeholder="Price"
                        />
                      </div>
                    )}
                    {enabledRoles[role] && role === 'Sponsor' && (
                      <div className="flex items-center gap-1 max-w-[130px]">
                        <span className="text-[8px] text-stone-400 font-bold block leading-none text-right">Min Bid (₹):</span>
                        <input
                          type="number"
                          min="0"
                          value={minSponsor}
                          onChange={(e) => setMinSponsor(e.target.value)}
                          className="w-full px-2 py-1 border border-stone-200 rounded-lg text-xs font-semibold bg-white focus:outline-none focus:border-accent text-right"
                          placeholder="Min Bid"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Traveler & Document Settings */}
            <div className="pt-3 border-t space-y-3">
              <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Attendee Requirements</h4>
              
              <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-150">
                <div>
                  <span className="text-xs font-bold text-stone-750 block">Collect Travel Details</span>
                  <span className="text-[9px] text-stone-400 font-medium block">Ask for Train/Flight option</span>
                </div>
                <button
                  type="button"
                  onClick={() => setRequireTravel(!requireTravel)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    requireTravel ? 'bg-accent' : 'bg-stone-200'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                    requireTravel ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-150">
                <div>
                  <span className="text-xs font-bold text-stone-750 block">Passport Details</span>
                  <span className="text-[9px] text-stone-400 font-medium block">Require passport verification files</span>
                </div>
                <button
                  type="button"
                  onClick={() => setRequirePassport(!requirePassport)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    requirePassport ? 'bg-accent' : 'bg-stone-200'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                    requirePassport ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-all cursor-pointer shadow-xs">
              Host Active Event
            </button>
          </form>
        </div>

        {/* Event List */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-stone-900 border-b pb-2 flex items-center gap-1.5">
            <Calendar size={18} className="text-stone-400" /> Current Hosted Events ({events.length})
          </h3>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.map(evt => (
                <div key={evt.id} className="p-4 border border-stone-150 rounded-2xl space-y-3 bg-stone-50/50 hover:bg-stone-50 transition-colors flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <span className="inline-block px-2.5 py-0.5 bg-stone-100 border border-stone-200 text-stone-500 rounded text-[9px] font-bold uppercase">{evt.eventType}</span>
                      <div className="flex gap-1.5">
                        {evt.requireTravel && <span className="p-1 rounded bg-stone-200/50 text-stone-650" title="Travel details required"><Plane size={10} /></span>}
                        {evt.requirePassport && <span className="p-1 rounded bg-accent/10 text-accent" title="Passport required"><ShieldCheck size={10} /></span>}
                      </div>
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm leading-snug">{evt.title}</h4>
                    <p className="text-stone-550 leading-relaxed text-[11px] line-clamp-3">{evt.description}</p>
                    
                    {/* Date and Location row */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-stone-450 font-bold pt-1">
                      {evt.eventDate && <span className="flex items-center gap-1"><Calendar size={11} className="text-stone-400" /> {new Date(evt.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>}
                      {evt.eventLocation && <span className="flex items-center gap-1"><MapPin size={11} className="text-stone-400" /> {evt.eventLocation}</span>}
                    </div>

                    {evt.facilities && (
                      <p className="text-[10px] text-stone-400 font-medium italic pt-1"><strong className="text-stone-500 font-bold uppercase tracking-wider not-italic text-[9px] block">Facilities:</strong> {evt.facilities}</p>
                    )}
                  </div>

                  <div className="pt-3 border-t space-y-2">
                    {/* Pricing Display */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] bg-white border border-stone-150 rounded-xl p-2 font-semibold">
                      {evt.bookingRoles?.includes('Participate') && <div>Part: <span className="text-accent font-bold">₹{evt.rolePricing?.Participate ?? 0}</span></div>}
                      {evt.bookingRoles?.includes('Visitor') && <div>Vis: <span className="text-accent font-bold">₹{evt.rolePricing?.Visitor ?? 0}</span></div>}
                      {evt.bookingRoles?.includes('Couple') && <div>Cpl: <span className="text-accent font-bold">₹{evt.rolePricing?.Couple ?? 0}</span></div>}
                      {evt.bookingRoles?.includes('Sponsor') && <div>Spon (Min): <span className="text-accent font-bold">₹{evt.minSponsorAmount ?? 0}</span></div>}
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-stone-400 font-bold font-mono">
                      <span>ID: {evt.id}</span>
                      <span>{new Date(evt.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-stone-450 font-bold text-xs">
              You haven't hosted any events yet. Fill in the form on the left to host your first event.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
