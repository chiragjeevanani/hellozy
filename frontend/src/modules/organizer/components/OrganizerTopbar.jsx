import React from 'react';
import { Menu, LogOut, User, Building2 } from 'lucide-react';

export default function OrganizerTopbar({ onToggleSidebar, onLogout, organizer }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-6 bg-white border-b border-stone-200 shrink-0 shadow-xs">
      {/* Left side: Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-50 hover:text-stone-700 lg:hidden cursor-pointer"
        >
          <Menu size={20} />
        </button>
        <div className="hidden lg:flex items-center gap-2">
          <span className="px-2.5 py-1 bg-primary/5 text-primary border border-primary/10 rounded-lg text-[10px] font-bold uppercase tracking-wider">
            Organizer Portal
          </span>
        </div>
      </div>

      {/* Right side: User card */}
      {organizer && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 text-right">
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-stone-850 leading-tight">{organizer.firmName || 'Sub-Admin Hub'}</p>
              <p className="text-[10px] text-stone-400 font-bold mt-0.5">Host: {organizer.ownerName}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center shrink-0">
              <Building2 size={16} />
            </div>
          </div>

          <div className="h-6 w-px bg-stone-200 hidden sm:block" />

          <button
            onClick={onLogout}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 hover:bg-red-50 text-stone-600 hover:text-red-650 border border-stone-150 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      )}
    </header>
  );
}
