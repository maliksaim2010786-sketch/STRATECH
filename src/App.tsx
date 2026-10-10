import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ProductStoreSection } from './components/ProductStoreSection';
import { MetricsBanner } from './components/MetricsBanner';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { UserProfileDrawer } from './components/UserProfileDrawer';
import { PaymentModal } from './components/PaymentModal';
import { InvoiceModal } from './components/InvoiceModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ContactQuoteModal } from './components/ContactQuoteModal';

function StratechApp() {
  return (
    <div className="min-h-screen bg-[#070d17] text-slate-100 flex flex-col selection:bg-[#e5a93c] selection:text-[#070d17]">
      {/* Navigation Top Bar */}
      <Navbar />

      {/* Main Corporate Sections Matching Image */}
      <main className="flex-1">
        {/* 1. Hero Section with Headline, Skyline View & 4 Wireframe Cards */}
        <Hero />

        {/* 2. Middle Section: Architectural Visual, Editorial 'About Us', & 4 Circular Gold Expertise Badges */}
        <AboutSection />

        {/* 3. Featured Projects Showcase with Slider Controls & Specifications */}
        <FeaturedProjects />

        {/* 4. Product Listing Feature: Engineering Blueprints, CAD & Material Packages */}
        <ProductStoreSection />

        {/* 5. Metrics Footer Strip: 150+ Projects, 98% Satisfaction, 500+ Pros, Safety First */}
        <MetricsBanner />
      </main>

      {/* Footer */}
      <Footer />

      {/* Application Modals & Drawers */}
      <AuthModal />
      <UserProfileDrawer />
      <PaymentModal />
      <InvoiceModal />
      <AdminDashboard />
      <ProjectDetailModal />
      <ProductDetailModal />
      <ContactQuoteModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <StratechApp />
    </AppProvider>
  );
}
