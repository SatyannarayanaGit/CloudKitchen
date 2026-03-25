const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth, admin } = require('../middleware/auth');

// Create a new order
router.post('/', auth, async (req, res) => {
    try {
        const { items, totalAmount, address } = req.body;
        const order = new Order({
            user: req.user.id,
            items,
            totalAmount,
            address,
        });
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.menuItem');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Get all orders
router.get('/all', auth, admin, async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('items.menuItem');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
