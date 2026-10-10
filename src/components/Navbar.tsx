import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ShoppingBag, 
  User as UserIcon, 
  ShieldCheck, 
  Menu, 
  X, 
  Briefcase,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    cart, 
    openModal, 
    switchUser, 
    activeSection, 
    setActiveSection 
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'products', label: 'Catalog' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070d17]/90 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Brand Wordmark & Geometric Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#162642] to-[#0c1626] border border-[#e5a93c]/40 rounded-lg shadow-inner group-hover:border-[#e5a93c] group-hover:shadow-[0_0_18px_rgba(229,169,60,0.35)] transition-all duration-300 overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/26/b5/ec/26b5ece3bc56f913229650535343d43f.jpg"
                alt="Stratech Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-widest text-white uppercase group-hover:text-[#e5a93c] transition-colors duration-200">
                STRATECH
              </span>
              <span className="text-[9px] tracking-[0.25em] text-slate-400 font-semibold uppercase -mt-0.5 group-hover:text-slate-300 transition-colors">
                BUILDING TOMORROW
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Single-line clean text) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium whitespace-nowrap transition-all duration-200 relative py-1 hover:-translate-y-0.5 ${
                  activeSection === link.id 
                    ? 'text-[#e5a93c] font-semibold' 
                    : 'text-slate-300 hover:text-[#e5a93c]'
                }`}
              >
                {link.label}
                {activeSection === link.id ? (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e5a93c] rounded-full shadow-[0_0_8px_#e5a93c]" />
                ) : (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent hover:bg-[#e5a93c]/40 rounded-full transition-colors" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions & Auth / Profile / Cart */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            
            {/* Catalog Cart Button */}
            <button
              onClick={() => openModal('checkout')}
              className="relative p-2.5 rounded-lg bg-[#101c30] border border-white/10 hover:border-[#e5a93c] hover:bg-[#162642] hover:scale-105 hover:shadow-[0_0_18px_rgba(229,169,60,0.3)] text-slate-300 hover:text-white transition-all duration-200 flex items-center justify-center cursor-pointer"
              title="Procurement Cart / Checkout"
            >
              <ShoppingBag className="w-4 h-4 text-[#e5a93c] transition-transform duration-200 hover:scale-110" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#e5a93c] text-[#070d17] font-bold text-xs rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard Quick Access Button */}
            <button
              onClick={() => openModal('admin')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#14233c] text-amber-300 border border-amber-500/30 hover:border-[#e5a93c] hover:bg-[#1c3052] hover:scale-105 hover:shadow-[0_0_18px_rgba(245,158,11,0.3)] transition-all duration-200 whitespace-nowrap cursor-pointer"
              title="Admin & Operations Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>

            {/* User Profile or Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg bg-[#101c30] border border-white/10 hover:border-[#e5a93c] hover:bg-[#162642] hover:scale-105 hover:shadow-[0_0_18px_rgba(229,169,60,0.3)] transition-all duration-200 text-left cursor-pointer group"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-md object-cover border border-[#e5a93c]/40 group-hover:border-[#e5a93c] group-hover:ring-1 group-hover:ring-[#e5a93c] transition-all"
                  />
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate max-w-[100px] transition-colors">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-[#e5a93c] font-medium capitalize">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#e5a93c] transition-colors" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0e1726] border border-white/10 shadow-2xl py-2 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="font-semibold text-white truncate">{currentUser.name}</p>
                      <p className="text-slate-400 text-[11px] truncate">{currentUser.company}</p>
                      <p className="text-[#e5a93c] font-medium text-[10px] mt-0.5 capitalize">
                        Role: {currentUser.role}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        openModal('profile');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-[#e5a93c]" />
                      <span>My Profile & Contracts</span>
                    </button>

                    <button
                      onClick={() => {
                        openModal('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-[#e5a93c]" />
                      <span>Admin Management Suite</span>
                    </button>

                    <div className="px-4 py-1.5 border-t border-white/5">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                        Switch Demo Role
                      </p>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() => {
                            switchUser('client');
                            setUserDropdownOpen(false);
                          }}
                          className="px-2 py-1 bg-white/5 hover:bg-[#e5a93c]/20 hover:text-[#e5a93c] text-center rounded text-[10px] text-slate-300 transition-colors cursor-pointer"
                        >
                          Client
                        </button>
                        <button
                          onClick={() => {
                            switchUser('contractor');
                            setUserDropdownOpen(false);
                          }}
                          className="px-2 py-1 bg-white/5 hover:bg-sky-500/20 hover:text-sky-300 text-center rounded text-[10px] text-slate-300 transition-colors cursor-pointer"
                        >
                          Contractor
                        </button>
                        <button
                          onClick={() => {
                            switchUser('admin');
                            setUserDropdownOpen(false);
                          }}
                          className="px-2 py-1 bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 text-center rounded text-[10px] text-amber-300 transition-colors cursor-pointer"
                        >
                          Admin
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openModal('login')}
                className="px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white hover:border-[#e5a93c] hover:bg-[#162642] hover:scale-105 bg-[#101c30] border border-white/10 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Primary Action Button: "Contact Us" (matches screenshot amber button) */}
            <button
              onClick={() => openModal('quote-request')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#070d17] bg-[#e5a93c] hover:bg-[#f3b94e] hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(229,169,60,0.45)] rounded-lg transition-all duration-200 cursor-pointer shadow-md whitespace-nowrap"
            >
              Contact Us
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070d17] border-b border-white/10 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:text-[#e5a93c]"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                openModal('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-xs font-semibold text-amber-300 bg-[#14233c] rounded-lg"
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => {
                openModal('profile');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-xs font-medium text-slate-200 bg-[#101c30] rounded-lg"
            >
              User Profile & Orders
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
