import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="mainHeader">
            <header>
                <div className="logo">Benchmark</div>
                <nav>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/leaderboard">Leaderboard</Link></li>
                        <li><Link to="/login">Login/Sign Up</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;
