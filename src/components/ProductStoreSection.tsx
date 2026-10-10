import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductCategory } from '../types';
import { 
  Package, 
  Search, 
  SlidersHorizontal, 
  Check, 
  CreditCard, 
  Clock, 
  UserCheck, 
  Plus, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const ProductStoreSection: React.FC = () => {
  const { 
    products, 
    addToCart, 
    openCheckoutWithProduct, 
    openProductDetails 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  const categories: string[] = [
    'All',
    'Engineering Blueprints & CAD',
    'Structural Consulting',
    'Specialized Materials',
    'Smart Building Automation',
    'Project Feasibility',
  ];

  const filteredProducts = products
    .filter((prod) => {
      const matchesCat = selectedCategory === 'All' || prod.category === selectedCategory;
      const matchesQuery = 
        prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.leadEngineer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  return (
    <section id="products" className="py-20 bg-[#070d17] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5a93c]">
                COMMERCIAL PROCUREMENT
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#e5a93c]/15 text-[#e5a93c] font-semibold border border-[#e5a93c]/30">
                Direct B2B Catalog
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Engineering Packages & Solutions
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
            Order certified structural BIM packages, site soil analyses, specialized precast lots, and smart building automation directly with contract-backed escrow protection.
          </p>
        </div>

        {/* Search, Filter & Sort Bar */}
        <div className="p-4 rounded-xl bg-[#0c1626] border border-white/10 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search packages, materials, or engineers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-[#101c30] border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#e5a93c]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#e5a93c]" />
                <span>Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#101c30] border border-white/10 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#e5a93c]"
              >
                <option value="featured">Featured Packages</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-105 ${
                  selectedCategory === cat
                    ? 'bg-[#e5a93c] text-[#070d17] font-semibold shadow-[0_0_12px_rgba(229,169,60,0.35)]'
                    : 'bg-[#14233c] text-slate-300 hover:text-white hover:border-[#e5a93c]/50 hover:bg-[#1a2f52] border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product: Product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-[#0c1626] border border-white/10 hover:border-[#e5a93c] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),0_0_30px_rgba(229,169,60,0.22)] flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div>
                {/* Header Strip with Category & Rating */}
                <div className="p-5 pb-3 border-b border-white/5 flex items-start justify-between gap-3 bg-[#0e192c] group-hover:bg-[#12223c] transition-colors">
                  <div>
                    <span className="text-[11px] font-semibold text-[#e5a93c] tracking-wide uppercase">
                      {product.category}
                    </span>
                    <h3 
                      onClick={() => openProductDetails(product)}
                      className="text-base font-bold text-white group-hover:text-[#e5a93c] transition-colors mt-1 cursor-pointer leading-snug"
                    >
                      {product.title}
                    </h3>
                  </div>

                  <div className="p-2 rounded-lg bg-[#14233c] text-[#e5a93c] shrink-0 border border-white/5 group-hover:border-[#e5a93c] group-hover:bg-[#e5a93c] group-hover:text-[#070d17] group-hover:scale-115 group-hover:shadow-[0_0_12px_rgba(229,169,60,0.4)] transition-all duration-300">
                    <Package className="w-5 h-5" />
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-300 group-hover:text-slate-200 leading-relaxed line-clamp-3 transition-colors">
                    {product.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-1.5 pt-1">
                    {product.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300 group-hover:text-white transition-colors">
                        <Check className="w-3.5 h-3.5 text-[#e5a93c] shrink-0 mt-0.5" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metadata Row: Lead Engineer & Turnaround */}
                  <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-300 transition-colors">
                      <UserCheck className="w-3.5 h-3.5 text-[#e5a93c] shrink-0" />
                      <span className="truncate">{product.leadEngineer}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-300 transition-colors justify-end">
                      <Clock className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#e5a93c] shrink-0 transition-colors" />
                      <span>{product.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action Bottom Strip */}
              <div className="p-5 pt-3 border-t border-white/5 bg-[#09111e] group-hover:bg-[#0c1626] transition-colors space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Contract Value
                    </span>
                    <span className="text-xl font-extrabold text-white tabular-nums tracking-tight group-hover:text-[#e5a93c] transition-colors">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#e5a93c] font-semibold block">
                      Deposit ({product.depositPercent}%)
                    </span>
                    <span className="text-xs font-bold text-amber-200 tabular-nums">
                      ${Math.round(product.price * (product.depositPercent / 100)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Purchase Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => addToCart(product)}
                    className="py-2 px-3 text-xs font-semibold rounded-lg bg-[#14233c] hover:bg-[#1f365c] text-slate-200 hover:text-white border border-white/10 hover:border-[#e5a93c] hover:scale-102 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => openCheckoutWithProduct(product)}
                    className="py-2 px-3 text-xs font-bold rounded-lg bg-[#e5a93c] hover:bg-[#f3b94e] text-[#070d17] hover:scale-105 hover:shadow-[0_0_20px_rgba(229,169,60,0.5)] transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Order Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
