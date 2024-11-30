import React from 'react';
import { Link } from 'react-router-dom';
import LuxuryLayout from '../layout/LuxuryLayout';
import Button from '../common/Button';

const EmptyCart = () => {
  return (
    <LuxuryLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <p className="text-luxury-gray-400 mb-6">Your cart is empty</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </LuxuryLayout>
  );
};

export default EmptyCart;