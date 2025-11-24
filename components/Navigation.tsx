
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Calendar, FileText, CheckSquare, MessageSquare, LogOut } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: LayoutDashboard },
  { path: '/jobs', label: 'Jobs', icon: Briefcase },
  { path: '/planner', label: 'Planner', icon: Calendar },
  { path: '/tracker', label: 'Tracker', icon: CheckSquare },
  { path: '/cv', label: 'CV', icon: FileText },
  { path: '/coach', label: 'Coach', icon: MessageSquare },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">ChomagePro</h1>
        <p className="text-xs text-slate-500 mt-1">Career & Job Platform</p>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-100 space-y-4">
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium w-full"
        >
          <LogOut size={20} />
          Log Out
        </button>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
          <p className="text-sm font-semibold">Pro Status</p>
          <p className="text-xs opacity-80 mt-1">5 interviews this week</p>
        </div>
      </div>
    </div>
  );
};

export const MobileBottomNav: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-blue-600' : 'text-slate-500'
              }`
            }
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
