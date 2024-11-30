const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');

// Import route modules
const authRoutes = require('./auth');
const productRoutes = require('./products');
const orderRoutes = require('./orders');
const paymentRoutes = require('./payments');
const uploadRoutes = require('./upload');
const rolesRoutes = require('./roles');
const cmsRoutes = require('./cms');

// Import validators
const { authValidation } = require('../validations');

// Mount routes with validation
router.use('/auth', authValidation, authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/upload', uploadRoutes);
router.use('/roles', rolesRoutes);
router.use('/cms', cmsRoutes);

module.exports = router;