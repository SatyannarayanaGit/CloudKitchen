const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
            quantity: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'out-for-delivery', 'delivered', 'cancelled'], default: 'pending' },
    address: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
