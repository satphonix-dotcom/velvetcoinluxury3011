import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductSpecifications = ({ specifications, features }) => {
  const [activeTab, setActiveTab] = useState('specifications');

  return (
    <div className="bg-luxury-charcoal p-8 rounded-lg">
      <div className="border-b border-luxury-gray-800 mb-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('specifications')}
            className={`pb-4 text-lg font-serif transition-colors relative
              ${activeTab === 'specifications' ? 'text-luxury-gold' : 'text-luxury-gray-400'}`}
          >
            Specifications
            {activeTab === 'specifications' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-4 text-lg font-serif transition-colors relative
              ${activeTab === 'features' ? 'text-luxury-gold' : 'text-luxury-gray-400'}`}
          >
            Features
            {activeTab === 'features' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
              />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'specifications' ? (
          <motion.div
            key="specifications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="border-b border-luxury-gray-800 pb-4">
                <dt className="text-luxury-gray-400 text-sm mb-1">{key}</dt>
                <dd className="text-luxury-cream">{value}</dd>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.ul
            key="features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-luxury-cream"
              >
                <svg
                  className="w-5 h-5 text-luxury-gold mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {feature}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductSpecifications;