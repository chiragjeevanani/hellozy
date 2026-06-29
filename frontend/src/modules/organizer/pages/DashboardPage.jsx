import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, getEventApplications } from '../../registration/utils/registrationStore';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

function DashboardCard({ label, value, icon: Icon, colorClass }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex items-start gap-4 text-left">
      <div className={`p-2.5 rounded-xl ${colorClass}`}>
        <Icon size={20} />
      </div>
      <div>
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">{label}</span>
        <span className="text-2xl font-extrabold text-stone-900 font-display mt-0.5 block">{value}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [organizer, setOrganizer] = useState(null);
  const [events, setEvents] = useState([]);
  const [applications, setApplications] = useState([]);

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

  const totalRegistrations = applications.length;
  const paySuccess = applications.filter(a => a.paymentStatus === 'Successful').length;
  const payFailed = applications.filter(a => a.paymentStatus === 'Unsuccessful').length;
  const payPending = applications.filter(a => a.paymentStatus === 'Pending').length;
  const recentApps = applications.slice(0, 5);

  if (!organizer) return null;

  return (
    <div className="space-y-8 text-left">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary to-primary-light rounded-3xl p-6 shadow-xs text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-display flex items-center gap-2">
            <Sparkles className="text-accent w-5 h-5 shrink-0" /> Welcome back, {organizer.ownerName}!
          </h2>
          <p className="text-xs text-white/70 font-semibold mt-1">
            Manage your scheduled host events and monitor user checkouts for <strong className="text-accent">{organizer.firmName || 'Sub-Admin Hub'}</strong>.
          </p>
        </div>
        <Link
          to="/organizer/events"
          className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0 w-fit"
        >
          Host New Event <ArrowRight size={14} />
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard 
          label="Total Bookings" 
          value={totalRegistrations} 
          icon={Users} 
          colorClass="bg-stone-100 text-stone-600"
        />
        <DashboardCard 
          label="Payment Successful" 
          value={paySuccess} 
          icon={CheckCircle} 
          colorClass="bg-emerald-500/10 text-emerald-700"
        />
        <DashboardCard 
          label="Payment Failed" 
          value={payFailed} 
          icon={XCircle} 
          colorClass="bg-red-55/60 text-red-700"
        />
        <DashboardCard 
          label="Payment Pending" 
          value={payPending} 
          icon={Clock} 
          colorClass="bg-amber-500/10 text-amber-700"
        />
      </div>

      {/* Main Grid: Events + Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Hosted Events List (Left 2 columns) */}
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Calendar size={18} className="text-stone-400" /> Active Hosted Events ({events.length})
            </h3>
            <Link to="/organizer/events" className="text-xs text-accent font-bold hover:text-accent-hover flex items-center gap-1 transition-colors">
              Manage Events <ArrowRight size={12} />
            </Link>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.slice(0, 4).map(evt => (
                <div key={evt.id} className="p-4 border border-stone-150 rounded-2xl space-y-2 bg-stone-50/50 hover:bg-stone-50 transition-colors">
                  <span className="inline-block px-2.5 py-0.5 bg-stone-100 border border-stone-200 text-stone-500 rounded text-[9px] font-bold uppercase">{evt.eventType}</span>
                  <h4 className="font-bold text-stone-900 leading-tight">{evt.title}</h4>
                  <p className="text-stone-500 leading-relaxed text-[11px] line-clamp-2">{evt.description}</p>
                  <div className="pt-2 border-t flex justify-between items-center text-[10px] text-stone-400 font-bold">
                    <span>Min Sponsor: ₹{evt.minSponsorAmount}</span>
                    <span className="font-mono text-stone-500">{evt.id}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-stone-400 font-bold text-xs">
              No active events hosted yet.
            </div>
          )}
        </div>

        {/* Recent Bookings Feed (Right 1 column) */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Users size={18} className="text-stone-400" /> Recent Bookings
              </h3>
              <Link to="/organizer/applicants" className="text-xs text-accent font-bold hover:text-accent-hover flex items-center gap-1 transition-colors">
                View All <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3 pt-3">
              {recentApps.length > 0 ? (
                recentApps.map(app => (
                  <div key={app.id} className="p-3 bg-stone-50/50 hover:bg-stone-50 border border-stone-150 rounded-xl transition-colors text-xs flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <span className="font-mono font-bold text-stone-900 text-[10px] block">{app.id}</span>
                      <span className="font-bold text-stone-800 block truncate">{app.name}</span>
                      <span className="text-[10px] text-stone-450 block truncate">{app.role} • ₹{app.bookingAmount}</span>
                    </div>
                    <div>
                      {app.paymentStatus === 'Successful' ? (
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded text-[9px] font-bold">Paid</span>
                      ) : app.paymentStatus === 'Unsuccessful' ? (
                        <span className="px-2 py-0.5 bg-red-50 border border-red-100 text-red-700 rounded text-[9px] font-bold">Failed</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-amber-50 border border-amber-100 text-amber-700 rounded text-[9px] font-bold animate-pulse">Pending</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-stone-400 font-bold text-xs">
                  No applicants yet.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
