import React, { useState, useEffect } from 'react';
import { getEvents, getEventApplications, getCommissionConfig } from '../../registration/utils/registrationStore';
import { TrendingUp, IndianRupee, Percent } from 'lucide-react';

export default function EarningsPage() {
  const [organizer, setOrganizer] = useState(null);
  const [events, setEvents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [commissionConfig, setCommissionConfigState] = useState({ type: 'percentage', value: 10 });

  useEffect(() => {
    const session = localStorage.getItem('hellozy_active_organizer');
    if (session) {
      const orgData = JSON.parse(session);
      setOrganizer(orgData);

      const allEvents = getEvents().filter(e => e.organizerId === orgData.id);
      setEvents(allEvents);

      const eventIds = allEvents.map(e => e.id);
      const orgApps = getEventApplications().filter(a => eventIds.includes(a.eventId) && a.paymentStatus === 'Successful');
      setApplications(orgApps);

      setCommissionConfigState(getCommissionConfig());
    }
  }, []);

  // Totals calculations
  const grossRevenue = applications.reduce((sum, a) => sum + (Number(a.bookingAmount) || 0), 0);
  const totalCommission = applications.reduce((sum, a) => sum + (Number(a.commissionAmount) || 0), 0);
  const netEarnings = grossRevenue - totalCommission;

  const commissionLabel = commissionConfig.type === 'percentage'
    ? `${commissionConfig.value}% per booking`
    : `₹${commissionConfig.value} flat per booking`;

  if (!organizer) return null;

  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="text-2xl font-extrabold text-primary font-display">My Earnings</h2>
        <p className="text-xs text-stone-500 font-semibold mt-1">Track financial summaries, payouts, and platform commission history.</p>
      </div>

      {/* Cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Gross Revenue</span>
          <span className="text-2xl font-extrabold text-stone-900 font-display">₹{grossRevenue.toLocaleString()}</span>
          <span className="text-[10px] text-stone-400 font-semibold block mt-1">Total collected from {applications.length} successful bookings</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-1">Platform Commission</span>
          <span className="text-2xl font-extrabold text-accent font-display">₹{totalCommission.toLocaleString()}</span>
          <span className="text-[10px] text-stone-400 font-semibold block mt-1">Deducted at {commissionLabel}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-emerald-250 bg-emerald-50/30">
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">Net Payout (You)</span>
          <span className="text-2xl font-extrabold text-emerald-700 font-display">₹{netEarnings.toLocaleString()}</span>
          <span className="text-[10px] text-stone-400 font-semibold block mt-1">After commission deduction</span>
        </div>
      </div>

      {/* Event-wise Table */}
      <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-4 border-b">
          <h3 className="text-sm font-bold text-stone-900 font-display">Event-wise Earnings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 text-[10px] uppercase font-bold tracking-wider text-stone-500 border-b">
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4 text-right">Successful Bookings</th>
                <th className="px-6 py-4 text-right">Gross Revenue</th>
                <th className="px-6 py-4 text-right">Commission Deducted</th>
                <th className="px-6 py-4 text-right">Net Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
              {events.length > 0 ? events.map(evt => {
                const evtApps = applications.filter(a => a.eventId === evt.id);
                const evtGross = evtApps.reduce((s, a) => s + (Number(a.bookingAmount) || 0), 0);
                const evtComm = evtApps.reduce((s, a) => s + (Number(a.commissionAmount) || 0), 0);
                return (
                  <tr key={evt.id} className="hover:bg-stone-50/50">
                    <td className="px-6 py-4">
                      <span className="font-bold text-stone-900 block">{evt.title}</span>
                      <span className="text-[10px] text-stone-400">{evt.eventType} • {evt.id}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-stone-700">{evtApps.length}</td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-700">₹{evtGross.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-bold text-accent">₹{evtComm.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-bold text-stone-900">₹{(evtGross - evtComm).toLocaleString()}</td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-stone-400 font-bold">No events hosted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
