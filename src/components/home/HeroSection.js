import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Watch"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h1 className="text-display-1 font-serif text-luxury-cream mb-6">
            Discover Timeless Luxury
          </h1>
          <p className="text-xl text-luxury-gray-300 mb-8">
            Explore our curated collection of exceptional timepieces and rare collectibles.
          </p>
          <div className="space-x-4">
            <Link to="/products">
              <Button size="lg">
                Explore Collection
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;