import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  X, 
  Lock, 
  Mail, 
  Building2, 
  User as UserIcon, 
  ShieldCheck, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { activeModal, closeModal, login, signup, switchUser } = useApp();
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState<UserRole>('client');
  const [errorMsg, setErrorMsg] = useState('');

  if (activeModal !== 'login' && activeModal !== 'signup') {
    return null;
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your corporate email address.');
      return;
    }
    login(email);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company) {
      setErrorMsg('Please fill in all required company fields.');
      return;
    }
    signup(name, email, company, role);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0c1626] border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-6 pb-4 border-b border-white/5 flex items-center justify-between bg-[#0e1a2f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#e5a93c]/15 border border-[#e5a93c]/30 flex items-center justify-center text-[#e5a93c]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {tab === 'login' ? 'Stratech Portal Login' : 'Create Enterprise Account'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Secure access to projects, BIM suites & escrow
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 flex gap-2 border-b border-white/5">
          <button
            onClick={() => { setTab('login'); setErrorMsg(''); }}
            className={`pb-3 text-xs font-semibold tracking-wide border-b-2 transition-colors ${
              tab === 'login'
                ? 'border-[#e5a93c] text-[#e5a93c]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('signup'); setErrorMsg(''); }}
            className={`pb-3 text-xs font-semibold tracking-wide border-b-2 transition-colors ${
              tab === 'signup'
                ? 'border-[#e5a93c] text-[#e5a93c]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Register Corporate Account
          </button>
        </div>

        {/* Fast Demo One-Click Accounts */}
        <div className="px-6 pt-4">
          <div className="p-3 rounded-xl bg-[#101c30] border border-white/5">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">
              ⚡ Instant 1-Click Demo Profiles:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  switchUser('client');
                  closeModal();
                }}
                className="p-2 rounded-lg bg-[#14233c] hover:bg-[#1a2f52] border border-white/5 text-left transition-colors"
              >
                <div className="text-[11px] font-bold text-white truncate">Client</div>
                <div className="text-[9px] text-[#e5a93c] truncate">Miller Holdings</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  switchUser('contractor');
                  closeModal();
                }}
                className="p-2 rounded-lg bg-[#14233c] hover:bg-[#1a2f52] border border-white/5 text-left transition-colors"
              >
                <div className="text-[11px] font-bold text-white truncate">Contractor</div>
                <div className="text-[9px] text-sky-400 truncate">Apex Infra</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  switchUser('admin');
                  closeModal();
                }}
                className="p-2 rounded-lg bg-[#14233c] hover:bg-[#1a2f52] border border-amber-500/30 text-left transition-colors"
              >
                <div className="text-[11px] font-bold text-amber-300 truncate">Admin Lead</div>
                <div className="text-[9px] text-amber-200 truncate">Marcus S.</div>
              </button>
            </div>
          </div>
        </div>

        {/* Forms */}
        <div className="p-6 pt-4 space-y-4">
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
              {errorMsg}
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="j.miller@millerholdings.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#101c30] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#101c30] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold text-[#070d17] bg-[#e5a93c] hover:bg-[#f3b94e] rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Sign In to Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eleanor Vance"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#101c30] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.vance@vancedevelopments.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#101c30] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Company / Organization
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Vance Urban Developments"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#101c30] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('client')}
                    className={`py-2 px-3 text-xs rounded-lg border font-medium ${
                      role === 'client'
                        ? 'bg-[#e5a93c]/20 border-[#e5a93c] text-[#e5a93c]'
                        : 'bg-[#101c30] border-white/10 text-slate-300'
                    }`}
                  >
                    Enterprise Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('contractor')}
                    className={`py-2 px-3 text-xs rounded-lg border font-medium ${
                      role === 'contractor'
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                        : 'bg-[#101c30] border-white/10 text-slate-300'
                    }`}
                  >
                    General Contractor
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold text-[#070d17] bg-[#e5a93c] hover:bg-[#f3b94e] rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md mt-2"
              >
                <span>Register & Proceed</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
