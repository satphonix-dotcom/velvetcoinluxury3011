const mongoose = require('mongoose');
const Role = require('../models/Role');
require('dotenv').config();

const initRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Define default roles
    const defaultRoles = [
      {
        name: 'admin',
        permissions: ['all'],
        description: 'Full system access',
        isCustom: false
      },
      {
        name: 'vendor',
        permissions: [
          'create_product',
          'edit_product',
          'delete_product',
          'view_orders',
          'manage_orders'
        ],
        description: 'Vendor access for managing products and orders',
        isCustom: false
      },
      {
        name: 'customer',
        permissions: [
          'view_products',
          'place_order',
          'view_own_orders'
        ],
        description: 'Standard customer access',
        isCustom: false
      }
    ];

    // Insert default roles if they don't exist
    for (const role of defaultRoles) {
      await Role.findOneAndUpdate(
        { name: role.name },
        role,
        { upsert: true, new: true }
      );
    }

    console.log('Default roles initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing roles:', error);
    process.exit(1);
  }
};

initRoles();