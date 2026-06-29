import React, { useState, useEffect } from 'react';
import {
  getEventApplications,
  getEvents,
  getOrganizers,
  getCommissionConfig
} from '../../registration/utils/registrationStore';
import {
  IndianRupee,
  Users,
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  XCircle,
  Search,
  Filter
} from 'lucide-react';

function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex items-start gap-4">
      <div className={`p-2.5 rounded-xl ${accent}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-extrabold text-stone-900 font-display mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function AdminBookingsPage() {
  const [applications, setApplications] = useState([]);
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [commissionConfig, setCommissionConfigState] = useState({ type: 'percentage', value: 10 });

  // Filters
  const [filterOrg, setFilterOrg] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrg, setExpandedOrg] = useState(null);

  useEffect(() => {
    const apps = getEventApplications();
    const evts = getEvents();
    const orgs = getOrganizers();
    const cfg = getCommissionConfig();
    setApplications(apps);
    setEvents(evts);
    setOrganizers(orgs);
    setCommissionConfigState(cfg);
  }, []);

  // Helper lookups
  const getEventById = (id) => events.find(e => e.id === id);

  // Enrich applications with event + organizer info
  const enriched = applications.map(app => {
    const evt = getEventById(app.eventId);
    const org = organizers.find(o => o.id === evt?.organizerId);
    return {
      ...app,
      eventTitle: evt?.title || app.eventId,
      eventType: evt?.eventType || '—',
      organizerId: evt?.organizerId || '—',
      organizerName: org?.ownerName || evt?.organizerName || '—',
      firmName: org?.firmName || '—'
    };
  });

  // Filtered bookings
  const filtered = enriched.filter(app => {
    const matchOrg = filterOrg === 'all' || app.organizerId === filterOrg;
    const matchPay = filterPayment === 'all' || app.paymentStatus === filterPayment;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      app.name?.toLowerCase().includes(q) ||
      app.id?.toLowerCase().includes(q) ||
      app.eventTitle?.toLowerCase().includes(q) ||
      app.organizerName?.toLowerCase().includes(q);
    return matchOrg && matchPay && matchSearch;
  });

  // Summary stats
  const totalBookings = enriched.length;
  const grossRevenue = enriched.reduce((sum, a) => sum + (Number(a.bookingAmount) || 0), 0);
  const totalCommission = enriched.reduce((sum, a) => sum + (Number(a.commissionAmount) || 0), 0);
  const pendingPayments = enriched.filter(a => a.paymentStatus === 'Pending').length;

  // Per-organizer commission breakdown
  const orgBreakdown = organizers.map(org => {
    const orgEvents = events.filter(e => e.organizerId === org.id);
    const orgEventIds = orgEvents.map(e => e.id);
    const orgApps = enriched.filter(a => orgEventIds.includes(a.eventId));
    const gross = orgApps.reduce((s, a) => s + (Number(a.bookingAmount) || 0), 0);
    const commission = orgApps.reduce((s, a) => s + (Number(a.commissionAmount) || 0), 0);
    return {
      ...org,
      totalEvents: orgEvents.length,
      totalBookings: orgApps.length,
      gross,
      commission,
      net: gross - commission,
      events: orgEvents,
      apps: orgApps
    };
  }).filter(o => o.totalBookings > 0 || o.totalEvents > 0);

  const commissionLabel = commissionConfig.type === 'percentage'
    ? `${commissionConfig.value}%`
    : `₹${commissionConfig.value} flat`;

  return (
    <div className="space-y-8 text-left">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-primary font-display">Bookings & Commission</h2>
          <p className="text-xs text-stone-500 font-semibold mt-1">
            All event bookings across organizers. Current commission rate: <span className="text-accent font-bold">{commissionLabel}</span>
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Bookings" value={totalBookings} icon={Users} accent="bg-stone-100 text-stone-600" />
        <StatCard label="Gross Revenue" value={`₹${grossRevenue.toLocaleString()}`} icon={IndianRupee} accent="bg-emerald-50 text-emerald-600" />
        <StatCard label="Commission Earned" value={`₹${totalCommission.toLocaleString()}`} icon={TrendingUp} accent="bg-accent/10 text-accent" />
        <StatCard label="Pending Payments" value={pendingPayments} icon={Clock} accent="bg-amber-50 text-amber-600" />
      </div>

      {/* Per-Organizer Commission Breakdown */}
      <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-stone-100">
          <h3 className="text-sm font-bold text-stone-900 font-display">Per-Organizer Commission Summary</h3>
          <p className="text-[10px] text-stone-400 font-semibold mt-0.5">Expand each row to see event-level breakdown</p>
        </div>

        {orgBreakdown.length > 0 ? (
          <div className="divide-y divide-stone-100">
            {orgBreakdown.map(org => (
              <div key={org.id}>
                {/* Organizer Row */}
                <button
                  onClick={() => setExpandedOrg(expandedOrg === org.id ? null : org.id)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-stone-50/70 transition-colors text-left"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`p-2 rounded-xl text-white shrink-0 bg-primary`}>
                      <Users size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">{org.ownerName}</p>
                      <p className="text-[10px] text-stone-400 font-semibold">{org.firmName !== '—' ? org.firmName : org.email} • {org.totalEvents} event{org.totalEvents !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Bookings</p>
                      <p className="text-sm font-extrabold text-stone-800">{org.totalBookings}</p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Gross</p>
                      <p className="text-sm font-extrabold text-emerald-700">₹{org.gross.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Commission</p>
                      <p className="text-sm font-extrabold text-accent">₹{org.commission.toLocaleString()}</p>
                    </div>
                    <div className="text-right hidden lg:block">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Net (Org)</p>
                      <p className="text-sm font-extrabold text-stone-800">₹{org.net.toLocaleString()}</p>
                    </div>
                    {expandedOrg === org.id ? <ChevronDown size={16} className="text-stone-400 shrink-0" /> : <ChevronRight size={16} className="text-stone-400 shrink-0" />}
                  </div>
                </button>

                {/* Expanded Event Breakdown */}
                {expandedOrg === org.id && (
                  <div className="bg-stone-50/60 border-t border-stone-100 px-6 py-4 space-y-3">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2">Events Hosted by {org.ownerName}</p>
                    {org.events.length > 0 ? org.events.map(evt => {
                      const evtApps = org.apps.filter(a => a.eventId === evt.id);
                      const evtGross = evtApps.reduce((s, a) => s + (Number(a.bookingAmount) || 0), 0);
                      const evtComm = evtApps.reduce((s, a) => s + (Number(a.commissionAmount) || 0), 0);
                      return (
                        <div key={evt.id} className="bg-white border border-stone-150 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <span className="inline-block px-2 py-0.5 bg-stone-100 border text-stone-500 rounded text-[9px] font-bold uppercase mb-1">{evt.eventType}</span>
                            <p className="text-xs font-bold text-stone-900">{evt.title}</p>
                            <p className="text-[10px] text-stone-400 font-mono">{evt.id}</p>
                          </div>
                          <div className="flex gap-6 text-right shrink-0">
                            <div>
                              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Bookings</p>
                              <p className="text-sm font-extrabold text-stone-800">{evtApps.length}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Gross</p>
                              <p className="text-sm font-extrabold text-emerald-700">₹{evtGross.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Commission</p>
                              <p className="text-sm font-extrabold text-accent">₹{evtComm.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      );
                    }) : (
                      <p className="text-xs text-stone-400 font-semibold">No events hosted yet.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-stone-400 font-bold text-xs">
            No organizer bookings yet. Bookings will appear here once users register for events.
          </div>
        )}
      </div>

      {/* All Bookings Table */}
      <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-stone-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-bold text-stone-900 font-display">All Bookings</h3>
            <p className="text-[10px] text-stone-400 font-semibold mt-0.5">{filtered.length} result{filtered.length !== 1 ? 's' : ''} shown</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Search */}
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search by name, ID, event…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-2 border border-stone-200 rounded-xl text-[10px] font-semibold focus:outline-none focus:border-accent w-full sm:w-52"
              />
            </div>
            {/* Organizer filter */}
            <select
              value={filterOrg}
              onChange={(e) => setFilterOrg(e.target.value)}
              className="px-3 py-2 border border-stone-200 rounded-xl text-[10px] font-bold text-stone-600 bg-white focus:outline-none focus:border-accent cursor-pointer"
            >
              <option value="all">All Organizers</option>
              {organizers.map(o => (
                <option key={o.id} value={o.id}>{o.ownerName}</option>
              ))}
            </select>
            {/* Payment filter */}
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="px-3 py-2 border border-stone-200 rounded-xl text-[10px] font-bold text-stone-600 bg-white focus:outline-none focus:border-accent cursor-pointer"
            >
              <option value="all">All Payments</option>
              <option value="Pending">Pending</option>
              <option value="Successful">Successful</option>
              <option value="Unsuccessful">Unsuccessful</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 text-[10px] uppercase font-bold tracking-wider text-stone-500 border-b border-stone-150">
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Organizer</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Booking Amt</th>
                <th className="px-6 py-4 text-right">Commission</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
              {filtered.length > 0 ? filtered.map(app => (
                <tr key={app.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-stone-800 text-[10px]">{app.id}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-stone-900 block">{app.name || '—'}</span>
                    <span className="text-[10px] text-stone-400">{app.mobile || ''}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-stone-800 block truncate max-w-[160px]">{app.eventTitle}</span>
                    <span className="text-[10px] text-stone-400">{app.eventType}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-stone-800 block">{app.organizerName}</span>
                    <span className="text-[10px] text-stone-400">{app.firmName !== '—' ? app.firmName : ''}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-stone-100 border text-stone-600 rounded-lg text-[10px] font-bold uppercase">{app.role || '—'}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-700">
                    ₹{Number(app.bookingAmount || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-accent">
                    ₹{Number(app.commissionAmount || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {app.paymentStatus === 'Successful' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle size={10} /> Paid
                      </span>
                    ) : app.paymentStatus === 'Unsuccessful' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                        <XCircle size={10} /> Failed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                        <Clock size={10} /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-[10px] text-stone-400 font-semibold">
                    {new Date(app.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="px-6 py-16 text-center text-stone-400 font-bold">
                    No bookings found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
