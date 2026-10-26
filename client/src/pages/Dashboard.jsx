import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { 
  Users, 
  CalendarRange, 
  Clock4, 
  Megaphone, 
  ArrowUpRight, 
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    employeesCount: 0,
    leavesCount: 0,
    announcementsCount: 0,
    recentLeaves: [],
  });
  const [clockedIn, setClockedIn] = useState(false);
  const [loadingClock, setLoadingClock] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [empRes, leaveRes, annRes, attRes] = await Promise.all([
          API.get('/employees').catch(() => ({ data: [] })),
          API.get('/leaves').catch(() => ({ data: [] })),
          API.get('/announcements').catch(() => ({ data: [] })),
          API.get('/attendance').catch(() => ({ data: [] })),
        ]);

        const employees = empRes.data.data || empRes.data || [];
        const leaves = leaveRes.data.data || leaveRes.data || [];
        const announcements = annRes.data.data || annRes.data || [];
        const attendance = attRes.data.data || attRes.data || [];

        // Check today's clock in status
        const today = new Date().toISOString().split('T')[0];
        const todayAttendance = attendance.find(
          (a) => a.date && a.date.split('T')[0] === today
        );
        if (todayAttendance && !todayAttendance.clockOut) {
          setClockedIn(true);
        }

        setStats({
          employeesCount: employees.length,
          leavesCount: leaves.filter((l) => l.status === 'pending').length,
          announcementsCount: announcements.length,
          recentLeaves: leaves.slice(0, 3),
        });
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      }
    };
    fetchDashboardData();
  }, []);

  const handleClockToggle = async () => {
    setLoadingClock(true);
    try {
      if (clockedIn) {
        await API.post('/attendance/clock-out');
        setClockedIn(false);
      } else {
        await API.post('/attendance/clock-in');
        setClockedIn(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update attendance');
    } finally {
      setLoadingClock(false);
    }
  };

  const todayFormatted = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(new Date());

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Banner with Modern Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-brand-950 to-indigo-950 text-white p-8 md:p-10 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-accent-500/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-brand-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>{todayFormatted}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Welcome to StaffSync Studio, <span className="bg-gradient-to-r from-brand-300 to-accent-300 bg-clip-text text-transparent">{user?.name || 'Partner'}</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Your comprehensive command center for personnel management, real-time presence, and operations.
            </p>
          </div>

          {/* Interactive Live Shift Clock Widget */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-5">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                <span className={`w-2.5 h-2.5 rounded-full ${clockedIn ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                <span>{clockedIn ? 'Shift In Progress' : 'Shift Inactive'}</span>
              </div>
              <p className="text-2xl font-black font-mono tracking-tight text-white mt-1">
                {currentTime}
              </p>
            </div>

            <button
              onClick={handleClockToggle}
              disabled={loadingClock}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg transform active:scale-95 disabled:opacity-50 ${
                clockedIn
                  ? 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white shadow-rose-500/25'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/25'
              }`}
            >
              {loadingClock ? 'Processing...' : clockedIn ? 'Punch Out' : 'Punch In Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Modern KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Employees */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6" />
            </div>
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              Active
            </span>
          </div>
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Total Workforce</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stats.employeesCount}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Verified company staff</span>
            <Link to="/employees" className="text-brand-600 hover:text-brand-700 font-bold inline-flex items-center">
              Directory <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
        </div>

        {/* Pending Leaves */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
              <CalendarRange className="w-6 h-6" />
            </div>
            <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
              Review Queue
            </span>
          </div>
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Pending Leave Approvals</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stats.leavesCount}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Requests requiring review</span>
            <Link to="/leaves" className="text-amber-600 hover:text-amber-700 font-bold inline-flex items-center">
              Manage Hub <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
              <Megaphone className="w-6 h-6" />
            </div>
            <span className="flex items-center text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
              Published
            </span>
          </div>
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Broadcast Bulletins</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stats.announcementsCount}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Company notices & feeds</span>
            <Link to="/announcements" className="text-purple-600 hover:text-purple-700 font-bold inline-flex items-center">
              View Feed <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Launchpad & Section Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <span>Operations Launchpad</span>
          <span className="w-2 h-2 rounded-full bg-brand-500"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link 
            to="/employees" 
            className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition">Personnel Directory</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Add, manage, and inspect team members, positions, and departments.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-600">
              <span>Open Directory</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>

          <Link 
            to="/leaves" 
            className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CalendarRange className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition">Leave Requests</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Submit time-off applications, track approvals, and check allocations.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Submit or Review</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>

          <Link 
            to="/attendance" 
            className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock4 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition">Time & Presence</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Live timestamps, shift durations, clock in/out timeline, and logs.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>Inspect History</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>

          <Link 
            to="/announcements" 
            className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Megaphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition">Company News</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Internal announcements, policy notifications, and executive updates.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>Read Updates</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
