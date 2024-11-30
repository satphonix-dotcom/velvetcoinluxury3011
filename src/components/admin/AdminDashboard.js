import React from 'react';
import { Link } from 'react-router-dom';
import LuxuryLayout from '../layout/LuxuryLayout';

const AdminDashboard = () => {
  return (
    <LuxuryLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-luxury-cream mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DashboardCard
            title="Product Management"
            description="Manage products, approve listings, and monitor inventory"
            link="/admin/products"
          />
          <DashboardCard
            title="User Management"
            description="Manage users, vendors, and permissions"
            link="/admin/users"
          />
          <DashboardCard
            title="Order Management"
            description="View and manage all orders across the platform"
            link="/admin/orders"
          />
          <DashboardCard
            title="Content Management"
            description="Manage pages, blog posts, and site content"
            link="/admin/content"
          />
          <DashboardCard
            title="Analytics"
            description="View site statistics and performance metrics"
            link="/admin/analytics"
          />
          <DashboardCard
            title="Settings"
            description="Configure site settings and preferences"
            link="/admin/settings"
          />
        </div>
      </div>
    </LuxuryLayout>
  );
};

const DashboardCard = ({ title, description, link }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-luxury-charcoal p-6 rounded-lg hover:bg-luxury-gray-800 transition-colors">
        <h2 className="text-xl font-serif text-luxury-cream mb-2">{title}</h2>
        <p className="text-luxury-gray-400">{description}</p>
      </div>
    </Link>
  );
};

export default AdminDashboard;