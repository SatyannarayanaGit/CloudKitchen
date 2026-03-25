import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    return (
        <nav className="navbar glass-card">
            <div className="container nav-content">
                <Link to="/" className="logo">Cloud<span>Kitchen</span></Link>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/menu">Menu</Link></li>

                    {user ? (
                        <>
                            <li><span className="welcome">Hi , {user.name}</span></li>
                            <li>
                                <Link to="/cart" className="cart-link">
                                    Cart <span className="cart-count">{cart.length}</span>
                                </Link>
                            </li>
                            <li><button onClick={logout} className="btn-logout">Logout</button></li>
                        </>
                    ) : (
                        <li><Link to="/login" className="btn-primary">Login</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
