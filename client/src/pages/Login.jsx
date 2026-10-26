import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogIn, 
  Lock, 
  Mail, 
  AlertCircle, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('Password123!');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#080d1a] text-slate-100">
      {/* Left Showcase Banner (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-950 via-brand-950 to-indigo-950 p-12 lg:p-16 flex-col justify-between border-r border-slate-800">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-[400px] h-[400px] bg-accent-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand */}
        <div className="relative z-10">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-accent-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">StaffSync Studio</span>
              <p className="text-xs font-semibold text-brand-300 tracking-wider uppercase">Enterprise HR Operating System</p>
            </div>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 space-y-6 max-w-lg my-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-brand-300">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Next-Generation Workplace Operations</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            Transform How Your Organization Operates.
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Elevate staff management, leave approvals, attendance tracking, and cross-team communications into one cohesive platform.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Multi-tier Role-Based Access Control (Admin, Manager, Staff)</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Real-time punch in/out with automated shift metrics</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Embedded zero-configuration database with instant synchronization</span>
            </div>
          </div>
        </div>

        {/* Security watermark */}
        <div className="relative z-10 flex items-center space-x-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Enterprise-Grade AES-256 JWT Authentication</span>
        </div>
      </div>

      {/* Right Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full bg-white text-slate-900 rounded-3xl shadow-2xl p-8 sm:p-10 border border-slate-200/80">
          <div className="mb-8">
            <div className="lg:hidden flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900">StaffSync Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Access Portal</h2>
            <p className="text-slate-500 text-sm mt-1.5">Sign in to your authorized enterprise profile</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center space-x-3 text-rose-600 text-xs font-semibold">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Work Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Security Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 transition duration-200 disabled:opacity-50 text-sm flex items-center justify-center space-x-2 mt-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
              One-Click Demo Authentication
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoFill('admin@staffsync.com')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-bold rounded-lg text-[11px] transition text-center"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('manager@staffsync.com')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-bold rounded-lg text-[11px] transition text-center"
              >
                Manager
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('employee@staffsync.com')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-bold rounded-lg text-[11px] transition text-center"
              >
                Employee
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-500 font-medium">
            New organization member?{' '}
            <Link to="/register" className="text-brand-600 hover:text-brand-700 font-bold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
