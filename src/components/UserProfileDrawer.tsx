import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  User as UserIcon, 
  Building2, 
  FileText, 
  Bookmark, 
  Settings, 
  LogOut, 
  Check, 
  ExternalLink,
  Receipt,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';

export const UserProfileDrawer: React.FC = () => {
  const { 
    currentUser, 
    activeModal, 
    closeModal, 
    logout, 
    orders, 
    projects, 
    openProjectDetails, 
    viewInvoice,
    updateProfile 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'saved' | 'settings'>('orders');

  // Edit profile form
  const [name, setName] = useState(currentUser?.name || '');
  const [company, setCompany] = useState(currentUser?.company || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (activeModal !== 'profile' || !currentUser) {
    return null;
  }

  const userOrders = orders.filter((o) => o.userId === currentUser.id);
  const savedProjects = projects.filter((p) => currentUser.savedProjectIds?.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, company, phone, address });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl h-full bg-[#0c1626] border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Top Header */}
        <div>
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#0e192c]">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-xl object-cover border-2 border-[#e5a93c]/50 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{currentUser.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#e5a93c]/15 text-[#e5a93c] border border-[#e5a93c]/30">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentUser.company}</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">{currentUser.email}</p>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 flex gap-6 border-b border-white/5 bg-[#09111e]">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'orders'
                  ? 'border-[#e5a93c] text-[#e5a93c]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>Contracts & Invoices ({userOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'saved'
                  ? 'border-[#e5a93c] text-[#e5a93c]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Projects ({savedProjects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-[#e5a93c] text-[#e5a93c]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Company Settings</span>
            </button>
          </div>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: Orders & Invoices */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Active Procurement Contracts
                </h4>
                <span className="text-[11px] text-slate-400">
                  Total Spend: ${userOrders.reduce((sum, o) => sum + o.paidAmount, 0).toLocaleString()}
                </span>
              </div>

              {userOrders.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-[#101c30] border border-white/5 space-y-2">
                  <FileText className="w-8 h-8 text-slate-500 mx-auto" />
                  <p className="text-sm font-semibold text-slate-300">No active orders found</p>
                  <p className="text-xs text-slate-500">
                    Browse our Engineering Catalog to purchase blueprints or structural services.
                  </p>
                </div>
              ) : (
                userOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-xl bg-[#101c30] border border-white/5 hover:border-white/15 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#e5a93c]">
                            {order.invoiceNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-white mt-1">
                          {order.items[0]?.title}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Date: {order.date} · Ref: {order.projectRef}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Total Value</span>
                        <span className="text-base font-extrabold text-white tabular-nums">
                          ${order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0c1626] border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400">Paid Milestone: </span>
                        <span className="font-semibold text-amber-300 tabular-nums">
                          ${order.paidAmount.toLocaleString()} ({order.paymentType})
                        </span>
                      </div>
                      <span className="text-slate-400">Via {order.paymentMethod}</span>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => viewInvoice(order)}
                        className="py-1.5 px-3 rounded-lg bg-[#14233c] hover:bg-[#1a2f52] text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Receipt className="w-3.5 h-3.5 text-[#e5a93c]" />
                        <span>View Digital Invoice</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Saved Projects */}
          {activeTab === 'saved' && (
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Bookmarked Architectural Landmarks
              </h4>

              {savedProjects.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-[#101c30] border border-white/5 space-y-2">
                  <Bookmark className="w-8 h-8 text-slate-500 mx-auto" />
                  <p className="text-sm font-semibold text-slate-300">No saved projects</p>
                  <p className="text-xs text-slate-500">
                    Click the bookmark icon on any project to keep it in your profile.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedProjects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => openProjectDetails(proj)}
                      className="group p-3 rounded-xl bg-[#101c30] border border-white/5 hover:border-[#e5a93c]/50 transition-all cursor-pointer"
                    >
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-32 object-cover rounded-lg group-hover:scale-102 transition-transform"
                      />
                      <div className="mt-2.5">
                        <h5 className="text-xs font-bold text-white group-hover:text-[#e5a93c] transition-colors">
                          {proj.title}
                        </h5>
                        <p className="text-[10px] text-slate-400">{proj.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Company Settings Form */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Corporate Credentials
              </h4>

              {savedSuccess && (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Representative Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#101c30] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#101c30] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Direct Phone Line
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#101c30] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Corporate HQ Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#101c30] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#e5a93c]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-bold text-[#070d17] bg-[#e5a93c] hover:bg-[#f3b94e] rounded-lg transition-all"
                >
                  Save Profile Information
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-6 border-t border-white/5 bg-[#0e192c] flex items-center justify-between">
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={closeModal}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#101c30] hover:bg-[#162642] text-slate-300 hover:text-white"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
};
