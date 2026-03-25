import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, total } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="cart-page container empty-cart">
                <h2 className="brand-font">Your Cart is <span className="text-gradient">Empty</span></h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/menu" className="btn-primary">Browse Menu</Link>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <h1 className="brand-font section-title">Shopping <span className="text-gradient">Bag</span></h1>
            <div className="cart-content">
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item glass-card">
                            <img src={item.image} alt={item.name} className="item-img" />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p className="item-price">&#8377;{item.price}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <button className="btn-remove" onClick={() => removeFromCart(item.id)}>&times;</button>
                        </div>
                    ))}
                </div>
                <div className="cart-summary glass-card">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>&#8377;{total.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Delivery</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-row total-row">
                        <span>Total</span>
                        <span>&#8377;{total.toFixed(2)}</span>
                    </div>
                    <button className="btn-primary w-100">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
