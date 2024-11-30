import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../store/slices/cartSlice';
import { calculateTotal } from '../../utils/cartHelpers';
import CryptoPayment from './CryptoPayment';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);
  const total = calculateTotal(items);

  const [formData, setFormData] = useState({
    shippingAddress: {
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  const [step, setStep] = useState('shipping');
  const [orderId, setOrderId] = useState(null);

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          items,
          total,
          shippingAddress: formData.shippingAddress
        })
      });

      if (!response.ok) throw new Error('Failed to create order');
      
      const order = await response.json();
      setOrderId(order._id);
      setStep('payment');
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  const handlePaymentSuccess = () => {
    dispatch(clearCart());
    navigate(`/order-confirmation/${orderId}`);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {step === 'shipping' ? (
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>
            <form onSubmit={handleShippingSubmit} className="bg-white p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    value={formData.shippingAddress.fullName}
                    onChange={(e) => setFormData({
                      ...formData,
                      shippingAddress: {
                        ...formData.shippingAddress,
                        fullName: e.target.value
                      }
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    value={formData.shippingAddress.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      shippingAddress: {
                        ...formData.shippingAddress,
                        address: e.target.value
                      }
                    })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      value={formData.shippingAddress.city}
                      onChange={(e) => setFormData({
                        ...formData,
                        shippingAddress: {
                          ...formData.shippingAddress,
                          city: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      value={formData.shippingAddress.state}
                      onChange={(e) => setFormData({
                        ...formData,
                        shippingAddress: {
                          ...formData.shippingAddress,
                          state: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      value={formData.shippingAddress.zipCode}
                      onChange={(e) => setFormData({
                        ...formData,
                        shippingAddress: {
                          ...formData.shippingAddress,
                          zipCode: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      value={formData.shippingAddress.country}
                      onChange={(e) => setFormData({
                        ...formData,
                        shippingAddress: {
                          ...formData.shippingAddress,
                          country: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-yellow-400 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div>
              <CryptoPayment
                orderId={orderId}
                amount={total}
                onSuccess={handlePaymentSuccess}
              />
            </div>
            <div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item._id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <p>Total</p>
                      <p>${total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;