import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <h1 className="hero-title animate-up">
                    Gourmet Meals <br />
                    <span className="text-gradient">Delivered to Your Door</span>
                </h1>
                <p className="hero-subtitle animate-up-delay">
                    Experience the finest culinary creations from our cloud kitchen,
                    crafted with passion and delivered with care.
                </p>
                <div className="hero-actions animate-up-delay-2">
                    <a href="/menu" className="btn-primary">Order Now</a>
                    <a href="#about" className="btn-secondary">Learn More</a>
                </div>
            </div>
            <div className="hero-overlay"></div>
        </section>
    );
};

export default Hero;
