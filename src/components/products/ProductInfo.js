import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log('Adding to cart:', { ...product, quantity });
  };

  return (
    <div className="space-y-8">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif text-luxury-cream mb-2"
        >
          {product.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-luxury-gold text-lg font-serif"
        >
          {product.brand}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <p className="text-2xl text-luxury-cream">
          ${product.price.toLocaleString()}
        </p>
        <p className="text-luxury-gray-400 leading-relaxed">
          {product.description}
        </p>
      </motion.div>

      <div className="space-y-6">
        <div>
          <label className="block text-luxury-cream mb-2">
            Quantity
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="bg-luxury-charcoal border-luxury-gray-700 text-luxury-cream rounded-none focus:ring-luxury-gold focus:border-luxury-gold w-24"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleAddToCart}
            className="flex-1"
          >
            Add to Cart
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
          >
            Add to Wishlist
          </Button>
        </div>

        <div className="border-t border-luxury-gray-800 pt-6 space-y-4">
          <div className="flex items-center space-x-2 text-luxury-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4h1.5l1.8 8.7a2 2 0 002 1.3h8.4a2 2 0 002-1.3L20 4h-1.5l-1.8 8.7a.5.5 0 01-.5.3H8.3a.5.5 0 01-.5-.3L6 4z" />
            </svg>
            <span>Free shipping on orders over $1000</span>
          </div>
          <div className="flex items-center space-x-2 text-luxury-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <span>Certificate of Authenticity included</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;