import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import FoodCard from '../components/FoodCard';
import api from '../api/axios';
import './Home.css';

const Home = () => {
    const [featuredItems, setFeaturedItems] = useState([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await api.get('/menu');
                setFeaturedItems(res.data.slice(0, 6)); // Show all featured items
            } catch (err) {
                console.error("Error fetching menu:", err);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <div className="home-page">
            <Hero />
            <section className="featured-section container">
                <h2 className="section-title">Chef's <span className="text-gradient">Specialties</span></h2>
                <div className="food-grid">
                    {featuredItems.length > 0 ? (
                        featuredItems.map(item => (
                            <FoodCard key={item.id} item={item} />
                        ))
                    ) : (
                        <p className="loading-text">Bringing you the best flavors...</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
