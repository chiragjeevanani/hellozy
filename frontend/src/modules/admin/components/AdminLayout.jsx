import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { logout } from '../utils/adminAuth';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50">
      {/* Sidebar Navigation */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        onLogout={handleLogout} 
      />

      {/* Main Container */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header Bar */}
        <AdminTopbar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          onLogout={handleLogout} 
        />

        {/* Scrollable Content Pane */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8" data-lenis-prevent>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
