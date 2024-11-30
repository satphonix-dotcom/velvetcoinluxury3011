import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity } from '../../store/slices/cartSlice';
import { calculateTotal } from '../../utils/cartHelpers';
import LuxuryLayout from '../layout/LuxuryLayout';
import Button from '../common/Button';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const total = calculateTotal(items);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <LuxuryLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-luxury-cream mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {items.map(item => (
                <CartItem 
                  key={item._id} 
                  item={item}
                  onRemove={() => dispatch(removeItem(item._id))}
                  onUpdateQuantity={(quantity) => 
                    dispatch(updateQuantity({ id: item._id, quantity }))
                  }
                />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <CartSummary total={total} />
          </div>
        </div>
      </div>
    </LuxuryLayout>
  );
};

export default CartPage;