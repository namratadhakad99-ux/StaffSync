import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Clock4, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Timer, 
  History,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export default function Attendance() {
  const { user } = useAuth();
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [todayRecord, setTodayRecord] = useState(null);

  const fetchAttendance = async () => {
    try {
      const res = await API.get('/attendance');
      const data = res.data.data || res.data || [];
      setAttendanceList(data);

      const today = new Date().toISOString().split('T')[0];
      const current = data.find((a) => a.date && a.date.split('T')[0] === today);
      setTodayRecord(current || null);
    } catch (err) {
      console.error('Failed to fetch attendance', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleClockIn = async () => {
    setActionLoading(true);
    try {
      await API.post('/attendance/clock-in');
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to clock in');
    } finally {
      setActionLoading(false);
    }
  };

  const handleClockOut = async () => {
    setActionLoading(true);
    try {
      await API.post('/attendance/clock-out');
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to clock out');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* Header with Punch Action Card */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Time & Attendance Tracking</h1>
          <p className="text-sm text-slate-500 mt-1">
            Automated punch in/out timestamps, hours calculation, and activity history.
          </p>
        </div>

        {/* Action Punch Pill */}
        <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded-2xl border border-slate-200">
          {!todayRecord || !todayRecord.clockIn ? (
            <button
              onClick={handleClockIn}
              disabled={actionLoading}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl text-sm transition shadow-md shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
            >
              {actionLoading ? 'Processing...' : 'Punch In Now'}
            </button>
          ) : !todayRecord.clockOut ? (
            <button
              onClick={handleClockOut}
              disabled={actionLoading}
              className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold rounded-xl text-sm transition shadow-md shadow-rose-500/20 active:scale-95 disabled:opacity-50"
            >
              {actionLoading ? 'Processing...' : 'Punch Out Now'}
            </button>
          ) : (
            <span className="px-5 py-2 bg-slate-200/70 text-slate-700 font-bold rounded-xl text-xs flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
              Daily Shift Completed
            </span>
          )}
        </div>
      </div>

      {/* Attendance History Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
        </div>
      ) : attendanceList.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No attendance logs found</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
            Punch in above to generate your first verified attendance record.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Work Date</th>
                  {(user?.role === 'admin' || user?.role === 'manager') && (
                    <th className="py-4 px-6">Team Member</th>
                  )}
                  <th className="py-4 px-6">Clock-In Timestamp</th>
                  <th className="py-4 px-6">Clock-Out Timestamp</th>
                  <th className="py-4 px-6">Duration (Hrs)</th>
                  <th className="py-4 px-6">Shift State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {attendanceList.map((att) => (
                  <tr key={att._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {new Date(att.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    {(user?.role === 'admin' || user?.role === 'manager') && (
                      <td className="py-4 px-6 text-slate-800 font-semibold">
                        {att.user?.name || 'Staff Specialist'}
                        <span className="block text-[11px] text-slate-400 font-normal">{att.user?.department || 'Operations'}</span>
                      </td>
                    )}
                    <td className="py-4 px-6 text-slate-600 font-mono text-xs">
                      {att.clockIn ? new Date(att.clockIn).toLocaleTimeString() : '-'}
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-mono text-xs">
                      {att.clockOut ? (
                        new Date(att.clockOut).toLocaleTimeString()
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700">
                          Active In Shift
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-bold text-xs">
                      {att.totalHours ? `${att.totalHours} hrs` : '-'}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                          att.status === 'present'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {att.status || 'present'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
