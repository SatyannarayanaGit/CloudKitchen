import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import api from '../api/axios';
import './Menu.css';

const Menu = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [category, setCategory] = useState('All');
    const categories = ['All', 'Rice', 'Drinks'];

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await api.get('/menu');
                setItems(res.data);
                setFilteredItems(res.data);
            } catch (err) {
                console.error("Error fetching menu:", err);
            }
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        if (category === 'All' || category === 'Rice') {
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter(item => item.category === category));
        }
    }, [category, items]);

    return (
        <div className="menu-page container">
            <header className="menu-header">
                <h1 className="brand-font">Our <span className="text-gradient">Culinary Gallery</span></h1>
                <p className="menu-subtitle">Explore a world of flavors curated by our master chefs.</p>
            </header>

            <div className="category-filter">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${category === cat ? 'active' : ''}`}
                        onClick={() => setCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="food-grid">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <FoodCard key={item.id} item={item} />
                    ))
                ) : (
                    <p className="empty-msg">No items found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default Menu;
