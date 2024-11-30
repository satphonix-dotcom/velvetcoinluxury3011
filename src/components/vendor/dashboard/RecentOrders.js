import React from 'react';
import { Link } from 'react-router-dom';

const RecentOrders = () => {
  return (
    <div className="bg-luxury-charcoal rounded-lg p-6">
      <h2 className="text-xl font-serif text-luxury-cream mb-4">Recent Orders</h2>
      <div className="space-y-4">
        {/* Order list will be populated from the API */}
        <p className="text-luxury-gray-400">No recent orders</p>
        <Link 
          to="/vendor/orders"
          className="block text-luxury-gold hover:text-luxury-gold-light transition-colors text-sm"
        >
          View all orders →
        </Link>
      </div>
    </div>
  );
};

export default RecentOrders;