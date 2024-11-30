import React from 'react';
import { Link } from 'react-router-dom';

const ProductOverview = () => {
  return (
    <div className="bg-luxury-charcoal rounded-lg p-6">
      <h2 className="text-xl font-serif text-luxury-cream mb-4">Product Overview</h2>
      <div className="space-y-4">
        {/* Product stats will be populated from the API */}
        <p className="text-luxury-gray-400">No products listed</p>
        <Link 
          to="/vendor/products"
          className="block text-luxury-gold hover:text-luxury-gold-light transition-colors text-sm"
        >
          Manage products →
        </Link>
      </div>
    </div>
  );
};

export default ProductOverview;