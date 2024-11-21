import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUsername(JSON.parse(user));
        }
    })

    const logout = () => {
        localStorage.clear("user");
        setUsername(null);
        window.location.reload();
    }
    return (
        <div className="globalHeader">
            <p className="logo">Benchmark</p>
            <nav>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/leaderboard">Leaderboard</Link></li>
                    {username ? (<>
                        <li><Link to="/profile">Profile</Link></li>
                        <li onClick={logout}>Logout</li>
                    </>
                    ) : (
                        <li><Link to="/login">Login/Sign Up</Link></li>
                    )}</ul>
            </nav>
        </div>
    );
};

export default Header;
