const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Payment = require('../models/Payment');

// Process payment
router.post('/process', auth, async (req, res) => {
  try {
    const { orderId, paymentDetails } = req.body;
    
    // Verify order exists and belongs to user
    const order = await Order.findOne({
      _id: orderId,
      user: req.user.userId,
      paymentStatus: 'pending'
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or already paid' });
    }

    // Create payment record
    const payment = new Payment({
      order: orderId,
      user: req.user.userId,
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
      walletAddress: paymentDetails.walletAddress,
      status: 'processing'
    });

    await payment.save();

    // Update order payment status
    order.paymentStatus = 'processing';
    await order.save();

    // In a real implementation, we would:
    // 1. Interact with USDC smart contract
    // 2. Verify transaction on blockchain
    // 3. Update payment status based on blockchain confirmation

    // Simulate successful payment for demo
    setTimeout(async () => {
      payment.status = 'completed';
      payment.transactionHash = '0x' + Math.random().toString(16).substr(2, 64);
      await payment.save();

      order.paymentStatus = 'completed';
      await order.save();
    }, 2000);

    res.json({
      status: 'processing',
      message: 'Payment is being processed'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get payment status
router.get('/:orderId/status', auth, async (req, res) => {
  try {
    const payment = await Payment.findOne({
      order: req.params.orderId,
      user: req.user.userId
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({
      status: payment.status,
      transactionHash: payment.transactionHash
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;