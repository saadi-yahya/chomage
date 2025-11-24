import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, MobileBottomNav } from './components/Navigation';

export const Layout: React.FC = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <Outlet />
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
};