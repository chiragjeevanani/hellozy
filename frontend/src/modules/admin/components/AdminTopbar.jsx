import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, User, LogOut } from 'lucide-react';

export default function AdminTopbar({ onToggleSidebar, onLogout }) {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin':
        return 'Dashboard Overview';
      case '/admin/registrations':
        return 'Registrations Hub';
      case '/admin/events':
        return 'Event Requests';
      case '/admin/organizers':
        return 'Event Organizers';
      case '/admin/event-types':
        return 'Event Types';
      case '/admin/settings':
        return 'Platform Settings';
      default:
        return 'Admin Portal';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-6 bg-white border-b border-stone-200">
      {/* Left side title / menu toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg hover:bg-stone-100 lg:hidden text-stone-600 focus:outline-none"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-xl font-bold text-stone-900 font-display">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right side user badge */}
      <div className="flex items-center gap-4">
        <Link 
          to="/admin/settings"
          className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-stone-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary-light text-white font-bold text-xs flex items-center justify-center font-display shadow-sm shadow-primary/20">
            A
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-stone-900 leading-none">System Admin</p>
            <p className="text-[10px] text-stone-500 font-semibold mt-0.5">Hellozy Operations</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
