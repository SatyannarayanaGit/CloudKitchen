import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './FoodCard.css';

const FoodCard = ({ item }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="food-card glass-card">
            <div className="food-image">
                <img src={item.image} alt={item.name} />
                <span className="category-badge">{item.category}</span>
            </div>
            <div className="food-info">
                <h3 className="food-name">{item.name}</h3>
                <p className="food-desc">{item.description}</p>
                <div className="food-footer">
                    <span className="food-price">&#8377;{item.price}</span>
                    <button className="btn-add-cart" onClick={() => addToCart(item)}>+</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
