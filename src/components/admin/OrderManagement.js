import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LuxuryLayout from '../layout/LuxuryLayout';
import { format } from 'date-fns';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Fetch orders from API
    setLoading(false);
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      // Update order status via API
    } catch (error) {
      setError('Failed to update order status');
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

  return (
    <LuxuryLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-luxury-cream">Order Management</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-luxury-charcoal border-luxury-gray-700 text-luxury-cream rounded-md"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
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
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-400 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-luxury-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-gray-800">
                {filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-luxury-cream">#{order._id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-luxury-cream">{order.user.username}</div>
                      <div className="text-sm text-luxury-gray-400">{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-luxury-cream">
                        {format(new Date(order.createdAt), 'PPP')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className="bg-luxury-black border-luxury-gray-700 text-luxury-cream rounded-md"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-luxury-cream">
                        ${order.total.toFixed(2)}
                      </span>
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

            {filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-luxury-gray-400">No orders found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </LuxuryLayout>
  );
};

export default OrderManagement;