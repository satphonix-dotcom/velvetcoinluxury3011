import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setOrder(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <Link
            to="/orders"
            className="mt-6 inline-block bg-yellow-400 px-6 py-3 rounded-md font-medium text-gray-900 hover:bg-yellow-500"
          >
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="text-center mb-8">
          <svg
            className="mx-auto h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="mt-2 text-gray-600">
            Thank you for your order. Your order number is #{order._id}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Order Details</h2>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item._id} className="flex items-center">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex justify-between">
              <p className="text-base font-medium text-gray-900">Order total</p>
              <p className="text-base font-medium text-gray-900">
                ${order.total.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Shipping Address
            </h3>
            <address className="text-gray-600 not-italic">
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
              {order.shippingAddress.country}
            </address>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/orders"
              className="bg-yellow-400 px-6 py-3 rounded-md font-medium text-gray-900 hover:bg-yellow-500"
            >
              View All Orders
            </Link>
            <Link
              to="/products"
              className="bg-gray-200 px-6 py-3 rounded-md font-medium text-gray-900 hover:bg-gray-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;