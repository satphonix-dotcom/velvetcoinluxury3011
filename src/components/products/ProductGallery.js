import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

const ProductGallery = ({ images, selectedImage, setSelectedImage }) => {
  const [{ zoom }, set] = useSpring(() => ({ zoom: 1 }));

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    set({
      zoom: 1.5,
      x: (0.5 - x) * 100,
      y: (0.5 - y) * 100,
      config: { mass: 1, tension: 170, friction: 26 }
    });
  };

  const handleMouseLeave = () => {
    set({ zoom: 1, x: 0, y: 0 });
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-w-4 aspect-h-3 bg-luxury-charcoal rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <animated.img
              src={images[selectedImage]}
              alt={`Product view ${selectedImage + 1}`}
              className="w-full h-full object-cover"
              style={{
                scale: zoom,
                transform: zoom.to((z) => `scale(${z})`)
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden
              ${selectedImage === index ? 'ring-2 ring-luxury-gold' : 'ring-1 ring-luxury-gray-800'}`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;