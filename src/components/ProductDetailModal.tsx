import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Package, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  CreditCard, 
  Plus, 
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    selectedProduct, 
    addToCart, 
    openCheckoutWithProduct 
  } = useApp();

  if (activeModal !== 'product-details' || !selectedProduct) {
    return null;
  }

  const product = selectedProduct;
  const depositAmount = Math.round(product.price * (product.depositPercent / 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl my-6 rounded-2xl bg-[#0c1626] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#0e192c]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#e5a93c]">
              {product.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {product.title}
            </h3>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Pricing Highlight Strip */}
          <div className="p-4 rounded-xl bg-[#101c30] border border-white/5 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Total Deliverable Value
              </span>
              <span className="text-2xl font-extrabold text-white tabular-nums tracking-tight">
                ${product.price.toLocaleString()}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#e5a93c] block">
                Initial Milestone Deposit ({product.depositPercent}%)
              </span>
              <span className="text-lg font-extrabold text-amber-200 tabular-nums tracking-tight">
                ${depositAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Included Deliverables & Engineering Affidavits
            </h4>
            <div className="space-y-2">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0e192c] border border-white/5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#e5a93c] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engineer & Turnaround Info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#101c30] border border-white/5 flex items-center gap-2.5">
              <UserCheck className="w-5 h-5 text-[#e5a93c]" />
              <div>
                <span className="text-[10px] text-slate-400 block">Lead Architect / PE</span>
                <span className="font-semibold text-white">{product.leadEngineer}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#101c30] border border-white/5 flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#e5a93c]" />
              <div>
                <span className="text-[10px] text-slate-400 block">Estimated Turnaround</span>
                <span className="font-semibold text-white">{product.deliveryTime}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/5 bg-[#0e192c] flex items-center justify-end gap-3">
          <button
            onClick={() => {
              addToCart(product);
              closeModal();
            }}
            className="py-2.5 px-4 text-xs font-semibold rounded-lg bg-[#14233c] hover:bg-[#1a2f52] text-slate-200 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={() => {
              closeModal();
              openCheckoutWithProduct(product);
            }}
            className="py-2.5 px-5 text-xs font-bold rounded-lg bg-[#e5a93c] hover:bg-[#f3b94e] text-[#070d17] transition-all flex items-center gap-1.5 shadow-md"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Proceed to Milestone Payment</span>
          </button>
        </div>

      </div>
    </div>
  );
};
