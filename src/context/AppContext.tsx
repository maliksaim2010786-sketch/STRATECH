import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Product, User, Order, OrderItem, LeadInquiry, UserRole } from '../types';
import { INITIAL_PROJECTS, INITIAL_PRODUCTS, INITIAL_USERS, INITIAL_ORDERS, INITIAL_INQUIRIES } from '../data/mockData';
import confetti from 'canvas-confetti';

interface CheckoutOptions {
  items: OrderItem[];
  paymentType: 'Full Payment' | '30% Milestone Deposit' | 'Escrow Vault';
  paymentMethod: 'Credit Card' | 'Wire Transfer' | 'Escrow Reserve';
  cardNumber?: string;
  projectRef?: string;
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  projects: Project[];
  products: Product[];
  orders: Order[];
  inquiries: LeadInquiry[];
  cart: OrderItem[];
  
  // UI & Modals
  activeModal: string | null;
  selectedProject: Project | null;
  selectedProduct: Product | null;
  activeInvoiceOrder: Order | null;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  openModal: (modal: string) => void;
  closeModal: () => void;
  
  // Auth
  login: (email: string) => boolean;
  signup: (name: string, email: string, company: string, role: UserRole) => void;
  logout: () => void;
  switchUser: (role: UserRole) => void;
  updateProfile: (data: Partial<User>) => void;
  toggleSaveProject: (projectId: string) => void;
  
  // Store & Cart
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  openProductDetails: (product: Product) => void;
  openProjectDetails: (project: Project) => void;
  openCheckoutWithProduct: (product: Product) => void;
  
  // Payments
  processPayment: (options: CheckoutOptions) => Order;
  viewInvoice: (order: Order) => void;
  
  // Admin Operations
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  submitLeadInquiry: (inquiry: Omit<LeadInquiry, 'id' | 'submittedAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: LeadInquiry['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence state
  const CLIENT_AVATAR_URL = 'https://i.pinimg.com/736x/8e/ff/03/8eff032f266f8276929a387d1b1dd215.jpg';

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('stratech_users');
    if (!saved) return INITIAL_USERS;
    try {
      const parsed: User[] = JSON.parse(saved);
      return parsed.map((u) => (u.id === 'user-client' ? { ...u, avatar: CLIENT_AVATAR_URL } : u));
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('stratech_current_user');
    if (!saved) return INITIAL_USERS[1]; // default to Client Jonathan Miller
    try {
      const parsed: User = JSON.parse(saved);
      if (parsed.id === 'user-client') {
        return { ...parsed, avatar: CLIENT_AVATAR_URL };
      }
      return parsed;
    } catch {
      return INITIAL_USERS[1];
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('stratech_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('stratech_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('stratech_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [inquiries, setInquiries] = useState<LeadInquiry[]>(() => {
    const saved = localStorage.getItem('stratech_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [cart, setCart] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('stratech_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('stratech_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('stratech_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('stratech_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('stratech_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('stratech_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('stratech_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('stratech_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('stratech_cart', JSON.stringify(cart));
  }, [cart]);

  // Modal helpers
  const openModal = (modal: string) => setActiveModal(modal);
  const closeModal = () => {
    setActiveModal(null);
  };

  // Auth helpers
  const login = (email: string): boolean => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      setActiveModal(null);
      return true;
    }
    // Auto-create user if demo login
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role: 'client',
      company: 'General Contracting Ltd.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      phone: '+1 (555) 019-2834',
      address: 'Suite 500, Waterfront Center',
      savedProjectIds: [],
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setActiveModal(null);
    return true;
  };

  const signup = (name: string, email: string, company: string, role: UserRole) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      company,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phone: '+1 (555) 789-0123',
      address: '100 Innovation Promenade',
      savedProjectIds: [],
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setActiveModal(null);
  };

  const logout = () => {
    setCurrentUser(null);
    closeModal();
  };

  const switchUser = (role: UserRole) => {
    const target = users.find((u) => u.role === role);
    if (target) {
      setCurrentUser(target);
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const toggleSaveProject = (projectId: string) => {
    if (!currentUser) {
      openModal('login');
      return;
    }
    const exists = currentUser.savedProjectIds.includes(projectId);
    const updatedIds = exists
      ? currentUser.savedProjectIds.filter((id) => id !== projectId)
      : [...currentUser.savedProjectIds, projectId];
    updateProfile({ savedProjectIds: updatedIds });
  };

  // Cart & Catalog helpers
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) => (i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          category: product.category,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const clearCart = () => setCart([]);

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setActiveModal('product-details');
  };

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setActiveModal('project-details');
  };

  const openCheckoutWithProduct = (product: Product) => {
    addToCart(product);
    setActiveModal('checkout');
  };

  // Payment Processing
  const processPayment = (options: CheckoutOptions): Order => {
    const subtotal = options.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.08);
    const total = subtotal + tax;

    let paidAmount = total;
    if (options.paymentType === '30% Milestone Deposit') {
      paidAmount = Math.round(total * 0.3);
    }

    const newOrder: Order = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      userId: currentUser?.id || 'guest-user',
      userName: currentUser?.name || 'Verified Corporate Client',
      userCompany: currentUser?.company || 'Enterprise Partner',
      items: options.items,
      subtotal,
      tax,
      total,
      paidAmount,
      paymentType: options.paymentType,
      paymentMethod: options.paymentMethod,
      status: 'Completed',
      projectRef: options.projectRef || 'General Infrastructure Procurement',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Trigger celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e5a93c', '#ffffff', '#1e3a8a'],
      });
    } catch {
      // ignore in environments without canvas
    }

    setActiveInvoiceOrder(newOrder);
    setActiveModal('invoice');
    return newOrder;
  };

  const viewInvoice = (order: Order) => {
    setActiveInvoiceOrder(order);
    setActiveModal('invoice');
  };

  // Admin Operations
  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
    };
    setProjects((prev) => [newProj, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProd, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const submitLeadInquiry = (inquiry: Omit<LeadInquiry, 'id' | 'submittedAt' | 'status'>) => {
    const newInq: LeadInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New',
    };
    setInquiries((prev) => [newInq, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: LeadInquiry['status']) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        projects,
        products,
        orders,
        inquiries,
        cart,
        activeModal,
        selectedProject,
        selectedProduct,
        activeInvoiceOrder,
        activeSection,
        setActiveSection,
        openModal,
        closeModal,
        login,
        signup,
        logout,
        switchUser,
        updateProfile,
        toggleSaveProject,
        addToCart,
        removeFromCart,
        clearCart,
        openProductDetails,
        openProjectDetails,
        openCheckoutWithProduct,
        processPayment,
        viewInvoice,
        addProject,
        updateProject,
        deleteProject,
        addProduct,
        updateProduct,
        deleteProduct,
        submitLeadInquiry,
        updateInquiryStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
