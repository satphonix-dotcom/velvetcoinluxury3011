import React from 'react';
import { useSelector } from 'react-redux';
import LuxuryLayout from '../layout/LuxuryLayout';

const Profile = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <LuxuryLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-luxury-cream mb-8">Profile</h1>
        {/* Profile content */}
      </div>
    </LuxuryLayout>
  );
};

export default Profile;