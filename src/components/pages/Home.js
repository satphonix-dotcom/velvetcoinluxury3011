import React from 'react';
import LuxuryLayout from '../layout/LuxuryLayout';
import HeroSection from '../home/HeroSection';
import CategoryShowcase from '../home/CategoryShowcase';
import FeaturedProducts from '../home/FeaturedProducts';

const Home = () => {
  return (
    <LuxuryLayout>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
    </LuxuryLayout>
  );
};

export default Home;