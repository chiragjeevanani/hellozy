import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRegistrations } from '../../registration/utils/registrationStore';
import StatsCard from '../components/StatsCard';
import StatusBadge from '../components/StatusBadge';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

// Custom Tooltip component matching theme
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-stone-900 text-white p-3 rounded-xl border border-stone-850 shadow-md text-xs font-bold">
        <p className="uppercase tracking-wider text-stone-400 text-[10px]">{payload[0].payload.name}</p>
        <p className="text-sm mt-0.5 text-accent">{payload[0].value} Application(s)</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    recent: []
  });
  
  const [typeCounts, setTypeCounts] = useState({});

  useEffect(() => {
    const list = getRegistrations();
    
    const total = list.length;
    const pending = list.filter(r => r.status === 'Pending').length;
    const approved = list.filter(r => r.status === 'Approved').length;
    const rejected = list.filter(r => r.status === 'Rejected').length;
    
    // Type Breakdown
    const counts = {};
    list.forEach(r => {
      counts[r.type] = (counts[r.type] || 0) + 1;
    });

    setStats({
      total,
      pending,
      approved,
      rejected,
      recent: list.slice(0, 5) // Recent 5 submissions
    });
    
    setTypeCounts(counts);
  }, []);

  // Format data for Recharts
  const chartData = [
    { name: '4-Wheeler', count: typeCounts['four-wheeler'] || 0 },
    { name: 'Pickup', count: typeCounts['pickup'] || 0 },
    { name: 'Bus', count: typeCounts['bus'] || 0 },
    { name: 'E-Rickshaw', count: typeCounts['e-rickshaw'] || 0 },
    { name: 'Hospital', count: typeCounts['hospital'] || 0 },
    { name: 'Influencer', count: typeCounts['influencer'] || 0 },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Applications" 
          value={stats.total} 
          icon={Users} 
          trend="All onboarding types"
          colorClass="bg-stone-100 text-stone-700"
        />
        <StatsCard 
          label="Pending Review" 
          value={stats.pending} 
          icon={Clock} 
          trend="Verification queue"
          colorClass="bg-amber-500/10 text-amber-700"
        />
        <StatsCard 
          label="Approved Partners" 
          value={stats.approved} 
          icon={CheckCircle} 
          trend="Active on platform"
          colorClass="bg-emerald-500/10 text-emerald-700"
        />
        <StatsCard 
          label="Rejected Leads" 
          value={stats.rejected} 
          icon={XCircle} 
          trend="Incomplete credentials"
          colorClass="bg-red-500/10 text-red-700"
        />
      </div>

      {/* Main Grid: Graph + Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Distribution Graph */}
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                Partner Distribution
              </h3>
              <p className="text-xs text-stone-500 font-semibold">
                Overview of registrants divided by classification type.
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-stone-400" />
          </div>

          {/* Recharts Bar Chart */}
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ede9" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#78716c', fontSize: 10, fontWeight: 700 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e7e5e4' }}
                />
                <YAxis 
                  allowDecimals={false}
                  tick={{ fill: '#78716c', fontSize: 10, fontWeight: 700 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#faf9f6' }} />
                <Bar 
                  dataKey="count" 
                  fill="#e85d04" 
                  radius={[6, 6, 0, 0]} 
                  maxBarSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Recent Submissions */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-display">
                  Recent Submissions
                </h3>
                <p className="text-xs text-stone-500 font-semibold">
                  Latest applications in the queue.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {stats.recent.length > 0 ? (
                stats.recent.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-3.5 bg-stone-50/50 hover:bg-stone-50 border border-stone-150 rounded-2xl transition-colors"
                  >
                    <div className="text-left min-w-0">
                      <span className="font-mono font-bold text-stone-850 block">
                        {item.id}
                      </span>
                      <span className="text-[10px] font-bold text-stone-550 block capitalize truncate">
                        {item.hospitalName || item.ownerName || item.name} • {item.type.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-stone-400 font-bold">
                  No submissions yet.
                </div>
              )}
            </div>
          </div>

          <Link
            to="/admin/registrations"
            className="mt-6 w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Manage Queue <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
