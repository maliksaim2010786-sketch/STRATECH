export type ProjectCategory = 
  | 'High-rise Development'
  | 'Commercial Building'
  | 'Infrastructure Project'
  | 'Urban Development'
  | 'Industrial & Energy';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  client: string;
  budget: string;
  description: string;
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
  specifications: string[];
  status: 'Completed' | 'In Progress' | 'Engineering Review';
}

export type ProductCategory =
  | 'Engineering Blueprints & CAD'
  | 'Structural Consulting'
  | 'Specialized Materials'
  | 'Smart Building Automation'
  | 'Project Feasibility';

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  depositPercent: number; // e.g. 30%
  deliveryTime: string;
  leadEngineer: string;
  description: string;
  features: string[];
  inStock: boolean;
  rating: number;
  image?: string;
}

export type UserRole = 'client' | 'contractor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company: string;
  avatar: string;
  phone: string;
  address: string;
  savedProjectIds: string[];
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Order {
  id: string;
  invoiceNumber: string;
  date: string;
  userId: string;
  userName: string;
  userCompany: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paidAmount: number;
  paymentType: 'Full Payment' | '30% Milestone Deposit' | 'Escrow Vault';
  paymentMethod: 'Credit Card' | 'Wire Transfer' | 'Escrow Reserve';
  status: 'Completed' | 'Escrow Held' | 'In Review';
  projectRef?: string;
}

export interface LeadInquiry {
  id: string;
  fullName: string;
  email: string;
  company: string;
  phone: string;
  serviceCategory: string;
  estimatedBudget: string;
  projectScope: string;
  submittedAt: string;
  status: 'New' | 'In Review' | 'Consultation Scheduled';
}
