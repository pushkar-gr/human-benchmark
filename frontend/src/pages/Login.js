import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.message);
                    })
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                navigate("/home");
            })
            .catch((error) => {
                console.error('Error logging in:', error.message);
                setError(error.message);
            });
    };

    return (
        <div className="main">
            <Header />
            <div className="form-contain">
                <form className="login" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setError("") }}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError("") }}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn draw-border submit-btn">Login</button>
                    <p>
                        Don't have an account? <a href="/register">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
