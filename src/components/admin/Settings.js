import React, { useState } from 'react';
import LuxuryLayout from '../layout/LuxuryLayout';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'VelvetCoin',
    siteDescription: 'Luxury Marketplace',
    contactEmail: 'support@velvetcoin.com',
    maintenanceMode: false,
    allowNewRegistrations: true,
    requireEmailVerification: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save settings via API
  };

  return (
    <LuxuryLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-luxury-cream mb-8">Site Settings</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-luxury-charcoal p-6 rounded-lg">
            <h2 className="text-xl font-serif text-luxury-cream mb-6">General Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-luxury-gray-400">
                  Site Name
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-luxury-black border-luxury-gray-700 rounded-md text-luxury-cream"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-gray-400">
                  Site Description
                </label>
                <textarea
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full bg-luxury-black border-luxury-gray-700 rounded-md text-luxury-cream"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-gray-400">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={settings.contactEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-luxury-black border-luxury-gray-700 rounded-md text-luxury-cream"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="h-4 w-4 text-luxury-gold focus:ring-luxury-gold border-luxury-gray-700 rounded"
                  />
                  <label className="ml-2 text-sm text-luxury-gray-400">
                    Maintenance Mode
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="allowNewRegistrations"
                    checked={settings.allowNewRegistrations}
                    onChange={handleChange}
                    className="h-4 w-4 text-luxury-gold focus:ring-luxury-gold border-luxury-gray-700 rounded"
                  />
                  <label className="ml-2 text-sm text-luxury-gray-400">
                    Allow New Registrations
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="requireEmailVerification"
                    checked={settings.requireEmailVerification}
                    onChange={handleChange}
                    className="h-4 w-4 text-luxury-gold focus:ring-luxury-gold border-luxury-gray-700 rounded"
                  />
                  <label className="ml-2 text-sm text-luxury-gray-400">
                    Require Email Verification
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-luxury-gold text-luxury-black px-6 py-2 rounded-md hover:bg-luxury-gold-light transition-colors"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </LuxuryLayout>
  );
};

export default Settings;