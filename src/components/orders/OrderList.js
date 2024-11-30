import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../../store/slices/orderSlice';
import { format } from 'date-fns';
import LuxuryLayout from '../layout/LuxuryLayout';

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <LuxuryLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-luxury-cream mb-8">Your Orders</h1>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-luxury-gray-400">No orders found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="block bg-luxury-charcoal rounded-lg p-6 hover:bg-luxury-gray-800 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-luxury-cream font-medium">Order #{order._id}</p>
                    <p className="text-luxury-gray-400">
                      {format(new Date(order.createdAt), 'PPP')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-luxury-gold font-medium">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-luxury-gray-400">
                      {order.status}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </LuxuryLayout>
  );
};

export default OrderList;