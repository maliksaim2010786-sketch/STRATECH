import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project, Product, Order, LeadInquiry } from '../types';
import { 
  X, 
  BarChart3, 
  Building2, 
  Package, 
  DollarSign, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Send, 
  Search,
  ExternalLink,
  Users
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    projects, 
    products, 
    orders, 
    inquiries, 
    addProject, 
    updateProject, 
    deleteProject, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateInquiryStatus, 
    viewInvoice 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'products' | 'orders' | 'inquiries'>('overview');

  // New Project Form Modal State
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Commercial Building' as Project['category'],
    location: '',
    year: 2026,
    client: '',
    budget: '$120,000,000',
    description: '',
    image: '/src/assets/images/about_architecture_1791630069743.jpg',
    status: 'In Progress' as Project['status'],
    specifications: 'Seismic Grade 4, LEED Gold Certified',
  });

  // New Product Form Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'Engineering Blueprints & CAD' as Product['category'],
    price: 32000,
    depositPercent: 30,
    deliveryTime: '10 Working Days',
    leadEngineer: 'Marcus Sterling, PE, SE',
    description: '',
    features: 'REVIT 2026 LOD 400, Peer Reviewed, Engineering Affidavit',
    inStock: true,
    rating: 5.0,
  });

  if (activeModal !== 'admin') {
    return null;
  }

  // Calculate high-level metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.paidAmount, 0) + 48200000;
  const escrowHeld = orders.reduce((sum, o) => sum + (o.total - o.paidAmount), 0);
  const activeProjectsCount = projects.filter(p => p.status !== 'Completed').length || projects.length;

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;

    addProject({
      title: newProject.title,
      category: newProject.category,
      location: newProject.location || 'Metropolitan Metro Core',
      year: Number(newProject.year) || 2026,
      client: newProject.client || 'Enterprise Client',
      budget: newProject.budget,
      description: newProject.description || 'Premier civic architectural and structural development.',
      image: newProject.image,
      metrics: [
        { label: 'Status', value: newProject.status },
        { label: 'Budget', value: newProject.budget },
      ],
      specifications: newProject.specifications.split(',').map(s => s.trim()),
      status: newProject.status,
    });

    setShowAddProjectModal(false);
    setNewProject({
      title: '',
      category: 'Commercial Building',
      location: '',
      year: 2026,
      client: '',
      budget: '$120,000,000',
      description: '',
      image: '/src/assets/images/about_architecture_1791630069743.jpg',
      status: 'In Progress',
      specifications: 'Seismic Grade 4, LEED Gold Certified',
    });
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title) return;

    addProduct({
      title: newProduct.title,
      category: newProduct.category,
      price: Number(newProduct.price) || 25000,
      depositPercent: Number(newProduct.depositPercent) || 30,
      deliveryTime: newProduct.deliveryTime,
      leadEngineer: newProduct.leadEngineer,
      description: newProduct.description || 'Multi-disciplinary engineering package stamped by licensed structural engineers.',
      features: newProduct.features.split(',').map(f => f.trim()),
      inStock: newProduct.inStock,
      rating: newProduct.rating,
      image: '/src/assets/images/project_skyline_tower_1791630081005.jpg',
    });

    setShowAddProductModal(false);
    setNewProduct({
      title: '',
      category: 'Engineering Blueprints & CAD',
      price: 32000,
      depositPercent: 30,
      deliveryTime: '10 Working Days',
      leadEngineer: 'Marcus Sterling, PE, SE',
      description: '',
      features: 'REVIT 2026 LOD 400, Peer Reviewed, Engineering Affidavit',
      inStock: true,
      rating: 5.0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-6xl my-4 sm:my-8 rounded-2xl bg-[#0c1626] border border-white/10 shadow-2xl flex flex-col h-[90vh] overflow-hidden">
        
        {/* Top Bar */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#0e192c] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-[#e5a93c]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Stratech Engineering Operations & Executive Console
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-[#e5a93c] border border-amber-500/30">
                  Admin Master
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage construction portfolio, direct sales catalog, escrow payments, and client RFPs
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Tab Navigation */}
        <div className="px-6 flex gap-4 border-b border-white/5 bg-[#09111e] overflow-x-auto shrink-0">
          {[
            { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
            { id: 'projects', label: `Projects (${projects.length})`, icon: Building2 },
            { id: 'products', label: `Catalog (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders & Escrow (${orders.length})`, icon: DollarSign },
            { id: 'inquiries', label: `RFPs & Inquiries (${inquiries.length})`, icon: FileText },
          ].map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 text-xs font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#e5a93c] text-[#e5a93c]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content View (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-[#101c30] border border-white/5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Gross Executed Capital
                  </span>
                  <div className="text-2xl font-black text-white tabular-nums tracking-tight">
                    ${(totalRevenue / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    +18.4% YoY Institutional Growth
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#101c30] border border-white/5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Active Projects
                  </span>
                  <div className="text-2xl font-black text-white tabular-nums tracking-tight">
                    {projects.length} Landmarks
                  </div>
                  <p className="text-[11px] text-[#e5a93c] font-medium">
                    100% On-Schedule Delivery
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#101c30] border border-white/5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Escrow Vault Buffer
                  </span>
                  <div className="text-2xl font-black text-white tabular-nums tracking-tight">
                    ${escrowHeld.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-sky-400 font-medium">
                    Protected under FIDIC guidelines
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#101c30] border border-white/5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Pending Corporate RFPs
                  </span>
                  <div className="text-2xl font-black text-white tabular-nums tracking-tight">
                    {inquiries.length} Inquiries
                  </div>
                  <p className="text-[11px] text-amber-300 font-medium">
                    Awaiting Architect Consultation
                  </p>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-5 rounded-xl bg-[#14233c] border border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Console Operations</h4>
                  <p className="text-xs text-slate-400">
                    Deploy real-time project updates to the live showcase or publish new engineering packages.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('projects');
                      setShowAddProjectModal(true);
                    }}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#e5a93c] text-[#070d17] hover:bg-[#f3b94e] flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('products');
                      setShowAddProductModal(true);
                    }}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#101c30] text-slate-200 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Catalog Item</span>
                  </button>
                </div>
              </div>

              {/* Recent Orders Snippet */}
              <div className="p-5 rounded-xl bg-[#101c30] border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Recent Escrow Procurement Activities
                  </h4>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#e5a93c] hover:underline"
                  >
                    View All ({orders.length})
                  </button>
                </div>

                <div className="divide-y divide-white/5">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white">{order.userName}</span>
                        <span className="text-slate-400"> ({order.userCompany})</span>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {order.items[0]?.title} · Ref: {order.projectRef}
                        </p>
                      </div>

                      <div className="text-right flex items-center gap-4">
                        <div>
                          <span className="font-bold text-white tabular-nums block">
                            ${order.total.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-emerald-400">
                            Paid: ${order.paidAmount.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => viewInvoice(order)}
                          className="p-1.5 rounded-lg bg-[#14233c] hover:bg-[#1c3052] text-slate-300"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Live Project Portfolio</h4>
                  <p className="text-xs text-slate-400">Edit, add, or update architectural landmarks on the public website</p>
                </div>

                <button
                  onClick={() => setShowAddProjectModal(true)}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#e5a93c] text-[#070d17] hover:bg-[#f3b94e] flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Deploy New Project</span>
                </button>
              </div>

              {/* Projects Table */}
              <div className="rounded-xl border border-white/5 overflow-hidden bg-[#101c30]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#0e192c] text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Landmark Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Budget</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 flex items-center gap-3">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-bold text-white">{proj.title}</p>
                            <p className="text-[11px] text-slate-400">{proj.location}</p>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-300">{proj.category}</td>
                        <td className="p-3.5 font-bold text-[#e5a93c] tabular-nums">{proj.budget}</td>
                        <td className="p-3.5">
                          <select
                            value={proj.status}
                            onChange={(e) => updateProject(proj.id, { status: e.target.value as any })}
                            className="bg-[#0c1626] border border-white/10 rounded px-2 py-1 text-[11px] text-slate-200"
                          >
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Engineering Review">Engineering Review</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => deleteProject(proj.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                            title="Remove Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS & SERVICES CATALOG MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Engineering Catalog Items</h4>
                  <p className="text-xs text-slate-400">Manage CAD packages, structural services, and materials pricing</p>
                </div>

                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#e5a93c] text-[#070d17] hover:bg-[#f3b94e] flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish New Package</span>
                </button>
              </div>

              <div className="rounded-xl border border-white/5 overflow-hidden bg-[#101c30]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#0e192c] text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Package Title</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Contract Price</th>
                      <th className="p-3.5">Milestone Deposit</th>
                      <th className="p-3.5">Availability</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5">
                          <p className="font-bold text-white">{prod.title}</p>
                          <p className="text-[11px] text-slate-400">{prod.leadEngineer}</p>
                        </td>
                        <td className="p-3.5 text-slate-300">{prod.category}</td>
                        <td className="p-3.5 font-bold text-white tabular-nums">${prod.price.toLocaleString()}</td>
                        <td className="p-3.5 text-[#e5a93c] font-bold tabular-nums">
                          ${Math.round(prod.price * (prod.depositPercent / 100)).toLocaleString()} ({prod.depositPercent}%)
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              prod.inStock
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {prod.inStock ? 'Available' : 'Booked'}
                          </button>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                            title="Remove Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS & ESCROW TRANSACTIONS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Escrow & Transaction Ledger</h4>
                  <p className="text-xs text-slate-400">Audit procurement transactions and generate digital tax invoices</p>
                </div>
              </div>

              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-xl bg-[#101c30] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#e5a93c]">{order.invoiceNumber}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30">
                          {order.status}
                        </span>
                        <span className="text-[11px] text-slate-400">Date: {order.date}</span>
                      </div>
                      <p className="text-sm font-bold text-white mt-1">
                        {order.userName} · <span className="text-slate-300 font-normal">{order.userCompany}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Item: {order.items[0]?.title} ({order.paymentType} via {order.paymentMethod})
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Settled to Date</span>
                        <span className="text-base font-extrabold text-white tabular-nums">
                          ${order.paidAmount.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          Total: ${order.total.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => viewInvoice(order)}
                        className="py-2 px-3 rounded-lg bg-[#14233c] hover:bg-[#1a2f52] text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors whitespace-nowrap"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#e5a93c]" />
                        <span>View Invoice</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: LEAD INQUIRIES / RFPS */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white">Incoming Client Requests for Proposal (RFPs)</h4>
                <p className="text-xs text-slate-400">Manage inquiries received through the Contact Us form</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-xl bg-[#101c30] border border-white/5 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-white">{inq.fullName}</h5>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#e5a93c]/15 text-[#e5a93c]">
                            {inq.company}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {inq.email} · {inq.phone} · Submitted: {inq.submittedAt}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Status:</span>
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                          className="bg-[#0c1626] border border-white/10 rounded px-2.5 py-1 text-xs text-slate-200"
                        >
                          <option value="New">New</option>
                          <option value="In Review">In Review</option>
                          <option value="Consultation Scheduled">Consultation Scheduled</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0c1626] border border-white/5 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Sector: <strong className="text-slate-200">{inq.serviceCategory}</strong></span>
                        <span>Estimated Budget: <strong className="text-[#e5a93c]">{inq.estimatedBudget}</strong></span>
                      </div>
                      <p className="text-slate-300 pt-1 leading-relaxed">
                        "{inq.projectScope}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL: ADD PROJECT */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#0c1626] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white">Deploy New Project</h4>
              <button onClick={() => setShowAddProjectModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="e.g. Apex Maritime Tower"
                  className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white"
                  >
                    <option value="Commercial Building">Commercial Building</option>
                    <option value="High-rise Development">High-rise Development</option>
                    <option value="Infrastructure Project">Infrastructure Project</option>
                    <option value="Urban Development">Urban Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Budget</label>
                  <input
                    type="text"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={newProject.location}
                  onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                  placeholder="Metropolitan Waterfront Core"
                  className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Engineering description..."
                  className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#e5a93c] text-[#070d17] font-bold"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PRODUCT */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#0c1626] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white">Add Engineering Catalog Item</h4>
              <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  placeholder="e.g. Geotechnical Core Sampling Suite"
                  className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Deposit Required (%)</label>
                  <input
                    type="number"
                    value={newProduct.depositPercent}
                    onChange={(e) => setNewProduct({ ...newProduct, depositPercent: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Delivery Timeframe</label>
                <input
                  type="text"
                  value={newProduct.deliveryTime}
                  onChange={(e) => setNewProduct({ ...newProduct, deliveryTime: e.target.value })}
                  className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#101c30] border border-white/10 rounded-lg text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#e5a93c] text-[#070d17] font-bold"
                >
                  Publish Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
