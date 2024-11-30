import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const CartSummary = ({ total }) => {
  return (
    <div className="bg-luxury-charcoal p-6 rounded-lg">
      <h2 className="text-xl font-serif text-luxury-cream mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-luxury-gray-400">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="border-t border-luxury-gray-800 pt-4">
          <div className="flex justify-between text-luxury-cream">
            <span className="font-medium">Total</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
        </div>
        <Link to="/checkout">
          <Button className="w-full">Proceed to Checkout</Button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;