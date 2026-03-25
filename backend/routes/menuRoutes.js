const express = require('express');
const router = express.Router();
const { MenuItem } = require('../models');

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.findAll();
        // Return ._id for frontend compatibility if needed, but we'll update frontend to use .id
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new menu item (Admin only - for now public)
router.post('/', async (req, res) => {
    try {
        const newItem = await MenuItem.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
        });
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
