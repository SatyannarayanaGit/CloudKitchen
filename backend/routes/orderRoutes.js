const express = require('express');
const router = express.Router();
const { Order, OrderItem, MenuItem, User } = require('../models');
const { auth, admin } = require('../middleware/auth');

// Create a new order
router.post('/', auth, async (req, res) => {
    try {
        const { items, totalAmount, address } = req.body;
        
        const order = await Order.create({
            userId: req.user.id,
            totalAmount,
            address,
        });

        // Insert order items
        for (const item of items) {
            await OrderItem.create({
                orderId: order.id,
                menuItemId: item.menuItem, // Assuming frontend passes menuItem ID
                quantity: item.quantity,
            });
        }

        // Fetch back with items
        const newOrder = await Order.findByPk(order.id, {
            include: [{
                model: OrderItem,
                as: 'items',
                include: [{ model: MenuItem, as: 'menuItem' }]
            }]
        });

        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [{
                model: OrderItem,
                as: 'items',
                include: [{ model: MenuItem, as: 'menuItem' }]
            }],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Get all orders
router.get('/all', auth, admin, async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User, attributes: ['name', 'email'] },
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{ model: MenuItem, as: 'menuItem' }]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
