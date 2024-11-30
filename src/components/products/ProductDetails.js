import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LuxuryLayout from '../layout/LuxuryLayout';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';
import ProductSpecifications from './ProductSpecifications';

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Mock product data - replace with actual API call
  const product = {
    id,
    name: 'Royal Oak Chronograph',
    brand: 'Audemars Piguet',
    price: 85000,
    description: 'A masterpiece of horological excellence, this Royal Oak Chronograph represents the pinnacle of luxury watchmaking. Crafted with meticulous attention to detail and featuring the iconic octagonal bezel.',
    images: [
      '/images/products/watch-1.jpg',
      '/images/products/watch-2.jpg',
      '/images/products/watch-3.jpg',
      '/images/products/watch-4.jpg'
    ],
    specifications: {
      'Case Material': '18k Rose Gold',
      'Movement': 'Automatic Chronograph',
      'Case Size': '41mm',
      'Water Resistance': '50m',
      'Reference': '26331OR.OO.1220OR.01'
    },
    features: [
      'In-house caliber 2385 movement',
      'Integrated bracelet design',
      'Tapisserie dial pattern',
      'Chronograph function'
    ],
    category: 'Watches',
    inStock: true
  };

  return (
    <LuxuryLayout>
      <div className="bg-luxury-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <ProductGallery
              images={product.images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />

            <ProductInfo product={product} />
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20"
          >
            <ProductSpecifications
              specifications={product.specifications}
              features={product.features}
            />
          </motion.div>

          <RelatedProducts category={product.category} currentProductId={product.id} />
        </div>
      </div>
    </LuxuryLayout>
  );
};

export default ProductDetails;