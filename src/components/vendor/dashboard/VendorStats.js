import React from 'react';

const VendorStats = () => {
  return (
    <div className="bg-luxury-charcoal rounded-lg p-6">
      <h2 className="text-xl font-serif text-luxury-cream mb-4">Statistics</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-luxury-gray-400">Total Sales</span>
          <span className="text-luxury-gold font-medium">$24,500</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-luxury-gray-400">Active Products</span>
          <span className="text-luxury-cream font-medium">15</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-luxury-gray-400">Pending Orders</span>
          <span className="text-luxury-cream font-medium">3</span>
        </div>
      </div>
    </div>
  );
};

export default VendorStats;