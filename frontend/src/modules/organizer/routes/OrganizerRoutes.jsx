import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function OrganizerRoutes() {
  const activeOrganizer = localStorage.getItem('hellozy_active_organizer');
  return activeOrganizer ? <Outlet /> : <Navigate to="/organizer/login" replace />;
}
