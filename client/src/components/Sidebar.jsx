import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CalendarRange, 
  Clock4, 
  Megaphone, 
  Sparkles,
  ShieldCheck,
  Building2,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();

  const mainNav = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard', badge: null },
    { label: 'Directory', icon: Users, path: '/employees', badge: 'Team' },
    { label: 'Leave Hub', icon: CalendarRange, path: '/leaves', badge: null },
    { label: 'Attendance', icon: Clock4, path: '/attendance', badge: 'Live' },
    { label: 'Announcements', icon: Megaphone, path: '/announcements', badge: null },
  ];

  return (
    <aside className="w-72 bg-[#0b0f19] text-slate-300 min-h-[calc(100vh-4.25rem)] p-5 flex flex-col justify-between hidden md:flex border-r border-slate-800/80 shadow-2xl relative z-20">
      <div className="space-y-6">
        {/* Workspace pill */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white shadow-glow">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white tracking-wide">Enterprise Hub</p>
              <p className="text-[11px] text-slate-400 capitalize">{user?.department || 'Main HQ'} Group</p>
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            PRO
          </span>
        </div>

        {/* Navigation */}
        <div>
          <p className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2.5">
            Platform Workspace
          </p>
          <nav className="space-y-1.5">
            {mainNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/25 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-slate-800 text-brand-300 border border-slate-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {!item.badge && isActive && (
                        <ChevronRight className="w-4 h-4 opacity-75" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer System Status Card */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
          <div className="flex items-center space-x-2.5 mb-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-200">System Connected</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            StaffSync Studio v2.0 • Ultra Secure RBAC Enabled
          </p>
        </div>
      </div>
    </aside>
  );
}
