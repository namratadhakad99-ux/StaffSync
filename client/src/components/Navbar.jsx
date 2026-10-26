import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  Users, 
  CalendarRange, 
  Clock4, 
  Megaphone,
  Sparkles,
  Bell,
  Shield,
  Layers
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Directory', icon: Users, path: '/employees' },
    { label: 'Leave Hub', icon: CalendarRange, path: '/leaves' },
    { label: 'Attendance', icon: Clock4, path: '/attendance' },
    { label: 'Announcements', icon: Megaphone, path: '/announcements' },
  ];

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'manager':
        return 'bg-indigo-500/10 text-indigo-600 border-indigo-200';
      default:
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-sm">
      <div className="h-17 px-4 sm:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center space-x-3.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-accent-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-brand-700 bg-clip-text text-transparent">
                  StaffSync
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider uppercase bg-brand-100 text-brand-700">
                  STUDIO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                Next-Gen Workplace & Talent Operations
              </p>
            </div>
          </div>
        </div>

        {/* Right tools and user pill */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/60 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium">Cloud Node Active</span>
          </div>

          <div className="flex items-center space-x-3 pl-3 sm:pl-4 border-l border-slate-200">
            {/* User card pill */}
            <div className="flex items-center space-x-3 bg-slate-50 hover:bg-slate-100/80 transition p-1.5 pr-3.5 rounded-2xl border border-slate-200/70">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-none">{user?.name || 'Authorized User'}</p>
                <div className="flex items-center space-x-1.5 mt-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase border ${getRoleBadge(user?.role)}`}>
                    {user?.role || 'Staff'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">• {user?.department || 'General'}</span>
                </div>
              </div>
            </div>

            {/* Logout action */}
            <button
              onClick={logout}
              className="p-2.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 border border-transparent hover:border-rose-100 transition duration-200"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile responsive navigation dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-2xl">
          <div className="pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</p>
            <span className="text-[11px] font-semibold text-brand-600 capitalize">{user?.role} Mode</span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
}
