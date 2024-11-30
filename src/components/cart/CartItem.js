import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="bg-luxury-charcoal p-6 rounded-lg">
      <div className="flex items-center">
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="ml-6 flex-grow">
          <Link 
            to={`/product/${item._id}`}
            className="text-luxury-cream hover:text-luxury-gold transition-colors"
          >
            <h3 className="text-lg font-medium">{item.name}</h3>
          </Link>
          <p className="text-luxury-gray-400 mt-1">${item.price.toFixed(2)}</p>
          
          <div className="flex items-center mt-4">
            <select
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(Number(e.target.value))}
              className="bg-luxury-black border-luxury-gray-700 text-luxury-cream rounded-md"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <button
              onClick={onRemove}
              className="ml-4 text-luxury-gray-400 hover:text-luxury-gold transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-luxury-cream">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;