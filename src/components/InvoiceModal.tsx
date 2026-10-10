import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Printer, 
  Download, 
  Building2, 
  CheckCircle2, 
  ShieldCheck,
  FileCheck
} from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const { activeModal, closeModal, activeInvoiceOrder } = useApp();

  if (activeModal !== 'invoice' || !activeInvoiceOrder) {
    return null;
  }

  const order = activeInvoiceOrder;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl bg-[#0c1626] border border-white/10 shadow-2xl overflow-hidden print:bg-white print:text-black">
        
        {/* Top Action Bar */}
        <div className="p-4 px-6 border-b border-white/5 flex items-center justify-between bg-[#0e192c] print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <FileCheck className="w-4 h-4 text-[#e5a93c]" />
            <span>Official Electronic Receipt & Contract Escrow Record</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#14233c] hover:bg-[#1a2f52] text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={closeModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Document Body */}
        <div className="p-8 space-y-6 text-slate-200 print:text-slate-900 bg-[#0c1626] print:bg-white">
          
          {/* Brand & Invoice Meta */}
          <div className="flex items-start justify-between border-b border-white/10 print:border-slate-300 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#101c30] border border-[#e5a93c] flex items-center justify-center overflow-hidden">
                  <img
                    src="https://i.pinimg.com/736x/26/b5/ec/26b5ece3bc56f913229650535343d43f.jpg"
                    alt="Stratech Logo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xl font-extrabold tracking-widest text-white print:text-slate-900 uppercase">
                  STRATECH
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-slate-400 uppercase">
                ENGINEERING & CONSTRUCTION GLOBAL
              </p>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-2">
                Stratech Tower, 450 Financial Way, Level 40<br />
                New York, NY 10005 · EIN: 13-9821402-A
              </p>
            </div>

            <div className="text-right space-y-1">
              <span className="text-xs font-mono font-bold text-[#e5a93c] uppercase block">
                {order.invoiceNumber}
              </span>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Date: {order.date}
              </p>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                <span>Escrow Verified</span>
              </div>
            </div>
          </div>

          {/* Bill To & Project Ref */}
          <div className="grid grid-cols-2 gap-6 text-xs border-b border-white/10 print:border-slate-300 pb-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Client / Authorized Signatory:
              </span>
              <p className="font-bold text-white print:text-slate-900 text-sm">{order.userName}</p>
              <p className="text-slate-300 print:text-slate-700">{order.userCompany}</p>
              <p className="text-slate-400 print:text-slate-600">Account ID: {order.userId}</p>
            </div>

            <div className="text-right sm:text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Project Tracking Reference:
              </span>
              <p className="font-semibold text-white print:text-slate-900">{order.projectRef || 'Metropolitan Masterplan'}</p>
              <p className="text-slate-400 print:text-slate-600">Payment Type: {order.paymentType}</p>
              <p className="text-slate-400 print:text-slate-600">Remitted via: {order.paymentMethod}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-3">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/10 print:border-slate-300 text-slate-400 uppercase text-[10px]">
                  <th className="py-2">Item Deliverable</th>
                  <th className="py-2">Discipline</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 print:divide-slate-200">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="text-slate-200 print:text-slate-800">
                    <td className="py-3 font-semibold">{item.title}</td>
                    <td className="py-3 text-slate-400">{item.category}</td>
                    <td className="py-3 text-center">{item.quantity}</td>
                    <td className="py-3 text-right font-mono font-medium">${(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-white/10 print:border-slate-300 flex justify-end">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="tabular-nums font-mono">${order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Engineering Stamping & Tax:</span>
                <span className="tabular-nums font-mono">${order.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white print:text-slate-900 font-bold text-sm pt-2 border-t border-white/10 print:border-slate-300">
                <span>Total Contract:</span>
                <span className="tabular-nums font-mono">${order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#e5a93c] font-bold text-sm pt-1">
                <span>Paid to Escrow Today:</span>
                <span className="tabular-nums font-mono">${order.paidAmount.toLocaleString()}</span>
              </div>
              {order.total > order.paidAmount && (
                <div className="flex justify-between text-slate-400 text-[11px] pt-1">
                  <span>Balance Due upon Sign-off:</span>
                  <span className="tabular-nums font-mono">${(order.total - order.paidAmount).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Compliance & Seal */}
          <div className="pt-6 border-t border-white/10 print:border-slate-300 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#e5a93c]" />
              <span>Certified under FIDIC Client/Consultant Model Services</span>
            </div>

            <div className="text-right font-mono text-[10px]">
              AUTH-TOKEN: {order.id.toUpperCase()}-STX-ESCROW
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
