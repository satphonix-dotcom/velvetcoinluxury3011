import React from 'react';
import LuxuryLayout from '../layout/LuxuryLayout';

const About = () => {
  return (
    <LuxuryLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-luxury-cream mb-8">About VelvetCoin</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-luxury-gray-300">
            VelvetCoin is a premier luxury marketplace that connects discerning collectors with exceptional timepieces, fine jewelry, and rare collectibles.
          </p>
        </div>
      </div>
    </LuxuryLayout>
  );
};

export default About;