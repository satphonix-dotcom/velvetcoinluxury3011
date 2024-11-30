import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-luxury-charcoal rounded-lg overflow-hidden shadow-lg"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-w-4 aspect-h-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </Link>
      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-serif text-luxury-cream mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-luxury-gray-400 mb-4">
          {product.brand}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-luxury-gold">
            ${product.price.toLocaleString()}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="text-sm text-luxury-cream hover:text-luxury-gold transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;