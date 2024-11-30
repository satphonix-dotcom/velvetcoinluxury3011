import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, updateProductStatus } from '../../store/slices/productSlice';
import LuxuryLayout from '../layout/LuxuryLayout';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all'
  });

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleStatusChange = async (productId, status) => {
    try {
      await dispatch(updateProductStatus({ productId, status })).unwrap();
    } catch (error) {
      console.error('Failed to update product status:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    if (filters.status !== 'all' && product.status !== filters.status) return false;
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    return true;
  });

  return (
    <LuxuryLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-serif text-luxury-cream mb-8">Product Management</h2>

        <div className="mb-6 flex gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="bg-luxury-charcoal border-luxury-gray-700 text-luxury-cream rounded-md"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="bg-luxury-charcoal border-luxury-gray-700 text-luxury-cream rounded-md"
          >
            <option value="all">All Categories</option>
            <option value="Watches">Watches</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Accessories">Accessories</option>
            <option value="Collectibles">Collectibles</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <div className="bg-luxury-charcoal rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-luxury-gray-800">
              <thead className="bg-luxury-black">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-400 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-gray-800">
                {filteredProducts.map(product => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-luxury-cream">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-luxury-cream">
                        {product.seller.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-luxury-cream">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-luxury-cream">
                        ${product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={product.status}
                        onChange={(e) => handleStatusChange(product._id, e.target.value)}
                        className="bg-luxury-black border-luxury-gray-700 text-luxury-cream rounded-md"
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-gray-400">
                      <button className="text-luxury-gold hover:text-luxury-gold-light transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-luxury-gray-400">No products found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </LuxuryLayout>
  );
};

export default ProductManagement;