import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, TrendingUp, Settings, LogOut, X, Building2, FileText } from 'lucide-react';

export default function OrganizerSidebar({ isOpen, toggleSidebar, onLogout, organizer }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { label: 'Overview', path: '/organizer', icon: LayoutDashboard },
    { label: 'Host & My Events', path: '/organizer/events', icon: Calendar },
    { label: 'Event Requests', path: '/organizer/proposals', icon: FileText },
    { label: 'Applicants', path: '/organizer/applicants', icon: Users },
    { label: 'My Earnings', path: '/organizer/earnings', icon: TrendingUp },
    { label: 'Settings', path: '/organizer/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-xs lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-primary text-white border-r border-white/10 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-accent shrink-0" />
            <span className="font-display font-extrabold text-xl tracking-tight leading-none pt-0.5">
              hellozy host
            </span>
          </Link>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-lg hover:bg-white/10 lg:hidden text-white/80 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Organizer info block */}
        {organizer && (
          <div className="px-6 py-4 border-b border-white/5 bg-white/3 flex flex-col gap-0.5 text-left">
            <p className="text-xs font-bold text-white truncate">{organizer.firmName || 'Sub-Admin'}</p>
            <p className="text-[10px] text-stone-400 font-semibold truncate">Host: {organizer.ownerName}</p>
          </div>
        )}

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                    : 'text-stone-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-stone-400 group-hover:text-white'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 cursor-pointer"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
