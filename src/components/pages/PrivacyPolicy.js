import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p>Last updated: January 1, 2024</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
        <p>We collect information that you provide directly to us, including name, email address, and wallet addresses.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, process your transactions, and communicate with you.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Information Sharing</h2>
        <p>We do not sell or share your personal information with third parties except as described in this policy.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;