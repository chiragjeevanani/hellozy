import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import OrganizerSidebar from './OrganizerSidebar';
import OrganizerTopbar from './OrganizerTopbar';

export default function OrganizerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [organizer, setOrganizer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('hellozy_active_organizer');
    if (session) {
      setOrganizer(JSON.parse(session));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('hellozy_active_organizer');
    navigate('/organizer/login', { replace: true });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50">
      {/* Sidebar Navigation */}
      <OrganizerSidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        onLogout={handleLogout} 
        organizer={organizer}
      />

      {/* Main Container */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header Bar */}
        <OrganizerTopbar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          onLogout={handleLogout} 
          organizer={organizer}
        />

        {/* Scrollable Content Pane */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8" data-lenis-prevent>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
