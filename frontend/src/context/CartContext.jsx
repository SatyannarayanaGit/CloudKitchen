import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.findIndex(i => i._id === item._id);
            if (existing !== -1) {
                const updatedCart = [...prev];
                updatedCart[existing] = {
                    ...updatedCart[existing],
                    quantity: updatedCart[existing].quantity += 1
                };
                return updatedCart[existing];

            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prev => prev.filter(i => i._id !== itemId));
    };

    const updateQuantity = (itemId, q) => {
        if (q < 1) return removeFromCart(itemId);
        setCart(prev => prev.map(i => i._id === itemId ? { ...i, quantity: q } : i));
    };

    const clearCart = () => setCart([]);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};
