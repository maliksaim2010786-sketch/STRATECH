import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Send, 
  Building2, 
  Mail, 
  User as UserIcon, 
  Phone, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const ContactQuoteModal: React.FC = () => {
  const { activeModal, closeModal, submitLeadInquiry, currentUser } = useApp();

  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [company, setCompany] = useState(currentUser?.company || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [serviceCategory, setServiceCategory] = useState('Commercial High-Rise Development');
  const [estimatedBudget, setEstimatedBudget] = useState('$50M - $150M');
  const [projectScope, setProjectScope] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (activeModal !== 'quote-request') {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    submitLeadInquiry({
      fullName,
      email,
      company: company || 'Enterprise Development Corp',
      phone: phone || '+1 (555) 000-0000',
      serviceCategory,
      estimatedBudget,
      projectScope: projectScope || 'Detailed architectural and structural engineering request.',
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeModal();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl my-6 rounded-2xl bg-[#0c1626] border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-white/5 flex items-center justify-between bg-[#0e192c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e5a93c]/15 border border-[#e5a93c]/30 flex items-center justify-center text-[#e5a93c]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Request Engineering Consultation
              </h3>
              <p className="text-[11px] text-slate-400">
                Direct engagement with Stratech Principal Partners
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

        {submitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Consultation Request Dispatched</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Our Senior Structural Engineering Partner will review your project dossier and respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Full Name *</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Chief Architect / VP Development"
                    className="w-full pl-9 pr-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Corporate Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@development.com"
                    className="w-full pl-9 pr-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Company / Developer</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Summit Urban Group"
                    className="w-full pl-9 pr-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Contact Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 438-9000"
                    className="w-full pl-9 pr-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Engineering Discipline</label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#e5a93c]"
                >
                  <option value="Commercial High-Rise Development">Commercial High-Rise Development</option>
                  <option value="Civil Infrastructure & Bridges">Civil Infrastructure & Bridges</option>
                  <option value="Urban Masterplanning & Transit">Urban Masterplanning & Transit</option>
                  <option value="Structural FEA & Seismic Retrofit">Structural FEA & Seismic Retrofit</option>
                  <option value="Smart Building Automation">Smart Building Automation</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Estimated Budget Scope</label>
                <select
                  value={estimatedBudget}
                  onChange={(e) => setEstimatedBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#e5a93c]"
                >
                  <option value="$10M - $50M">$10M - $50M</option>
                  <option value="$50M - $150M">$50M - $150M</option>
                  <option value="$150M - $500M">$150M - $500M</option>
                  <option value="$500M+">$500M+ Mega Project</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Project Scope & Requirements</label>
              <textarea
                rows={3}
                value={projectScope}
                onChange={(e) => setProjectScope(e.target.value)}
                placeholder="Describe site location, building height, desired certifications, or timeframe..."
                className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#e5a93c]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e5a93c]" />
                <span>NDA & Confidentiality guaranteed</span>
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 font-bold text-[#070d17] bg-[#e5a93c] hover:bg-[#f3b94e] rounded-lg transition-all flex items-center gap-1.5 shadow-md"
              >
                <span>Submit RFP</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
