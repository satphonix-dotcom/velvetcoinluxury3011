import React from 'react';
import LuxuryLayout from '../layout/LuxuryLayout';

const Analytics = () => {
  return (
    <LuxuryLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-luxury-cream mb-8">Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            title="Total Sales"
            value="$124,500"
            change="+12.5%"
            isPositive={true}
          />
          <StatCard
            title="Active Users"
            value="2,451"
            change="+5.2%"
            isPositive={true}
          />
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            change="-0.4%"
            isPositive={false}
          />
          <StatCard
            title="Average Order Value"
            value="$285"
            change="+8.1%"
            isPositive={true}
          />
        </div>

        {/* Add more analytics components here */}
      </div>
    </LuxuryLayout>
  );
};

const StatCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-luxury-charcoal p-6 rounded-lg">
      <h3 className="text-luxury-gray-400 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-luxury-cream">{value}</p>
        <p className={`ml-2 flex items-baseline text-sm font-semibold
          ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </p>
      </div>
    </div>
  );
};

export default Analytics;