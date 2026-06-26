import React from 'react';

export default function StatsCard({ label, value, icon: Icon, trend, colorClass = 'bg-accent/10 text-accent' }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow duration-350 flex items-center justify-between">
      <div className="text-left">
        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
          {label}
        </span>
        <span className="text-3xl font-extrabold text-stone-900 font-display">
          {value}
        </span>
        {trend && (
          <span className="text-[10px] text-stone-500 font-bold block mt-1">
            {trend}
          </span>
        )}
      </div>
      <div className={`p-4 rounded-2xl ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  );
}
