import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  Building2, 
  CheckCircle2, 
  Trash2, 
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    cart, 
    removeFromCart, 
    processPayment, 
    currentUser 
  } = useApp();

  const [paymentType, setPaymentType] = useState<'Full Payment' | '30% Milestone Deposit' | 'Escrow Vault'>('30% Milestone Deposit');
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Wire Transfer' | 'Escrow Reserve'>('Credit Card');
  
  // Card form
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardHolder, setCardHolder] = useState(currentUser?.name || 'JONATHAN MILLER');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('382');
  const [projectRef, setProjectRef] = useState('Skyline Tower Phase II - BIM Deliverable');
  const [isProcessing, setIsProcessing] = useState(false);

  if (activeModal !== 'checkout') {
    return null;
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  const payableNow = paymentType === '30% Milestone Deposit' 
    ? Math.round(total * 0.3) 
    : total;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      processPayment({
        items: cart,
        paymentType,
        paymentMethod,
        cardNumber,
        projectRef,
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl bg-[#0c1626] border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#0e192c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e5a93c]/15 border border-[#e5a93c]/30 flex items-center justify-center text-[#e5a93c]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Stratech Escrow & Procurement Checkout
              </h3>
              <p className="text-[11px] text-slate-400">
                Guaranteed contract fulfillment with milestone protection
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            disabled={isProcessing}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#14233c] text-[#e5a93c] flex items-center justify-center mx-auto">
              <CreditCard className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-white">Your Procurement Cart is Empty</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Please browse our Engineering Catalog and select CAD drawing packages or consulting services to initiate payment.
            </p>
            <button
              onClick={closeModal}
              className="py-2 px-5 text-xs font-semibold text-[#070d17] bg-[#e5a93c] rounded-lg"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {/* Left 7 Cols: Payment Terms & Card Inputs */}
            <div className="md:col-span-7 p-6 space-y-6">
              
              {/* Payment Schedule Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Payment Milestone Schedule
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentType('30% Milestone Deposit')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentType === '30% Milestone Deposit'
                        ? 'bg-[#14233c] border-[#e5a93c] text-white shadow-md'
                        : 'bg-[#101c30] border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">30% Milestone Deposit</span>
                      <span className="text-[10px] text-[#e5a93c] font-semibold">Recommended</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Pay 30% upfront. Balance released upon final BIM sign-off.
                    </p>
                  </div>

                  <div
                    onClick={() => setPaymentType('Full Payment')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentType === 'Full Payment'
                        ? 'bg-[#14233c] border-[#e5a93c] text-white shadow-md'
                        : 'bg-[#101c30] border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Full Settlement</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">Fast-Track</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      100% full invoice payment with immediate engineering kickoff.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Credit Card', label: 'Credit Card', icon: CreditCard },
                    { id: 'Wire Transfer', label: 'Fedwire / Swift', icon: Building2 },
                    { id: 'Escrow Reserve', label: 'Escrow Vault', icon: Lock },
                  ].map((m) => {
                    const IconComp = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-2.5 rounded-lg border text-left transition-all flex flex-col gap-1.5 ${
                          paymentMethod === m.id
                            ? 'bg-[#e5a93c]/15 border-[#e5a93c] text-white'
                            : 'bg-[#101c30] border-white/5 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <IconComp className="w-4 h-4 text-[#e5a93c]" />
                        <span className="text-xs font-semibold">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Credit Card Visualizer */}
              {paymentMethod === 'Credit Card' && (
                <div className="space-y-4">
                  <div className="relative h-44 rounded-2xl p-5 bg-gradient-to-tr from-[#0a1424] via-[#12223c] to-[#1e3458] border border-[#e5a93c]/40 shadow-xl overflow-hidden text-white flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-7 rounded bg-[#e5a93c] opacity-80" />
                        <span className="text-xs font-extrabold tracking-widest text-[#e5a93c]">
                          STRATECH CORPORATE
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
                        COMMERCIAL
                      </span>
                    </div>

                    <div className="font-mono text-base tracking-widest text-slate-100">
                      {cardNumber}
                    </div>

                    <div className="flex items-end justify-between text-xs">
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-slate-400">
                          Authorized Signatory
                        </div>
                        <div className="font-semibold text-white tracking-wide">
                          {cardHolder}
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-slate-400">
                          Expires
                        </div>
                        <div className="font-mono font-semibold text-slate-200">
                          {cardExpiry}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="col-span-2">
                      <label className="block text-slate-300 mb-1 font-medium">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-[#e5a93c]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#e5a93c]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-300 mb-1 font-medium">Exp (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-[#e5a93c]"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-medium">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-[#e5a93c]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'Wire Transfer' && (
                <div className="p-4 rounded-xl bg-[#101c30] border border-white/10 text-xs space-y-2">
                  <p className="font-semibold text-[#e5a93c]">Corporate Wire Transfer Instructions</p>
                  <p className="text-slate-300">
                    Beneficiary: Stratech Engineering Global Trust LLC<br />
                    Bank: JPMorgan Chase Bank, N.A., New York<br />
                    Routing Number (ABA): 021000021<br />
                    Swift Code: CHASUS33XXX
                  </p>
                  <p className="text-[11px] text-slate-400">
                    After authorization, an official wire reference token is generated and reserved in escrow for 72 hours.
                  </p>
                </div>
              )}

              {paymentMethod === 'Escrow Reserve' && (
                <div className="p-4 rounded-xl bg-[#101c30] border border-white/10 text-xs space-y-2">
                  <p className="font-semibold text-emerald-400">Stratech Construction Escrow Vault</p>
                  <p className="text-slate-300">
                    Funds will be locked in an insured smart-contract vault governed by third-party FIDIC arbitration. Release occurs in certified project milestones.
                  </p>
                </div>
              )}

              {/* Project Reference Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Name / Tracking Reference
                </label>
                <input
                  type="text"
                  value={projectRef}
                  onChange={(e) => setProjectRef(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#101c30] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#e5a93c]"
                />
              </div>

            </div>

            {/* Right 5 Cols: Order Summary & Execution */}
            <div className="md:col-span-5 p-6 bg-[#09111e] flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Order Summary
                  </h4>
                  <span className="text-[11px] text-slate-400">{cart.length} item(s)</span>
                </div>

                {/* Items List */}
                <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.productId} className="flex items-start justify-between gap-3 text-xs">
                      <div>
                        <p className="font-semibold text-white leading-tight">{item.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.category}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-bold text-slate-200 tabular-nums">
                          ${item.price.toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-medium text-slate-200">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Engineering Stamp & Tax (8%)</span>
                    <span className="tabular-nums font-medium text-slate-200">${tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-200 font-bold pt-1 border-t border-white/5">
                    <span>Total Contract Value</span>
                    <span className="tabular-nums text-white">${total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Amount Due Today Highlight Box */}
                <div className="p-4 rounded-xl bg-[#14233c] border border-[#e5a93c]/40 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#e5a93c]">
                    Due Now ({paymentType === '30% Milestone Deposit' ? '30% Deposit' : '100%'})
                  </span>
                  <div className="text-2xl font-extrabold text-white tabular-nums tracking-tight">
                    ${payableNow.toLocaleString()}
                  </div>
                  {paymentType === '30% Milestone Deposit' && (
                    <span className="text-[10px] text-slate-400 block">
                      Remaining ${(total - payableNow).toLocaleString()} upon completion
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 text-xs font-bold text-[#070d17] bg-[#e5a93c] hover:bg-[#f3b94e] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#070d17] border-t-transparent rounded-full animate-spin" />
                      <span>Securing Escrow Vault...</span>
                    </div>
                  ) : (
                    <>
                      <span>Authorize & Execute ${payableNow.toLocaleString()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                  <Lock className="w-3 h-3 text-[#e5a93c]" />
                  <span>256-bit TLS Encrypted · Escrow Milestone Protected</span>
                </div>
              </div>

            </div>

          </form>
        )}

      </div>
    </div>
  );
};
