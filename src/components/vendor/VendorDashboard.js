import React from 'react';
import LuxuryLayout from '../layout/LuxuryLayout';
import VendorStats from './dashboard/VendorStats';
import RecentOrders from './dashboard/RecentOrders';
import ProductOverview from './dashboard/ProductOverview';

const VendorDashboard = () => {
  return (
    <LuxuryLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-luxury-cream mb-8">Vendor Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <VendorStats />
          <RecentOrders />
          <ProductOverview />
        </div>
      </div>
    </LuxuryLayout>
  );
};

export default VendorDashboard;