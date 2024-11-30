import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from '../home/ProductCard';

const RelatedProducts = ({ category, currentProductId }) => {
  // Mock related products - replace with actual API call
  const relatedProducts = [
    {
      id: 2,
      name: 'Nautilus Chronograph',
      price: 95000,
      image: '/images/products/watch-2.jpg',
      category: 'Watches'
    },
    // Add more related products
  ].filter(product => product.id !== currentProductId);

  return (
    <section className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-serif text-luxury-cream">
          Similar Products
        </h2>
        <p className="text-luxury-gray-400 mt-2">
          Explore more luxury {category.toLowerCase()}
        </p>
      </motion.div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="luxury-swiper"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RelatedProducts;